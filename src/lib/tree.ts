import { localizePath, t, type Locale } from '../i18n';
import { pillarOf, nodeIds, type Pillar, type NodeId } from '../data/nodes';
import { labelSide, nodePosition, paths, type LabelSide } from '../data/tree';
import { getTree, type Project } from './projects';
import { getPages } from './pages';

export interface SatelliteView {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  tagline: string;
  href: string;
  x: number;
  y: number;
  exodiaPart: boolean;
}

export interface NodeView {
  nodeId: NodeId;
  /** Category shown above the title: project kind or page label. Empty on dormant nodes. */
  eyebrow: string;
  pillar: Pillar;
  x: number;
  y: number;
  side: LabelSide;
  /** Absent for dormant nodes: no content, no link. */
  href?: string;
  title?: string;
  summary?: string;
  /** One full sentence: the project tagline or the section lead. */
  tagline?: string;
  project?: Project;
  satellites: SatelliteView[];
  exodiaPart: boolean;
}

export interface PathView {
  a: NodeId;
  b: NodeId;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const EXODIA = 'exodia';

export async function buildTree(locale: Locale): Promise<{ nodes: NodeView[]; paths: PathView[] }> {
  const ui = t(locale);
  const projectNodes = await getTree(locale);
  const pages = await getPages(locale);

  const exodia = projectNodes
    .flatMap((n) => [n.primary, ...n.satellites])
    .find((p) => p.slug === EXODIA);
  const exodiaParts = new Set(
    (exodia?.entry.data.components ?? []).flatMap((c) => (c.project ? [c.project] : [])),
  );

  const nodes = nodeIds.map((nodeId): NodeView => {
    const { x, y } = nodePosition[nodeId];
    const side = labelSide[nodeId];
    const base = {
      nodeId,
      pillar: pillarOf[nodeId],
      x,
      y,
      side,
    };

    const projectNode = projectNodes.find((n) => n.nodeId === nodeId);
    if (projectNode) {
      const { primary, satellites } = projectNode;
      const dir = side === 'right' ? 1 : -1;
      return {
        ...base,
        href: localizePath(`/projects/${primary.slug}/`, locale),
        eyebrow: ui.kinds[primary.entry.data.kind],
        title: primary.entry.data.name,
        summary: primary.entry.data.summary,
        tagline: primary.entry.data.tagline,
        project: primary,
        exodiaPart: exodiaParts.has(primary.slug),
        satellites: satellites.map((s, i) => ({
          slug: s.slug,
          name: s.entry.data.name,
          eyebrow: ui.kinds[s.entry.data.kind],
          summary: s.entry.data.summary,
          tagline: s.entry.data.tagline,
          href: localizePath(`/projects/${s.slug}/`, locale),
          x: x + dir * 34,
          y: y + 66 + i * 34,
          exodiaPart: exodiaParts.has(s.slug),
        })),
      };
    }

    // Non-project nodes are sections of the site (about, work, contact).
    const page = pages.find((p) => p.entry.data.node === nodeId);
    if (page) {
      return {
        ...base,
        href: page.href,
        eyebrow: page.entry.data.eyebrow,
        title: page.entry.data.title,
        summary: page.entry.data.summary,
        tagline: page.entry.data.lead,
        satellites: [],
        exodiaPart: false,
      };
    }

    return { ...base, eyebrow: '', satellites: [], exodiaPart: false };
  });

  const pathViews = paths.map(([a, b]) => ({
    a,
    b,
    x1: nodePosition[a].x,
    y1: nodePosition[a].y,
    x2: nodePosition[b].x,
    y2: nodePosition[b].y,
  }));

  return { nodes, paths: pathViews };
}

/** Rough text width in SVG units, used to size label backdrops at build time. */
export function estimateWidth(
  text: string,
  fontSize: number,
  kind: 'display' | 'body' | 'mono',
): number {
  const ratio = { display: 0.66, body: 0.5, mono: 0.6 }[kind];
  return Math.ceil(text.length * fontSize * ratio);
}
