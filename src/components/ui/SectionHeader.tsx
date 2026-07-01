import { motion } from 'framer-motion'
import { Asterisk } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'
import { EASE } from '@/lib/animations'

interface Props {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

function WordReveal({ text, delay = 0, triggered }: { text: string; delay?: number; triggered: boolean }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.28em' }}
        >
          <motion.span
            style={{ display: 'inline-block', color: 'inherit' }}
            initial={{ y: '110%', opacity: 0, filter: 'blur(10px)' }}
            animate={triggered
              ? { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, delay: delay + i * 0.075, ease: EASE } }
              : { y: '110%', opacity: 0, filter: 'blur(10px)' }
            }
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  )
}

export function SectionHeader({ label, title, subtitle, centered = true, light = false }: Props) {
  const { ref, triggered } = useReveal({ amount: 0.4 })

  return (
    <div ref={ref} className={`mb-14 ${centered ? 'text-center' : ''}`}>
      {label && (
        <motion.div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 ${centered ? 'justify-center' : ''}`}
          style={{
            border: light ? '1px solid rgba(255,255,255,0.18)' : '1px solid #d1d5db',
            background: light ? 'rgba(255,255,255,0.06)' : '#fff',
          }}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={triggered
            ? { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: EASE } }
            : { opacity: 0, y: 12, filter: 'blur(6px)' }
          }
        >
          <Asterisk
            size={11}
            strokeWidth={2.5}
            style={{ color: light ? 'rgba(255,255,255,0.5)' : '#e53935', flexShrink: 0 }}
          />
          <span
            className="text-xs font-bold uppercase tracking-[0.13em]"
            style={{ color: light ? 'rgba(255,255,255,0.55)' : '#374151' }}
          >
            {label}
          </span>
        </motion.div>
      )}

      <h2
        className="font-extrabold leading-[1.08] tracking-tight"
        style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', color: light ? '#fff' : '#0f2d5c' }}
      >
        <WordReveal text={title} delay={label ? 0.1 : 0} triggered={triggered} />
      </h2>

      {subtitle && (
        <motion.p
          className={`mt-5 text-base leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''}`}
          style={{ color: light ? 'rgba(255,255,255,0.52)' : '#6b7280' }}
          initial={{ opacity: 0, y: 16, filter: 'blur(7px)' }}
          animate={triggered
            ? { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, delay: 0.22, ease: EASE } }
            : { opacity: 0, y: 16, filter: 'blur(7px)' }
          }
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
