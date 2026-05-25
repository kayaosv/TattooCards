// Exact measurements from MEASUREMENTS.md (reference viewport 1440x900).
// DO NOT modify without re-measuring against the Detroit reference.

export const REF_VIEWPORT = { w: 1440, h: 900 };

// 7 cone slot levels (slot 0 = smallest bottom-left, slot 6 = full-size landing).
export const SLOT_LEVELS = [
  { slot: 0, w: 136, h: 114, x: -17,  y: 786, tx: -60.588 },
  { slot: 1, w: 246, h: 205, x: 86,   y: 695, tx: -49.896 },
  { slot: 2, w: 357, h: 297, x: 295,  y: 603, tx: -39.204 },
  { slot: 3, w: 467, h: 389, x: 608,  y: 511, tx: -28.512 },
  { slot: 4, w: 577, h: 481, x: 1027, y: 419, tx: -17.820 },
  { slot: 5, w: 687, h: 572, x: 1551, y: 328, tx: -7.128  },
  { slot: 6, w: 760, h: 634, x: 2074, y: 266, tx: 0       },
];

// Horizontal queue of full-size cards (slot >= 6).
export const FULL_SIZE = { w: 760, h: 634, y: 266 };
export const FULL_SIZE_STEP_X = 345.6;
export const FULL_SIZE_START_X = 2074;

// Slots rendered simultaneously (calibrated in Phase 4).
export const VISIBLE_SLOTS = 20;
