// Returns the uniform scale factor for the cone layout against the reference
// 1440x900 viewport. min(sx, sy) keeps the cone from overflowing the smaller
// axis; no upper cap so taller-than-900px viewports scale up and fill the
// section (avoids a white band below the cards).
export const getViewportScale = (vw, vh = 900) => {
  const sx = vw / 1440;
  const sy = vh / 900;
  return Math.max(0.55, Math.min(sx, sy));
};
