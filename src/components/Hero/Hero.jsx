import React from 'react'
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

export default function Hero() {
  const { t, language } = useI18n()
  const typewriterWords = t('hero.title.words')

  return (
    <>
      <section className="relative overflow-hidden bg-bg-1 text-white section-wrapper">
        <div className="section-inner relative z-10">
          <DiagonalPair className="relative -left-4 -top-6" gap={0} />
          <HeroHeadline
            key={language}
            line1={t('hero.title.line1')}
            line2Prefix={t('hero.title.line2Prefix')}
            line2PrefixDone={t('hero.title.line2PrefixDone')}
            words={typewriterWords}
          />

          <p className="mt-6 max-w-2xl text-gray-300 text-sm sm:text-base md:text-xl">
            {t('hero.description')}
          </p>

          <DefaultButton
            label={t('hero.cta')}
            className="mt-10 inline-flex items-center px-6 py-3 text-sm md:text-base"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })
            }}
          />
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
    </>
  )
}
