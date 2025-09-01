// utils/pixelPattern.js
export function pixelPattern(lines) {
  const coords = [];
  lines.forEach((row, r) => {
    [...row].forEach((ch, c) => {
      if (ch === "#") coords.push([r, c]);
    });
  });
  return coords;
}

export function pixelSizesFromAscii(lines, legend = { "1": 0.6, "2": 0.8, "3": 1.0 }) {
  // Zwraca obiekt: { "r,c": scale } — scale ∈ (0,1], centrowany w komórce
  const map = {};
  lines.forEach((row, r) => {
    [...row].forEach((ch, c) => {
      if (legend[ch] != null) map[`${r},${c}`] = legend[ch];
    });
  });
  return map;
}