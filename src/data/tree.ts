import type { NodeId } from './nodes';

/** SVG user units. Side margins leave room for labels on both outer pillars. */
export const viewBox = { width: 1300, height: 1120 } as const;

const X = { left: 400, center: 650, right: 900 } as const;

/** Node centres: three columns, eleven nodes. */
export const nodePosition: Record<NodeId, { x: number; y: number }> = {
  top: { x: X.center, y: 90 },
  upperRight: { x: X.right, y: 210 },
  upperLeft: { x: X.left, y: 210 },
  upperMid: { x: X.center, y: 330 },
  midRight: { x: X.right, y: 450 },
  midLeft: { x: X.left, y: 450 },
  middle: { x: X.center, y: 570 },
  lowerRight: { x: X.right, y: 690 },
  lowerLeft: { x: X.left, y: 690 },
  lowerMid: { x: X.center, y: 810 },
  base: { x: X.center, y: 1000 },
};

/** The 22 paths between nodes. upperMid (contact) sits on none of them. */
export const paths: readonly (readonly [NodeId, NodeId])[] = [
  ['top', 'upperRight'],
  ['top', 'upperLeft'],
  ['top', 'middle'],
  ['upperRight', 'upperLeft'],
  ['upperRight', 'middle'],
  ['upperRight', 'midRight'],
  ['upperLeft', 'middle'],
  ['upperLeft', 'midLeft'],
  ['midRight', 'midLeft'],
  ['midRight', 'middle'],
  ['midRight', 'lowerRight'],
  ['midLeft', 'middle'],
  ['midLeft', 'lowerLeft'],
  ['middle', 'lowerRight'],
  ['middle', 'lowerMid'],
  ['middle', 'lowerLeft'],
  ['lowerRight', 'lowerLeft'],
  ['lowerRight', 'lowerMid'],
  ['lowerRight', 'base'],
  ['lowerLeft', 'lowerMid'],
  ['lowerLeft', 'base'],
  ['lowerMid', 'base'],
];

/** Where a node's label sits relative to the node. */
export type LabelSide = 'left' | 'right';

export const labelSide: Record<NodeId, LabelSide> = {
  top: 'right',
  upperRight: 'right',
  upperLeft: 'left',
  upperMid: 'right',
  midRight: 'right',
  midLeft: 'left',
  middle: 'right',
  lowerRight: 'right',
  lowerLeft: 'left',
  lowerMid: 'right',
  base: 'right',
};
