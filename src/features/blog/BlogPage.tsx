import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { blogPosts } from '@/data/blog'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { Seo } from '@/components/Seo'

export default function BlogPage() {
  return (
    <>
      <Seo
        title="Blog Contable y Tributario"
        description="Artículos prácticos sobre tributación, contabilidad y gestión empresarial en Perú, escritos por el equipo de VC Soluciones Empresariales."
      />
      <section className="bg-(--color-noir) pt-12 pb-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="section-label">Blog</p>
            <h1 className="text-5xl font-extrabold text-white mb-5">Tips contables y tributarios para tu empresa</h1>
            <p className="text-white/60 text-lg max-w-xl">Artículos prácticos sobre tributación, contabilidad y gestión empresarial en Perú.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-py bg-(--color-gray-100)">
        <div className="container">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {blogPosts.map((post) => (
              <motion.article key={post.id} variants={staggerItem}>
                <Link to={`/blog/${post.slug}`} className="block group bg-white rounded-2xl overflow-hidden hover:shadow-[0_16px_40px_rgba(26,75,140,0.12)] transition-all duration-300">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-(--color-navy) text-white text-xs font-bold px-3 py-1.5 rounded-full">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-(--color-gray-500) mb-3">
                      <span>{new Date(post.date).toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span>·</span>
                      <span>{post.readTime} min lectura</span>
                    </div>
                    <h2 className="font-bold text-(--color-dark) text-base leading-snug mb-3 group-hover:text-(--color-navy) transition-colors">{post.title}</h2>
                    <p className="text-sm text-(--color-gray-500) leading-relaxed">{post.excerpt}</p>
                    <div className="mt-4 text-(--color-navy) text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Leer más <span>→</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
