import React, { useRef, useState, useEffect } from 'react'
import { useI18n } from '@/i18n/useI18n.js'
import { Lightbulb, ClipboardCheck, RefreshCw, MousePointer } from 'lucide-react'
import { motion, useScroll } from 'motion/react'
import DiagonalPair from 'components/Decor/DiagonalPair.jsx'
import ZigZag5 from 'components/Decor/ZigZag5.jsx'

const STEP_ICONS = [Lightbulb, ClipboardCheck, RefreshCw, MousePointer]

// ── Shared ─────────────────────────────────────────────
const ICON = 40 // w-10 = 40px

// ── Desktop wave (horizontal) ──────────────────────────
const D_H = 460
const D_AMP = 0.24
const D_CY = D_H / 2
const D_NUM_H = 104       // text-[6.5rem]
const D_GAP = 8           // my-2
const D_SVG_W = 1000
const D_ICON_OFFSET = D_NUM_H + D_GAP + ICON / 2

const dWaveY = (i) => D_CY - D_AMP * D_H * Math.cos(i * Math.PI)
const dWaveXPct = (i, n) => ((i * 2 + 1) / (n * 2)) * 100

function buildDesktopPath(n) {
  const pts = Array.from({ length: n }, (_, i) => ({
    x: (dWaveXPct(i, n) / 100) * D_SVG_W,
    y: dWaveY(i),
  }))
  return pts.reduce((d, pt, i) => {
    if (i === 0) return `M${pt.x},${pt.y}`
    const prev = pts[i - 1]
    const mx = (prev.x + pt.x) / 2
    return `${d} C${mx},${prev.y} ${mx},${pt.y} ${pt.x},${pt.y}`
  }, '')
}

// ── Mobile wave (vertical / transposed sine) ───────────
const M_H = 850
const M_AMP_X = 32          // px offset from center (±)
const M_SVG_PX_W = 100      // SVG pixel width (covers wave area)
const M_SVG_CX = M_SVG_PX_W / 2 // wave center in SVG coords = 50

// offset in px from screen center: even→left, odd→right
const mWaveXOffset = (i) => M_AMP_X * Math.cos(i * Math.PI)
const mWaveY = (i, n) => ((i * 2 + 1) / (n * 2)) * M_H

// SVG coordinates (center at 50)
const mWaveXSvg = (i) => M_SVG_CX + mWaveXOffset(i)

function buildMobilePath(n) {
  const pts = Array.from({ length: n }, (_, i) => ({
    x: mWaveXSvg(i),
    y: mWaveY(i, n),
  }))
  return pts.reduce((d, pt, i) => {
    if (i === 0) return `M${pt.x},${pt.y}`
    const prev = pts[i - 1]
    const my = (prev.y + pt.y) / 2
    return `${d} C${prev.x},${my} ${pt.x},${my} ${pt.x},${pt.y}`
  }, '')
}

