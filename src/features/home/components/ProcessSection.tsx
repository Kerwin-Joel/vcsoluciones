import { motion } from 'framer-motion'
import { Calendar, Search, FileText, Rocket } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { PillButton } from '@/components/ui/PillButton'
import { Reveal } from '@/components/ui/Reveal'
import { EASE } from '@/lib/animations'
import { isLowEndDevice } from '@/lib/deviceCapability'
import { useBooking } from '@/context/BookingContext'

const steps = [
  { num: '01', icon: Calendar, title: 'Reserva tu Cita',          desc: 'Agenda una cita (presencial o virtual) para entender tu situación contable y tributaria actual.', color: '#00acc1' },
  { num: '02', icon: Search,   title: 'Diagnóstico Empresarial',  desc: 'Revisamos tu estado ante la SUNAT, documentos y obligaciones. Identificamos riesgos y oportunidades.', color: '#1a4b8c' },
  { num: '03', icon: FileText, title: 'Plan a tu Medida',         desc: 'Diseñamos un plan claro: qué hacemos, cómo lo hacemos y cuánto cuesta. Sin letras pequeñas ni sorpresas.', color: '#e53935' },
  { num: '04', icon: Rocket,   title: 'Ejecución y Reportes',     desc: 'Tomamos el control de tu contabilidad, cumplimos todas tus obligaciones y te enviamos reportes mensuales.', color: '#00acc1' },
]

export function ProcessSection() {
  const { openModal } = useBooking()
  return (
    <section className="section-py bg-white relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(26,75,140,0.05) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />

      <div className="container relative z-10">
        <SectionHeader
          label="Cómo trabajamos"
          title="De la consulta al resultado"
          subtitle="Un proceso simple, transparente y sin complicaciones para que desde el primer día te sientas respaldado."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <Reveal key={step.num} delay={idx * 0.1} y={36} blur={10} amount={0.1}>
                <div className="relative group h-full">
                  {idx < steps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-9 left-[calc(50%+2.5rem)] w-[calc(100%-1.5rem)] h-px pointer-events-none"
                      style={{ background: 'linear-gradient(to right, #e5e7eb, transparent)' }}
                    />
                  )}

                  <motion.div
                    className="relative h-full rounded-2xl p-7 border border-gray-100 cursor-default overflow-hidden"
                    style={{
                      background: isLowEndDevice ? 'rgba(255,255,255,0.94)' : 'rgba(255,255,255,0.6)',
                      ...(isLowEndDevice ? {} : { backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)' }),
                      boxShadow: '0 2px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
                    }}
                    whileHover={{
                      y: -5,
                      boxShadow: `0 16px 48px ${step.color}18, inset 0 1px 0 rgba(255,255,255,0.95)`,
                      borderColor: step.color + '50',
                      background: 'rgba(255,255,255,0.82)',
                    }}
                    transition={{ duration: 0.24, ease: EASE }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ background: `${step.color}12`, border: `1.5px solid ${step.color}20` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2, ease: EASE }}
                      >
                        <Icon size={22} style={{ color: step.color }} />
                      </motion.div>
                      <span className="font-extrabold text-4xl leading-none select-none" style={{ color: '#f3f4f6' }}>
                        {step.num}
                      </span>
                    </div>

                    <div className="w-8 h-0.5 rounded-full mb-4" style={{ background: step.color }} />

                    <h3 className="font-bold text-sm mb-2.5" style={{ color: '#111827' }}>{step.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{step.desc}</p>
                  </motion.div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0} y={20} blur={8} amount={0.4} className="mt-12">
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl p-7 border border-gray-100"
            style={{
              background: isLowEndDevice ? 'rgba(255,255,255,0.94)' : 'rgba(255,255,255,0.55)',
              ...(isLowEndDevice ? {} : { backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }),
              boxShadow: '0 2px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          >
            <div>
              <p className="font-bold text-base mb-1" style={{ color: '#111827' }}>¿Listo para empezar?</p>
              <p className="text-sm" style={{ color: '#6b7280' }}>Agenda tu cita y empieza a ordenar tu contabilidad hoy mismo.</p>
            </div>
            <div className="shrink-0">
              <PillButton onClick={openModal} variant="red">
                Reservar mi cita
              </PillButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
