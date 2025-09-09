import React from "react";
import { noop } from 'motion'

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
                opacity: on ? 1 : 0,
              }}
            />
          );
        })
      )}
    </div>
  );
}
