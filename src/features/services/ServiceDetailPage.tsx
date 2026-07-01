import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BarChart2, Landmark, Users, Building2, TrendingUp,
  ClipboardCheck, ShieldCheck, BookOpen,
  ArrowUpRight, CheckCircle2, AlertTriangle,
  TrendingUp as TrendUp, Shield, Banknote, Clock,
  Phone, Mail, MapPin, ChevronRight,
  type LucideIcon,
} from 'lucide-react'
import { services } from '@/data/services'
import { serviceDetails } from '@/data/serviceDetails'
import { CTASection } from '@/features/home/components/CTASection'
import { Reveal } from '@/components/ui/Reveal'
import { EASE } from '@/lib/animations'
import { useBooking } from '@/context/BookingContext'
import { Seo } from '@/components/Seo'

const iconMap: Record<string, LucideIcon> = {
  BarChart2, Landmark, Users, Building2, TrendingUp,
  ClipboardCheck, ShieldCheck, BookOpen,
}

const BENEFIT_ICONS: LucideIcon[] = [TrendUp, Shield, Banknote, Clock]

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { openModal } = useBooking()
  const service = services.find(s => s.slug === slug)
  if (!service) return <Navigate to="/servicios" replace />

  const detail        = slug ? serviceDetails[slug] ?? null : null
  const recommended   = detail?.recommendedSlug ? services.find(s => s.slug === detail.recommendedSlug) : null
  const RecommIcon    = recommended ? (iconMap[recommended.icon] ?? BarChart2) : null
  const otherServices = services
    .filter(s => s.slug !== slug && s.slug !== detail?.recommendedSlug)
    .slice(0, 3)
  const Icon = iconMap[service.icon] ?? BarChart2

  return (
    <>
      <Seo title={service.title} description={service.shortDesc} />
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20" style={{ background: '#07111f' }}>
        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: [
            `radial-gradient(ellipse 55% 50% at 0% 100%, ${service.color}22 0%, transparent 55%)`,
            'radial-gradient(ellipse 40% 35% at 100% 0%, rgba(229,57,53,0.07) 0%, transparent 50%)',
          ].join(', '),
        }} />
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }} />
        {/* Accent top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
          background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
        }} />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <Reveal delay={0} y={10} blur={4} amount={0.5}>
            <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: 'rgba(255,255,255,0.35)' }}>
              <Link to="/"          className="hover:text-white/60 transition-colors duration-150">Inicio</Link>
              <ChevronRight size={12} />
              <Link to="/servicios" className="hover:text-white/60 transition-colors duration-150">Servicios</Link>
              <ChevronRight size={12} />
              <span style={{ color: 'rgba(255,255,255,0.65)' }}>{service.title}</span>
            </nav>
          </Reveal>

          <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
            {/* Left: headline area */}
            <div>
              {/* Label pill */}
              <Reveal delay={0.04} y={16} blur={6} amount={0.5}>
                <div
                  className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-7"
                  style={{ background: service.color + '18', border: `1px solid ${service.color}35` }}
                >
                  <Icon size={13} style={{ color: service.color }} />
                  <span className="text-xs font-bold uppercase tracking-[0.13em]" style={{ color: service.color }}>
                    Servicio especializado
                  </span>
                </div>
              </Reveal>

              {/* Title */}
              <Reveal delay={0.08} y={28} blur={10} amount={0.4}>
                <h1
                  className="font-extrabold text-white leading-tight mb-5"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}
                >
                  {service.title}
                </h1>
              </Reveal>

              {/* Description */}
              <Reveal delay={0.13} y={18} blur={8} amount={0.4}>
                <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.52)', maxWidth: 580 }}>
                  {service.fullDesc}
                </p>
              </Reveal>

              {/* Hero stats */}
              {detail?.heroStats && (
                <Reveal delay={0.18} y={14} blur={5} amount={0.4}>
                  <div className="flex flex-wrap gap-3 mb-10">
                    {detail.heroStats.map(({ value, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 rounded-2xl px-5 py-3"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
                      >
                        <span className="font-extrabold text-white text-xl leading-none">{value}</span>
                        <span className="text-xs leading-snug" style={{ color: 'rgba(255,255,255,0.38)', maxWidth: 72 }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* CTAs */}
              <Reveal delay={0.22} y={14} blur={5} amount={0.4}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={openModal}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-bold text-sm text-white px-7 py-3.5"
                    style={{ background: 'linear-gradient(135deg, #e53935, #c62828)', boxShadow: '0 6px 24px rgba(229,57,53,0.4)' }}
                    whileHover={{ y: -2, boxShadow: '0 10px 32px rgba(229,57,53,0.55)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.22, ease: EASE }}
                  >
                    Reservar una cita
                    <ArrowUpRight size={15} />
                  </motion.button>
                  <motion.a
                    href="mailto:contavilo@gmail.com"
                    className="inline-flex items-center justify-center gap-2 rounded-full font-bold text-sm px-7 py-3.5"
                    style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.16)' }}
                    whileHover={{ borderColor: 'rgba(255,255,255,0.45)', color: '#fff' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                  >
                    Enviar correo
                  </motion.a>
                </div>
              </Reveal>
            </div>

            {/* Right: decorative large icon */}
            <Reveal delay={0.1} y={24} blur={10} amount={0.3} className="hidden lg:flex items-center justify-center">
              <div
                className="w-52 h-52 rounded-3xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${service.color}18, ${service.color}08)`,
                  border: `1px solid ${service.color}25`,
                  boxShadow: `0 32px 80px ${service.color}18`,
                }}
              >
                <Icon size={80} style={{ color: service.color, opacity: 0.7 }} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ¿QUÉ INCLUYE? ───────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">

            {/* Feature list */}
            <div>
              <Reveal delay={0} y={20} blur={8} amount={0.2}>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
                  style={{ background: 'rgba(26,75,140,0.07)', border: '1px solid rgba(26,75,140,0.15)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#1a4b8c' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: '#1a4b8c' }}>
                    ¿Qué incluye?
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.05} y={22} blur={8} amount={0.2}>
                <h2 className="font-extrabold leading-tight mb-9" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: '#0f2d5c' }}>
                  Todo lo que obtienes con este servicio
                </h2>
              </Reveal>

              <ul className="space-y-3">
                {service.features.map((f, i) => (
                  <Reveal key={f} delay={i * 0.06} y={14} blur={5} amount={0.15}>
                    <li className="flex items-start gap-4 rounded-2xl p-4" style={{ background: '#f8f9fb', border: '1px solid #e5e7eb' }}>
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: service.color + '14', border: `1px solid ${service.color}28` }}
                      >
                        <CheckCircle2 size={15} style={{ color: service.color }} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: '#111827' }}>{f}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* Sticky contact card */}
            <div className="lg:sticky lg:top-28">
              <Reveal delay={0.08} y={28} blur={10} amount={0.15}>
                <div
                  className="rounded-3xl p-7 text-white"
                  style={{
                    background: 'linear-gradient(145deg, #0c1e3e 0%, #1a4b8c 100%)',
                    boxShadow: '0 24px 64px rgba(15,45,92,0.3)',
                  }}
                >
                  {/* Header */}
                  <div className="mb-5 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      ¿Te interesa?
                    </p>
                    <h3 className="font-extrabold text-lg leading-snug">
                      Reserva una cita
                    </h3>
                    <p className="text-xs mt-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>
                      Cuéntanos sobre tu empresa y te preparamos una propuesta personalizada sin compromiso.
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-2.5 mb-5">
                    <motion.button
                      onClick={openModal}
                      className="flex items-center justify-center gap-2 w-full rounded-full font-bold text-sm py-3.5 text-white"
                      style={{ background: 'linear-gradient(135deg, #e53935, #c62828)' }}
                      whileHover={{ y: -1, boxShadow: '0 8px 24px rgba(229,57,53,0.45)' }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    >
                      Reservar mi cita
                      <ArrowUpRight size={14} />
                    </motion.button>
                    <motion.a
                      href="mailto:contavilo@gmail.com"
                      className="flex items-center justify-center gap-2 w-full rounded-full font-semibold text-sm py-3.5"
                      style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.75)' }}
                      whileHover={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                    >
                      Enviar correo
                    </motion.a>
                  </div>

                  {/* Contact details */}
                  <div className="space-y-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
                    {[
                      { icon: Phone,  text: '+51 972 630 736',            href: 'tel:+51972630736' },
                      { icon: Mail,   text: 'contavilo@gmail.com',         href: 'mailto:contavilo@gmail.com' },
                      { icon: MapPin, text: 'Pasaje Unión 105, Jaén',      href: undefined },
                      { icon: Clock,  text: 'Lun–Vie 8am–6pm · Sáb 8am–1pm', href: undefined },
                    ].map(({ icon: I, text, href }) => (
                      <div key={text} className="flex items-center gap-2.5">
                        <I size={12} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                        {href ? (
                          <a href={href} className="text-xs hover:text-white transition-colors duration-150" style={{ color: 'rgba(255,255,255,0.45)' }}>{text}</a>
                        ) : (
                          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{text}</span>
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

      {/* ── BENEFICIOS ───────────────────────────────────────────── */}
      {detail?.benefits && (
        <section className="section-py" style={{ background: '#f8f9fb' }}>
          <div className="container">
            <Reveal delay={0} y={20} blur={8} amount={0.2} className="text-center mb-12">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
                style={{ background: service.color + '10', border: `1px solid ${service.color}25` }}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: service.color }} />
                <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: service.color }}>
                  Por qué contratarlo
                </span>
              </div>
              <h2 className="font-extrabold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#0f2d5c' }}>
                Los beneficios que obtienes
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-5">
              {detail.benefits.map(({ title, desc }, i) => {
                const BIcon = BENEFIT_ICONS[i % BENEFIT_ICONS.length]
                return (
                  <Reveal key={title} delay={i * 0.07} y={22} blur={8} amount={0.12}>
                    <div
                      className="relative rounded-2xl p-6 h-full overflow-hidden"
                      style={{ background: '#fff', border: '1px solid #e5e7eb' }}
                    >
                      {/* Faded number */}
                      <span
                        className="absolute bottom-3 right-5 font-black select-none pointer-events-none leading-none"
                        style={{ fontSize: '5rem', color: service.color + '08' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: service.color + '12', border: `1px solid ${service.color}22` }}
                      >
                        <BIcon size={20} style={{ color: service.color }} />
                      </div>
                      <h3 className="font-bold text-sm mb-2" style={{ color: '#111827' }}>{title}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── ¿PARA QUIÉN ES? ──────────────────────────────────────── */}
      {detail?.targetAudience && (
        <section className="section-py bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-center">

              {/* Left: heading */}
              <div>
                <Reveal delay={0} y={20} blur={8} amount={0.2}>
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
                    style={{ background: 'rgba(26,75,140,0.07)', border: '1px solid rgba(26,75,140,0.15)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#1a4b8c' }} />
                    <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: '#1a4b8c' }}>
                      ¿Para quién es?
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={0.05} y={22} blur={8} amount={0.2}>
                  <h2 className="font-extrabold leading-tight mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#0f2d5c' }}>
                    Este servicio está diseñado para ti si...
                  </h2>
                </Reveal>
                <Reveal delay={0.1} y={16} blur={6} amount={0.2}>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                    Trabajamos con empresas de todos los tamaños en Jaén y el norte del Perú. Estos son los perfiles que más se benefician de este servicio.
                  </p>
                </Reveal>
              </div>

              {/* Right: audience list */}
              <div className="space-y-3">
                {detail.targetAudience.map(({ label, desc }, i) => (
                  <Reveal key={label} delay={i * 0.06} y={16} blur={6} amount={0.12}>
                    <div
                      className="flex items-start gap-4 rounded-2xl p-4"
                      style={{ background: '#f8f9fb', border: '1px solid #e5e7eb' }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: service.color + '12' }}
                      >
                        <CheckCircle2 size={15} style={{ color: service.color }} />
                      </div>
                      <div>
                        <p className="font-bold text-sm mb-0.5" style={{ color: '#111827' }}>{label}</p>
                        <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── POR QUÉ IMPORTA / RIESGOS ───────────────────────────── */}
      {detail && (
        <section className="section-py relative overflow-hidden" style={{ background: '#07111f' }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(ellipse 50% 60% at 100% 50%, rgba(229,57,53,0.08) 0%, transparent 55%)',
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }} />

          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

              {/* Left: why it matters */}
              <div>
                <Reveal delay={0} y={20} blur={8} amount={0.2}>
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-white/40" />
                    <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Por qué importa
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={0.05} y={22} blur={8} amount={0.2}>
                  <h2 className="font-extrabold text-white leading-tight mb-6" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}>
                    Lo que debes saber sobre este servicio
                  </h2>
                </Reveal>
                <Reveal delay={0.1} y={16} blur={6} amount={0.2}>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {detail.whyItMatters}
                  </p>
                </Reveal>

                <Reveal delay={0.16} y={14} blur={5} amount={0.2}>
                  <motion.button
                    onClick={openModal}
                    className="inline-flex items-center gap-2 rounded-full font-bold text-sm text-white px-6 py-3 mt-8"
                    style={{ background: service.color, boxShadow: `0 6px 24px ${service.color}44` }}
                    whileHover={{ y: -2, boxShadow: `0 12px 32px ${service.color}55` }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    Reservar una cita
                    <ArrowUpRight size={14} />
                  </motion.button>
                </Reveal>
              </div>

              {/* Right: risks without the service */}
              <div>
                <Reveal delay={0} y={20} blur={8} amount={0.2}>
                  <div
                    className="rounded-2xl p-6"
                    style={{ background: 'rgba(229,57,53,0.06)', border: '1px solid rgba(229,57,53,0.2)' }}
                  >
                    <div className="flex items-center gap-2.5 mb-5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(229,57,53,0.15)' }}>
                        <AlertTriangle size={16} style={{ color: '#e53935' }} />
                      </div>
                      <p className="font-bold text-sm text-white">Sin este servicio te arriesgas a...</p>
                    </div>
                    <ul className="space-y-3">
                      {detail.risksWithout.map((risk, i) => (
                        <Reveal key={risk} delay={i * 0.05} y={10} blur={4} amount={0.15}>
                          <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#e53935' }} />
                            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{risk}</p>
                          </li>
                        </Reveal>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SERVICIO RECOMENDADO ─────────────────────────────────── */}
      {recommended && RecommIcon && (
        <section className="section-py bg-white">
          <div className="container">
            <Reveal delay={0} y={18} blur={7} amount={0.15} className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: '#9ca3af' }}>
                Complementa tu servicio
              </p>
              <h2 className="font-extrabold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#0f2d5c' }}>
                También te recomendamos
              </h2>
            </Reveal>

            <Reveal delay={0.06} y={28} blur={10} amount={0.12}>
              <Link to={`/servicios/${recommended.slug}`} className="block group">
                <motion.div
                  className="grid lg:grid-cols-[auto_1fr_auto] gap-8 items-center rounded-3xl p-8 lg:p-10"
                  style={{ background: 'linear-gradient(135deg, #07111f, #0f2d5c)', boxShadow: '0 24px 64px rgba(15,45,92,0.2)' }}
                  whileHover={{ y: -4, boxShadow: '0 32px 80px rgba(15,45,92,0.28)' }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  {/* Icon */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background: recommended.color + '18',
                      border: `1px solid ${recommended.color}30`,
                    }}
                  >
                    <RecommIcon size={36} style={{ color: recommended.color }} />
                  </div>

                  {/* Content */}
                  <div>
                    <div
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3"
                      style={{ background: recommended.color + '15', border: `1px solid ${recommended.color}28` }}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: recommended.color }}>
                        Recomendado para ti
                      </span>
                    </div>
                    <h3 className="font-extrabold text-white text-xl mb-2">{recommended.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{recommended.shortDesc}</p>
                    <div className="flex flex-wrap gap-2">
                      {recommended.features.slice(0, 3).map(f => (
                        <span
                          key={f}
                          className="text-[10px] px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow CTA */}
                  <div className="hidden lg:flex flex-col items-center gap-2 shrink-0">
                    <motion.div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: recommended.color + '20', border: `1.5px solid ${recommended.color}40` }}
                      whileHover={{ scale: 1.1, background: recommended.color, borderColor: recommended.color }}
                      transition={{ duration: 0.2, ease: EASE }}
                    >
                      <ArrowUpRight size={22} style={{ color: 'rgba(255,255,255,0.6)' }} />
                    </motion.div>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Ver servicio</span>
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── OTROS SERVICIOS ──────────────────────────────────────── */}
      {otherServices.length > 0 && (
        <section className="section-py" style={{ background: '#f8f9fb' }}>
          <div className="container">
            <Reveal delay={0} y={16} blur={6} amount={0.2} className="mb-8">
              <h2 className="font-extrabold" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', color: '#0f2d5c' }}>
                Más servicios disponibles
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherServices.map((s, i) => {
                const OIcon = iconMap[s.icon] ?? BarChart2
                return (
                  <Reveal key={s.id} delay={i * 0.07} y={18} blur={6} amount={0.12}>
                    <Link to={`/servicios/${s.slug}`} className="block group h-full">
                      <motion.div
                        className="flex items-start gap-4 rounded-2xl p-5 h-full bg-white"
                        style={{ border: '1px solid #e5e7eb' }}
                        whileHover={{ y: -3, boxShadow: `0 12px 36px ${s.color}18`, borderColor: s.color + '40' }}
                        transition={{ duration: 0.22, ease: EASE }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: s.color + '12', border: `1px solid ${s.color}22` }}
                        >
                          <OIcon size={18} style={{ color: s.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm mb-1 leading-snug" style={{ color: '#111827' }}>{s.title}</p>
                          <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{s.shortDesc}</p>
                        </div>
                        <ArrowUpRight size={14} className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: s.color }} />
                      </motion.div>
                    </Link>
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={0.24} y={12} blur={4} amount={0.3} className="text-center mt-8">
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 text-sm font-bold transition-colors duration-200 hover:underline"
                style={{ color: '#1a4b8c' }}
              >
                Ver todos los servicios
                <ArrowUpRight size={14} />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}
