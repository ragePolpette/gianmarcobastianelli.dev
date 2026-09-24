export const sephirot = [
  'keter',
  'chokhmah',
  'binah',
  'daat',
  'chesed',
  'gevurah',
  'tiferet',
  'netzach',
  'hod',
  'yesod',
  'malkuth',
] as const;

export type Sephirah = (typeof sephirot)[number];

export type Pillar = 'mercy' | 'severity' | 'balance';

/** Right pillar = cyan, left pillar = magenta, middle pillar = gold. */
export const pillarOf: Record<Sephirah, Pillar> = {
  keter: 'balance',
  chokhmah: 'mercy',
  binah: 'severity',
  daat: 'balance',
  chesed: 'mercy',
  gevurah: 'severity',
  tiferet: 'balance',
  netzach: 'mercy',
  hod: 'severity',
  yesod: 'balance',
  malkuth: 'balance',
};

/** Tree order, top to bottom: used to sort nodes in the list view. */
export function treeIndex(sephirah: Sephirah): number {
  return sephirot.indexOf(sephirah);
}
