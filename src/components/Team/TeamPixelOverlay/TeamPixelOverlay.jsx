import React from "react";

/**
 * TeamPixelOverlay – statyczny overlay pikseli (bez animacji).
 *
 * Props:
 * - coords: Array<[r,c]>        // współrzędne włączonych pikseli (np. z pixelPattern)
 * - rows: number                // liczba wierszy w siatce
 * - cols: number                // liczba kolumn w siatce
 * - cell: string                // rozmiar komórki (CSS) np. "clamp(20px, 5vw, 40px)"
 * - gap: string|number          // odstęp między komórkami (CSS lub px)
 * - color: string               // kolor pikseli
 * - className: string           // dodatkowe klasy na kontener
 * - sizes: Record<"r,c",number> // skala pojedynczych pikseli: 0..1 (opcjonalnie)
 *
 * Uwaga:
 * - komponent NIC nie animuje – tylko rysuje siatkę.
 * - rozmiar siatki wynika z `rows/cols` i `cell`. Umieść kontener absolutnie nad zdjęciem
 *   i ustaw mu taki rozmiar, jaki chcesz (np. `inset-x-0 bottom-0` dla paska na dole,
 *   albo `inset-0` jeśli chcesz pełne wypełnienie).
 */
export default function TeamPixelOverlay({
                                           coords,
                                           rows,
                                           cols,
                                           cell = "clamp(24px, 6vw, 42px)",
                                           gap = 0,
                                           color = "#5271FF",
                                           className = "",
                                           sizes = null,
                                         }) {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, var(--cell))`,
    gridTemplateRows: `repeat(${rows}, var(--cell))`,
    gap: "var(--gap)",
    position: "relative",
    "--cell": cell,
    "--gap": typeof gap === "number" ? `${gap}px` : gap,
  };

  return (
    <div className={className} style={gridStyle} aria-hidden>
      {coords.map(([r, c]) => {
        const key = `${r},${c}`;
        const s = sizes?.[key] ?? 1; // skala 0..1 dla pojedynczego pikselka
        return (
          <div
            key={key}
            style={{
              gridRow: r + 1,
              gridColumn: c + 1,
              placeSelf: "center", // centrowanie w komórce (żeby skala trzymała środek)
              width: `calc(var(--cell) * ${s})`,
              height: `calc(var(--cell) * ${s})`,
              background: color,
            }}
          />
        );
      })}
    </div>
  );
}
