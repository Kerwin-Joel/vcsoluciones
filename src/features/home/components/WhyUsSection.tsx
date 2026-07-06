import { motion, useReducedMotion } from "framer-motion";
import {
  Handshake,
  GraduationCap,
  Smartphone,
  Zap,
  DollarSign,
  Globe,
  CalendarCheck,
  Quote,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";
import { EASE } from "@/lib/animations";
import { adaptiveBlur } from "@/lib/deviceCapability";
import { useBooking } from "@/context/BookingContext";

const EMILIO_PHOTO = "/images/emilio-testimonio.avif";
const MAIN_PHOTO =
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=800&auto=format&fit=crop&q=80";
const SMALL_PHOTO = "/images/whyus-secundaria.avif";

const reasons = [
  {
    icon: Handshake,
    title: "Confianza total",
    desc: "Reportes claros cada mes. Siempre sabrás tu estado tributario.",
    color: "#1a4b8c",
  },
  {
    icon: GraduationCap,
    title: "Contadores certificados",
    desc: "Experiencia real en todos los rubros y tamaños de empresa.",
    color: "#e53935",
  },
  {
    icon: Smartphone,
    title: "Respuesta el mismo día",
    desc: "Disponibles por WhatsApp. Sin esperas, sin estrés.",
    color: "#00acc1",
  },
  {
    icon: Zap,
    title: "Cero multas SUNAT",
    desc: "Declaraciones siempre a tiempo. Evitamos contingencias.",
    color: "#1a4b8c",
  },
  {
    icon: DollarSign,
    title: "Honorarios accesibles",
    desc: "Planes desde micro hasta medianas empresas.",
    color: "#e53935",
  },
  {
    icon: Globe,
    title: "Norte del Perú",
    desc: "Presencial en Jaén y virtual en toda la región norte.",
    color: "#00acc1",
  },
];

function RotatingBadge() {
  const reduced = useReducedMotion();
  const text = "Contáctanos • Contáctanos • ";
  // Circunferencia exacta del path (radio 30): 2 * PI * 30 ≈ 188.5
  const circumference = 2 * Math.PI * 30;
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg
        viewBox="0 0 80 80"
        className="absolute inset-0 w-full h-full"
        style={{ animation: reduced ? "none" : "spin-cw 10s linear infinite" }}
      >
        <defs>
          <path
            id="badge-circle"
            d="M40,40 m-30,0 a30,30 0 1,1 60,0 a30,30 0 1,1 -60,0"
          />
        </defs>
        <text
          fill="rgba(255,255,255,0.85)"
          style={{ fontSize: 7, fontWeight: 700, letterSpacing: 1.4 }}
        >
          <textPath
            href="#badge-circle"
            textLength={circumference}
            lengthAdjust="spacingAndGlyphs"
          >
            {text}
          </textPath>
        </text>
      </svg>
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: "#fff", boxShadow: "0 4px 14px rgba(0,0,0,0.25)" }}
      >
        <CalendarCheck size={16} style={{ color: "#0f2d5c" }} />
      </div>
    </div>
  );
}

