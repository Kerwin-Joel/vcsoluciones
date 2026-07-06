import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ChevronRight,
  X,
  Menu,
  Calendar,
} from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { EASE } from "@/lib/animations";
import { isLowEndDevice } from "@/lib/deviceCapability";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/preguntas-frecuentes" },
  { label: "Contacto", href: "/contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { openModal } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      {/* SVG filter for liquid glass */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="glass-distortion"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.006 0.006"
              numOctaves={2}
              seed={92}
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation={2} result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale={30}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* ─── Top Info Bar ──────────────────────────────────────── */}
      <div
        className="hidden md:block relative z-50"
        style={{
          background: "linear-gradient(90deg, #0c1e3e 0%, #0f2d5c 100%)",
        }}
      >
        <div className="container">
          <div
            className="flex items-center justify-between h-10 text-xs"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <MapPin size={12} />
                <span>Pasaje Unión 105, Morro Solar, Jaén</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} />
                <span>Lun–Vie 8am–6pm · Sáb 8am–1pm</span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <a
                href="tel:+51972630736"
                className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
              >
                <Phone size={12} />
                +51 972 630 736
              </a>
              <a
                href="mailto:contavilo@gmail.com"
                className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
              >
                <Mail size={12} />
                contavilo@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Nav ──────────────────────────────────────────── */}
      <motion.header
        className="sticky top-0 left-0 right-0 z-40"
        style={{ isolation: "isolate" }}
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {/* Nav bg — blanco sólido al inicio → glass al scrollear */}
        <motion.div
          className="absolute inset-0"
          animate={
            scrolled
              ? {
                  backdropFilter: isLowEndDevice ? "none" : "blur(20px)",
                  backgroundColor: isLowEndDevice ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.76)",
                  boxShadow: "0 2px 28px rgba(0,0,0,0.07)",
                }
              : {
                  backdropFilter: "none",
                  backgroundColor: "rgba(255,255,255,1)",
                  boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
                }
          }
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ borderBottom: "1px solid rgba(240,240,240,0.8)", zIndex: 0 }}
        />

        <div className="container" style={{ position: "relative", zIndex: 10 }}>
          <nav className="flex items-center justify-between h-[70px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <img
                src="/favicon.svg"
                alt="VC Soluciones Empresariales"
                width="36"
                height="36"
                className="w-9 h-9 shrink-0"
              />
              <div className="flex flex-col leading-none">
                <span
                  className="text-base font-extrabold tracking-tight"
                  style={{ color: "#0f2d5c" }}
                >
                  Soluciones
                  <span style={{ color: "#e53935" }}> Empresariales</span>
                </span>
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.15em]"
                  style={{ color: "#9ca3af" }}
                >
                  S.A.C. · Jaén, Perú
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = location.pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                      style={{ color: active ? "#0f2d5c" : "#4b5563" }}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                          style={{ background: "#e53935" }}
                          transition={{ duration: 0.3, ease: EASE }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="tel:+51972630736"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                style={{ color: "#374151" }}
              >
                <Phone size={14} />
                Llamar
              </a>
              <motion.button
                onClick={openModal}
                className="flex items-center gap-1.5 text-sm font-bold px-6 py-2.5 rounded-full text-white"
                style={{
                  background: "linear-gradient(135deg, #e53935, #c62828)",
                  boxShadow: "0 4px 14px rgba(229,57,53,0.35)",
                }}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                Reservar Cita
              </motion.button>
            </div>

            {/* Mobile toggle */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{ color: "#374151" }}
              whileTap={{ scale: 0.92 }}
              aria-label="Abrir menú"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="m"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* ─── Mobile Drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-50 md:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <img
                    src="/favicon.svg"
                    alt="VC Soluciones Empresariales"
                    width="32"
                    height="32"
                    className="w-8 h-8"
                  />
                  <span
                    className="font-extrabold text-sm"
                    style={{ color: "#0f2d5c" }}
                  >
                    Soluciones
                    <span style={{ color: "#e53935" }}> Empresariales</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-lg"
                  style={{ color: "#9ca3af" }}
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 px-4 py-5 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: EASE }}
                  >
                    <Link
                      to={link.href}
                      className="flex items-center justify-between py-3 px-4 rounded-xl text-sm font-semibold"
                      style={{
                        background:
                          location.pathname === link.href
                            ? "linear-gradient(135deg, #1a4b8c, #0f2d5c)"
                            : "transparent",
                        color:
                          location.pathname === link.href ? "#fff" : "#374151",
                      }}
                    >
                      {link.label}
                      <ChevronRight size={14} style={{ opacity: 0.5 }} />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-5 pb-4 border-t border-gray-100 pt-4 flex flex-col gap-2">
                <div className="flex flex-col gap-1 mb-2">
                  <a
                    href="tel:+51972630736"
                    className="flex items-center gap-2 text-xs"
                    style={{ color: "#6b7280" }}
                  >
                    <Phone size={12} /> +51 972 630 736
                  </a>
                  <span
                    className="flex items-center gap-2 text-xs"
                    style={{ color: "#6b7280" }}
                  >
                    <MapPin size={12} /> Jaén, Cajamarca, Perú
                  </span>
                </div>
                <motion.button
                  onClick={() => { setMobileOpen(false); openModal(); }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white text-sm font-bold"
                  style={{
                    background: "linear-gradient(135deg, #e53935, #c62828)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Calendar size={16} />
                  Reservar una cita
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
