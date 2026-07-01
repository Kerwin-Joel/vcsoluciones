import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, ChevronRight, CalendarCheck } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { EASE } from '@/lib/animations'
import { useBooking } from '@/context/BookingContext'

const services = [
  { label: 'Contabilidad General',     href: '/servicios/contabilidad-general' },
  { label: 'Tributación / SUNAT',      href: '/servicios/tributacion-sunat' },
  { label: 'Planillas y RR.HH.',       href: '/servicios/planillas-rrhh' },
  { label: 'Constitución de Empresas', href: '/servicios/constitucion-empresas' },
  { label: 'Asesoría Tributaria',      href: '/servicios/asesoria-tributaria' },
  { label: 'Auditoría',                href: '/servicios/auditoria' },
]

const quickLinks = [
  { label: 'Inicio',    href: '/' },
  { label: 'Nosotros',  href: '/nosotros' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Blog',      href: '/blog' },
  { label: 'Preguntas Frecuentes', href: '/preguntas-frecuentes' },
  { label: 'Contacto',  href: '/contacto' },
]

const contactItems = [
  { icon: MapPin, title: 'Oficina',             detail: 'Pasaje Unión N° 105\nMorro Solar, Jaén', href: undefined },
  { icon: Phone,  title: 'Teléfono',            detail: '+51 972 630 736',                         href: 'tel:+51972630736' },
  { icon: Mail,   title: 'Correo',              detail: 'contavilo@gmail.com',                     href: 'mailto:contavilo@gmail.com' },
  { icon: Clock,  title: 'Horario',             detail: 'Lun–Vie: 8am – 6pm\nSáb: 8am – 1pm',    href: undefined },
]

export function Footer() {
  const { openModal } = useBooking()
  return (
    <footer style={{ background: '#0d0f14', color: '#fff' }}>
      <div className="container section-py">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ── Brand ─────────────────────────────────────── */}
          <div>
            {/* Logo + nombre */}
            <Reveal delay={0} y={28} blur={10} amount={0.15}>
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-sm"
                  style={{ background: 'linear-gradient(135deg, #1a4b8c, #0f2d5c)' }}
                >
                  VC
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white leading-none">
                    Soluciones<span style={{ color: '#e53935' }}> Empresariales</span>
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>S.A.C.</p>
                </div>
              </div>
            </Reveal>

            {/* Descripción */}
            <Reveal delay={0.06} y={20} blur={8} amount={0.15}>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Asesoramiento contable, tributario y financiero con más de 7 años de experiencia al servicio de empresas en Jaén y el norte del Perú.
              </p>
            </Reveal>

            {/* Social icons */}
            <Reveal delay={0.12} y={16} blur={6} amount={0.15}>
              <div className="flex gap-2">
                <motion.button
                  onClick={openModal}
                  className="w-9 h-9 rounded-full glass-dark flex items-center justify-center hover:bg-red-500/20 transition-colors duration-200"
                  aria-label="Reservar una cita"
                  whileHover={{ scale: 1.14, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <CalendarCheck size={15} style={{ color: '#e53935' }} />
                </motion.button>
                <motion.a
                  href="mailto:contavilo@gmail.com"
                  className="w-9 h-9 rounded-full glass-dark flex items-center justify-center hover:bg-blue-500/20 transition-colors duration-200"
                  aria-label="Email"
                  whileHover={{ scale: 1.14, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <Mail size={15} style={{ color: '#60a5fa' }} />
                </motion.a>
              </div>
            </Reveal>
          </div>

          {/* ── Servicios ─────────────────────────────────── */}
          <div>
            <Reveal delay={0} y={24} blur={8} amount={0.15}>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Servicios
              </h4>
            </Reveal>
            <ul className="flex flex-col gap-2.5">
              {services.map((s, i) => (
                <Reveal key={s.href} delay={i * 0.045} y={14} blur={5} amount={0.15}>
                  <li>
                    <Link
                      to={s.href}
                      className="group flex items-center gap-2 text-sm transition-colors duration-200"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                    >
                      <ChevronRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" style={{ color: 'rgba(255,255,255,0.25)' }} />
                      <span className="group-hover:text-white transition-colors duration-200">{s.label}</span>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* ── Navegación ────────────────────────────────── */}
          <div>
            <Reveal delay={0} y={24} blur={8} amount={0.15}>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Navegación
              </h4>
            </Reveal>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((l, i) => (
                <Reveal key={l.href} delay={i * 0.05} y={14} blur={5} amount={0.15}>
                  <li>
                    <Link
                      to={l.href}
                      className="group flex items-center gap-2 text-sm transition-colors duration-200"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                    >
                      <ChevronRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" style={{ color: 'rgba(255,255,255,0.25)' }} />
                      <span className="group-hover:text-white transition-colors duration-200">{l.label}</span>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* ── Contacto ──────────────────────────────────── */}
          <div>
            <Reveal delay={0} y={24} blur={8} amount={0.15}>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Contacto
              </h4>
            </Reveal>
            <ul className="flex flex-col gap-4">
              {contactItems.map(({ icon: Icon, title, detail, href }, i) => (
                <Reveal key={title} delay={i * 0.06} y={16} blur={6} amount={0.12}>
                  <li className="flex gap-3">
                    <div className="w-7 h-7 rounded-lg glass-dark flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={13} style={{ color: '#e53935' }} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold mb-0.5">{title}</p>
                      {href ? (
                        <a href={href} className="text-xs hover:text-white transition-colors duration-200 whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.45)' }}>
                          {detail}
                        </a>
                      ) : (
                        <p className="text-xs whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.45)' }}>{detail}</p>
                      )}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────── */}
      <Reveal delay={0} y={12} blur={4} amount={0.8} className="border-t border-white/[0.05]">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <p>© {new Date().getFullYear()} VC Soluciones Empresariales S.A.C. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            {[
              { label: 'Privacidad',             href: '/privacidad' },
              { label: 'Términos',               href: '/terminos' },
              { label: 'Libro de Reclamaciones', href: '/libro-reclamaciones' },
            ].map(l => (
              <Link key={l.href} to={l.href} className="hover:text-white transition-colors duration-200">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
