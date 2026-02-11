import React from 'react'
import { I18nContext } from '@/i18n/context.js'

export function useI18n() {
  const context = React.useContext(I18nContext)

  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }

  return context
}
