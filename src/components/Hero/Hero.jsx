import React from 'react'
import { motion } from 'motion/react'
import {
  UPCODERS_SHAPE_COORDS,
  UPCODERS_SHAPE_ROWS,
  UPCODERS_SHAPE_COLS,
  UPCODERS_SIZES_MAP
} from "patterns/upcodersShape.js";
import DefaultButton from 'components/ui/DefaultButton/DefaultButton.jsx'
import DiagonalPair from 'components/Decor/DiagonalPair.jsx'
import FallingPixelsCanvas from '@/animations/FallingPixelsCanvas/FallingPixelsCanvas.jsx'
import HeroHeadline from 'components/Hero/HeroHeadline/HeroHeadline.jsx'
import { useI18n } from '@/i18n/useI18n.js'

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
        <motion.div
          initial="hidden"
          animate="show"
          custom={0}
          variants={fadeUp}
        >
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
          className="mt-6 max-w-2xl text-gray-300 text-sm sm:text-base md:text-xl"
        >
          {t('hero.description')}
        </motion.p>

        <motion.div initial="hidden" animate="show" custom={0.4} variants={fadeUp}>
          <DefaultButton
            label={t('hero.cta')}
            className="mt-10 inline-flex items-center px-6 py-3 text-sm md:text-base"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })
            }}
          />
        </motion.div>
      </div>

      {/* PIXELS BEHIND EVERYTHING */}
      <div className="pointer-events-none z-0 hidden lg:flex w-full absolute inset-y-0 right-0 items-center justify-end">
        <FallingPixelsCanvas
          coords={UPCODERS_SHAPE_COORDS}
          rows={UPCODERS_SHAPE_ROWS}
          cols={UPCODERS_SHAPE_COLS}
          cell={48}
          color="#5271FF"
          sizes={UPCODERS_SIZES_MAP}
          className=" right-0 top-0 pointer-events-none"
        />
      </div>
    </section>
  )
}
