import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar/Navbar.jsx'
import Footer from '@/components/Footer/Footer.jsx'
import { stripLanguagePrefix } from '@/i18n/routing.js'
import { useI18n } from '@/i18n/useI18n.js'

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
  const { t } = useI18n()
  return (
    <>
      <HashNavigationHandler />
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded bg-primary px-4 py-3 text-white focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {t('common.skipToContent')}
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        {/* Granica Suspense dla leniwie ładowanych podstron. Stoi nad <Outlet>,
            więc przy nawigacji (router działa w startTransition) jest już
            zamontowana i React trzyma poprzednią stronę, aż chunk nowej się
            wczyta. Kotwica z adresu trafia wtedy w istniejący element. */}
        <React.Suspense fallback={<div className="min-h-screen bg-bg-1" />}>
          <Outlet />
        </React.Suspense>
      </main>
      <Footer />
    </>
  )
}
