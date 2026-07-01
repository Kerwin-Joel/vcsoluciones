import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  BarChart2, Landmark, Users, Building2, TrendingUp,
  ClipboardCheck, ShieldCheck, BookOpen, ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import { services } from '@/data/services'
import { Reveal } from '@/components/ui/Reveal'
import { EASE as E } from '@/lib/animations'

const iconMap: Record<string, LucideIcon> = {
  BarChart2, Landmark, Users, Building2, TrendingUp,
  ClipboardCheck, ShieldCheck, BookOpen,
}

const stats = [
  { value: '+7',   label: 'Años de\nexperiencia' },
  { value: '+30',  label: 'Clientes\natendidos' },
  { value: '8',    label: 'Servicios\nespecializados' },
  { value: '0',    label: 'Multas en\nnuestra gestión' },
]

const ROW_VARIANTS = {
  rest:  { backgroundColor: 'rgba(255,255,255,0)',     transition: { duration: 0.22, ease: E } },
  hover: { backgroundColor: 'rgba(255,255,255,0.028)', transition: { duration: 0.22, ease: E } },
}

const ACCENT_VARIANTS = {
  rest:  { scaleY: 0, transition: { duration: 0.2, ease: E } },
  hover: { scaleY: 1, transition: { duration: 0.2, ease: E } },
}

const ARROW_VARIANTS = {
  rest:  { x: 0, y: 0,  transition: { duration: 0.22, ease: E } },
  hover: { x: 3, y: -3, transition: { duration: 0.22, ease: E } },
}

const ICON_VARIANTS = {
  rest:  { scale: 1,    transition: { duration: 0.2, ease: E } },
  hover: { scale: 1.12, transition: { duration: 0.2, ease: E } },
}

export function ServicesSection() {
  return (
    <section className="section-py relative overflow-hidden" style={{ background: '#07111f' }}>
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: [
          'radial-gradient(ellipse 65% 55% at 5% 85%, rgba(26,75,140,0.16) 0%, transparent 55%)',
          'radial-gradient(ellipse 45% 40% at 95% 15%, rgba(229,57,53,0.09) 0%, transparent 50%)',
        ].join(', '),
      }} />
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
      }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[360px_1fr] gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Editorial sidebar ───────────────────── */}
          <div className="lg:sticky lg:top-28">

            {/* Label */}
            <Reveal delay={0} y={18} blur={6} amount={0.2}>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
                style={{ background: 'rgba(26,75,140,0.12)', border: '1px solid rgba(26,75,140,0.3)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#4f86e8' }} />
                <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: '#4f86e8' }}>
                  Nuestros Servicios
                </span>
              </div>
            </Reveal>

            {/* Title */}
            <Reveal delay={0.06} y={24} blur={10} amount={0.2}>
              <h2
                className="font-extrabold text-white leading-tight mb-5"
                style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)' }}
              >
                Todo lo que tu empresa necesita,{' '}
                <span style={{ color: '#e53935' }}>en un solo lugar</span>
              </h2>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.1} y={16} blur={7} amount={0.2}>
              <p className="text-sm leading-relaxed mb-9" style={{ color: 'rgba(255,255,255,0.44)' }}>
                Cubrimos todas las obligaciones contables y tributarias de tu negocio para que te concentres en lo que realmente importa: crecer.
              </p>
            </Reveal>

            {/* Stats 2×2 */}
            <div className="grid grid-cols-2 gap-2.5 mb-9">
              {stats.map(({ value, label }, i) => (
                <Reveal key={label} delay={0.14 + i * 0.05} y={14} blur={5} amount={0.2}>
                  <div
                    className="rounded-2xl px-5 py-4"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <p className="text-2xl font-extrabold text-white leading-none mb-1.5">{value}</p>
                    <p className="text-[11px] leading-snug whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.36)' }}>
                      {label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* CTA */}
            <Reveal delay={0.36} y={14} blur={5} amount={0.2}>
              <motion.div
                whileHover={{ y: -2, boxShadow: '0 12px 36px rgba(26,75,140,0.55)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.22, ease: E }}
                className="inline-block rounded-full"
                style={{ boxShadow: '0 6px 22px rgba(26,75,140,0.38)' }}
              >
                <Link
                  to="/servicios"
                  className="inline-flex items-center gap-2.5 rounded-full font-bold text-sm text-white px-7 py-3.5"
                  style={{ background: 'linear-gradient(135deg, #1a4b8c, #0f2d5c)' }}
                >
                  Ver todos los servicios
                  <ArrowUpRight size={15} />
                </Link>
              </motion.div>
            </Reveal>

            {/* Fine print */}
            <Reveal delay={0.42} y={10} blur={4} amount={0.2}>
              <p className="text-[11px] mt-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.2)' }}>
                Reserva tu cita en línea · Atención personalizada<br />
                Lun–Vie 8am–6pm · Sáb 8am–1pm
              </p>
            </Reveal>
          </div>

          {/* ── RIGHT: Service rows ──────────────────────── */}
          <div>
            {services.map((service, idx) => {
              const Icon = iconMap[service.icon] ?? BarChart2
              const isLast = idx === services.length - 1

              return (
                <Reveal key={service.id} delay={idx * 0.04} y={14} blur={5} amount={0.06}>
                  <Link to={`/servicios/${service.slug}`} className="block">
                    <motion.div
                      className="relative flex items-center gap-4 py-5 px-4 -mx-4 rounded-2xl"
                      style={!isLast ? { borderBottom: '1px solid rgba(255,255,255,0.055)' } : {}}
                      initial="rest"
                      whileHover="hover"
                      variants={ROW_VARIANTS}
                    >
                      {/* Left accent line — Framer variant propagation */}
                      <motion.div
                        className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full"
                        style={{ background: service.color, originY: 0.5 }}
                        variants={ACCENT_VARIANTS}
                      />

                      {/* Index number */}
                      <span
                        className="font-mono text-xs font-bold tabular-nums shrink-0 w-5 text-right select-none"
                        style={{ color: 'rgba(255,255,255,0.16)' }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      {/* Icon badge */}
                      <motion.div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: service.color + '14',
                          border: `1px solid ${service.color}2a`,
                        }}
                        variants={ICON_VARIANTS}
                      >
                        <Icon size={19} style={{ color: service.color }} />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[13px] text-white leading-snug mb-0.5">
                          {service.title}
                        </p>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: 'rgba(255,255,255,0.4)' }}
                        >
                          {service.shortDesc}
                        </p>
                        {/* Feature pills — sm+ only */}
                        <div className="hidden sm:flex flex-wrap gap-1.5 mt-2.5">
                          {service.features.slice(0, 2).map(f => (
                            <span
                              key={f}
                              className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{
                                background: 'rgba(255,255,255,0.045)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                color: 'rgba(255,255,255,0.3)',
                              }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow — Framer variant propagation */}
                      <motion.div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                        variants={ARROW_VARIANTS}
                      >
                        <ArrowUpRight size={14} style={{ color: 'rgba(255,255,255,0.32)' }} />
                      </motion.div>
                    </motion.div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
