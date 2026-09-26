import React from 'react'
import Seo from '@/seo/Seo.jsx'
import { useGoToContact } from '@/hooks/useGoToContact/useGoToContact.js'
import OfferHero from 'components/OfferPage/OfferHero.jsx'
import ServiceSection from 'components/OfferPage/ServiceSection.jsx'
import OfferProcess from 'components/OfferPage/OfferProcess.jsx'
import OfferFaq from 'components/OfferPage/OfferFaq.jsx'
import OfferCta from 'components/OfferPage/OfferCta.jsx'
import { OFFER_SERVICES } from 'components/OfferPage/index.js'

export default function OfferPage() {
  const goToContact = useGoToContact()

  return (
    <>
      <Seo route="offer" />
      <OfferHero />
      {OFFER_SERVICES.map((service, i) => (
        <ServiceSection key={service.anchor} service={service} index={i} onContact={goToContact} />
      ))}
      <OfferProcess />
      <OfferFaq />
      <OfferCta />
    </>
  )
}
