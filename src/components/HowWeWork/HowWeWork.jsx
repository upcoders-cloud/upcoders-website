import React, { useRef, useState, useEffect } from 'react'
import { useI18n } from '@/i18n/useI18n.js'
import { Lightbulb, ClipboardCheck, RefreshCw, MousePointer, Check } from 'lucide-react'
import { motion, useMotionValue, useScroll, useTransform } from 'motion/react'
import DiagonalPair from 'components/Decor/DiagonalPair.jsx'
import DefaultButton from 'components/ui/DefaultButton/DefaultButton.jsx'
import { useGoToContact } from '@/hooks/useGoToContact/useGoToContact.js'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion/usePrefersReducedMotion.js'

const STEP_ICONS = [Lightbulb, ClipboardCheck, RefreshCw, MousePointer]

// Na desktopie kroki stoją w czterech kolumnach, a co drugi jest obniżony o
// D_DROP. Linia w SVG przechodzi przez środki ikon, więc jej punkty wynikają
// z wysokości cyfry (6.5rem, leading-none), odstępu my-2 i połowy ikony (w-10).
// D_DROP musi odpowiadać klasie lg:mt-[220px] na nieparzystych krokach.
const D_ICON_Y = 104 + 8 + 20
const D_DROP = 220
const D_SVG_W = 1000
const D_SVG_H = D_ICON_Y * 2 + D_DROP
// Połowa szerokości zakrętu (w jednostkach viewBox, 1000 = szerokość listy).
// Linia biegnie poziomo na wysokości ikon i zmienia poziom tylko w pasie
// między kolumnami, więc nie przecina tekstu kroków. Tekst jest o 2.25rem
// węższy z każdej strony niż kolumna, a zakręt ma najwyżej ~29px w każdą stronę.
const D_BEND = 25

function buildDesktopPath(n) {
  const pts = Array.from({ length: n }, (_, i) => ({
    x: ((i * 2 + 1) / (n * 2)) * D_SVG_W,
    y: D_ICON_Y + (i % 2) * D_DROP,
  }))
  return pts.reduce((d, pt, i) => {
    if (i === 0) return `M${pt.x},${pt.y}`
    const prev = pts[i - 1]
    const mx = (prev.x + pt.x) / 2
    return `${d} L${mx - D_BEND},${prev.y} C${mx},${prev.y} ${mx},${pt.y} ${mx + D_BEND},${pt.y} L${pt.x},${pt.y}`
  }, '')
}

// Odcinek pionowej linii na mobile między ikoną kroku `index` a następną.
// Wypełnia się w swojej części postępu przewijania.
function MobileSegment({ progress, index, count }) {
  const scaleY = useTransform(progress, [index / (count - 1), (index + 1) / (count - 1)], [0, 1])
  return (
    <span aria-hidden="true" className="lg:hidden absolute left-5 top-10 bottom-0 w-px bg-bg-3">
      <motion.span className="absolute inset-0 origin-top bg-primary" style={{ scaleY }} />
    </span>
  )
}

export default function HowWeWork() {
  const { t } = useI18n()
  const goToContact = useGoToContact()
  const prefersReducedMotion = usePrefersReducedMotion()
  const steps = t('howWeWork.steps')
  const highlights = t('howWeWork.highlights')
  const n = steps.length

  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.75', 'end 0.6'],
  })
  // Przy ograniczonym ruchu linia jest od razu narysowana, a kroki aktywne.
  const fullProgress = useMotionValue(1)
  const progress = prefersReducedMotion ? fullProgress : scrollYProgress

  const [activeStep, setActiveStep] = useState(-1)

  useEffect(() => {
    const update = (latest) => {
      let current = -1
      for (let i = 0; i < n; i++) {
        const threshold = n > 1 ? i / (n - 1) : 0
        if (latest >= threshold - 0.02) current = i
      }
      setActiveStep(current)
    }
    update(progress.get())
    return progress.on('change', update)
  }, [progress, n])

  return (
    <section
      id="how-we-work"
      aria-labelledby="how-we-work-title"
      className="bg-bg-1 text-white section-wrapper relative overflow-hidden"
    >
      <div className="section-inner relative">
        <div aria-hidden="true" className="absolute top-0 right-0 opacity-70">
          <DiagonalPair size={14} gap={5} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">
            {t('howWeWork.eyebrow')}
          </p>
          <h2 id="how-we-work-title" className="text-3xl md:text-4xl font-semibold">
            {t('howWeWork.title')}
          </h2>
        </motion.div>

        <div className="relative">
          <svg
            aria-hidden="true"
            className="hidden lg:block absolute inset-x-0 top-0 w-full pointer-events-none"
            style={{ height: D_SVG_H }}
            viewBox={`0 0 ${D_SVG_W} ${D_SVG_H}`}
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
              style={{ pathLength: progress }}
            />
          </svg>

          <ol ref={listRef} className="relative lg:grid lg:grid-cols-4">
            {steps.map((step, i) => {
              const isActive = i <= activeStep
              const Icon = STEP_ICONS[i % STEP_ICONS.length]
              const isPointer = Icon === MousePointer
              return (
                <li
                  key={step.title}
                  className={`relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-10 last:pb-0 lg:flex lg:flex-col lg:items-center lg:pb-0 lg:text-center ${
                    i % 2 === 1 ? 'lg:mt-[220px]' : ''
                  }`}
                >
                  {i < n - 1 && <MobileSegment progress={progress} index={i} count={n} />}
                  <span
                    aria-hidden="true"
                    className={`col-start-2 row-start-1 text-3xl lg:text-[6.5rem] font-bold leading-none select-none transition-all duration-700 ${
                      isActive ? 'text-primary-light/80' : 'text-bg-3'
                    }`}
                    style={{ textShadow: isActive ? '0 0 40px currentColor' : 'none' }}
                  >
                    {i + 1}
                  </span>
                  <Icon
                    aria-hidden="true"
                    className={`relative col-start-1 row-start-1 row-span-3 w-10 h-10 lg:my-2 shrink-0 rounded-xl bg-bg-2 border border-bg-3/50 p-2 text-primary-light ${
                      isPointer ? 'rotate-90' : ''
                    }`}
                    fill={isPointer ? 'currentColor' : 'none'}
                  />
                  <h3 className="col-start-2 mt-1 mb-1 font-semibold text-lg lg:text-base lg:mt-0 lg:max-w-[min(13rem,calc(100%-4.5rem))]">
                    {step.title}
                  </h3>
                  <p className="col-start-2 text-sm text-gray-400 leading-relaxed lg:max-w-[min(13rem,calc(100%-4.5rem))]">
                    {step.description}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-20 flex flex-col items-center gap-8"
        >
          <ul className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-x-8 gap-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                <Check aria-hidden="true" className="w-4 h-4 shrink-0 text-primary-light" />
                {item}
              </li>
            ))}
          </ul>
          <DefaultButton
            label={t('howWeWork.cta')}
            onClick={goToContact}
            className="px-6 py-3 text-sm md:text-base"
          />
        </motion.div>

        <div aria-hidden="true" className="absolute bottom-0 left-0 opacity-70 hidden md:block">
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
