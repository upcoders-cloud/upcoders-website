import { pixelPattern, pixelSizesFromAscii } from "utils/pixelPattern.jsx";

export const UPCODERS_SHAPE_ASCII = [
  "..........####",
  ".##.......####",
  ".##....#######",
  "#......#######",
  ".......#######",
  ".....##..#####",
  ".....##..#####",
  ".....#########",
  ".....#########",
  "..############",
  "..############",
  ".#..##########",
  ".#..##########",
];

export const UPCODERS_SHAPE_COORDS = pixelPattern(UPCODERS_SHAPE_ASCII);
export const UPCODERS_SHAPE_ROWS = UPCODERS_SHAPE_ASCII.length;
export const UPCODERS_SHAPE_COLS = UPCODERS_SHAPE_ASCII[0].length;

// ASCII rozmiarów: cyfry = skale wg legendy (np. 1=0.6, 2=0.8, 3=1.0)
// Kropki ignorowane; nie muszą pokrywać się 1:1 z '#', ale najlepiej trzymać siatkę.
export const UPCODERS_SIZES_ASCII = [
  "..........3333",
  ".33.......3333",
  ".33....3333333",
  "1......3333333",
  ".......3333333",
  ".....33..33333",
  ".....33..33333",
  ".....333333333",
  ".....333333333",
  "..333333333333",
  "..333333333333",
  "....3333333333",
  "....3333333333",
];

// Możesz zmienić legendę tu, jeśli chcesz inne skale:
export const UPCODERS_SIZES_MAP = pixelSizesFromAscii(UPCODERS_SIZES_ASCII, {
  "1": 0.50,
  "2": 0.75,
  "3": 1.0,
});
