// Returns the uniform scale factor for the cone layout against the reference
// 1440x900 viewport. Uses the smaller of width/height ratio so the cone never
// overflows vertically (was the bug on laptops with <900px height).
export const getViewportScale = (vw, vh = 900) => {
  const sx = vw / 1440;
  const sy = vh / 900;
  const s = Math.min(sx, sy);
  return Math.min(1, Math.max(0.55, s));
};
