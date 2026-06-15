// Returns the uniform scale factor for the cone layout against the reference
// 1440x900 viewport. min(sx, sy) keeps the cone from overflowing the smaller
// axis; no upper cap so taller-than-900px viewports scale up and fill the
// section (avoids a white band below the cards).
// Below 768px: use SLOT_LEVELS_MOBILE (reference 390px) and scale proportionally.
// At or above 768px: use desktop SLOT_LEVELS (reference 1440×900).
export const IS_MOBILE_BREAKPOINT = 768;

export const getViewportScale = (vw, vh = 900) => {
  if (vw < IS_MOBILE_BREAKPOINT) {
    // Scale mobile cone (designed at 390px) to the actual phone width.
    return Math.max(0.5, vw / 390);
  }
  const sx = vw / 1440;
  const sy = vh / 900;
  return Math.max(0.55, Math.min(sx, sy));
};
