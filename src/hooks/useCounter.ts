import { useEffect, useRef, useState } from 'react'

export function useCounter(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start)
  const frameRef = useRef<number>(0)

  function animate(startTime: number) {
    const elapsed = performance.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    setCount(Math.round(start + (end - start) * eased))
    if (progress < 1) {
      frameRef.current = requestAnimationFrame(() => animate(startTime))
    }
  }

  function trigger() {
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => animate(performance.now()))
  }

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  return { count, trigger }
}
