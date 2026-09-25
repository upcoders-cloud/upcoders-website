import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/i18n/useI18n.js'
import Seo from '@/seo/Seo.jsx'
import OfferHero from 'components/OfferPage/OfferHero.jsx'
import ServiceSection from 'components/OfferPage/ServiceSection.jsx'
import OfferProcess from 'components/OfferPage/OfferProcess.jsx'
import OfferFaq from 'components/OfferPage/OfferFaq.jsx'
import OfferCta from 'components/OfferPage/OfferCta.jsx'
import { OFFER_SERVICES } from 'components/OfferPage/index.js'

export default function OfferPage() {
  const { language } = useI18n()
  const navigate = useNavigate()

  const handleContact = () => {
    navigate(`/${language}#contact`)
  }

  return (
    <>
      <Seo route="offer" />
      <OfferHero onContact={handleContact} />
      {OFFER_SERVICES.map((service, i) => (
        <ServiceSection
          key={service.anchor}
          service={service}
          index={i}
          onContact={handleContact}
        />
      ))}
      <OfferProcess />
      <OfferFaq />
      <OfferCta onContact={handleContact} />
    </>
  )
}
