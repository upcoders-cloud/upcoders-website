import Navbar from 'components/Navbar/Navbar.jsx'
import Hero from 'components/Hero/Hero.jsx'
import Offer from 'components/Offer/Offer.jsx'
import Separator from 'components/Separator/Separator.jsx'
import Team from 'components/Team/Team.jsx'
import Contact from 'components/Contact/Contact.jsx'
import Footer from 'components/Footer/Footer.jsx'

import ScrollToTop from 'react-scroll-to-top'
import { FaArrowUp } from 'react-icons/fa6'
import FluidCursor from '@/animations/FluidCursor/FluidCursor.jsx'

const ScrollToTopStyles = { display: "flex", justifyContent:'center', alignItems: 'center' }

export default function App() {

  return (
    <>
      <ScrollToTop smooth component={<FaArrowUp />} style={ScrollToTopStyles}/>
      <Navbar />
      <Hero />
      <Offer />
      <Separator />
      <Team />
      <Contact />
      <Footer />
      {/*<div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>*/}
      {/*  <FluidCursor />*/}
      {/*</div>*/}
    </>
  );
}