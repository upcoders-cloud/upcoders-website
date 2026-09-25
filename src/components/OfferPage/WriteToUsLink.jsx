import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/i18n/useI18n.js'
import { buildLocalizedPath } from '@/i18n/routing.js'

// Secondary action next to "Book a call": leads to the contact form on the home page.
export default function WriteToUsLink({ className = '' }) {
  const { t, language } = useI18n()

  return (
    <Link
      to={buildLocalizedPath(language, '/', '', '#contact')}
      className={`group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-gray-200 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light ${className}`}
    >
      {t('offerPage.writeToUs')}
      <ArrowRight
        aria-hidden="true"
        className="w-4 h-4 text-primary-light transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </Link>
  )
}
