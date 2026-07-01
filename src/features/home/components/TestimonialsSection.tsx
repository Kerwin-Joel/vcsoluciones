import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, type PanInfo, type Variants } from 'framer-motion'
import { Quote } from 'lucide-react'
import { testimonials } from '@/data/testimonials'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'
import { adaptiveBlur } from '@/lib/deviceCapability'

const APPLE_EASE = [0.16, 1, 0.3, 1] as const
const AUTOPLAY_MS = 6500
const SWIPE_DISTANCE = 60
const SWIPE_VELOCITY = 350

const variants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 36, scale: 0.985, filter: adaptiveBlur(10) }),
  center: { opacity: 1, x: 0, scale: 1, filter: adaptiveBlur(0), transition: { duration: 0.7, ease: APPLE_EASE } },
  exit: (dir: number) => ({ opacity: 0, x: dir * -36, scale: 0.985, filter: adaptiveBlur(8), transition: { duration: 0.45, ease: APPLE_EASE } }),
}

export function TestimonialsSection() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0])
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const total = testimonials.length

  const paginate = useCallback((dir: number) => {
    setState(([i]) => [(i + dir + total) % total, dir])
  }, [total])

  const goTo = useCallback((i: number) => {
    setState(([current]) => [i, i > current ? 1 : -1])
  }, [])

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => paginate(1), AUTOPLAY_MS)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paginate, paused])

  const active = testimonials[index]

  const handleDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    setPaused(false)
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) paginate(1)
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) paginate(-1)
  }

  return (
    <section
      className="section-py relative overflow-hidden"
      style={{ background: '#0d0f14' }}
    >
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)',
        backgroundSize: '34px 34px',
      }} />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 560, height: 560, left: '50%', top: '10%',
          background: 'radial-gradient(circle, rgba(229,57,53,0.08) 0%, transparent 70%)',
        }}
        animate={{ x: ['-50%', '-46%', '-50%'], y: [0, 16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container relative z-10">
        <SectionHeader
          label="Testimonios"
          title="Lo que dicen nuestros clientes"
          subtitle="Más de 30 empresas en Jaén y la región norte del Perú ya confían en VC Soluciones Empresariales."
          light
        />

        <Reveal delay={0.05} y={26} blur={10} amount={0.2}>
          <div
            className="mx-auto flex flex-col items-center text-center"
            style={{ maxWidth: 620 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Quote mark */}
            <motion.div
              key={`icon-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: APPLE_EASE }}
            >
              <Quote size={22} strokeWidth={2.25} style={{ color: '#e53935' }} />
            </motion.div>

            {/* Draggable, crossfading quote + author */}
            <motion.div layout className="w-full mt-7 flex flex-col items-center" transition={{ duration: 0.6, ease: APPLE_EASE }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragElastic={0.12}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragTransition={{ bounceStiffness: 400, bounceDamping: 32 }}
                  onDragStart={() => setPaused(true)}
                  onDragEnd={handleDragEnd}
                  whileTap={{ cursor: 'grabbing' }}
                  className="w-full flex flex-col items-center select-none"
                  style={{ cursor: 'grab', touchAction: 'pan-y' }}
                >
                  <p
                    className="leading-relaxed"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 'clamp(1.15rem, 2.6vw, 1.6rem)',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.92)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {active.text}
                  </p>

                  <div className="flex items-center gap-3 mt-8">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-bold text-xs"
                      style={{ border: '1px solid rgba(255,255,255,0.18)', color: '#fff' }}
                    >
                      {active.initials}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-white text-sm leading-tight">{active.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {active.role} · {active.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Dot navigation — Apple-style morphing pill */}
            <div className="flex items-center gap-2 mt-10">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => goTo(i)}
                  aria-label={`Ver testimonio de ${t.name}`}
                  className="relative flex items-center justify-center py-2 px-0.5"
                >
                  <motion.span
                    className="block rounded-full"
                    style={{ height: 6, background: i === index ? '#e53935' : 'rgba(255,255,255,0.18)' }}
                    animate={{ width: i === index ? 22 : 6 }}
                    transition={{ duration: 0.55, ease: APPLE_EASE }}
                  />
                </button>
              ))}
            </div>

            <p className="text-[11px] mt-5" style={{ color: 'rgba(255,255,255,0.22)' }}>
              Desliza para ver más
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
