import React from 'react'
import { motion } from 'motion/react'
import { useI18n } from '@/i18n/useI18n.js'
import { fadeUpInView } from './index.js'

export default function OfferFaq() {
  const { t } = useI18n()
  const items = t('offerPage.faq.items') || []

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-bg-2 text-white section-wrapper">
      <div className="section-inner grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <motion.p
            {...fadeUpInView(0)}
            className="text-xs tracking-widest text-gray-400 uppercase mb-3"
          >
            {t('offerPage.faq.eyebrow')}
          </motion.p>
          <motion.h2
            {...fadeUpInView(0.06)}
            id="faq-title"
            className="text-3xl md:text-4xl font-semibold leading-tight"
          >
            {t('offerPage.faq.title')}
          </motion.h2>
        </div>

        {/* Natywne <details>: odpowiedzi są w HTML z prerenderu, a przeglądarka
            sama obsługuje klawiaturę i czytniki ekranu. */}
        <motion.div {...fadeUpInView(0.1)} className="lg:col-span-8 border-t border-bg-3/70">
          {items.map((item) => (
            <details key={item.question} className="group border-b border-bg-3/70">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-medium transition-colors duration-200 hover:text-primary-light [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="relative w-4 h-4 shrink-0 transition-transform duration-300 ease-[var(--ease-out-quart)] group-open:rotate-45"
                >
                  <span className="absolute top-1/2 left-0 right-0 h-px bg-current -translate-y-1/2" />
                  <span className="absolute top-0 bottom-0 left-1/2 w-px bg-current -translate-x-1/2" />
                </span>
              </summary>
              <p className="pb-6 pr-10 text-gray-400 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
