import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Offer from "./components/Offer";
import Separator from "./components/Separator";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from 'react-scroll-to-top'
import { FaArrowUp } from "react-icons/fa6";

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
    </>
  );
}