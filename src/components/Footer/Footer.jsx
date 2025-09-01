import React from 'react'
import Logo from 'assets/uc-logo.png'
import { TiSocialLinkedin, TiSocialInstagram } from 'react-icons/ti'
import { FaSquareXTwitter } from 'react-icons/fa6'
import Partners from 'components/Footer/Partners.jsx'

export default function Footer() {
  return (
    <footer className="bg-bg-2 text-gray-300 py-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto" >
        {/* Top: 4 columns */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Col 1: Logo + address */}
          <div>
            <img src={Logo} alt="Upcoders logo" className="h-7 w-auto mb-4" />
            <div className="text-xs tracking-widest text-gray-400 mb-2">UPCODERS</div>
            <address className="not-italic text-sm leading-6">
              ul.Nazwa ulicy 87c/76<br />
              61-675 Poznań, Poland
            </address>
            <div className="mt-4 text-sm leading-6">
              <div>REGON: 000987654</div>
              <div>KRS: 098907656</div>
            </div>
          </div>

          {/* Col 2: Follow us */}
          <div>
            <div className="text-xs tracking-widest text-gray-400 mb-3">Follow us</div>
            <div className="flex items-center gap-4 text-lg">
              <a href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors"><TiSocialLinkedin /></a>
              <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors"><TiSocialInstagram /></a>
              <a href="#" aria-label="X / Twitter" className="hover:text-primary transition-colors"><FaSquareXTwitter /></a>
            </div>
          </div>

          {/* Col 3: Company */}
          <div>
            <div className="text-xs tracking-widest text-gray-400 mb-3">Company</div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#offer"
                  className="hover:text-white transition"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#offer").scrollIntoView({ behavior: "smooth" }) }}
                >
                  OFFER
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-white transition"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#about").scrollIntoView({ behavior: "smooth" }) }}
                >
                  ABOUT US
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <div className="text-xs tracking-widest text-gray-400 mb-3">Contact</div>
            <a href="mailto:hello@upcoders.com" className="text-sm hover:text-white transition">hello@upcoders.com</a>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-10 border-white/10" />

        {/* Partners (lekki fade-in on scroll) */}
        <Partners logos={[Logo, Logo, Logo, Logo]} />
      </div>
    </footer>
  )
}
