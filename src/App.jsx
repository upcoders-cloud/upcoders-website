import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from 'react-scroll-to-top'
import { Toaster } from 'react-hot-toast'
import { FaArrowUp } from 'react-icons/fa6'
import { I18nProvider } from '@/i18n/I18nProvider.jsx'
import AppRouter from '@/router/AppRouter.jsx'

const ScrollToTopStyles = { display: 'flex', justifyContent: 'center', alignItems: 'center' }

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <ScrollToTop smooth component={<FaArrowUp />} style={ScrollToTopStyles} />
        <AppRouter />
      </BrowserRouter>
    </I18nProvider>
  )
}
