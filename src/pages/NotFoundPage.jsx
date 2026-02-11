import React from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/useI18n.js'

export default function NotFoundPage() {
  const { t, language } = useI18n()

  return (
    <section className="bg-bg-2 text-white section-wrapper">
      <div className="section-inner">
        <h1 className="text-4xl md:text-5xl font-semibold">{t('notFound.title')}</h1>
        <Link
          to={`/${language}`}
          className="mt-8 inline-block px-5 py-2 bg-primary text-white shadow-[3px_3px_0px_black] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
        >
          {t('notFound.backHome')}
        </Link>
      </div>
    </section>
  )
}
