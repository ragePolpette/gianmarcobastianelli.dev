import type { Sephirah } from './sephirot';

/** SVG user units. Side margins leave room for labels on both outer pillars. */
export const viewBox = { width: 1300, height: 1120 } as const;

const X = { severity: 400, balance: 650, mercy: 900 } as const;

/** Node centres, classic layout: left pillar = severity, right pillar = mercy. */
export const nodePosition: Record<Sephirah, { x: number; y: number }> = {
  keter: { x: X.balance, y: 90 },
  chokhmah: { x: X.mercy, y: 210 },
  binah: { x: X.severity, y: 210 },
  daat: { x: X.balance, y: 330 },
  chesed: { x: X.mercy, y: 450 },
  gevurah: { x: X.severity, y: 450 },
  tiferet: { x: X.balance, y: 570 },
  netzach: { x: X.mercy, y: 690 },
  hod: { x: X.severity, y: 690 },
  yesod: { x: X.balance, y: 810 },
  malkuth: { x: X.balance, y: 1000 },
};

/** The 22 traditional paths. Da'at sits on none of them: it is the hidden sephirah. */
export const paths: readonly (readonly [Sephirah, Sephirah])[] = [
  ['keter', 'chokhmah'],
  ['keter', 'binah'],
  ['keter', 'tiferet'],
  ['chokhmah', 'binah'],
  ['chokhmah', 'tiferet'],
  ['chokhmah', 'chesed'],
  ['binah', 'tiferet'],
  ['binah', 'gevurah'],
  ['chesed', 'gevurah'],
  ['chesed', 'tiferet'],
  ['chesed', 'netzach'],
  ['gevurah', 'tiferet'],
  ['gevurah', 'hod'],
  ['tiferet', 'netzach'],
  ['tiferet', 'yesod'],
  ['tiferet', 'hod'],
  ['netzach', 'hod'],
  ['netzach', 'yesod'],
  ['netzach', 'malkuth'],
  ['hod', 'yesod'],
  ['hod', 'malkuth'],
  ['yesod', 'malkuth'],
];

/** Where a node's label sits relative to the node. */
export type LabelSide = 'left' | 'right';

export const labelSide: Record<Sephirah, LabelSide> = {
  keter: 'right',
  chokhmah: 'right',
  binah: 'left',
  daat: 'right',
  chesed: 'right',
  gevurah: 'left',
  tiferet: 'right',
  netzach: 'right',
  hod: 'left',
  yesod: 'right',
  malkuth: 'right',
};
