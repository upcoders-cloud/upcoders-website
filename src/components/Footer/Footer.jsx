import React from 'react'
import Logo from '/uc-logo.png'
import { TiSocialLinkedin } from 'react-icons/ti'
import Partners from 'components/Footer/Partners.jsx'
import { NavBarItem } from '@/components/Navbar/NavBarItem/NavBarItem.jsx'
import { useI18n } from '@/i18n/useI18n.js'
import { motion } from 'motion/react'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-bg-2 text-gray-300 py-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <img src={Logo} alt="Upcoders logo" className="h-7 w-auto mb-4" />
            <div className="text-xs tracking-widest text-gray-400 mb-2">UPCODERS</div>
            <address className="not-italic text-sm leading-6">
              ul. Wawrzynca Engestroma 10
              <br />
              60-571 Poznan, Poland
            </address>
            <div className="mt-4 text-sm leading-6">
              <div>NIP: 7812090103</div>
              <div>REGON: 541840267</div>
              <div>KRS: 0001175084</div>
            </div>
          </div>

          <div>
            <div className="text-xs tracking-widest text-gray-400 mb-3">{t('footer.followUs')}</div>
            <div className="flex items-center gap-4 text-lg">
              <a
                href="https://www.linkedin.com/company/upcoders-cloud"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full ring-1 ring-white/10 transition-all duration-200 ease-[var(--ease-out-quart)] hover:text-white hover:ring-primary hover:bg-primary/15 hover:-translate-y-0.5"
              >
                <TiSocialLinkedin />
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs tracking-widest text-gray-400 mb-3">{t('footer.company')}</div>
            <ul className="space-y-2 text-sm">
              <li>
                <NavBarItem href="#offer" className="inline-block transition-colors duration-200 hover:text-primary">
                  {t('navbar.items.offer')}
                </NavBarItem>
              </li>
              <li>
                <NavBarItem href="#about" className="inline-block transition-colors duration-200 hover:text-primary">
                  {t('navbar.items.about')}
                </NavBarItem>
              </li>
              <li>
                <NavBarItem href="/projects" className="inline-block transition-colors duration-200 hover:text-primary">
                  {t('navbar.items.projects')}
                </NavBarItem>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs tracking-widest text-gray-400 mb-3">{t('footer.contact')}</div>
            <a href="mailto:contact@upcoders.cloud" className="text-sm hover:text-white transition">
              contact@upcoders.cloud
            </a>
          </div>
        </div>

        <motion.hr
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{ originX: 0 }}
          className="my-10 border-white/10"
        />

        <Partners logos={[Logo, Logo, Logo, Logo]} title={t('footer.partners')} />
      </div>
    </footer>
  )
}
