// Build-time Open Graph images (1200×630 PNG): satori lays out the card and
// turns text into paths, resvg rasterizes it. Nothing here ships to the browser.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { pillarOf, type Pillar, type Sephirah } from '../data/sephirot';
import { nodePosition, paths, viewBox } from '../data/tree';

const WIDTH = 1200;
const HEIGHT = 630;

const color = {
  bg: '#07070b',
  fg: '#ededf2',
  muted: '#a6a6ba',
  line: '#24243a',
  pillar: { mercy: '#4fe3ff', severity: '#ff5ca8', balance: '#f2c46d' } satisfies Record<
    Pillar,
    string
  >,
};

function font(pkg: string, file: string): Buffer {
  return readFileSync(join(process.cwd(), 'node_modules', pkg, 'files', file));
}

let fonts: Parameters<typeof satori>[1]['fonts'] | undefined;
function loadFonts() {
  fonts ??= [
    { name: 'Syne', data: font('@fontsource/syne', 'syne-latin-800-normal.woff'), weight: 800 },
    {
      name: 'JetBrains Mono',
      data: font('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'),
      weight: 400,
    },
  ];
  return fonts;
}

// Minimal element factory, so this file stays plain TypeScript (no JSX runtime).
type Child = SatoriNode | string;
interface SatoriNode {
  type: string;
  props: Record<string, unknown> & { children?: Child | Child[] | undefined };
}
function h(type: string, props: Record<string, unknown>, ...children: Child[]): SatoriNode {
  return { type, props: { ...props, children: children.length === 1 ? children[0] : children } };
}

function treeSvg(highlight: Sephirah | undefined, scale: number): SatoriNode {
  const lines = paths.map(([a, b]) => {
    const on = highlight !== undefined && (a === highlight || b === highlight);
    return h('line', {
      x1: nodePosition[a].x,
      y1: nodePosition[a].y,
      x2: nodePosition[b].x,
      y2: nodePosition[b].y,
      stroke: on ? color.pillar[pillarOf[highlight]] : color.fg,
      'stroke-opacity': on ? 0.9 : 0.16,
      'stroke-width': on ? 6 : 3,
    });
  });
  const nodes = (Object.keys(nodePosition) as Sephirah[]).flatMap((s) => {
    const { x, y } = nodePosition[s];
    const c = color.pillar[pillarOf[s]];
    const active = s === highlight;
    return [
      h('circle', {
        cx: x,
        cy: y,
        r: active ? 70 : 42,
        fill: c,
        'fill-opacity': active ? 0.28 : 0.1,
      }),
      h('circle', {
        cx: x,
        cy: y,
        r: active ? 30 : 22,
        fill: color.bg,
        stroke: active ? color.fg : c,
        'stroke-width': active ? 6 : 4,
      }),
      h('circle', { cx: x, cy: y, r: active ? 14 : 10, fill: c }),
    ];
  });
  return h(
    'svg',
    {
      width: Math.round(viewBox.width * scale),
      height: Math.round(viewBox.height * scale),
      viewBox: `0 0 ${viewBox.width} ${viewBox.height}`,
    },
    ...lines,
    ...nodes,
  );
}

export interface OgCard {
  eyebrow: string;
  title: string;
  subtitle: string;
  highlight?: Sephirah;
}

export async function renderOg(card: OgCard): Promise<Uint8Array> {
  const accent = card.highlight ? color.pillar[pillarOf[card.highlight]] : color.pillar.balance;
  const textWidth = 600;
  // Size on the longest word so single tokens like "llm-bitbucket-mcp" never break mid-word.
  const longestWord = Math.max(...card.title.split(/\s+/).map((w) => w.length));
  const titleSize = Math.min(84, Math.floor(textWidth / (longestWord * 0.88)));

  const tree = h(
    'div',
    { style: { display: 'flex', position: 'absolute', right: 20, top: 40 } },
    treeSvg(card.highlight, 0.5),
  );

  const text = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: textWidth,
        height: '100%',
        gap: 24,
      },
    },
    h(
      'div',
      {
        style: {
          fontFamily: 'JetBrains Mono',
          fontSize: 22,
          letterSpacing: 3,
          color: accent,
          textTransform: 'uppercase',
        },
      },
      card.eyebrow,
    ),
    h(
      'div',
      {
        style: {
          fontFamily: 'Syne',
          fontWeight: 800,
          fontSize: titleSize,
          lineHeight: 1.05,
          color: color.fg,
        },
      },
      card.title,
    ),
    h(
      'div',
      {
        style: { fontFamily: 'JetBrains Mono', fontSize: 24, lineHeight: 1.45, color: color.muted },
      },
      card.subtitle,
    ),
  );

  const footer = h(
    'div',
    {
      style: {
        position: 'absolute',
        left: 72,
        bottom: 48,
        fontFamily: 'JetBrains Mono',
        fontSize: 20,
        color: color.muted,
      },
    },
    'gianmarcobastianelli.dev',
  );

  const root = h(
    'div',
    {
      style: {
        display: 'flex',
        position: 'relative',
        width: WIDTH,
        height: HEIGHT,
        padding: '0 72px',
        backgroundColor: color.bg,
        borderTop: `6px solid ${accent}`,
      },
    },
    tree,
    text,
    footer,
  );

  // satori's typings expect React elements; the plain object shape is what it consumes.
  const svg = await satori(root as unknown as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts: loadFonts(),
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
}
