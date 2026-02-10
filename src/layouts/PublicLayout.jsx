import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar/Navbar.jsx'
import Footer from '@/components/Footer/Footer.jsx'

function HashNavigationHandler() {
  const location = useLocation()

  React.useEffect(() => {
    if (!location.hash) return

    const elementId = location.hash.replace('#', '')
    if (!elementId) return

    const timer = window.setTimeout(() => {
      const targetElement = document.getElementById(elementId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 0)

    return () => window.clearTimeout(timer)
  }, [location.hash, location.pathname])

  return null
}

export default function PublicLayout() {
  return (
    <>
      <HashNavigationHandler />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
