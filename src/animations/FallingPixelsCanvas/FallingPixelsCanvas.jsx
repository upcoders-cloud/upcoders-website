import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion/usePrefersReducedMotion.js'

export default function FallingPixelsCanvas({
  coords,
  rows,
  cols,
  cell = 48,
  color = '#5271FF',
  className = '',
  sizes = null,
}) {
  const canvasRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })

    canvas.width = cols * cell
    canvas.height = rows * cell

    if (prefersReducedMotion) {
      ctx.fillStyle = color
      coords.forEach(([r, c]) => {
        const size = cell * (sizes?.[`${r},${c}`] ?? 1)
        ctx.fillRect(c * cell + (cell - size) / 2, r * cell + (cell - size) / 2, size, size)
      })
      return
    }

    const pixels = coords.map(([r, c], i) => {
      const key = `${r},${c}`
      const s = sizes?.[key] ?? 1

      const targetSize = cell * s
      const targetX = c * cell + (cell - targetSize) / 2
      const targetY = r * cell + (cell - targetSize) / 2

      return {
        x: targetX,
        y: targetY,
        size: targetSize,

        startY: targetY - (1000 + Math.random() * 1200),

        delay: i * 10,

        duration: 180 + Math.random() * 120,
      }
    })

    let startTime = null
    let animationFrameId = null

    function animate(timestamp) {
      if (!startTime) startTime = timestamp

      const elapsed = timestamp - startTime
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let allDone = true

      pixels.forEach((p) => {
        const t = elapsed - p.delay

        if (t < 0) {
          ctx.fillStyle = color
          ctx.fillRect(p.x, p.startY, p.size, p.size)
          allDone = false
          return
        }

        const progress = Math.min(t / p.duration, 1)

        const eased = 1 - Math.pow(1 - progress, 3) // cubic ease-out

        const currentY = p.startY + (p.y - p.startY) * eased

        if (progress < 1) allDone = false

        ctx.fillStyle = color
        ctx.fillRect(p.x, currentY, p.size, p.size)
      })

      if (!allDone) animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [coords, rows, cols, cell, color, sizes, prefersReducedMotion])

  return <canvas ref={canvasRef} className={className} />
}
