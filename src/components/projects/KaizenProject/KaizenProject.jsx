import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/useI18n.js'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowLeft,
  ClipboardList,
  RefreshCw,
  CheckCircle2,
  Search,
  MessageSquare,
  Bell,
  TrendingUp,
  Users,
  Smartphone,
  Zap,
  Target,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Contact from 'components/Contact/Contact.jsx'
import DiagonalPair from 'components/Decor/DiagonalPair.jsx'

import screenLogin from 'assets/kaizen/kaizen-login.png'
import screenHomeFeed from 'assets/kaizen/kaizen-home-feed.png'
import screenNewSubmission from 'assets/kaizen/kaizen-new-submission.png'
import screenDetails from 'assets/kaizen/kaizen-submission-details.png'
import screenNotifications from 'assets/kaizen/kaizen-notifications.png'
import screenSurveyForm from 'assets/kaizen/kaizen-survey-form.png'
import screenSurveyResult from 'assets/kaizen/kaizen-survey-result.png'

const SCREENSHOT_IMAGES = [
  screenLogin,
  screenHomeFeed,
  screenNewSubmission,
  screenDetails,
  screenNotifications,
  screenSurveyForm,
  screenSurveyResult,
]

const FEATURE_ICONS = [
  Smartphone,
  ClipboardList,
  RefreshCw,
  CheckCircle2,
  Search,
  MessageSquare,
  Bell,
  TrendingUp,
]

const VALUE_ICONS = [Zap, Target, Eye, TrendingUp]
const SCOPE_ICONS = [Zap, Users, CheckCircle2, Target]

const AUTOPLAY_INTERVAL = 3500

// ── Animation helpers ──────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45, ease: 'easeOut' },
})

const fadeUpInView = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: 0.45, ease: 'easeOut' },
})

// ── Screenshot Carousel ───────────────────────────────────
function ScreenshotCarousel({ images, captions }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(null)
  const total = images.length

  const wrap = (i) => ((i % total) + total) % total

  const next = useCallback(() => setCurrent((i) => wrap(i + 1)), [total])
  const prev = useCallback(() => setCurrent((i) => wrap(i - 1)), [total])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTOPLAY_INTERVAL)
    return () => clearInterval(id)
  }, [paused, next])

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 48) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-center gap-4 md:gap-10">
        {/* Previous — desktop only */}
        <button
          onClick={prev}
          aria-label="Previous screen"
          className="hidden md:block w-[160px] shrink-0 opacity-30 hover:opacity-55 transition-opacity duration-300 cursor-pointer"
        >
          <div className="aspect-[9/19.5] bg-bg-2 border-2 border-bg-3/50 rounded-[28px] overflow-hidden">
            <img
              src={images[wrap(current - 1)]}
              alt={captions[wrap(current - 1)]}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </button>

        {/* Current — center, animated */}
        <div className="w-[240px] md:w-[280px] shrink-0 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full"
            >
              <div className="aspect-[9/19.5] bg-bg-2 border-2 border-primary/30 rounded-[36px] overflow-hidden shadow-[0_12px_56px_rgba(82,113,255,0.18),0_4px_24px_rgba(0,0,0,0.55)]">
                <img
                  src={images[current]}
                  alt={captions[current]}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </AnimatePresence>
          <p className="text-xs text-gray-400 text-center mt-3 h-4">{captions[current]}</p>
        </div>

        {/* Next — desktop only */}
        <button
          onClick={next}
          aria-label="Next screen"
          className="hidden md:block w-[160px] shrink-0 opacity-30 hover:opacity-55 transition-opacity duration-300 cursor-pointer"
        >
          <div className="aspect-[9/19.5] bg-bg-2 border-2 border-bg-3/50 rounded-[28px] overflow-hidden">
            <img
              src={images[wrap(current + 1)]}
              alt={captions[wrap(current + 1)]}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="w-9 h-9 border border-bg-3 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/60 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="w-9 h-9 border border-bg-3 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/60 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to screen ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-primary' : 'w-1.5 bg-bg-3 hover:bg-bg-3/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────
