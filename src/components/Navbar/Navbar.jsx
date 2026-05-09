import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Logo from '/uc-logo.png'
import { NAV_ELEMENT as NavElement } from 'components/Navbar/index.js'
import { NavBarItem } from 'components/Navbar/NavBarItem/NavBarItem.jsx'
import LanguageSwitcher from 'components/Navbar/LanguageSwitcher/LanguageSwitcher.jsx'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { useI18n } from '@/i18n/useI18n.js'

export default function Navbar() {
  const { t, language } = useI18n()
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const [navH, setNavH] = useState(0)

  useLayoutEffect(() => {
    const measure = () => setNavH(headerRef.current?.offsetHeight || 0)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY

    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setIsScrolled(currentScrollY > 8)
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', controlNavbar, { passive: true })
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [])

  return (
    <>
      <nav
        ref={headerRef}
        className={`px-6 md:px-10 fixed w-full z-50 transition-[transform,background-color,backdrop-filter,box-shadow,border-color] duration-300 ease-[var(--ease-out-quart)] ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-bg-1/75 backdrop-blur-md border-b border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.25)]'
            : 'bg-bg-1 border-b border-transparent'
        }`}
      >
        <div className="section-inner">
          <div className="flex items-center justify-between h-18">
            <NavBarItem href={`/${language}`} className="text-2xl font-bold tracking-wide text-white transition-opacity duration-200 hover:opacity-80">
              <img src={/** @type {string} */ (Logo)} alt="Upcoders logo" className="h-8 w-auto" />
            </NavBarItem>

            <div className="hidden md:flex items-center gap-4 text-gray-300">
              {NavElement.map((item) => (
                <NavBarItem
                  key={item.id}
                  item={item}
                  label={t(item.labelKey)}
                  className="px-3 py-1 border border-transparent rounded transition-all duration-300 ease-[var(--ease-out-quart)] hover:border-primary hover:text-white hover:-translate-y-0.5"
                />
              ))}

              <LanguageSwitcher className="ml-2" />
            </div>

            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white cursor-pointer transition-colors duration-200 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="relative w-7 h-7 inline-block">
                  <IoMdMenu
                    className={`absolute inset-0 m-auto text-3xl transition-all duration-300 ease-[var(--ease-out-quart)] ${
                      isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                    }`}
                  />
                  <IoMdClose
                    className={`absolute inset-0 m-auto text-3xl transition-all duration-300 ease-[var(--ease-out-quart)] ${
                      isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          <div
            className={`md:hidden transition-all duration-300 ease-[var(--ease-out-quart)] ${
              isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NavElement.map((link) => (
                <NavBarItem
                  key={link.href}
                  href={link.href}
                  label={t(link.labelKey)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white transition-colors duration-200 hover:bg-white/5 hover:text-primary"
                />
              ))}

              <LanguageSwitcher
                className="pt-3 pb-8"
                dropUp
                onLanguageChange={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      </nav>
      <div aria-hidden="true" style={{ height: navH, backgroundColor: '#18181B' }} />
    </>
  )
}
