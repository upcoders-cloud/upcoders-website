import React from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import PublicLayout from '@/layouts/PublicLayout.jsx'
import { useI18n } from '@/i18n/useI18n.js'
import {
  buildLocalizedPath,
  isSupportedLanguage,
  resolvePreferredLanguage,
} from '@/i18n/routing.js'

function getPathWithoutLanguage(pathname, language) {
  const prefix = `/${language}`

  if (!pathname.startsWith(prefix)) return pathname

  const pathWithoutLanguage = pathname.slice(prefix.length)
  return pathWithoutLanguage || '/'
}

export default function LanguageLayout() {
  const { lang = '' } = useParams()
  const { setLanguage } = useI18n()
  const location = useLocation()
  const isLanguageValid = isSupportedLanguage(lang)

  React.useEffect(() => {
    if (!isLanguageValid) return
    setLanguage(lang)
  }, [isLanguageValid, lang, setLanguage])

  if (!isLanguageValid) {
    const preferredLanguage = resolvePreferredLanguage()
    const pathWithoutLanguage = getPathWithoutLanguage(location.pathname, lang)

    return (
      <Navigate
        to={buildLocalizedPath(preferredLanguage, pathWithoutLanguage, location.search, location.hash)}
        replace
      />
    )
  }

  return <PublicLayout />
}
