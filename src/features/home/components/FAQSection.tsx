import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarCheck, Phone, Mail, Clock, Plus, X, ArrowUpRight } from 'lucide-react'
import { faqs } from '@/data/faqs'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { PillButton } from '@/components/ui/PillButton'
import { Reveal } from '@/components/ui/Reveal'
import { EASE } from '@/lib/animations'
import { useBooking } from '@/context/BookingContext'

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null)
  const { openModal } = useBooking()

  return (
    <section className="section-py bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-start">

          {/* ── Columna izquierda ─────────────────────────────── */}
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              label="Preguntas Frecuentes"
              title="Todo lo que necesitas saber"
              subtitle="Resolvemos tus dudas más comunes. Si no encuentras lo que buscas, escríbenos directamente."
              centered={false}
            />

            <Reveal delay={0} y={20} blur={8} amount={0.3}>
              <div className="rounded-2xl p-6 border border-gray-100 mb-6" style={{ background: '#f8f9fb' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(26,75,140,0.1)' }}>
                    <CalendarCheck size={18} style={{ color: '#1a4b8c' }} />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#111827' }}>¿Aún tienes dudas?</p>
                    <p className="text-xs" style={{ color: '#6b7280' }}>Respuesta en menos de 2 horas</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mb-5" style={{ color: '#6b7280' }}>
                  Nuestro equipo está disponible de lunes a sábado para responder todas tus preguntas sobre contabilidad, tributación y servicios empresariales.
                </p>
                <PillButton onClick={openModal} variant="navy">
                  Reservar una cita
                </PillButton>
              </div>
            </Reveal>

            <Reveal delay={0.1} y={14} blur={6} amount={0.3}>
              <div className="flex flex-col gap-2.5">
                {[
                  { icon: Phone, label: '+51 972 630 736', href: 'tel:+51972630736' },
                  { icon: Mail,  label: 'contavilo@gmail.com', href: 'mailto:contavilo@gmail.com' },
                  { icon: Clock, label: 'Lun–Vie 8am–6pm · Sáb 8am–1pm', href: undefined },
                ].map(({ icon: Icon, label, href }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <Icon size={13} style={{ color: '#9ca3af' }} />
                    {href ? (
                      <a href={href} className="text-xs hover:text-(--color-navy) transition-colors cursor-pointer" style={{ color: '#6b7280' }}>{label}</a>
                    ) : (
                      <span className="text-xs" style={{ color: '#6b7280' }}>{label}</span>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Acordeón ─────────────────────────────────────── */}
          <div className="flex flex-col gap-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = openId === faq.id
              return (
                <Reveal key={faq.id} delay={idx * 0.05} y={18} blur={8} amount={0.12}>
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
                </Reveal>
              )
            })}

            <Reveal delay={0.15} y={12} blur={4} amount={0.3} className="text-center mt-2">
              <Link
                to="/preguntas-frecuentes"
                className="inline-flex items-center gap-2 text-sm font-bold transition-colors duration-200 hover:underline"
                style={{ color: '#1a4b8c' }}
              >
                Ver todas las preguntas
                <ArrowUpRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
