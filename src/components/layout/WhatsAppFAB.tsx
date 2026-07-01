import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { EASE } from "@/lib/animations";

export function WhatsAppFAB() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    // Fuera del Home: el botón siempre está visible, sin depender de scroll
    if (!isHome) {
      setVisible(true);
      return;
    }

    setVisible(false);
    let target: Element | null = document.querySelector('#sobre-nosotros')
    let mutationObserver: MutationObserver | null = null

    // Visible al mostrarse el 5% de la sección "Sobre Nosotros"
    const onScroll = () => {
      if (!target) return
      setVisible(target.getBoundingClientRect().top < window.innerHeight * 0.95)
    }

    if (!target) {
      // En mobile el contenido puede montarse un instante después (animaciones,
      // carga diferida). Vigilamos el DOM hasta que la sección exista.
      mutationObserver = new MutationObserver(() => {
        const found = document.querySelector('#sobre-nosotros')
        if (found) {
          target = found
          mutationObserver?.disconnect()
        }
      })
      mutationObserver.observe(document.body, { childList: true, subtree: true })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      mutationObserver?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isHome]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
          initial={{ opacity: 0, scale: 0.3, y: 20, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 16, rotate: 8 }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 22,
            mass: 0.8,
          }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.92, x: 8 }}
                animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                exit={{ opacity: 0, y: 6, scale: 0.94, x: 6 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="rounded-2xl shadow-2xl px-4 py-3 text-sm font-semibold whitespace-nowrap border"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  color: "#111827",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                }}
              >
                Escríbenos, te respondemos rápido 👋
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button container */}
          <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {[0, 1.1].map((ringDelay, i) => (
              <motion.span
                key={i}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: "#25D366" }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 1.8], opacity: [0.55, 0] }}
                transition={{
                  duration: 2.0,
                  delay: 0.6 + ringDelay,
                  repeat: Infinity,
                  ease: "easeOut",
                  repeatDelay: 1.0,
                }}
              />
            ))}

            {/* FAB */}
            <motion.a
              href="https://wa.me/51972630736?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className="relative z-10 flex w-14 h-14 rounded-full items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #25D366, #1ebe5d)",
                boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 8px 36px rgba(37,211,102,0.6)",
              }}
              whileTap={{ scale: 0.93 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
