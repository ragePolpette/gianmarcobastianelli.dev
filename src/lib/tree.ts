import { localizePath, t, type Locale } from '../i18n';
import { pillarOf, sephirot, type Pillar, type Sephirah } from '../data/sephirot';
import { labelSide, nodePosition, paths, type LabelSide } from '../data/tree';
import { getTree, type Project } from './projects';

export interface SatelliteView {
  slug: string;
  name: string;
  summary: string;
  href: string;
  x: number;
  y: number;
  exodiaPart: boolean;
}

export interface NodeView {
  sephirah: Sephirah;
  sephirahName: string;
  meaning: string;
  pillar: Pillar;
  x: number;
  y: number;
  side: LabelSide;
  /** Absent for dormant nodes: no content, no link. */
  href?: string;
  title?: string;
  summary?: string;
  project?: Project;
  satellites: SatelliteView[];
  exodiaPart: boolean;
}

export interface PathView {
  a: Sephirah;
  b: Sephirah;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** Non-project nodes: sections of the site rather than projects. */
const sectionHref: Partial<Record<Sephirah, string>> = {
  keter: '/about/',
  tiferet: '/work/',
  daat: '/contact/',
};

const EXODIA = 'exodia';

export async function buildTree(locale: Locale): Promise<{ nodes: NodeView[]; paths: PathView[] }> {
  const ui = t(locale);
  const projectNodes = await getTree(locale);

  const exodia = projectNodes
    .flatMap((n) => [n.primary, ...n.satellites])
    .find((p) => p.slug === EXODIA);
  const exodiaParts = new Set(
    (exodia?.entry.data.components ?? []).flatMap((c) => (c.project ? [c.project] : [])),
  );

  const nodes = sephirot.map((sephirah): NodeView => {
    const { x, y } = nodePosition[sephirah];
    const side = labelSide[sephirah];
    const base = {
      sephirah,
      sephirahName: ui.sephirot[sephirah].name,
      meaning: ui.sephirot[sephirah].meaning,
      pillar: pillarOf[sephirah],
      x,
      y,
      side,
    };

    const projectNode = projectNodes.find((n) => n.sephirah === sephirah);
    if (projectNode) {
      const { primary, satellites } = projectNode;
      const dir = side === 'right' ? 1 : -1;
      return {
        ...base,
        href: localizePath(`/projects/${primary.slug}/`, locale),
        title: primary.entry.data.name,
        summary: primary.entry.data.summary,
        project: primary,
        exodiaPart: exodiaParts.has(primary.slug),
        satellites: satellites.map((s, i) => ({
          slug: s.slug,
          name: s.entry.data.name,
          summary: s.entry.data.summary,
          href: localizePath(`/projects/${s.slug}/`, locale),
          x: x + dir * 34,
          y: y + 66 + i * 34,
          exodiaPart: exodiaParts.has(s.slug),
        })),
      };
    }

    const section = sectionHref[sephirah];
    const copy = (ui.tree.nodes as Partial<Record<Sephirah, { title: string; summary: string }>>)[
      sephirah
    ];
    if (section && copy) {
      return {
        ...base,
        href: localizePath(section, locale),
        title: copy.title,
        summary: copy.summary,
        satellites: [],
        exodiaPart: false,
      };
    }

    return { ...base, satellites: [], exodiaPart: false };
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
