import { pixelPattern } from "@/utils/pixelPattern.jsx";

// 8 kolumn × 4 wiersze (większe kwadraty, pasek na dole)
// możesz dopisać swoje warianty, byle każdy wiersz miał tyle samo znaków
const TEAM_PATTERNS_ASCII = [
  [
    "........",
    "###.....",
    "#####...",
    "########",
  ],
  [
    "........",
    "...###..",
    "...#####",
    "########",
  ],
  [
    "........",
    ".....###",
    "..######",
    "########",
  ],
  [
    "........",
    "#.......",
    "#####...",
    "########",
  ],
  [
    "........",
    "..##....",
    "..####..",
    "########",
  ],
  [
    "........",
    "......##",
    "....####",
    "########",
  ],
];

// przelicz raz – coords/rows/cols dla każdego patternu
export const TEAM_PATTERNS = TEAM_PATTERNS_ASCII.map((ascii) => ({
  ascii,
  coords: pixelPattern(ascii),
  rows: ascii.length,
  cols: ascii[0].length,
}));