export function WhyUsSection() {
  const reduced = useReducedMotion();
  const { openModal } = useBooking();

  return (
    <section
      className="section-py overflow-hidden"
      style={{ background: "#f8f9fb" }}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* ── LEFT: Photo collage ─────────────────────────── */}
          <div className="relative">
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              style={{ aspectRatio: "3/4" }}
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.85, ease: EASE }}
            >
              <img
                src={MAIN_PHOTO}
                alt="Contabilidad y finanzas empresariales"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15,45,92,0.6) 0%, transparent 50%)",
                }}
              />
            </motion.div>

            <motion.div
              className="absolute top-6 right-0 translate-x-[22%] w-[48%] rounded-2xl overflow-hidden shadow-2xl"
              style={{ border: "3px solid #fff" }}
              initial={{ opacity: 0, x: 20, filter: adaptiveBlur(8) }}
              whileInView={{ opacity: 1, x: 0, filter: adaptiveBlur(0) }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            >
              <motion.div
                style={{ aspectRatio: "4/3", position: "relative" }}
                animate={reduced ? {} : { y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <img
                  src={SMALL_PHOTO}
                  alt="Reunión con clientes"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(15,45,92,0.25)" }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute bottom-8 -left-4 rounded-2xl px-6 py-5 shadow-2xl"
              style={{ background: "#0f2d5c", border: "3px solid #fff" }}
              initial={{ opacity: 0, scale: 0.7, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            >
              <p
                className="font-extrabold text-white leading-none mb-1"
                style={{ fontSize: "2.2rem" }}
              >
                +7
              </p>
              <p className="text-xs text-white/55 font-medium">Años de</p>
              <p className="text-xs text-white/55 font-medium">Experiencia</p>
            </motion.div>

            <motion.button
              onClick={openModal}
              className="absolute bottom-6 right-4 cursor-pointer"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.35, ease: EASE }}
              whileHover={{ scale: 1.1 }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #e53935, #c62828)",
                  boxShadow: "0 8px 28px rgba(229,57,53,0.45)",
                }}
              >
                <RotatingBadge />
              </div>
            </motion.button>
          </div>

          {/* ── RIGHT ─────────────────────────── */}
          <div>
            <SectionHeader
              label="¿Por qué elegirnos?"
              title="Tu tranquilidad, nuestra prioridad"
              centered={false}
            />

            {/* Emilio quote card */}
            <Reveal delay={0} y={18} blur={8} amount={0.3} className="mb-7">
              <div
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #0f2d5c 0%, #1a4b8c 100%)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-white/20">
                      <img
                        src={EMILIO_PHOTO}
                        alt="Emilio Vásquez Cabrera"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "center 15%" }}
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">
                        Emilio Vásquez Cabrera
                      </p>
                      <p className="text-[11px] text-white/50 font-medium">
                        Contador Público Colegiado · Fundador
                      </p>
                      <p className="text-[11px] text-white/40">
                        VC Soluciones Empresariales S.A.C.
                      </p>
                    </div>
                    <Quote
                      size={28}
                      className="ml-auto text-white/10 shrink-0"
                    />
                  </div>
                  <p
                    className="text-sm leading-relaxed italic"
                    style={{ color: "rgba(255,255,255,0.68)" }}
                  >
                    "Vi emprendedores de Jaén perder tiempo y dinero sin un
                    contador de confianza. Fundé VC Soluciones en 2017 para
                    cambiar eso. Hoy, más de 30 empresas en el norte del Perú
                    confían en nosotros para crecer tranquilos."
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Reasons — cada card individual */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {reasons.map((r, i) => {
                const Icon = r.icon;
                return (
                  <Reveal
                    key={r.title}
                    delay={i * 0.07}
                    y={20}
                    blur={8}
                    amount={0.12}
                  >
                    <motion.div
                      className="group flex gap-3 p-4 rounded-2xl bg-white border border-gray-100 cursor-default h-full"
                      whileHover={{
                        y: -3,
                        boxShadow: `0 10px 32px ${r.color}14`,
                        borderColor: r.color + "44",
                      }}
                      transition={{ duration: 0.22, ease: EASE }}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                        style={{ background: `${r.color}12` }}
                      >
                        <Icon size={16} style={{ color: r.color }} />
                      </div>
                      <div>
                        <h4
                          className="font-bold text-xs mb-0.5"
                          style={{ color: "#111827" }}
                        >
                          {r.title}
                        </h4>
                        <p
                          className="text-[11px] leading-relaxed"
                          style={{ color: "#6b7280" }}
                        >
                          {r.desc}
                        </p>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0} y={14} blur={6} amount={0.5}>
              <PillButton onClick={openModal} variant="red">
                Reservar con Emilio
              </PillButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
