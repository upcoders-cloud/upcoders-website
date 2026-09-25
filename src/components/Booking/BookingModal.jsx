import React from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { X, ExternalLink } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n.js'

export default function BookingModal({ isOpen, onClose, embedUrl, bookingUrl }) {
  const { t } = useI18n()
  const titleId = React.useId()
  const closeButtonRef = React.useRef(null)
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
      previouslyFocused?.focus?.()
    }
  }, [isOpen, onClose])

  React.useEffect(() => {
    if (!isOpen) setIsLoaded(false)
  }, [isOpen])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/75" onClick={onClose} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex h-full w-full max-w-4xl flex-col bg-bg-1 text-white sm:h-[min(90vh,820px)] sm:border sm:border-bg-3 sm:shadow-[3px_3px_0px_black]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-bg-3 px-5 py-4 sm:px-6">
              <div>
                <h2 id={titleId} className="text-lg font-semibold sm:text-xl">
                  {t('booking.title')}
                </h2>
                <p className="mt-1 text-sm text-gray-400">{t('booking.description')}</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={t('booking.close')}
                className="-mr-2 inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-gray-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-primary"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex-1 bg-white">
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-bg-1 text-sm text-gray-400">
                  {t('booking.loading')}
                </div>
              )}
              <iframe
                src={embedUrl}
                title={t('booking.title')}
                onLoad={() => setIsLoaded(true)}
                className="h-full w-full border-0"
              />
            </div>

            <div className="border-t border-bg-3 px-5 py-3 text-right sm:px-6">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
              >
                {t('booking.openInNewTab')}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
