import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useI18n } from '@/i18n/useI18n.js'
import KaizenProject from 'components/projects/KaizenProject/KaizenProject.jsx'

export default function ProjectDetailsPage() {
  const { slug = '' } = useParams()
  const { t, language } = useI18n()

  if (slug === 'kaizen') {
    return <KaizenProject />
  }

  return (
    <section className="bg-bg-2 text-white section-wrapper">
      <div className="section-inner">
        <Link
          to={`/${language}/projects`}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          ← {t('projects.title')}
        </Link>
        <h1 className="text-4xl md:text-5xl font-semibold">
          {t('projectDetails.titlePrefix')} <span className="text-primary">{slug}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-gray-300">{t('projectDetails.description')}</p>
      </div>
    </section>
  )
}
