import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Strony z prerenderu mają w <head> komplet znaczników SEO. Przed startem
// aplikacji trzeba je usunąć, bo React wstawi własne obok nich, a duplikaty
// canonical i description są gorsze niż ich brak.
document.head.querySelectorAll('[data-prerendered]').forEach((element) => element.remove())

// Awaryjny tytuł z index.html jest potrzebny tylko do momentu, w którym
// komponent Seo wstawi właściwy.
document.getElementById('uc-fallback-title')?.remove()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
