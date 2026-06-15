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

// ── Mobile cone (reference viewport 390px wide) ──────────────────────────────
// 5 slot levels tuned for portrait phones. Slot 4 = featured card (~91% vw).
// Scale.js multiplies all values by vw/390 so every phone size is proportional.
export const SLOT_LEVELS_MOBILE = [
  { slot: 0, w: 58,  h: 48,  x: -10, y: 640, tx: 0 },
  { slot: 1, w: 107, h: 89,  x: 5,   y: 530, tx: 0 },
  { slot: 2, w: 170, h: 142, x: 15,  y: 420, tx: 0 },
  { slot: 3, w: 241, h: 201, x: 20,  y: 290, tx: 0 },
  { slot: 4, w: 355, h: 296, x: 30,  y: 160, tx: 0 },
];

export const FULL_SIZE_MOBILE    = { w: 355, h: 296, y: 160 };
export const FULL_SIZE_START_X_MOBILE = 420;   // just off right edge at 390px ref
export const FULL_SIZE_STEP_X_MOBILE  = 365;
export const VISIBLE_SLOTS_MOBILE     = 10;
