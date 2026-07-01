import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, X, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react'
import { faqs } from '@/data/faqs'
import { Reveal } from '@/components/ui/Reveal'
import { CTASection } from '@/features/home/components/CTASection'
import { EASE } from '@/lib/animations'
import { useBooking } from '@/context/BookingContext'
import { Seo } from '@/components/Seo'

export default function FAQPage() {
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)
  const { openModal } = useBooking()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return faqs
    return faqs.filter(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q))
  }, [query])

  return (
    <>
      <Seo
        title="Preguntas Frecuentes"
        description="Resolvemos tus dudas sobre contabilidad, SUNAT, planilla y constitución de empresas en Perú."
      />
      {/* Hero */}
      <section className="bg-(--color-noir) pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }} />
        <div className="container relative z-10">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Preguntas Frecuentes</p>
            <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
              Todo lo que necesitas saber
            </h1>
            <p className="text-white/60 text-lg mb-9">
              Resolvemos tus dudas más comunes sobre contabilidad, tributación y nuestros servicios. Si no encuentras lo que buscas, escríbenos directamente.
            </p>

            <div
              className="flex items-center gap-3 rounded-2xl px-5 py-4"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <Search size={18} style={{ color: 'rgba(255,255,255,0.4)' }} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Busca una pregunta…"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} aria-label="Limpiar búsqueda">
                  <X size={16} style={{ color: 'rgba(255,255,255,0.4)' }} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-py bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">

            {/* Accordion list */}
            <div className="flex flex-col gap-2.5">
              <AnimatePresence mode="popLayout">
                {filtered.map((faq, idx) => {
                  const isOpen = openId === faq.id
                  return (
                    <motion.div
                      key={faq.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: EASE, delay: idx * 0.03 }}
                    >
                      <div
                        className="rounded-2xl overflow-hidden border bg-white"
                        style={{ borderColor: isOpen ? '#1a4b8c' : '#e5e7eb' }}
                      >
                        <button
                          onClick={() => setOpenId(isOpen ? null : faq.id)}
                          className="w-full text-left flex items-center gap-4 px-6 py-5 cursor-pointer"
                          aria-expanded={isOpen}
                        >
                          <motion.div
                            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                            animate={{ background: isOpen ? 'linear-gradient(135deg, #1a4b8c, #0f2d5c)' : '#f3f4f6' }}
                            transition={{ duration: 0.2 }}
                          >
                            <AnimatePresence mode="wait" initial={false}>
                              {isOpen
                                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                                    <X size={13} className="text-white" />
                                  </motion.span>
                                : <motion.span key="p" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                                    <Plus size={13} style={{ color: '#6b7280' }} />
                                  </motion.span>
                              }
                            </AnimatePresence>
                          </motion.div>
                          <span className="font-semibold text-sm flex-1 text-left leading-snug" style={{ color: '#111827' }}>
                            {faq.question}
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: EASE }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div className="px-6 pb-5 text-sm leading-relaxed border-t" style={{ color: '#6b7280', borderColor: '#f3f4f6' }}>
                                <p className="pt-4">{faq.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {filtered.length === 0 && (
                <div className="text-center py-16 rounded-2xl" style={{ background: '#f8f9fb', border: '1px solid #e5e7eb' }}>
                  <p className="font-bold text-sm mb-2" style={{ color: '#111827' }}>Sin resultados para "{query}"</p>
                  <p className="text-sm" style={{ color: '#6b7280' }}>Prueba con otras palabras o contáctanos directamente.</p>
                </div>
              )}
            </div>

            {/* Sticky contact card */}
            <div className="lg:sticky lg:top-28">
              <Reveal delay={0} y={20} blur={8} amount={0.2}>
                <div
                  className="rounded-2xl p-6 border border-gray-100"
                  style={{ background: '#f8f9fb' }}
                >
                  <p className="font-bold text-sm mb-1" style={{ color: '#111827' }}>¿Aún tienes dudas?</p>
                  <p className="text-xs leading-relaxed mb-5" style={{ color: '#6b7280' }}>
                    Nuestro equipo está disponible de lunes a sábado para responder todas tus preguntas.
                  </p>

                  <motion.button
                    onClick={openModal}
                    className="flex items-center justify-center gap-2 w-full rounded-full font-bold text-sm text-white py-3.5 mb-5"
                    style={{ background: 'linear-gradient(135deg, #1a4b8c, #0f2d5c)' }}
                    whileHover={{ y: -1, boxShadow: '0 8px 24px rgba(15,45,92,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    Reservar una cita
                    <ArrowUpRight size={14} />
                  </motion.button>

                  <div className="flex flex-col gap-2.5" style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.1rem' }}>
                    {[
                      { icon: Phone, label: '+51 972 630 736', href: 'tel:+51972630736' },
                      { icon: Mail,  label: 'contavilo@gmail.com', href: 'mailto:contavilo@gmail.com' },
                      { icon: Clock, label: 'Lun–Vie 8am–6pm · Sáb 8am–1pm', href: undefined },
                    ].map(({ icon: Icon, label, href }) => (
                      <div key={label} className="flex items-center gap-2.5">
                        <Icon size={13} style={{ color: '#9ca3af' }} />
                        {href ? (
                          <a href={href} className="text-xs hover:text-(--color-navy) transition-colors" style={{ color: '#6b7280' }}>{label}</a>
                        ) : (
                          <span className="text-xs" style={{ color: '#6b7280' }}>{label}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
