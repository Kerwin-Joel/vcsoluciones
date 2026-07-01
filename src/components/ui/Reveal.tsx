import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState, type HTMLAttributes } from 'react'
import { usePageReady } from '@/context/PageReadyContext'
import { EASE } from '@/lib/animations'
import { adaptiveBlur } from '@/lib/deviceCapability'

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number
  y?: number
  x?: number
  blur?: number
  duration?: number
  amount?: number
}

export function Reveal({
  children,
  delay = 0,
  y = 22,
  x = 0,
  blur = 8,
  duration = 0.55,
  amount = 0.12,
  className,
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount })
  const isReady = usePageReady()
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (isInView && isReady) setTriggered(true)
  }, [isInView, isReady])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y, x, filter: adaptiveBlur(blur) }}
      animate={
        triggered
          ? { opacity: 1, y: 0, x: 0, filter: adaptiveBlur(0), transition: { duration, delay, ease: EASE } }
          : { opacity: 0, y, x, filter: adaptiveBlur(blur) }
      }
    >
      {children}
    </motion.div>
  )
}
