import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useI18n } from '@/i18n/useI18n.js'
import { buildLocalizedPath } from '@/i18n/routing.js'

const LANGUAGE_META = {
  en: { flag: '🇬🇧', label: 'English' },
  pl: { flag: '🇵🇱', label: 'Polski' },
}

export default function LanguageSwitcher({ className = '', onLanguageChange, dropUp = false }) {
  const { language, languages, setLanguage, t } = useI18n()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener('pointerdown', handleClickOutside)
    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [open])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [open])

  const handleSelect = (code) => {
    if (code === language) {
      setOpen(false)
      return
    }
    setLanguage(code)
    navigate(buildLocalizedPath(code, location.pathname, location.search, location.hash))
    setOpen(false)
    onLanguageChange?.()
  }

  const current = LANGUAGE_META[language] ?? LANGUAGE_META.en

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('navbar.languageSwitcher.ariaLabel')}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-white/10 text-sm text-gray-300 transition-all duration-200 hover:border-primary/60 hover:text-white cursor-pointer select-none"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="text-xs font-medium tracking-wide">{language.toUpperCase()}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: dropUp ? 4 : -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropUp ? 4 : -4, scale: 0.97 }}
            transition={{ type: 'spring', duration: 0.25, bounce: 0.1 }}
            role="listbox"
            aria-label={t('navbar.languageSwitcher.ariaLabel')}
            className={`absolute left-0 min-w-[130px] rounded border border-white/10 bg-bg-1 shadow-lg shadow-black/40 overflow-hidden z-50 ${
              dropUp ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
            }`}
          >
            {languages.map((code) => {
              const meta = LANGUAGE_META[code]
              if (!meta) return null
              const isActive = language === code

              return (
                <li key={code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => handleSelect(code)}
                    className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? 'text-white bg-primary/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-base leading-none">{meta.flag}</span>
                    <span className="font-medium tracking-wide">{meta.label}</span>
                    {isActive && (
                      <svg
                        className="w-3.5 h-3.5 ml-auto text-primary"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 7.5L5.5 10.5L11.5 3.5" />
                      </svg>
                    )}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
