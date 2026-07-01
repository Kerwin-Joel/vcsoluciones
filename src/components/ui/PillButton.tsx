import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { EASE } from '@/lib/animations'

type Variant = 'navy' | 'red' | 'white' | 'outline-dark' | 'outline-light'

interface Props {
  children: React.ReactNode
  href?: string
  to?: string
  variant?: Variant
  className?: string
  onClick?: () => void
  external?: boolean
}

const styles: Record<Variant, { pill: React.CSSProperties; circle: React.CSSProperties; iconColor: string }> = {
  navy: {
    pill: { background: '#0f2d5c', color: '#fff', boxShadow: '0 6px 28px rgba(15,45,92,0.35)' },
    circle: { background: 'rgba(255,255,255,0.13)' },
    iconColor: '#fff',
  },
  red: {
    pill: { background: '#e53935', color: '#fff', boxShadow: '0 6px 28px rgba(229,57,53,0.38)' },
    circle: { background: 'rgba(255,255,255,0.15)' },
    iconColor: '#fff',
  },
  white: {
    pill: { background: '#fff', color: '#0f2d5c', boxShadow: '0 4px 20px rgba(0,0,0,0.10)' },
    circle: { background: '#f3f4f6' },
    iconColor: '#0f2d5c',
  },
  'outline-dark': {
    pill: { background: 'transparent', color: '#0f2d5c', border: '2px solid #0f2d5c' },
    circle: { background: '#0f2d5c' },
    iconColor: '#fff',
  },
  'outline-light': {
    pill: { background: 'rgba(255,255,255,0.07)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.18)' },
    circle: { background: 'rgba(255,255,255,0.14)' },
    iconColor: '#fff',
  },
}

export function PillButton({ children, href, to, variant = 'navy', className = '', onClick, external }: Props) {
  const s = styles[variant]

  const inner = (
    <motion.span
      className={`inline-flex items-center gap-3 font-bold text-sm rounded-full cursor-pointer select-none ${className}`}
      style={{ ...s.pill, paddingTop: 6, paddingBottom: 6, paddingLeft: 22, paddingRight: 6 }}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: EASE }}
    >
      {children}
      <span
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        style={s.circle}
      >
        <ArrowRight size={16} color={s.iconColor} />
      </span>
    </motion.span>
  )

  if (href) {
    return (
      <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="group">
        {inner}
      </a>
    )
  }
  if (to) {
    return <Link to={to} className="group">{inner}</Link>
  }
  return <button onClick={onClick} className="group border-0 bg-transparent p-0">{inner}</button>
}
