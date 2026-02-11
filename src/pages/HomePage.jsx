import React from 'react'
import Hero from '@/components/Hero/Hero.jsx'
import Offer from '@/components/Offer/Offer.jsx'
import Separator from '@/components/Separator/Separator.jsx'
import HowWeWork from '@/components/HowWeWork/HowWeWork.jsx'
import Team from '@/components/Team/Team.jsx'
import Contact from '@/components/Contact/Contact.jsx'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Offer />
      <HowWeWork />
      <Separator />
      <Team />
      <Contact />
    </>
  )
}