// ── Component ──────────────────────────────────────────
export default function HowWeWork() {
  const { t } = useI18n()
  const steps = t('howWeWork.steps')
  const n = steps.length

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['center 0.8', 'center center'],
  })

  const [activeStep, setActiveStep] = useState(-1)
  const activeStepRef = useRef(-1)

  const mobileRef = useRef(null)
  const [mobileHeight, setMobileHeight] = useState(M_H)

  useEffect(() => {
    const el = mobileRef.current
    if (!el) return
    const stepEls = el.querySelectorAll('[data-mobile-step]')
    if (!stepEls.length) return
    const containerTop = el.getBoundingClientRect().top
    let maxBottom = 0
    stepEls.forEach((s) => {
      const bottom = s.getBoundingClientRect().bottom - containerTop
      if (bottom > maxBottom) maxBottom = bottom
    })
    setMobileHeight(Math.max(M_H, maxBottom + 16))
  }, [steps])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      let current = -1
      for (let i = 0; i < n; i++) {
        const threshold = n > 1 ? i / (n - 1) : 0
        if (latest >= threshold - 0.02) current = i
      }
      if (current !== activeStepRef.current) {
        activeStepRef.current = current
        setActiveStep(current)
      }
    })
    return unsubscribe
  }, [scrollYProgress, n])

  return (
    <section
      id="how-we-work"
      ref={sectionRef}
      className="bg-bg-1 text-white section-wrapper relative overflow-hidden"
    >
      <div className="section-inner relative">
        <div className="absolute top-0 right-0 opacity-70">
          <DiagonalPair size={14} gap={5} />
        </div>
        <div className="text-center mb-0 md:mb-16">
          <h3 className="text-xs tracking-widest text-gray-400 mb-2">{t('howWeWork.eyebrow')}</h3>
          <h2 className="text-2xl md:text-[28px] font-semibold">{t('howWeWork.title')}</h2>
        </div>

        {/* ── Desktop ── */}
        <div className="hidden md:block relative" style={{ height: D_H }}>
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${D_SVG_W} ${D_H}`}
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d={buildDesktopPath(n)}
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              opacity="0.25"
            />
            <motion.path
              d={buildDesktopPath(n)}
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>

          {steps.map((step, i) => {
            const isActive = i <= activeStep
            return (
              <div
                key={i}
                className="absolute flex flex-col items-center text-center w-[25%] px-4"
                style={{
                  left: `${dWaveXPct(i, n)}%`,
                  top: dWaveY(i) - D_ICON_OFFSET,
                  transform: 'translateX(-50%)',
                }}
              >
                <span
                  className={`text-[6.5rem] font-bold leading-none select-none transition-all duration-700 ${
                    isActive ? 'text-primary/70' : 'text-bg-3'
                  }`}
                  style={{ textShadow: isActive ? '0 0 40px currentColor' : 'none' }}
                >
                  {i + 1}
                </span>
                {React.createElement(STEP_ICONS[i], {
                  className: `w-10 h-10 rounded-xl bg-bg-2 border border-bg-3/50 p-2 my-2 shrink-0 text-primary ${
                    STEP_ICONS[i] === MousePointer ? 'rotate-90' : ''
                  }`,
                  fill: STEP_ICONS[i] === MousePointer ? 'currentColor' : 'none',
                })}
                <h4 className="font-semibold mb-1">{step.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[220px] ">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* ── Mobile — transposed sine, centered on 50% ── */}
        <div className="md:hidden relative" ref={mobileRef} style={{ height: mobileHeight }}>
          {/* SVG centered at 50% — its center (50) maps to screen center */}
          <svg
            className="absolute top-0 pointer-events-none"
            style={{ width: M_SVG_PX_W, height: M_H, left: '50%', transform: 'translateX(-50%)' }}
            viewBox={`0 0 ${M_SVG_PX_W} ${M_H}`}
            fill="none"
          >
            <path
              d={buildMobilePath(n)}
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              opacity="0.25"
            />
            <motion.path
              d={buildMobilePath(n)}
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>

          {steps.map((step, i) => {
            const offset = mWaveXOffset(i)
            const y = mWaveY(i, n)
            const isRight = i % 2 === 0
            const isActive = i <= activeStep

            const pos = isRight
              ? { left: `calc(50% + ${offset - ICON / 2}px)` }
              : { right: `calc(50% + ${-offset - ICON / 2}px)` }

            return (
              <div
                key={i}
                data-mobile-step
                className={`absolute flex items-start gap-3 ${isRight ? 'flex-row' : 'flex-row-reverse'}`}
                style={{ ...pos, top: y - ICON / 2 }}
              >
                {React.createElement(STEP_ICONS[i], {
                  className: `w-10 h-10 shrink-0 rounded-xl bg-bg-2 border border-bg-3/50 p-2 text-primary ${
                    STEP_ICONS[i] === MousePointer ? 'rotate-90' : ''
                  }`,
                  fill: STEP_ICONS[i] === MousePointer ? 'currentColor' : 'none',
                })}
                <div className={`max-w-[calc(50vw-60px)] ${isRight ? '' : 'text-right'}`}>
                  <span
                    className={`text-3xl font-bold leading-none select-none transition-all duration-700 ${
                      isActive ? 'text-primary/70' : 'text-bg-3'
                    }`}
                    style={{ textShadow: isActive ? '0 0 20px currentColor' : 'none' }}
                  >
                    {i + 1}
                  </span>
                  <h4 className="font-semibold mt-1 mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="absolute bottom-0 left-0 opacity-70 hidden md:block">
          <DiagonalPair
            matrix={[
              [0, 1],
              [1, 0],
            ]}
            size={14}
            gap={5}
          />
        </div>
      </div>
    </section>
  )
}
