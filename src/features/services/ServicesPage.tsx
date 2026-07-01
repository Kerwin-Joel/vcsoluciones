import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  BarChart2, Landmark, Users, Building2, TrendingUp,
  ClipboardCheck, ShieldCheck, BookOpen, ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import { services } from '@/data/services'
import { CTASection } from '@/features/home/components/CTASection'
import { Reveal } from '@/components/ui/Reveal'
import { EASE, staggerContainer, staggerItem } from '@/lib/animations'
import { Seo } from '@/components/Seo'

const iconMap: Record<string, LucideIcon> = {
  BarChart2, Landmark, Users, Building2, TrendingUp,
  ClipboardCheck, ShieldCheck, BookOpen,
}

const stats = [
  { value: '+7',  label: 'Años de experiencia' },
  { value: '+30', label: 'Clientes atendidos' },
  { value: '8',   label: 'Servicios especializados' },
  { value: '0',   label: 'Multas en nuestra gestión' },
]

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Servicios Contables y Tributarios"
        description="Contabilidad general, declaraciones SUNAT, planilla, constitución de empresas y asesoría tributaria en Jaén. El servicio que tu empresa necesita."
      />
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-24" style={{ background: '#07111f' }}>
        {/* Gradient blobs */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: [
            'radial-gradient(ellipse 60% 50% at 0% 100%, rgba(26,75,140,0.2) 0%, transparent 55%)',
            'radial-gradient(ellipse 40% 35% at 100% 0%, rgba(229,57,53,0.09) 0%, transparent 50%)',
          ].join(', '),
        }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }} />
        {/* Accent top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
          background: 'linear-gradient(90deg, transparent, #1a4b8c, #e53935, transparent)',
        }} />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div className="max-w-2xl">
              <Reveal delay={0} y={16} blur={6} amount={0.5}>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7"
                  style={{ background: 'rgba(26,75,140,0.12)', border: '1px solid rgba(26,75,140,0.3)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#4f86e8' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: '#4f86e8' }}>
                    Nuestros servicios
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.06} y={26} blur={10} amount={0.4}>
                <h1
                  className="font-extrabold text-white leading-tight mb-6"
                  style={{ fontSize: 'clamp(2.1rem, 5vw, 3.4rem)' }}
                >
                  Soluciones contables para{' '}
                  <span style={{ color: '#e53935' }}>cada etapa</span> de tu empresa
                </h1>
              </Reveal>

              <Reveal delay={0.12} y={18} blur={8} amount={0.4}>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>
                  Desde la constitución de tu empresa hasta la declaración anual, en VC Soluciones tenemos el servicio que necesitas.
                </p>
              </Reveal>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 lg:w-[280px]">
              {stats.map(({ value, label }, i) => (
                <Reveal key={label} delay={0.18 + i * 0.05} y={14} blur={5} amount={0.3}>
                  <div
                    className="rounded-2xl px-5 py-4"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <p className="text-2xl font-extrabold text-white leading-none mb-1.5">{value}</p>
                    <p className="text-[11px] leading-snug" style={{ color: 'rgba(255,255,255,0.36)' }}>{label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ───────────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="container">
          <Reveal delay={0} y={20} blur={8} amount={0.2} className="mb-12">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
              style={{ background: 'rgba(26,75,140,0.07)', border: '1px solid rgba(26,75,140,0.15)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#1a4b8c' }} />
              <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: '#1a4b8c' }}>
                Catálogo completo
              </span>
            </div>
            <h2 className="font-extrabold leading-tight" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', color: '#0f2d5c' }}>
              ¿En qué podemos ayudarte?
            </h2>
          </Reveal>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {services.map((service) => {
              const Icon = iconMap[service.icon] ?? BarChart2
              return (
                <motion.div key={service.id} variants={staggerItem}>
                  <Link to={`/servicios/${service.slug}`} className="block group h-full">
                    <motion.div
                      className="relative h-full rounded-2xl p-8 overflow-hidden"
                      style={{ background: '#f8f9fb', border: '1px solid #e5e7eb' }}
                      whileHover={{ y: -6, boxShadow: `0 20px 48px ${service.color}22`, borderColor: service.color + '40' }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      {/* Faded number watermark */}
                      <span
                        className="absolute bottom-2 right-4 font-black select-none pointer-events-none leading-none"
                        style={{ fontSize: '5.5rem', color: service.color + '08' }}
                      >
                        {service.id.padStart(2, '0')}
                      </span>

                      <div className="relative z-10">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                          style={{ background: service.color + '14', border: `1px solid ${service.color}28` }}
                        >
                          <Icon size={24} style={{ color: service.color }} />
                        </div>

                        <h3 className="text-lg font-bold mb-3 transition-colors duration-300" style={{ color: '#111827' }}>
                          {service.title}
                        </h3>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: '#6b7280' }}>
                          {service.shortDesc}
                        </p>
                        <ul className="space-y-1.5 mb-6">
                          {service.features.slice(0, 3).map((f) => (
                            <li key={f} className="flex items-center gap-2 text-xs" style={{ color: '#6b7280' }}>
                              <span className="w-1 h-1 rounded-full shrink-0" style={{ background: service.color }} />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <div className="flex items-center gap-2 text-xs font-bold" style={{ color: service.color }}>
                          Ver servicio
                          <motion.span
                            className="w-7 h-7 rounded-full flex items-center justify-center"
                            style={{ background: service.color + '14' }}
                            whileHover={{ x: 2 }}
                          >
                            <ArrowUpRight size={13} />
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
