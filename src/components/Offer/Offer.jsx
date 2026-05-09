import React from "react";
import { motion } from "motion/react";
import ZigZag5 from "components/Decor/ZigZag5.jsx";
import { OFFER_ITEMS } from "./index.js";
import Accordion from 'components/Offer/Accordion/Accordion.jsx'
import { isMobile } from 'react-device-detect'
import { useI18n } from '@/i18n/useI18n.js'
import WebMobileModalContent from 'components/Offer/WebMobileModal/WebMobileModalContent.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const CUSTOM_MODAL_COMPONENTS = {
  webMobile: WebMobileModalContent,
}

export default function Offer() {
  const { t } = useI18n()

  const translatedItems = OFFER_ITEMS.map((item) => {
    let cta = undefined
    if (item.cta) {
      if (item.cta.packagesBasePath) {
        cta = {
          label: t(item.cta.labelKey),
          modalTitle: t(item.cta.modalTitleKey),
          packages: item.cta.packages.map((pkg) => {
            const base = `${item.cta.packagesBasePath}.${pkg.key}`
            return {
              name: t(`${base}.name`),
              price: t(`${base}.price`),
              recommended: pkg.recommended,
              features: t(`${base}.features`) || [],
            }
          }),
        }
      } else {
        cta = {
          label: t(item.cta.labelKey),
          modalTitle: t(item.cta.modalTitleKey),
          ModalContent: CUSTOM_MODAL_COMPONENTS[item.cta.type],
        }
      }
    }
    return {
      id: item.id,
      anchor: item.anchor,
      title: t(item.titleKey),
      content: t(item.contentKey),
      cta,
    }
  })

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
          <h2 className="text-2xl md:text-[28px] font-semibold mb-4">
            {t('offer.title')}
          </h2>

          <p className="text-gray-400 text-sm md:text-base">
            {t('offer.paragraph1')}
          </p>

          <p className="text-gray-400 text-sm md:text-base mt-4">
            {t('offer.paragraph2')}
          </p>

          {!isMobile && <ZigZag5 size={16} className="opacity-90 mt-16" />}
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
          {isMobile && <ZigZag5 size={14} className="opacity-90 mt-10 mx-auto" />}
        </motion.div>
      </div>
    </section>
  )
}
