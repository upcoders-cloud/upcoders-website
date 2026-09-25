import React from 'react'
import { motion } from 'motion/react'
import { ArrowDownRight } from 'lucide-react'
import DefaultButton from 'components/ui/DefaultButton/DefaultButton.jsx'
import ZigZag5 from 'components/Decor/ZigZag5.jsx'
import { useBooking } from '@/components/Booking/useBooking.js'
import { useI18n } from '@/i18n/useI18n.js'
import WriteToUsLink from './WriteToUsLink.jsx'
import { OFFER_SERVICES, fadeUp } from './index.js'

export default function OfferHero() {
  const { t } = useI18n()
  const { openBooking, isBookingAvailable } = useBooking()

  return (
    <section className="bg-bg-1 text-white section-wrapper relative overflow-hidden">
      <div className="section-inner grid lg:grid-cols-12 gap-14 lg:gap-10 items-end">
        <div className="lg:col-span-7">
          <motion.p {...fadeUp(0)} className="text-xs tracking-widest text-gray-400 mb-4 uppercase">
            {t('offerPage.hero.eyebrow')}
          </motion.p>
          <motion.h1
            {...fadeUp(0.08)}
            className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-3xl"
          >
            {t('offerPage.hero.title')}
          </motion.h1>
          <motion.p
            {...fadeUp(0.16)}
            className="mt-6 max-w-xl text-gray-400 text-base md:text-lg leading-relaxed"
          >
            {t('offerPage.hero.description')}
          </motion.p>
          <motion.div
            {...fadeUp(0.24)}
            className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5"
          >
            <DefaultButton label={t('offerPage.hero.cta')} onClick={openBooking} />
            {isBookingAvailable ? (
              <WriteToUsLink />
            ) : (
              <p className="text-sm text-gray-400">{t('offerPage.hero.note')}</p>
            )}
          </motion.div>
          <div className="hidden lg:block mt-16">
            <ZigZag5 size={12} className="opacity-90" />
          </div>
        </div>

        <motion.nav
          {...fadeUp(0.3)}
          aria-label={t('offerPage.hero.indexLabel')}
          className="lg:col-span-5"
        >
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
            {t('offerPage.hero.indexLabel')}
          </p>
          <ol className="border-t border-bg-3/70">
            {OFFER_SERVICES.map(({ anchor, key }, i) => (
              <li key={anchor} className="border-b border-bg-3/70">
                <a
                  href={`#${anchor}`}
                  className="group flex items-center gap-4 py-4 transition-colors duration-200 hover:text-primary-light"
                >
                  <span className="text-xs font-semibold text-primary-light tabular-nums w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-medium">{t(`offerPage.services.${key}.title`)}</span>
                  <ArrowDownRight
                    aria-hidden="true"
                    className="w-4 h-4 text-gray-500 transition-transform duration-200 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-primary-light"
                  />
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>
      </div>
    </section>
  )
}
