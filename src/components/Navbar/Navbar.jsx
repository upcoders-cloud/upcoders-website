import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Logo from 'assets/uc-logo.png'
import { NAV_ELEMENT as NavElement } from 'components/Navbar/index.js'
import { NavBarItem } from 'components/Navbar/NavBarItem/NavBarItem.jsx'
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const [navH, setNavH] = useState(0);

  useLayoutEffect(() => {
    const measure = () => setNavH(headerRef.current?.offsetHeight || 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [navH]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  },[])

  return (
    <>
      <nav ref={headerRef} className={`px-6 md:px-10 fixed w-full bg-bg-1 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="section-inner">
          <div className="flex items-center justify-between h-18">

            {/* Logo */}
            <h1 className="text-2xl font-bold tracking-wide text-white">
              <img src={/** @type {string} */ (Logo)} alt="Upcoders logo" className="h-8 w-auto" />
            </h1>

            {/* Navigation desktop */}
            <div className="hidden md:flex space-x-6 text-gray-300">
              {NavElement.map((item) => (
                <NavBarItem key={item.id} item={item}/>
              ))}
            </div>

            {/* Hamburger / X Icon */}
            <div className='md:hidden flex items-center'>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white cursor-pointer hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {
                  !isMobileMenuOpen ? (
                    <IoMdMenu className="text-3xl" />
                  ) : (
                    <IoMdClose className="text-3xl"/>
                  )
                }
              </button>
            </div>
          </div>

          {/* Navigation Mobile */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? "max-h-64 opacity-100" 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NavElement.map((link) => (
                <NavBarItem
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-900 hover:bg-gray-50`}
                >
                  {link.label}
                </NavBarItem>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div aria-hidden="true" style={{ height: navH, backgroundColor: "#18181B" }} />
    </>
);
}
