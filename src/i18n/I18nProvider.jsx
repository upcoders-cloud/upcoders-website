import React from 'react'
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  TRANSLATIONS,
} from '@/i18n/translations/index.js'
import { I18nContext } from '@/i18n/context.js'
import {
  getLanguageStorageKey,
  normalizeLanguage,
  resolvePreferredLanguage,
} from '@/i18n/routing.js'

const LANG_STORAGE_KEY = getLanguageStorageKey()

const getNestedValue = (dictionary, path) => {
  if (!path) return undefined

  return path.split('.').reduce((current, key) => {
    if (current == null) return undefined
    return current[key]
  }, dictionary)
}

const resolveInitialLanguage = () => {
  return resolvePreferredLanguage()
}

export function I18nProvider({ children }) {
  const [language, setLanguageState] = React.useState(resolveInitialLanguage)

  const setLanguage = React.useCallback((nextLanguage) => {
    const normalized = normalizeLanguage(nextLanguage)
    setLanguageState(normalized)
  }, [])

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    window.localStorage.setItem(LANG_STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const t = React.useCallback(
    (path) => {
      const currentLanguageDictionary = TRANSLATIONS[language]
      const fallbackDictionary = TRANSLATIONS[DEFAULT_LANGUAGE]

      const languageValue = getNestedValue(currentLanguageDictionary, path)
      if (languageValue !== undefined) return languageValue

      const fallbackValue = getNestedValue(fallbackDictionary, path)
      if (fallbackValue !== undefined) return fallbackValue

      return path
    },
    [language]
  )

  const contextValue = React.useMemo(
    () => ({
      language,
      languages: SUPPORTED_LANGUAGES,
      setLanguage,
      t,
    }),
    [language, setLanguage, t]
  )

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
}
