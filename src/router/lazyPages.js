import React from 'react'
import { matchPath } from 'react-router-dom'

/**
 * React.lazy with a preload hook. Once the module has loaded, the page renders
 * directly instead of going through Suspense, so a page whose chunk was
 * preloaded before the first render never shows the fallback.
 */
function lazyPage(load) {
  let LoadedPage = null
  const preload = () =>
    load().then((module) => {
      LoadedPage = module.default
      return module
    })
  const LazyPage = React.lazy(preload)

  function Page(props) {
    return React.createElement(LoadedPage ?? LazyPage, props)
  }
  Page.preload = preload
  return Page
}

export const lazyPages = {
  OfferPage: lazyPage(() => import('@/pages/OfferPage.jsx')),
  ProjectsPage: lazyPage(() => import('@/pages/ProjectsPage.jsx')),
  ProjectDetailsPage: lazyPage(() => import('@/pages/ProjectDetailsPage.jsx')),
  PrivacyPage: lazyPage(() => import('@/pages/PrivacyPage.jsx')),
  NotFoundPage: lazyPage(() => import('@/pages/NotFoundPage.jsx')),
}

// Mirrors the /:lang routes in AppRouter; the first matching pattern wins.
const ROUTE_PAGES = [
  ['/:lang', null],
  ['/:lang/offer', lazyPages.OfferPage],
  ['/:lang/projects', lazyPages.ProjectsPage],
  ['/:lang/privacy', lazyPages.PrivacyPage],
  ['/:lang/projects/:slug', lazyPages.ProjectDetailsPage],
  ['/:lang/*', lazyPages.NotFoundPage],
]

/**
 * Loads the chunk of the page at `pathname` before the app mounts. The
 * prerendered HTML stays on screen meanwhile; without this React would swap it
 * for the Suspense fallback for a moment and then back to the page.
 */
export function preloadRoute(pathname) {
  const match = ROUTE_PAGES.find(([pattern]) => matchPath(pattern, pathname))
  return match?.[1]?.preload() ?? Promise.resolve()
}
