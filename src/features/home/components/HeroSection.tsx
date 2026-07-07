import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Phone,
  Users,
  Award,
  CheckCircle,
  Star,
  Calendar,
  LayoutGrid,
} from "lucide-react";
import { EASE } from "@/lib/animations";
import { adaptiveBlur, isLowEndDevice } from "@/lib/deviceCapability";
import { PillButton } from "@/components/ui/PillButton";
import { usePageReady } from "@/context/PageReadyContext";
import { useBooking } from "@/context/BookingContext";
const EMILIO_PHOTO = "/images/emilio-hero.avif";

const headlineWords = ["Expertos", "en", "Contabilidad", "y", "Tributación"];

export function HeroSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { key: routeKey } = useLocation();
  const isReady = usePageReady();
  const { openModal } = useBooking();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduced ? "0%" : "10%"],
  );

  const wordVariants = {
    hidden: { y: "110%", filter: adaptiveBlur(8), opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      filter: adaptiveBlur(0),
      opacity: 1,
      transition: { duration: 0.7, delay: 0.2 + i * 0.09, ease: EASE },
    }),
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 16, filter: adaptiveBlur(5) },
    visible: (d: number) => ({
      opacity: 1,
      y: 0,
      filter: adaptiveBlur(0),
      transition: { duration: 0.6, delay: d, ease: EASE },
    }),
  };

  return (
    <section
      ref={sectionRef}
      key={routeKey}
      className="relative overflow-hidden flex flex-col lg:flex-row"
      style={{ minHeight: "calc(100svh - 4.375rem)", background: "#07111f" }}
    >
      {/* Columna izquierda fondo — solo desktop. Color sólido plano: el degradado de
          fusión (más abajo) es UN solo elemento continuo que ya incluye esta zona,
          así nunca hay dos gradientes "reiniciando" en 0% cada uno en la costura */}
      <div
        className="hidden lg:block absolute inset-y-0 left-0 w-[48%]"
        style={{ background: "#07111f" }}
      />

      {/* ══ FOTO ── full-bleed mobile / columna derecha desktop ══ */}
      <div className="absolute inset-0 lg:left-[47%]">
        <motion.img
          src={EMILIO_PHOTO}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 30%", y: photoY }}
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Tinte de color — solo en la franja de fusión con el panel, el resto de la foto queda con color natural */}
        <div
          className="hidden lg:block absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg,#0d1a2e,#07111f)",
            mixBlendMode: "color",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 20%, transparent 45%)",
            maskImage:
              "linear-gradient(to right, black 0%, black 20%, transparent 45%)",
          }}
        />

        <div
          className="hidden lg:block absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom,rgba(7,17,31,0.45) 0%,transparent 30%,transparent 70%,rgba(7,17,31,0.65) 100%)",
          }}
        />
        <div
          className="lg:hidden absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom,rgba(7,17,31,0.55) 0%,rgba(7,17,31,0.15) 22%,rgba(7,17,31,0.4) 48%,rgba(7,17,31,0.88) 66%,rgba(7,17,31,1) 84%)",
          }}
        />
      </div>

      {/* Fusión panel↔foto — UN solo degradado continuo a nivel de sección (0%–100% del
          viewport completo), pintado ENCIMA de todo. Al ser un único elemento, nunca hay
          dos gradientes "reiniciando" en 0% cada uno que puedan desalinear el color */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right," +
            "#07111f 0%," +
            "#07111f 47%," +
            "#07111f 50%," +
            "rgba(11,23,40,0.95) 52.5%," +
            "rgba(12,24,43,0.85) 55%," +
            "rgba(13,26,46,0.68) 57.5%," +
            "rgba(13,26,46,0.5) 60%," +
            "rgba(13,26,46,0.32) 62.5%," +
            "rgba(13,26,46,0.16) 64%," +
            "rgba(13,26,46,0.05) 65.5%," +
            "rgba(13,26,46,0) 67%)",
        }}
      />

      {/* Líneas de textura sutil — UN solo elemento a nivel de sección, pintado ENCIMA de
          panel y foto (mismo origen de coordenadas) para que el patrón nunca se desalinee */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 42%, transparent 76%)",
          maskImage:
            "linear-gradient(to right, black 0%, black 42%, transparent 76%)",
        }}
      />

      {/* ══ MOBILE: trust badges — absolute, derecha, zona media-alta ══ */}
      <motion.div
        className="absolute lg:hidden z-10 flex flex-col gap-1.5"
        style={{ top: "28%", right: "1.25rem", width: "30%" }}
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {/* Google reviews */}
        <motion.div
          className="flex items-center gap-1.5 bg-white rounded-xl px-2.5 py-2"
          style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.18)" }}
          variants={{
            hidden: { opacity: 0, x: 14 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.4, ease: EASE },
            },
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            style={{ flexShrink: 0 }}
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <div>
            <div className="flex items-center gap-0.5 mb-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={7}
                  fill="#f59e0b"
                  style={{ color: "#f59e0b" }}
                />
              ))}
            </div>
            <p
              className="text-[9px] font-bold leading-none"
              style={{ color: "#111827" }}
            >
              5.0 en Google
            </p>
            <p
              className="text-[8px] leading-none mt-0.5"
              style={{ color: "#6b7280" }}
            >
              +20 reseñas
            </p>
          </div>
        </motion.div>

        {/* Contador Colegiado */}
        <motion.div
          className="flex items-center gap-1.5 rounded-xl px-2.5 py-2"
          style={{
            border: "1px solid rgba(0,172,193,0.45)",
            background: isLowEndDevice
              ? "rgba(6,32,38,0.85)"
              : "rgba(0,172,193,0.1)",
            ...(isLowEndDevice
              ? {}
              : {
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }),
          }}
          variants={{
            hidden: { opacity: 0, x: 14 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.4, ease: EASE },
            },
          }}
        >
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "#00acc1" }}
          >
            <CheckCircle size={11} className="text-white" />
          </div>
          <div>
            <p className="text-[9px] font-bold leading-none text-white">
              Contador Colegiado
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* ── MOBILE spacer ─────────────────────────────────────── */}
      <div className="flex-1 lg:hidden" />

      {/* ══ CONTENIDO ════════════════════════════════════════════ */}
      <div
        className="
        relative z-10
        px-5 pb-2
        lg:w-[52%] lg:flex lg:flex-col lg:justify-center
        lg:min-h-[calc(100svh-4.375rem)]
        lg:px-16 xl:px-24 lg:pb-0
      "
      >
        {/* Desktop: stats en línea arriba del título */}
        <motion.div
          className="hidden lg:flex items-center gap-4 mb-10"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "rgba(229,57,53,0.12)",
              border: "1px solid rgba(229,57,53,0.25)",
            }}
          >
            <span className="text-lg font-black" style={{ color: "#e53935" }}>
              +7
            </span>
            <span
              className="text-xs font-semibold"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              años de experiencia
            </span>
          </div>
          <div className="w-px h-5 bg-white/10" />
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "rgba(0,172,193,0.1)",
              border: "1px solid rgba(0,172,193,0.2)",
            }}
          >
            <span className="text-lg font-black" style={{ color: "#00acc1" }}>
              +30
            </span>
            <span
              className="text-xs font-semibold"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              clientes activos
            </span>
          </div>
        </motion.div>

        {/* Pill badge — solo desktop */}
        <motion.div
          className="hidden lg:inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
          style={{
            background: isLowEndDevice
              ? "rgba(10,20,36,0.85)"
              : "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.14)",
            ...(isLowEndDevice
              ? {}
              : {
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }),
            width: "fit-content",
          }}
          custom={0.05}
          variants={fadeUp}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#00acc1" }}
          />
          <span
            className="text-[11px] font-bold uppercase tracking-[0.12em]"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Contabilidad · Tributación · Jaén
          </span>
        </motion.div>

        {/* ── HEADLINE con reveal palabra por palabra ────────── */}
        <h1
          className="font-extrabold text-white leading-[1.06] tracking-tight mb-4 lg:mb-6"
          style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)" }}
        >
          {headlineWords.map((word, i) => {
            const isHighlight = word === "Contabilidad";
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "bottom",
                  marginRight: "0.22em",
                  paddingBottom: isHighlight ? 6 : 0,
                }}
              >
                <motion.span
                  className="relative inline-block"
                  style={{ color: isHighlight ? "#00d4f0" : undefined }}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate={isReady ? "visible" : "hidden"}
                >
                  {word}
                  {isHighlight && (
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-[3px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg,#00acc1,transparent)",
                      }}
                      initial={{ width: "0%" }}
                      animate={
                        isReady
                          ? { width: ["0%", "100%", "100%", "0%", "0%"] }
                          : { width: "0%" }
                      }
                      transition={{
                        delay: 0.9,
                        duration: 3,
                        times: [0, 0.22, 0.7, 0.88, 1],
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0,
                      }}
                    />
                  )}
                </motion.span>
              </span>
            );
          })}
        </h1>

        {/* Subtext */}
        <motion.p
          className="leading-relaxed mb-7 lg:mb-8"
          style={{
            color: "rgba(255,255,255,0.52)",
            fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
            maxWidth: 460,
          }}
          custom={0.78}
          variants={fadeUp}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
        >
          Más de 7 años ayudando a empresas de Jaén a cumplir con la SUNAT y
          crecer tranquilos.
        </motion.p>

        {/* CTAs — desktop */}
        <motion.div
          className="hidden lg:flex flex-row gap-3 mb-8"
          custom={0.92}
          variants={fadeUp}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
        >
          <PillButton onClick={openModal} variant="red">
            Reservar Cita
          </PillButton>
          <PillButton to="/servicios" variant="outline-light">
            Ver Servicios
          </PillButton>
        </motion.div>

        {/* CTAs — mobile (Opción D) */}
        <motion.div
          className="lg:hidden flex flex-col gap-3 mb-6"
          custom={0.92}
          variants={fadeUp}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
        >
          <div className="flex items-stretch gap-3">
            <motion.button
              onClick={openModal}
              className="flex flex-1 items-center justify-center gap-2.5 py-4 rounded-2xl font-extrabold text-white"
              style={{
                background: "linear-gradient(135deg,#e53935,#c62828)",
                fontSize: "1rem",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Calendar size={18} />
              Reservar Cita
            </motion.button>
            <div
              className="flex flex-col items-center justify-center px-4 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.13)",
              }}
            >
              <p className="font-extrabold text-white text-xl leading-none">
                +30
              </p>
              <p
                className="text-[10px] text-center mt-1"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                clientes
              </p>
            </div>
          </div>

          <div
            className="h-px"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />

          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-bold truncate">
                Emilio Vásquez Cabrera
              </p>
              <p
                className="text-[10px] truncate"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                CPC · Fundador · VC Soluciones
              </p>
            </div>
            <Link
              to="/servicios"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm shrink-0"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              <LayoutGrid size={14} />
              Servicios
            </Link>
          </div>
        </motion.div>

        {/* Trust bar — desktop */}
        <motion.div
          className="hidden lg:flex items-center gap-3"
          custom={1.05}
          variants={fadeUp}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
        >
          <div
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl flex-1 min-w-0 lg:flex-none lg:min-w-0"
            style={{
              background: isLowEndDevice
                ? "rgba(10,20,36,0.85)"
                : "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              ...(isLowEndDevice
                ? {}
                : {
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }),
            }}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-white/20">
              <img
                src="/images/emilio-testimonio.avif"
                alt="Emilio Vásquez Cabrera"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-none truncate">
                Emilio Vásquez Cabrera
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                {[
                  { icon: CheckCircle, text: "CPC", color: "#00acc1" },
                  { icon: Star, text: "2017", color: "#f59e0b" },
                  { icon: Award, text: "Fundador", color: "#e53935" },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-0.5">
                    <Icon size={8} style={{ color }} />
                    <span
                      className="text-[9px]"
                      style={{ color: "rgba(255,255,255,0.42)" }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a
            href="tel:+51972630736"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl shrink-0"
            style={{
              background: isLowEndDevice
                ? "rgba(58,15,13,0.85)"
                : "rgba(229,57,53,0.16)",
              border: "1px solid rgba(229,57,53,0.32)",
              ...(isLowEndDevice
                ? {}
                : {
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }),
            }}
          >
            <Phone size={15} style={{ color: "#e53935" }} />
            <span className="text-white font-bold text-sm hidden sm:block">
              +51 972 630 736
            </span>
            <span className="text-white font-bold text-sm sm:hidden">
              Llamar
            </span>
          </a>
        </motion.div>
      </div>

      {/* ══ DESKTOP: badges flotantes sobre la foto ══ */}
      <motion.div
        className="hidden lg:flex flex-col gap-4 absolute right-[8%] top-1/2 -translate-y-1/2 z-20"
        initial={{ opacity: 0, x: 24 }}
        animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
        transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
      >
        <motion.div
          animate={reduced ? {} : { y: [0, -8, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <div
            className="rounded-2xl px-5 py-4 text-white"
            style={{
              background: "linear-gradient(135deg,#e53935,#c62828)",
              boxShadow: "0 12px 32px rgba(229,57,53,0.5)",
            }}
          >
            <p className="text-3xl font-extrabold leading-none">+7</p>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              años de exp.
            </p>
          </div>
        </motion.div>

        <motion.div
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
        >
          <div
            className="bg-white rounded-2xl px-5 py-4"
            style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.25)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg,#1a4b8c,#00acc1)",
                }}
              >
                <Users size={18} className="text-white" />
              </div>
              <div>
                <p
                  className="text-2xl font-extrabold leading-none"
                  style={{ color: "#0f2d5c" }}
                >
                  +30
                </p>
                <p className="text-xs" style={{ color: "#9ca3af" }}>
                  clientes activos
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-5 left-1/2 lg:left-[26%] -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={isReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <motion.div
          className="w-px h-8 rounded-full mx-auto"
          style={{
            background:
              "linear-gradient(to bottom,rgba(255,255,255,0.35),transparent)",
            originY: "0%",
          }}
          animate={reduced ? {} : { scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
