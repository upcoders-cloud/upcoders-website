import React from "react";
import ZigZag5 from "components/Decor/ZigZag5.jsx";
import { OFFER_ITEMS } from "./index.js";
import Accordion from 'components/Offer/Accordion/Accordion.jsx'
import { isMobile } from 'react-device-detect'
import { useI18n } from '@/i18n/useI18n.js'

export default function Offer() {
  const { t } = useI18n()

  const translatedItems = OFFER_ITEMS.map((item) => ({
    id: item.id,
    anchor: item.anchor,
    title: t(item.titleKey),
    content: t(item.contentKey),
    cta: item.cta
      ? {
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
      : undefined,
  }))

  return (
    <section id="offer" className="relative bg-bg-2 text-white section-wrapper overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 section-inner">
        <div>
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
        </div>

        <div>
          <h3 className="text-xs tracking-widest text-gray-400 mb-4">{t('offer.specializeIn')}</h3>
          <Accordion items={translatedItems} defaultOpenIndex={0} />
          {isMobile && <ZigZag5 size={14} className="opacity-90 mt-10 mx-auto" />}
        </div>
      </div>
    </section>
  )
}
