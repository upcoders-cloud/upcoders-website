import React from 'react'
import { motion } from 'motion/react'
import DefaultButton from 'components/ui/DefaultButton/DefaultButton.jsx'
import DiagonalPair from 'components/Decor/DiagonalPair.jsx'
import { useGoToContact } from '@/hooks/useGoToContact/useGoToContact.js'
import { useI18n } from '@/i18n/useI18n.js'
import { fadeUpInView } from './index.js'

export default function OfferCta() {
  const { t } = useI18n()
  const goToContact = useGoToContact()

  return (
    <section className="bg-bg-1 text-white section-wrapper relative overflow-hidden">
      <div className="section-inner">
        <motion.div
          {...fadeUpInView(0)}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <DiagonalPair size={12} gap={4} className="mb-8" />
            <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
              {t('offerPage.cta.eyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight max-w-xl">
              {t('offerPage.cta.headline')}
            </h2>
            <p className="mt-4 text-gray-400 max-w-lg text-sm md:text-base leading-relaxed">
              {t('offerPage.cta.sub')}
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col lg:flex-row sm:items-center md:items-end lg:items-center gap-4">
            <DefaultButton label={t('offerPage.cta.button')} onClick={goToContact} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
