import {
  SLOT_LEVELS, FULL_SIZE, FULL_SIZE_STEP_X, FULL_SIZE_START_X,
  SLOT_LEVELS_MOBILE, FULL_SIZE_MOBILE, FULL_SIZE_START_X_MOBILE, FULL_SIZE_STEP_X_MOBILE,
} from './dimensions.js';

const lerp = (a, b, t) => a + (b - a) * t;

// Returns absolute position and size for a card at a given slot index.
// slots 0..6 use the measured lookup table; slot>=6 extends horizontally.
export const getCardLayout = (slot) => {
  if (slot < 0) return null;

  if (slot < SLOT_LEVELS.length) {
    return { ...SLOT_LEVELS[slot] };
  }

  const offsetFromFull = slot - 6;
  return {
    slot,
    w: FULL_SIZE.w,
    h: FULL_SIZE.h,
    y: FULL_SIZE.y,
    x: FULL_SIZE_START_X + offsetFromFull * FULL_SIZE_STEP_X,
    tx: 0,
  };
};

// Mobile version — uses SLOT_LEVELS_MOBILE (5 slots, reference 390px viewport).
export const getCardLayoutFractionalMobile = (slot) => {
  if (slot < 0) return null;

  if (slot < SLOT_LEVELS_MOBILE.length - 1) {
    const lo = Math.floor(slot);
    const t = slot - lo;
    const a = SLOT_LEVELS_MOBILE[lo];
    const b = SLOT_LEVELS_MOBILE[lo + 1];
    return {
      w: lerp(a.w, b.w, t),
      h: lerp(a.h, b.h, t),
      x: lerp(a.x, b.x, t),
      y: lerp(a.y, b.y, t),
      tx: 0,
    };
  }

  const offsetFromFull = slot - (SLOT_LEVELS_MOBILE.length - 1);
  return {
    w: FULL_SIZE_MOBILE.w,
    h: FULL_SIZE_MOBILE.h,
    y: FULL_SIZE_MOBILE.y,
    x: FULL_SIZE_START_X_MOBILE + offsetFromFull * FULL_SIZE_STEP_X_MOBILE,
    tx: 0,
  };
};

// Desktop version — interpolated layout for a fractional slot value.
// Critical for smooth animation between integer slot positions.
export const getCardLayoutFractional = (slot) => {
  if (slot < 0) return null;

  if (slot < SLOT_LEVELS.length - 1) {
    const lo = Math.floor(slot);
    const t = slot - lo;
    const a = SLOT_LEVELS[lo];
    const b = SLOT_LEVELS[lo + 1];
    return {
      w: lerp(a.w, b.w, t),
      h: lerp(a.h, b.h, t),
      x: lerp(a.x, b.x, t),
      y: lerp(a.y, b.y, t),
      tx: lerp(a.tx, b.tx, t),
    };
  }

  const offsetFromFull = slot - 6;
  return {
    w: FULL_SIZE.w,
    h: FULL_SIZE.h,
    y: FULL_SIZE.y,
    x: FULL_SIZE_START_X + offsetFromFull * FULL_SIZE_STEP_X,
    tx: 0,
  };
};
