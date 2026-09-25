import { useContext } from 'react'
import { BookingContext } from '@/components/Booking/context.js'

/**
 * `openBooking()` otwiera okno rezerwacji rozmowy (Google Calendar + Meet),
 * a gdy rezerwacje nie są skonfigurowane, przenosi do formularza kontaktowego.
 */
export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
