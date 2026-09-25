import { BrowserRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { MotionConfig } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { I18nProvider } from '@/i18n/I18nProvider.jsx'
import AppRouter from '@/router/AppRouter.jsx'
import BookingProvider from '@/components/Booking/BookingProvider.jsx'
import { useI18n } from '@/i18n/useI18n.js'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion/usePrefersReducedMotion.js'

function BackToTop() {
  const { t } = useI18n()
  const reducedMotion = usePrefersReducedMotion()
  const [visible, setVisible] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 300)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting))
    observer.observe(footer)
    return () => observer.disconnect()
  }, [visible])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' })}
      aria-label={t('common.backToTop')}
      className={`fixed bottom-6 right-6 z-40 flex min-h-11 min-w-11 items-center justify-center rounded border border-white/20 bg-bg-2 text-white shadow-lg transition-colors hover:border-primary hover:text-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${nearFooter ? 'max-md:hidden' : ''}`}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <BrowserRouter>
          <Toaster position="top-center" reverseOrder={false} />
          <BookingProvider>
            <AppRouter />
          </BookingProvider>
          <BackToTop />
        </BrowserRouter>
      </I18nProvider>
    </MotionConfig>
  )
}
