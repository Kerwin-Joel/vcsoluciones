import type { Variants } from 'framer-motion'
import { adaptiveBlur } from './deviceCapability'

export const EASE = [0.22, 1, 0.36, 1] as const

// ── Fade up con blur — para elementos independientes ─────────
// El filter:blur se omite por completo en gama baja (adaptiveBlur devuelve
// undefined ahí), dejando solo opacity+transform — mucho más barato de
// componer y evita el glitch en CPUs/GPUs débiles.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: adaptiveBlur(7) },
  visible: { opacity: 1, y: 0, filter: adaptiveBlur(0), transition: { duration: 0.6, ease: EASE } },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32, filter: adaptiveBlur(6) },
  visible: { opacity: 1, x: 0, filter: adaptiveBlur(0), transition: { duration: 0.55, ease: EASE } },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32, filter: adaptiveBlur(6) },
  visible: { opacity: 1, x: 0, filter: adaptiveBlur(0), transition: { duration: 0.55, ease: EASE } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: adaptiveBlur(6) },
  visible: { opacity: 1, scale: 1, filter: adaptiveBlur(0), transition: { duration: 0.5, ease: EASE } },
}

// ── Stagger containers ────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
}

// Items para stagger con blur
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22, filter: adaptiveBlur(7) },
  visible: { opacity: 1, y: 0, filter: adaptiveBlur(0), transition: { duration: 0.5, ease: EASE } },
}

// ── Page transitions ──────────────────────────────────────────
export const pageTransition = {
  initial: { opacity: 0, y: 14, filter: adaptiveBlur(6) },
  animate: { opacity: 1, y: 0, filter: adaptiveBlur(0), transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.22, ease: 'easeIn' as const } },
}
