import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar/Navbar.jsx'
import Footer from '@/components/Footer/Footer.jsx'
import { stripLanguagePrefix } from '@/i18n/routing.js'

function HashNavigationHandler() {
  const location = useLocation()
  const pagePath = stripLanguagePrefix(location.pathname)
  const previousPagePath = React.useRef(pagePath)

  // Przejście na inną podstronę bez kotwicy zaczyna się od góry, a nie od
  // pozycji przewinięcia poprzedniej strony. Zmiana samego języka (/pl/offer
  // -> /en/offer) zostawia pozycję bez zmian.
  React.useLayoutEffect(() => {
    if (previousPagePath.current === pagePath) return
    previousPagePath.current = pagePath
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pagePath, location.hash])

  React.useEffect(() => {
    if (!location.hash) return

    const elementId = location.hash.replace('#', '')
    if (!elementId) return

    const timer = window.setTimeout(() => {
      const targetElement = document.getElementById(elementId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 0)

    return () => window.clearTimeout(timer)
  }, [location.hash, location.pathname])

  return null
}

export default function PublicLayout() {
  return (
    <>
      <HashNavigationHandler />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