export default function KaizenProject() {
  const { t, language } = useI18n()

  const features = t('kaizen.features.items')
  const valueItems = t('kaizen.value.items')
  const screenshotCaptions = t('kaizen.screenshots.captions')
  const scopeHighlights = t('kaizen.scope.highlights')

  return (
    <div className="text-white">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-bg-1 section-wrapper">
        <div className="section-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-50 pointer-events-none">
            <DiagonalPair size={10} gap={4} />
          </div>

          <motion.div {...fadeUp(0)}>
            <Link
              to={`/${language}/projects`}
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('kaizen.hero.backLabel')}
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-bg-3 text-xs text-gray-400">
              <Smartphone className="w-3 h-3" />
              {t('kaizen.hero.badgeMobile')}
            </span>
            <span className="px-3 py-1 border border-primary/40 text-xs text-primary">
              {t('kaizen.hero.badgeMvp')}
            </span>
          </motion.div>

          <motion.p {...fadeUp(0.17)} className="text-xs tracking-widest text-gray-400 mb-4">
            {t('kaizen.hero.eyebrow')}
          </motion.p>

          <motion.h1
            {...fadeUp(0.23)}
            className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl"
          >
            {t('kaizen.hero.title')}
          </motion.h1>

          <motion.p
            {...fadeUp(0.35)}
            className="mt-6 max-w-2xl text-gray-300 text-lg leading-relaxed"
          >
            {t('kaizen.hero.description')}
          </motion.p>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="bg-bg-2 section-wrapper">
        <div className="section-inner relative overflow-hidden">
          <motion.p {...fadeUpInView(0)} className="text-xs tracking-widest text-gray-400 mb-2">
            {t('kaizen.features.eyebrow')}
          </motion.p>
          <motion.h2 {...fadeUpInView(0.08)} className="text-2xl md:text-3xl font-semibold mb-10">
            {t('kaizen.features.title')}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.isArray(features) &&
              features.map((feature, i) => {
                const Icon = FEATURE_ICONS[i]
                return (
                  <motion.div
                    key={i}
                    {...fadeUpInView(i * 0.07)}
                    className="bg-bg-1 border border-bg-3/40 p-5 hover:border-primary/40 transition-colors"
                  >
                    {Icon && <Icon className="w-5 h-5 text-primary mb-3" />}
                    <h4 className="font-semibold text-sm mb-1.5">{feature.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{feature.description}</p>
                  </motion.div>
                )
              })}
          </div>
        </div>
      </section>

      {/* ── Screenshots ──────────────────────────────────────── */}
      <section className="bg-bg-1 section-wrapper">
        <div className="section-inner relative overflow-hidden">
          <div className="absolute bottom-0 right-0 opacity-40 pointer-events-none">
            <DiagonalPair
              matrix={[
                [0, 1],
                [1, 0],
              ]}
              size={10}
              gap={4}
            />
          </div>

          <motion.p
            {...fadeUpInView(0)}
            className="text-xs tracking-widest text-gray-400 mb-2"
          >
            {t('kaizen.screenshots.eyebrow')}
          </motion.p>
          <motion.h2
            {...fadeUpInView(0.08)}
            className="text-2xl md:text-3xl font-semibold mb-12"
          >
            {t('kaizen.screenshots.title')}
          </motion.h2>

          <motion.div {...fadeUpInView(0.15)}>
            <ScreenshotCarousel images={SCREENSHOT_IMAGES} captions={screenshotCaptions} />
          </motion.div>
        </div>
      </section>

      {/* ── Business Value ───────────────────────────────────── */}
      <section className="bg-bg-2 section-wrapper">
        <div className="section-inner relative overflow-hidden">
          <motion.p {...fadeUpInView(0)} className="text-xs tracking-widest text-gray-400 mb-2">
            {t('kaizen.value.eyebrow')}
          </motion.p>
          <motion.h2 {...fadeUpInView(0.08)} className="text-2xl md:text-3xl font-semibold mb-10">
            {t('kaizen.value.title')}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.isArray(valueItems) &&
              valueItems.map((item, i) => {
                const Icon = VALUE_ICONS[i]
                return (
                  <motion.div key={i} {...fadeUpInView(i * 0.1)} className="flex gap-4">
                    {Icon && (
                      <div className="shrink-0 w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                )
              })}
          </div>
        </div>
      </section>

      {/* ── Product Philosophy ───────────────────────────────── */}
      <section className="bg-bg-1 section-wrapper">
        <div className="section-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-45 pointer-events-none">
            <DiagonalPair size={10} gap={4} />
          </div>

          <motion.p {...fadeUpInView(0)} className="text-xs tracking-widest text-gray-400 mb-2">
            {t('kaizen.scope.eyebrow')}
          </motion.p>
          <motion.h2 {...fadeUpInView(0.08)} className="text-2xl md:text-3xl font-semibold mb-4">
            {t('kaizen.scope.title')}
          </motion.h2>
          <motion.p
            {...fadeUpInView(0.15)}
            className="text-gray-300 mb-10 max-w-2xl leading-relaxed"
          >
            {t('kaizen.scope.description')}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.isArray(scopeHighlights) &&
              scopeHighlights.map((item, i) => {
                const Icon = SCOPE_ICONS[i]
                return (
                  <motion.div
                    key={i}
                    {...fadeUpInView(0.1 + i * 0.08)}
                    className="bg-bg-2 border border-bg-3/40 p-6 hover:border-primary/30 transition-colors"
                  >
                    {Icon && (
                      <div className="w-9 h-9 bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                  </motion.div>
                )
              })}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <Contact />
    </div>
  )
}
