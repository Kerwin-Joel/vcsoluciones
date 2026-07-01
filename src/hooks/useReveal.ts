import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { usePageReady } from '@/context/PageReadyContext'

interface Options {
  amount?: number
}

/**
 * Combina useInView con usePageReady.
 * El elemento solo anima cuando el overlay YA salió (isReady)
 * Y el elemento entró al viewport — evita disparos prematuros detrás del overlay.
 */
export function useReveal(options?: Options) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: options?.amount ?? 0.1 })
  const isReady = usePageReady()
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (isInView && isReady) setTriggered(true)
  }, [isInView, isReady])

  return { ref, triggered }
}
