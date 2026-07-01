import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-(--color-noir) flex items-center justify-center">
      <Seo title="Página no encontrada" description="La página que buscas no existe o fue movida." noindex />
      <motion.div
        className="text-center px-8"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-8xl font-extrabold text-white/10 mb-4">404</p>
        <h1 className="text-3xl font-extrabold text-white mb-4">Página no encontrada</h1>
        <p className="text-white/50 mb-8">La página que buscas no existe o fue movida.</p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="bg-(--color-navy) text-white font-semibold px-7 py-3 rounded-full text-sm hover:bg-(--color-navy-dark) transition-colors">
            Volver al inicio
          </Link>
          <Link to="/contacto" className="border border-white/20 text-white font-semibold px-7 py-3 rounded-full text-sm hover:border-white/50 transition-colors">
            Contacto
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
