import { Outlet, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppFAB } from './WhatsAppFAB'
import { PageOverlay } from './PageOverlay'
import { PageReadyProvider } from '@/context/PageReadyContext'
import { BookingProvider } from '@/context/BookingContext'
import { pageTransition } from '@/lib/animations'

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export function Layout() {
  const location = useLocation()

  return (
    <BookingProvider>
    <PageReadyProvider>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Header />
        <PageOverlay />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={location.pathname}
            {...pageTransition}
            className="flex-1"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <Footer />
        <WhatsAppFAB />
      </div>
    </PageReadyProvider>
    </BookingProvider>
  )
}
