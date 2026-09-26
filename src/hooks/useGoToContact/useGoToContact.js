import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '@/i18n/useI18n.js'

/** Zwraca funkcję, która przenosi do formularza kontaktowego na stronie głównej. */
export function useGoToContact() {
  const { language } = useI18n()
  const navigate = useNavigate()

  return useCallback(() => navigate(`/${language}#contact`), [language, navigate])
}
