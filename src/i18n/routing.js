import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/i18n/translations/index.js'

const LANGUAGE_STORAGE_KEY = 'upcoders.lang'

export function isSupportedLanguage(language) {
  return SUPPORTED_LANGUAGES.includes(language)
}

export function normalizeLanguage(language) {
  if (!language) return DEFAULT_LANGUAGE

  const normalized = String(language).toLowerCase().slice(0, 2)
  return isSupportedLanguage(normalized) ? normalized : DEFAULT_LANGUAGE
}

export function extractLanguageFromPathname(pathname = '/') {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  const firstSegment = normalizedPath.split('/').filter(Boolean)[0]

  return isSupportedLanguage(firstSegment) ? firstSegment : null
}

export function resolvePreferredLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE

  const languageFromPathname = extractLanguageFromPathname(window.location.pathname)
  if (languageFromPathname) return languageFromPathname

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (isSupportedLanguage(savedLanguage)) return savedLanguage

  return normalizeLanguage(window.navigator.language)
}

export function stripLanguagePrefix(pathname = '/') {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  const segments = normalizedPath.split('/').filter(Boolean)

  if (segments.length === 0) return '/'

  const [firstSegment, ...restSegments] = segments
  if (!isSupportedLanguage(firstSegment)) return normalizedPath

  if (restSegments.length === 0) return '/'
  return `/${restSegments.join('/')}`
}

export function buildLocalizedPath(language, pathname = '/', search = '', hash = '') {
  const normalizedLanguage = normalizeLanguage(language)
  const strippedPath = stripLanguagePrefix(pathname)

  const localizedPath = strippedPath === '/'
    ? `/${normalizedLanguage}`
    : `/${normalizedLanguage}${strippedPath}`

  return `${localizedPath}${search || ''}${hash || ''}`
}

export function getLanguageStorageKey() {
  return LANGUAGE_STORAGE_KEY
}
