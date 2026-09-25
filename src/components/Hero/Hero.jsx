import React from 'react'
import { motion } from 'motion/react'
import {
  UPCODERS_SHAPE_COORDS,
  UPCODERS_SHAPE_ROWS,
  UPCODERS_SHAPE_COLS,
  UPCODERS_SIZES_MAP,
} from 'patterns/upcodersShape.js'
import DiagonalPair from 'components/Decor/DiagonalPair.jsx'
import FallingPixelsCanvas from '@/animations/FallingPixelsCanvas/FallingPixelsCanvas.jsx'
import HeroHeadline from 'components/Hero/HeroHeadline/HeroHeadline.jsx'
import { useI18n } from '@/i18n/useI18n.js'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion/usePrefersReducedMotion.js'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const { t, language } = useI18n()
  const typewriterWords = t('hero.title.words')
  const prefersReducedMotion = usePrefersReducedMotion()

  // Zwykły link do #contact działa także bez JS. Płynne przewijanie dokładamy
  // tylko wtedy, gdy sekcja kontaktu faktycznie jest na stronie.
  const handleCtaClick = (event) => {
    const contact = document.getElementById('contact')
    if (!contact) return
    event.preventDefault()
    contact.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section className="relative overflow-hidden bg-bg-1 text-white section-wrapper">
      {/* Subtle radial gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 40%, rgba(82,113,255,0.18), transparent 60%)',
        }}
      />
      {/* Subtle grain texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="section-inner relative z-10">
        <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp}>
          <DiagonalPair className="relative -left-4 -top-6" gap={0} />
        </motion.div>

        <motion.div initial="hidden" animate="show" custom={0.1} variants={fadeUp}>
          <HeroHeadline
            key={language}
            line1={t('hero.title.line1')}
            line2Prefix={t('hero.title.line2Prefix')}
            line2PrefixDone={t('hero.title.line2PrefixDone')}
            words={typewriterWords}
          />
        </motion.div>

        <motion.p
          initial="hidden"
          animate="show"
          custom={0.25}
          variants={fadeUp}
          className="mt-6 max-w-2xl lg:max-w-md xl:max-w-xl text-gray-300 text-base md:text-xl"
        >
          {t('hero.description')}
        </motion.p>

        <motion.div initial="hidden" animate="show" custom={0.4} variants={fadeUp}>
          <a
            href="#contact"
            onClick={handleCtaClick}
            className="group mt-10 inline-flex items-center px-6 py-3 text-sm md:text-base font-medium bg-[#3F5EF0] text-white shadow-[3px_3px_0px_black] transition-[transform,box-shadow,background-color] duration-200 ease-[var(--ease-out-quart)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-[#4868F8] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <span className="relative inline-block transition-transform duration-200 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5">
              {t('hero.cta')}
            </span>
          </a>
        </motion.div>
      </div>

      {/* Pikselowe logo zajmuje tylko prawą część sekcji, żeby nie wchodzić pod nagłówek. */}
      <div
        aria-hidden="true"
        className="pointer-events-none z-0 hidden lg:flex absolute inset-y-0 right-0 w-[38vw] max-w-[672px] items-center justify-end"
      >
        <FallingPixelsCanvas
          coords={UPCODERS_SHAPE_COORDS}
          rows={UPCODERS_SHAPE_ROWS}
          cols={UPCODERS_SHAPE_COLS}
          cell={48}
          color="#5271FF"
          sizes={UPCODERS_SIZES_MAP}
          className="w-full h-auto"
        />
      </div>
    </section>
  )
}
