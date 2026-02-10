import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '@/i18n/useI18n.js'
import { buildLocalizedPath } from '@/i18n/routing.js'

export const NavBarItem = ({
  item,
  href,
  label,
  children,
  className = '',
  onClick,
}) => {
  const { language } = useI18n()
  const location = useLocation()
  const navigate = useNavigate()

  const linkHref = href ?? item?.href ?? '#'
  const linkLabel = label ?? children ?? item?.label ?? ''

  const homePath = `/${language}`

  const renderedHref = (() => {
    if (linkHref.startsWith('#')) return `${homePath}${linkHref}`
    if (linkHref.startsWith('/') && !linkHref.startsWith('//')) {
      return buildLocalizedPath(language, linkHref)
    }
    return linkHref
  })()

  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented) return

    if (linkHref.startsWith('#')) {
      event.preventDefault()

      if (location.pathname !== homePath) {
        navigate(`${homePath}${linkHref}`)
        return
      }

      const targetElement = document.querySelector(linkHref)
      if (!targetElement) return

      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', `${homePath}${linkHref}`)
      return
    }

    if (linkHref.startsWith('/') && !linkHref.startsWith('//')) {
      event.preventDefault()
      navigate(buildLocalizedPath(language, linkHref))
    }
  }

  return (
    <a href={renderedHref} onClick={handleClick} className={className}>
      {linkLabel}
    </a>
  )
}
