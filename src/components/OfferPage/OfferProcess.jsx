import React from 'react'
import { motion } from 'motion/react'
import { useI18n } from '@/i18n/useI18n.js'
import { fadeUpInView } from './index.js'

export default function OfferProcess() {
  const { t } = useI18n()
  const steps = t('offerPage.process.steps') || []
  const partnership = t('offerPage.process.partnership.items') || []

  return (
    <section
      id="collaboration"
      aria-labelledby="collaboration-title"
      className="bg-bg-1 text-white section-wrapper"
    >
      <div className="section-inner">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <motion.p
              {...fadeUpInView(0)}
              className="text-xs tracking-widest text-gray-400 uppercase mb-3"
            >
              {t('offerPage.process.eyebrow')}
            </motion.p>
            <motion.h2
              {...fadeUpInView(0.06)}
              id="collaboration-title"
              className="text-3xl md:text-4xl font-semibold leading-tight"
            >
              {t('offerPage.process.title')}
            </motion.h2>
            <motion.p {...fadeUpInView(0.12)} className="mt-5 text-gray-400 leading-relaxed">
              {t('offerPage.process.description')}
            </motion.p>

            <motion.div
              {...fadeUpInView(0.18)}
              className="mt-10 border border-bg-3 bg-bg-2 p-6 shadow-[3px_3px_0px_black]"
            >
              <h3 className="text-xl font-semibold">{t('offerPage.process.quoteTitle')}</h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                {t('offerPage.process.pricingNote')}
              </p>
              <p className="mt-5 pt-5 border-t border-bg-3 text-sm text-gray-300 leading-relaxed">
                {t('offerPage.process.followUp')}
              </p>
            </motion.div>
          </div>

          <ol className="lg:col-span-7 relative">
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                {...fadeUpInView(0.08 * i)}
                className="relative flex gap-5 pb-10 last:pb-0"
              >
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[19px] top-11 bottom-1 w-px bg-bg-3"
                  />
                )}
                <span className="relative z-10 flex w-10 h-10 shrink-0 items-center justify-center bg-primary text-sm font-bold tabular-nums shadow-[3px_3px_0px_black]">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-20 md:mt-24">
          <motion.h3 {...fadeUpInView(0)} className="text-2xl font-semibold mb-8">
            {t('offerPage.process.partnership.title')}
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-5">
            {partnership.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUpInView(0.08 * i)}
                className="border-t-2 border-primary bg-bg-2 p-6"
              >
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
