import { Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/HomePage.jsx'
import LanguageLayout from '@/router/LanguageLayout.jsx'
import RedirectToPreferredLanguage from '@/router/RedirectToPreferredLanguage.jsx'
import { lazyPages } from '@/router/lazyPages.js'

const { OfferPage, ProjectsPage, ProjectDetailsPage, PrivacyPage, NotFoundPage } = lazyPages

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RedirectToPreferredLanguage />} />
      <Route path="/offer" element={<RedirectToPreferredLanguage pathname="/offer" />} />
      <Route path="/projects" element={<RedirectToPreferredLanguage pathname="/projects" />} />
      <Route path="/privacy" element={<RedirectToPreferredLanguage pathname="/privacy" />} />
      <Route path="/projects/:slug" element={<RedirectToPreferredLanguage />} />

      <Route path="/:lang" element={<LanguageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="offer" element={<OfferPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="projects/:slug" element={<ProjectDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="*" element={<RedirectToPreferredLanguage />} />
    </Routes>
  )
}
