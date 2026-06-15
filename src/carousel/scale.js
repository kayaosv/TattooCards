// Returns the uniform scale factor for the cone layout against the reference
// 1440x900 viewport. min(sx, sy) keeps the cone from overflowing the smaller
// axis; no upper cap so taller-than-900px viewports scale up and fill the
// section (avoids a white band below the cards).
export const getViewportScale = (vw, vh = 900) => {
  if (vw < 1024) {
    // Mobile/tablet: fit the full-size card (760px wide) within 92% of viewport.
    // No floor so small phones get a genuinely small scale instead of overflowing.
    return Math.max(0.22, (vw * 0.92) / 760);
  }
  const sx = vw / 1440;
  const sy = vh / 900;
  return Math.max(0.55, Math.min(sx, sy));
};
