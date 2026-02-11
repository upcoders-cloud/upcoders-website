import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import {
  buildLocalizedPath,
  resolvePreferredLanguage,
} from '@/i18n/routing.js'

export default function RedirectToPreferredLanguage({ pathname }) {
  const location = useLocation()
  const preferredLanguage = resolvePreferredLanguage()

  const targetPath = buildLocalizedPath(
    preferredLanguage,
    pathname || location.pathname,
    location.search,
    location.hash
  )

  return <Navigate to={targetPath} replace />
}
