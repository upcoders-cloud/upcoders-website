import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/HomePage.jsx'
import ProjectsPage from '@/pages/ProjectsPage.jsx'
import ProjectDetailsPage from '@/pages/ProjectDetailsPage.jsx'
import NotFoundPage from '@/pages/NotFoundPage.jsx'
import LanguageLayout from '@/router/LanguageLayout.jsx'
import RedirectToPreferredLanguage from '@/router/RedirectToPreferredLanguage.jsx'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RedirectToPreferredLanguage />} />
      <Route path="/projects" element={<RedirectToPreferredLanguage pathname="/projects" />} />
      <Route path="/projects/:slug" element={<RedirectToPreferredLanguage />} />

      <Route path="/:lang" element={<LanguageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:slug" element={<ProjectDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="*" element={<RedirectToPreferredLanguage />} />
    </Routes>
  )
}
