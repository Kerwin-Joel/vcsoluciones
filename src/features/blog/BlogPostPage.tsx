import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogPosts } from '@/data/blog'
import { useBooking } from '@/context/BookingContext'
import { Seo } from '@/components/Seo'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)
  const { openModal } = useBooking()
  if (!post) return <Navigate to="/blog" replace />

  return (
    <>
      <Seo title={post.title} description={post.excerpt} />
      <section className="bg-(--color-noir) pt-12 pb-16">
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
              <Link to="/" className="hover:text-white/60 transition-colors">Inicio</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-white/60 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white/70 truncate max-w-xs">{post.title}</span>
            </div>
            <span className="bg-(--color-navy) text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 inline-block">{post.category}</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mt-4 mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-white/40 text-sm">
              <span>VC Soluciones Empresariales</span>
              <span>·</span>
              <span>{new Date(post.date).toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>·</span>
              <span>{post.readTime} min lectura</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container max-w-3xl">
          <img src={post.imageUrl} alt={post.title} className="w-full rounded-2xl mb-10 aspect-video object-cover" />
          <div className="prose prose-lg max-w-none text-(--color-gray-700)">
            <p className="text-lg leading-relaxed text-(--color-gray-700)">{post.excerpt}</p>
            <p className="text-(--color-gray-500) mt-6 leading-relaxed">
              Este artículo está siendo desarrollado. Pronto encontrarás aquí contenido completo sobre {post.title.toLowerCase()}.
            </p>
          </div>

          <div className="mt-12 bg-(--color-navy) rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-3">¿Tienes dudas sobre este tema?</h3>
            <p className="text-white/60 text-sm mb-5">Nuestros especialistas pueden asesorarte. Reserva una cita y resuelve tus dudas.</p>
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 bg-(--color-red) text-white font-bold px-8 py-3.5 rounded-full text-sm hover:bg-(--color-red-dark) transition-colors"
            >
              📅 Reservar una cita
            </button>
          </div>

          <div className="mt-8">
            <Link to="/blog" className="text-(--color-navy) font-semibold text-sm hover:underline flex items-center gap-1">
              ← Volver al blog
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
