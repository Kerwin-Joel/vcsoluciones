import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout } from '@/components/layout/Layout'

const Home = lazy(() => import('@/features/home/HomePage'))
const About = lazy(() => import('@/features/about/AboutPage'))
const Services = lazy(() => import('@/features/services/ServicesPage'))
const ServiceDetail = lazy(() => import('@/features/services/ServiceDetailPage'))
const Blog = lazy(() => import('@/features/blog/BlogPage'))
const BlogPost = lazy(() => import('@/features/blog/BlogPostPage'))
const Contact = lazy(() => import('@/features/contact/ContactPage'))
const FAQ = lazy(() => import('@/features/faq/FAQPage'))
const Privacy = lazy(() => import('@/features/legal/PrivacyPage'))
const Terms = lazy(() => import('@/features/legal/TermsPage'))
const Complaints = lazy(() => import('@/features/legal/ComplaintsPage'))
const NotFound = lazy(() => import('@/features/home/NotFoundPage'))

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="loader-bar" />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
      { path: 'nosotros', element: <Suspense fallback={<PageLoader />}><About /></Suspense> },
      { path: 'servicios', element: <Suspense fallback={<PageLoader />}><Services /></Suspense> },
      { path: 'servicios/:slug', element: <Suspense fallback={<PageLoader />}><ServiceDetail /></Suspense> },
      { path: 'blog', element: <Suspense fallback={<PageLoader />}><Blog /></Suspense> },
      { path: 'blog/:slug', element: <Suspense fallback={<PageLoader />}><BlogPost /></Suspense> },
      { path: 'contacto', element: <Suspense fallback={<PageLoader />}><Contact /></Suspense> },
      { path: 'preguntas-frecuentes', element: <Suspense fallback={<PageLoader />}><FAQ /></Suspense> },
      { path: 'privacidad', element: <Suspense fallback={<PageLoader />}><Privacy /></Suspense> },
      { path: 'terminos', element: <Suspense fallback={<PageLoader />}><Terms /></Suspense> },
      { path: 'libro-reclamaciones', element: <Suspense fallback={<PageLoader />}><Complaints /></Suspense> },
      { path: '*', element: <Suspense fallback={<PageLoader />}><NotFound /></Suspense> },
    ],
  },
])
