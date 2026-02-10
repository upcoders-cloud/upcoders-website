import React from 'react'
import { useParams } from 'react-router-dom'
import { useI18n } from '@/i18n/useI18n.js'

export default function ProjectDetailsPage() {
  const { slug = '' } = useParams()
  const { t } = useI18n()

  return (
    <section className="bg-bg-2 text-white section-wrapper">
      <div className="section-inner">
        <h1 className="text-4xl md:text-5xl font-semibold">
          {t('projectDetails.titlePrefix')} <span className="text-primary">{slug}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-gray-300">{t('projectDetails.description')}</p>
      </div>
    </section>
  )
}
