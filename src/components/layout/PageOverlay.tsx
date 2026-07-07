import { motion, AnimatePresence } from 'framer-motion'
import { usePageReady } from '@/context/PageReadyContext'
import { EASE } from '@/lib/animations'
import { adaptiveBlur } from '@/lib/deviceCapability'

export function PageOverlay() {
  const isReady = usePageReady()

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#07111f' }}
          exit={{ opacity: 0, transition: { duration: 0.55, delay: 0.35, ease: 'easeInOut' } }}
        >
          {/* Barra de acento superior */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: 'linear-gradient(90deg, #e53935, #00acc1, #e53935)' }}
          />

          {/* Contenido — se va primero */}
          <motion.div
            className="flex flex-col items-center gap-10"
            exit={{
              opacity: 0,
              y: -10,
              transition: { duration: 0.35, ease: EASE },
            }}
          >
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 14, filter: adaptiveBlur(8) }}
              animate={{ opacity: 1, y: 0, filter: adaptiveBlur(0) }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <img
                src="/favicon2.svg"
                alt="VC Soluciones Empresariales"
                width="48"
                height="48"
                className="w-12 h-12 shrink-0"
              />
              <div className="leading-none">
                <p className="font-extrabold text-white text-lg leading-tight">Soluciones</p>
                <p className="font-extrabold text-lg leading-tight" style={{ color: '#e53935' }}>
                  Empresariales
                </p>
              </div>
            </motion.div>

            {/* Barra de progreso + label */}
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-44 h-[2px] rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #1a4b8c, #00acc1)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <motion.p
                className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: 'rgba(255,255,255,0.22)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                Jaén, Perú
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
