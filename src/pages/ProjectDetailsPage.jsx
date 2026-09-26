import React from 'react'
import { useParams } from 'react-router-dom'
import KaizenProject from 'components/projects/KaizenProject/KaizenProject.jsx'
import NotFoundPage from '@/pages/NotFoundPage.jsx'

export default function ProjectDetailsPage() {
  const { slug = '' } = useParams()

  if (slug === 'kaizen') {
    return <KaizenProject />
  }

  return <NotFoundPage />
}
