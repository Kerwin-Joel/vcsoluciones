import { useRef, useEffect } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useCounter } from '@/hooks/useCounter'
import { EASE } from '@/lib/animations'
import { adaptiveBlur } from '@/lib/deviceCapability'

const stats = [
  { value: 7,   suffix: '+', label: 'Años de experiencia',     desc: 'Fundada en Jaén, 2017',   lineColor: '#1a4b8c' },
  { value: 30,  suffix: '+', label: 'Clientes atendidos',       desc: 'Norte del Perú',          lineColor: '#1a4b8c' },
  { value: 8,   suffix: '',  label: 'Servicios especializados', desc: 'Contables y tributarios', lineColor: '#1a4b8c' },
  { value: 100, suffix: '%', label: 'Cumplimiento SUNAT',       desc: 'Sin multas en gestión',   lineColor: '#e53935' },
]

interface StatItemProps {
  value:     number
  suffix:    string
  label:     string
  desc:      string
  lineColor: string
  delay:     number
}

function StatItem({ value, suffix, label, desc, lineColor, delay }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const reduced = useReducedMotion()
  const { count, trigger } = useCounter(value, 1800)

  useEffect(() => {
    if (!isInView) return
    if (reduced) { trigger(); return }
    const t = setTimeout(trigger, delay * 1000)
    return () => clearTimeout(t)
  }, [isInView, reduced])

  return (
    <motion.div
      ref={ref}
      className="min-w-0 cursor-default select-none"
      initial={{ opacity: 0, y: 20, filter: adaptiveBlur(8) }}
      whileInView={{ opacity: 1, y: 0, filter: adaptiveBlur(0) }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      whileHover={{ y: -3, transition: { duration: 0.22, ease: EASE } }}
    >
      {/* Number */}
      <motion.p
        className="font-extrabold leading-none mb-3 tabular-nums"
        style={{
          fontSize:      'clamp(2.1rem, 3.2vw, 2.9rem)',
          color:         '#0f2d5c',
          letterSpacing: '-0.042em',
        }}
        whileHover={{ scale: 1.04, transition: { duration: 0.18, ease: EASE } }}
      >
        {isInView ? count : 0}
        <span style={{ color: '#e53935' }}>{suffix}</span>
      </motion.p>

      {/* Line — draws left-to-right in sync with counter */}
      <div className="mb-4 rounded-full overflow-hidden" style={{ height: 1 }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: lineColor, originX: 0 }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Labels */}
      <p className="font-bold text-xs mb-1 leading-snug" style={{ color: '#111827' }}>
        {label}
      </p>
      <p className="text-[10px] leading-snug" style={{ color: '#9ca3af' }}>
        {desc}
      </p>
    </motion.div>
  )
}

export function StatsSection() {
  return (
    <section
      style={{
        background:   '#ffffff',
        borderTop:    '1px solid #f0f0f0',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 py-10 lg:py-12">
          {stats.map((s, i) => (
            <StatItem key={s.label} {...s} delay={i * 0.13} />
          ))}
        </div>
      </div>
    </section>
  )
}
