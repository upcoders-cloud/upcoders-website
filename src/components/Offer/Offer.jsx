import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import ZigZag5 from 'components/Decor/ZigZag5.jsx'
import { OFFER_ITEMS } from './index.js'
import Accordion from 'components/Offer/Accordion/Accordion.jsx'
import { useI18n } from '@/i18n/useI18n.js'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Offer() {
  const { t, language } = useI18n()
  const offerPath = `/${language}/offer`

  const translatedItems = OFFER_ITEMS.map((item) => ({
    id: item.id,
    anchor: item.anchor,
    title: t(item.titleKey),
    content: t(item.contentKey),
    link: { href: `${offerPath}#${item.anchor}`, label: t('offer.learnMore') },
  }))

  return (
    <section id="offer" className="relative bg-bg-2 text-white section-wrapper overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 section-inner">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-xs tracking-widest text-gray-400 mb-2">{t('offer.eyebrow')}</h3>
          <h2 className="text-2xl md:text-[28px] font-semibold mb-4">{t('offer.title')}</h2>

          <p className="text-gray-400 text-sm md:text-base">{t('offer.paragraph1')}</p>

          <p className="text-gray-400 text-sm md:text-base mt-4">{t('offer.paragraph2')}</p>

          <Link
            to={offerPath}
            className="group mt-8 inline-flex items-center gap-2 border border-primary px-5 py-2.5 text-sm font-medium text-white shadow-[3px_3px_0px_black] transition-[transform,box-shadow,background-color] duration-200 ease-[var(--ease-out-quart)] hover:bg-primary hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            {t('offer.fullOffer')}
            <ArrowRight
              aria-hidden="true"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>

          <div className="hidden md:block">
            <ZigZag5 size={16} className="opacity-90 mt-16" />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xs tracking-widest text-gray-400 mb-4">{t('offer.specializeIn')}</h3>
          <Accordion items={translatedItems} defaultOpenIndex={1} />
          <div className="md:hidden">
            <ZigZag5 size={14} className="opacity-90 mt-10 mx-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
