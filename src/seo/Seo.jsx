import React from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '@/i18n/useI18n.js'
import { buildLocalizedPath, stripLanguagePrefix } from '@/i18n/routing.js'
import { DEFAULT_LANGUAGE } from '@/i18n/translations/index.js'

const SITE_URL = 'https://upcoders.cloud'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

const OG_LOCALES = {
  en: 'en_US',
  pl: 'pl_PL',
}

/**
 * Zestaw znaczników head dla jednej trasy.
 *
 * React 19 sam wynosi <title>, <meta> i <link> renderowane w komponencie
 * do sekcji <head>, więc nie potrzeba tu react-helmet. Warunek jest taki,
 * że index.html nie może już zawierać tych samych znaczników na sztywno,
 * bo powstałyby duplikaty.
 */
export default function Seo({ route, image = DEFAULT_OG_IMAGE, noindex = false }) {
  const { t, language, languages } = useI18n()
  const location = useLocation()

  const basePath = stripLanguagePrefix(location.pathname)
  const canonicalUrl = `${SITE_URL}${buildLocalizedPath(language, basePath)}`
  const defaultUrl = `${SITE_URL}${buildLocalizedPath(DEFAULT_LANGUAGE, basePath)}`

  const title = t(`seo.${route}.title`)
  const description = t(`seo.${route}.description`)

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />

      <link rel="canonical" href={canonicalUrl} />
      {languages.map((code) => (
        <link
          key={code}
          rel="alternate"
          hrefLang={code}
          href={`${SITE_URL}${buildLocalizedPath(code, basePath)}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={defaultUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Upcoders" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={OG_LOCALES[language] ?? OG_LOCALES[DEFAULT_LANGUAGE]} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  )
}
