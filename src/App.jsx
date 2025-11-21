import Navbar from 'components/Navbar/Navbar.jsx'
import Hero from 'components/Hero/Hero.jsx'
import Offer from 'components/Offer/Offer.jsx'
import Separator from 'components/Separator/Separator.jsx'
import Team from 'components/Team/Team.jsx'
import Contact from 'components/Contact/Contact.jsx'
import Footer from 'components/Footer/Footer.jsx'

import ScrollToTop from 'react-scroll-to-top'
import { Toaster } from "react-hot-toast";
import { FaArrowUp } from 'react-icons/fa6'

const ScrollToTopStyles = { display: "flex", justifyContent:'center', alignItems: 'center' }

export default function App() {

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}/>
      <ScrollToTop smooth component={<FaArrowUp />} style={ScrollToTopStyles}/>
      <Navbar />
      <Hero />
      <Offer />
      <Separator />
      <Team />
      <Contact />
      <Footer />
    </>
  );
}