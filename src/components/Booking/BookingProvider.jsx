import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/i18n/useI18n.js'
import BookingModal from '@/components/Booking/BookingModal.jsx'
import { BookingContext } from '@/components/Booking/context.js'

// Strona rezerwacji z harmonogramu spotkań Google Calendar. Każda rezerwacja
// dostaje automatycznie link do Google Meet. Bez tej zmiennej przyciski
// "Umów rozmowę" prowadzą do formularza kontaktowego.
const RAW_BOOKING_URL = import.meta.env.VITE_GOOGLE_BOOKING_URL?.trim() || ''

// Przyjmujemy tylko stronę harmonogramu spotkań Google (pełny adres z kodu
// do osadzenia albo krótki link calendar.app.google). Inny adres oznacza
// pomyłkę w konfiguracji i wtedy lepiej pokazać formularz niż pusty iframe.
function toEmbedUrl(url) {
  if (!url) return ''
  try {
    const parsed = new URL(url)
    const isSchedulePage =
      parsed.protocol === 'https:' &&
      ((parsed.hostname === 'calendar.google.com' &&
        parsed.pathname.startsWith('/calendar/appointments/')) ||
        parsed.hostname === 'calendar.app.google')
    if (!isSchedulePage) return ''
    // gv=true to parametr, którym Google włącza widok do osadzenia w iframe.
    parsed.searchParams.set('gv', 'true')
    return parsed.toString()
  } catch {
    return ''
  }
}

const BOOKING_URL = RAW_BOOKING_URL
const BOOKING_EMBED_URL = toEmbedUrl(RAW_BOOKING_URL)

export default function BookingProvider({ children }) {
  const { language } = useI18n()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = React.useState(false)

  const openBooking = React.useCallback(() => {
    if (BOOKING_EMBED_URL) {
      setIsOpen(true)
      return
    }
    navigate(`/${language}#contact`)
  }, [language, navigate])

  const closeBooking = React.useCallback(() => setIsOpen(false), [])

  const value = React.useMemo(
    () => ({ openBooking, isBookingAvailable: Boolean(BOOKING_EMBED_URL) }),
    [openBooking]
  )

  return (
    <BookingContext.Provider value={value}>
      {children}
      {BOOKING_EMBED_URL && (
        <BookingModal
          isOpen={isOpen}
          onClose={closeBooking}
          embedUrl={BOOKING_EMBED_URL}
          bookingUrl={BOOKING_URL}
        />
      )}
    </BookingContext.Provider>
  )
}
