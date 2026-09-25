'use client'

import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion/usePrefersReducedMotion.js'

const CLICK_HEX = '#758DFF'
const RIPPLE_DURATION = 3000

function parseColor(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}

const InteractiveDots = ({
  backgroundColor = '#252527',
  dotColor = '#666666',
  gridSpacing = 30,
  animationSpeed = 0.005,
  removeWaveLine = true,
}) => {
  const canvasRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const [red, green, blue] = parseColor(dotColor)
    const [clickRed, clickGreen, clickBlue] = parseColor(CLICK_HEX)
    const mouse = { x: 0, y: 0 }
    let dots = []
    let ripples = []
    let time = 0
    let animationFrameId = null
    let isInView = typeof IntersectionObserver === 'undefined'

    function draw() {
      const currentTime = Date.now()
      ripples = ripples.filter((ripple) => currentTime - ripple.time < RIPPLE_DURATION)
      const canvasWidth = canvas.clientWidth
      const canvasHeight = canvas.clientHeight
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      dots.forEach((dot) => {
        const mouseDistance = Math.hypot(dot.x - mouse.x, dot.y - mouse.y)
        const mouseInfluence = prefersReducedMotion ? 0 : Math.max(0, 1 - mouseDistance / 150)
        let rippleInfluence = 0

        ripples.forEach((ripple) => {
          const age = currentTime - ripple.time
          const distance = Math.hypot(dot.x - ripple.x, dot.y - ripple.y)
          const proximity = Math.abs(distance - (age / RIPPLE_DURATION) * 300)
          if (proximity < 60) {
            rippleInfluence += (1 - age / RIPPLE_DURATION) * ripple.intensity * (1 - proximity / 60)
          }
        })
        rippleInfluence = Math.min(rippleInfluence, 2)

        const totalInfluence = mouseInfluence + rippleInfluence
        const dotSize = 2 + totalInfluence * 6 + Math.sin(time + dot.phase) * 0.5
        const opacity = Math.max(
          0.3,
          0.6 + totalInfluence * 0.4 + Math.abs(Math.sin(time * 0.5 + dot.phase)) * 0.1
        )
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2)
        ctx.fillStyle =
          rippleInfluence > 0.05
            ? `rgba(${clickRed}, ${clickGreen}, ${clickBlue}, ${opacity})`
            : `rgba(${red}, ${green}, ${blue}, ${opacity})`
        ctx.fill()
      })

      if (!removeWaveLine) {
        ripples.forEach((ripple) => {
          const progress = (currentTime - ripple.time) / RIPPLE_DURATION
          const alpha = (1 - progress) * 0.3 * ripple.intensity
          ctx.beginPath()
          ctx.strokeStyle = `rgba(100, 100, 100, ${alpha})`
          ctx.lineWidth = 2
          ctx.arc(ripple.x, ripple.y, progress * 300, 0, 2 * Math.PI)
          ctx.stroke()

          const innerAlpha = (1 - progress) * 0.2 * ripple.intensity
          ctx.beginPath()
          ctx.strokeStyle = `rgba(120, 120, 120, ${innerAlpha})`
          ctx.lineWidth = 1
          ctx.arc(ripple.x, ripple.y, progress * 150, 0, 2 * Math.PI)
          ctx.stroke()
        })
      }
    }

    function animate() {
      animationFrameId = null
      time += animationSpeed
      draw()
      start()
    }

    function start() {
      if (!prefersReducedMotion && isInView && !document.hidden && animationFrameId === null) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    function stop() {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
    }

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      dots = []
      for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
        for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
          dots.push({ x, y, phase: Math.random() * Math.PI * 2 })
        }
      }
      draw()
    }

    function handleMouseMove(event) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = event.clientX - rect.left
      mouse.y = event.clientY - rect.top
    }

    function handleMouseDown(event) {
      const rect = canvas.getBoundingClientRect()
      ripples.push({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        time: Date.now(),
        intensity: 2,
      })
    }

    function handleVisibilityChange() {
      if (document.hidden) stop()
      else start()
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let observer
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(([entry]) => {
        isInView = entry.isIntersecting
        if (isInView) start()
        else stop()
      })
      observer.observe(canvas)
    }

    if (!prefersReducedMotion) {
      window.addEventListener('pointermove', handleMouseMove, { passive: true })
      window.addEventListener('pointerdown', handleMouseDown, { passive: true })
      document.addEventListener('visibilitychange', handleVisibilityChange)
      start()
    }

    return () => {
      stop()
      observer?.disconnect()
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('pointermove', handleMouseMove)
      window.removeEventListener('pointerdown', handleMouseDown)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [backgroundColor, dotColor, gridSpacing, animationSpeed, removeWaveLine, prefersReducedMotion])

  return (
    <div
      className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden"
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default InteractiveDots
