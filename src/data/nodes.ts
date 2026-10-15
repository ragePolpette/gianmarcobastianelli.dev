export const nodeIds = [
  'top',
  'upperRight',
  'upperLeft',
  'upperMid',
  'midRight',
  'midLeft',
  'middle',
  'lowerRight',
  'lowerLeft',
  'lowerMid',
  'base',
] as const;

export type NodeId = (typeof nodeIds)[number];

export type Pillar = 'right' | 'left' | 'center';

/** Column of each node: right = cyan, left = magenta, center = gold. */
export const pillarOf: Record<NodeId, Pillar> = {
  top: 'center',
  upperRight: 'right',
  upperLeft: 'left',
  upperMid: 'center',
  midRight: 'right',
  midLeft: 'left',
  middle: 'center',
  lowerRight: 'right',
  lowerLeft: 'left',
  lowerMid: 'center',
  base: 'center',
};

/** Tree order, top to bottom: used to sort nodes in the list view. */
export function treeIndex(nodeId: NodeId): number {
  return nodeIds.indexOf(nodeId);
}
