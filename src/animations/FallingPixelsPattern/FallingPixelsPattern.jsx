import * as motion from "motion/react-client";
import React from "react";

export default function FallingPixelsPattern({
                                               coords,                 // Array<[r,c]>
                                               rows,
                                               cols,
                                               cell = "clamp(64px, 10vw, 100px)",
                                               gap = "14px",
                                               color = "#5271FF",
                                               duration = 2.8,
                                               staggerFraction = 0.75,
                                               className = "",
                                               sizes = null,          // << NOWE: { "r,c": scale } np. 0.55, 0.8, 1.0
                                             }) {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, var(--cell))`,
    gridTemplateRows: `repeat(${rows}, var(--cell))`,
    gap: `var(--gap)`,
    position: "relative",
    "--cell": cell,
    "--gap": gap,
  };

  const total = duration;
  const count = coords.length;
  const maxStagger = total * staggerFraction;
  const perDelay = count > 1 ? maxStagger / (count - 1) : 0;
  const fallDur = Math.max(0.2, total - maxStagger);

  return (
    <div className={className} style={gridStyle} aria-hidden>
      {coords.map(([r, c], i) => {
        const delay = i * perDelay;
        const startY = -220 - Math.random() * 180;
        const startRot = Math.random() * 10 - 5;
        const key = `${r},${c}`;
        const s = sizes?.[key] ?? 1; // skala 0–1

        return (
          <motion.div
            key={`${r}-${c}`}
            style={{
              gridRow: r + 1,
              gridColumn: c + 1,
              placeSelf: "center",                           // centrowanie w komórce
              width: `calc(var(--cell) * ${s})`,
              height: `calc(var(--cell) * ${s})`,
              borderRadius: "0",
              background: color,
            }}
            initial={{ y: startY, rotate: startRot, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, rotate: 0, opacity: 1, scale: 1 }}
            transition={{
              delay,
              duration: fallDur * 0.9,
              ease: [0.2, 0.85, 0.2, 1],
              y: {
                delay: delay + fallDur * 0.7,
                type: "spring",
                stiffness: 250,
                damping: 24,
                mass: 0.8,
              },
            }}
          />
        );
      })}
    </div>
  );
}
