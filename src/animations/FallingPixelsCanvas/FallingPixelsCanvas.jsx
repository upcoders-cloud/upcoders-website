import React, { useEffect, useRef } from "react";

export default function FallingPixelsCanvas({
                                              coords,
                                              rows,
                                              cols,
                                              cell = 48,
                                              color = "#5271FF",
                                              className = "",
                                              sizes = null,
                                            }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    canvas.width = cols * cell;
    canvas.height = rows * cell;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    coords.forEach(([r, c]) => {
      const key = `${r},${c}`;
      const s = sizes?.[key] ?? 1;

      const size = cell * s;
      const x = c * cell + (cell - size) / 2;
      const y = r * cell + (cell - size) / 2;

      ctx.fillStyle = color;
      ctx.fillRect(x, y, size, size);
    });
  }, [coords, rows, cols, cell, color, sizes]);

  return <canvas ref={canvasRef} className={className} />;
}
