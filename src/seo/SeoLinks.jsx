import React from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '@/i18n/useI18n.js'
import {
  buildLocalizedPath,
  stripLanguagePrefix,
} from '@/i18n/routing.js'
import { DEFAULT_LANGUAGE } from '@/i18n/translations/index.js'

const SITE_URL = 'https://upcoders.cloud'
const CANONICAL_ID = 'uc-canonical'
const HREFLANG_PREFIX = 'uc-hreflang-'
const DEFAULT_HREFLANG = DEFAULT_LANGUAGE

const ensureHeadLink = ({ id, rel, href, hreflang }) => {
  let link = document.head.querySelector(`#${id}`)

  if (!link) {
    link = document.createElement('link')
    link.id = id
    document.head.appendChild(link)
  }

  link.setAttribute('rel', rel)
  link.setAttribute('href', href)

  if (hreflang) {
    link.setAttribute('hreflang', hreflang)
  } else {
    link.removeAttribute('hreflang')
  }
}

export default function SeoLinks() {
  const { language, languages } = useI18n()
  const location = useLocation()

  React.useEffect(() => {
    const basePath = stripLanguagePrefix(location.pathname)
    const canonicalPath = buildLocalizedPath(language, basePath)

    ensureHeadLink({
      id: CANONICAL_ID,
      rel: 'canonical',
      href: `${SITE_URL}${canonicalPath}`,
    })

    languages.forEach((code) => {
      const localizedPath = buildLocalizedPath(code, basePath)

      ensureHeadLink({
        id: `${HREFLANG_PREFIX}${code}`,
        rel: 'alternate',
        hreflang: code,
        href: `${SITE_URL}${localizedPath}`,
      })
    })

    const defaultPath = buildLocalizedPath(DEFAULT_HREFLANG, basePath)
    ensureHeadLink({
      id: `${HREFLANG_PREFIX}x-default`,
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${SITE_URL}${defaultPath}`,
    })
  }, [language, languages, location.pathname])

  return null
}
