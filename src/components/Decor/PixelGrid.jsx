import React from "react";

/**
 * Bazowy renderer „pikseli” w układzie grid.
 *
 * Props:
 * - matrix: number[][]  // 1 = rysuj kwadrat, 0 = puste
 * - size: number        // rozmiar kwadratu w px (default 12)
 * - gap: number         // odstęp między kwadratami w px (default 6)
 * - color: string       // klasa Tailwind koloru tła (default "bg-blue-500")
 * - className: string   // dodatkowe pozycjonowanie (np. "absolute left-8 top-8")
 * - ariaLabel: string   // opcjonalne, gdy chcesz nie ukrywać dekoracji dla a11y
 */
export default function PixelGrid({
                                    matrix,
                                    size = 12,
                                    gap = 6,
                                    color = "bg-primary",
                                    className = "",
                                    ariaLabel,
                                  }) {
  const cols = Math.max(...matrix.map(r => r.length));

  return (
    <div
      className={className}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${size}px)`,
        gridAutoRows: `${size}px`,
        gap: `${gap}px`,
      }}
    >
      {matrix.flatMap((row, rIdx) =>
        Array.from({ length: cols }).map((_, cIdx) => {
          const on = row[cIdx] === 1;
          return (
            <div
              key={`${rIdx}-${cIdx}`}
              className={on ? `${color}` : ""}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: 2,
                opacity: on ? 1 : 0,
              }}
            />
          );
        })
      )}
    </div>
  );
}
