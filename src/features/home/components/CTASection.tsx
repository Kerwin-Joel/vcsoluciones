import { Phone, Mail, MapPin, Asterisk } from 'lucide-react'
import { PillButton } from '@/components/ui/PillButton'
import { Reveal } from '@/components/ui/Reveal'
import { useBooking } from '@/context/BookingContext'

const contacts = [
  { icon: Phone,  label: '+51 972 630 736',           href: 'tel:+51972630736' },
  { icon: Mail,   label: 'contavilo@gmail.com',        href: 'mailto:contavilo@gmail.com' },
  { icon: MapPin, label: 'Pasaje Unión 105, Morro Solar, Jaén' },
]

export function CTASection() {
  const { openModal } = useBooking()
  return (
    <section className="section-py bg-white">
      <div className="container">
        <Reveal delay={0} y={30} blur={12} amount={0.12}>
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #0c1e3e 0%, #1a4b8c 50%, #0c1e3e 100%)' }}
          >
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{
              background: 'radial-gradient(circle, rgba(0,172,193,0.12) 0%, transparent 70%)',
              transform: 'translate(35%, -35%)',
            }} />
            <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full pointer-events-none" style={{
              background: 'radial-gradient(circle, rgba(229,57,53,0.12) 0%, transparent 70%)',
              transform: 'translate(-35%, 35%)',
            }} />
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{
              background: 'linear-gradient(90deg, #e53935, #00acc1, #e53935)',
            }} />

            <div className="relative z-10 text-center px-8 md:px-16 py-16 md:py-20">
              {/* Label */}
              <Reveal delay={0.08} y={16} blur={6} amount={0.2} className="mb-8">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                  style={{ border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)' }}
                >
                  <Asterisk size={11} strokeWidth={2.5} style={{ color: 'rgba(255,255,255,0.5)' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.13em]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Empieza hoy mismo
                  </span>
                </div>
              </Reveal>

              {/* Headline */}
              <Reveal delay={0.14} y={22} blur={8} amount={0.2}>
                <h2
                  className="font-extrabold text-white leading-tight mb-5"
                  style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.1rem)' }}
                >
                  ¿Listo para ordenar tu<br />contabilidad de una vez?
                </h2>
              </Reveal>

              {/* Subtitle */}
              <Reveal delay={0.2} y={18} blur={7} amount={0.2}>
                <p
                  className="text-base leading-relaxed mb-12 max-w-lg mx-auto"
                  style={{ color: 'rgba(255,255,255,0.52)' }}
                >
                  Reserva una cita, cuéntanos sobre tu empresa y te decimos exactamente cómo podemos ayudarte.
                </p>
              </Reveal>

              {/* CTAs */}
              <Reveal delay={0.26} y={16} blur={6} amount={0.2} className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
                <PillButton onClick={openModal} variant="red">
                  Reservar una cita
                </PillButton>
                <PillButton to="/contacto" variant="outline-light">
                  Ir al formulario
                </PillButton>
              </Reveal>

              {/* Contact row */}
              <Reveal delay={0.32} y={12} blur={5} amount={0.2}>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-8 gap-y-3 pt-8 border-t border-white/[0.07]">
                  {contacts.map(({ icon: Icon, label, href }) => (
                    <div key={label} className="flex items-center gap-2">
                      <Icon size={13} style={{ color: 'rgba(255,255,255,0.35)' }} />
                      {href ? (
                        <a href={href} className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.45)' }}>
                          {label}
                        </a>
                      ) : (
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</span>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
