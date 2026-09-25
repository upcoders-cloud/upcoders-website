import React from 'react'
import InteractiveDots from '@/animations/InteractiveDots/InteractiveDots.jsx'
import ContactHeader from 'components/Contact/ContactHeader/ContactHeader.jsx'
import ContactForm from 'components/Contact/ContactForm/ContactForm.jsx'
import { useBooking } from '@/components/Booking/useBooking.js'
import { useI18n } from '@/i18n/useI18n.js'

export default function Contact() {
  const { t } = useI18n()
  const { openBooking, isBookingAvailable } = useBooking()

  return (
    <section id="contact" className="relative text-white section-wrapper">
      <InteractiveDots className="pointer-events-none absolute inset-0" />
      <div className="grid md:grid-cols-2 gap-12 items-center section-inner">
        <ContactHeader />
        <div className="relative">
          <ContactForm />
          {/* Without a booking page openBooking() leads back to this form, so hide the link */}
          {isBookingAvailable && (
            <p className="mt-5 text-sm text-gray-300 text-center md:text-right">
              {t('contact.bookCall.prompt')}{' '}
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex min-h-11 items-center font-medium text-primary-light underline underline-offset-4 cursor-pointer transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
              >
                {t('contact.bookCall.action')}
              </button>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
