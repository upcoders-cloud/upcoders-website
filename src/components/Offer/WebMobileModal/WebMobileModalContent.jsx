import React from 'react'
import { motion } from 'motion/react'
import DefaultButton from 'components/ui/DefaultButton/DefaultButton.jsx'
import { useI18n } from '@/i18n/useI18n.js'

const TECH_TAGS = [
  'React',
  'Next.js',
  'React Native',
  'Node.js',
  'TypeScript',
  'PostgreSQL',
  'WordPress',
  'Webflow',
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4, ease: 'easeOut' },
})

export default function WebMobileModalContent({ onContact }) {
  const { t } = useI18n()
  const steps = t('offer.items.webMobile.cta.modal.steps') || []

  return (
    <div className="space-y-7">
      {/* Headline */}
      <motion.div {...fadeUp(0)}>
        <p className="text-xl md:text-2xl font-semibold leading-snug">
          {t('offer.items.webMobile.cta.modal.headline')}
        </p>
        <p className="text-gray-400 mt-2 text-sm md:text-base leading-relaxed">
          {t('offer.items.webMobile.cta.modal.subline')}
        </p>
      </motion.div>

      {/* 24h badge + pricing note */}
      <motion.div
        {...fadeUp(0.1)}
        className="flex items-center gap-5 rounded-lg border border-bg-3 bg-bg-2 p-4"
      >
        <div className="flex flex-col items-center shrink-0 text-center">
          <motion.span
            className="text-5xl font-black text-primary leading-none"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            24h
          </motion.span>
          <span className="text-[11px] text-gray-400 mt-1 max-w-[80px] leading-tight">
            {t('offer.items.webMobile.cta.modal.badgeSub')}
          </span>
        </div>

        <div className="w-px self-stretch bg-bg-3 shrink-0" />

        <p className="text-sm text-gray-300 leading-relaxed">
          {t('offer.items.webMobile.cta.modal.pricingNote')}
        </p>
      </motion.div>

      {/* Steps */}
      <motion.div {...fadeUp(0.2)} className="space-y-3">
        {steps.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28 + i * 0.1, duration: 0.35, ease: 'easeOut' }}
            className="flex items-start gap-3"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold mt-0.5">
              {i + 1}
            </span>
            <p className="text-sm">
              <span className="font-medium text-white">{item.step}</span>
              <span className="text-gray-400"> — {item.desc}</span>
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Tech tags */}
      <motion.div {...fadeUp(0.55)}>
        <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-2">
          {t('offer.items.webMobile.cta.modal.tagsLabel')}
        </p>
        <div className="flex flex-wrap gap-2">
          {TECH_TAGS.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.04, duration: 0.25 }}
              className="px-2.5 py-1 text-xs rounded border border-bg-3 text-gray-300"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div {...fadeUp(0.75)}>
        <DefaultButton label={t('offer.items.webMobile.cta.modal.cta')} onClick={onContact} />
      </motion.div>
    </div>
  )
}
