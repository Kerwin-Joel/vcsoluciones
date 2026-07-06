import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Star, ArrowUpRight, MapPin, Users } from "lucide-react";
import { EASE } from "@/lib/animations";
import { isLowEndDevice } from "@/lib/deviceCapability";
import { Reveal } from "@/components/ui/Reveal";
import { useBooking } from "@/context/BookingContext";
const FOUNDER_PHOTO = "/images/emilio-founder.avif";

const credentials = [
  {
    icon: CheckCircle,
    label: "Contador Público Colegiado · CCPLL Mat. 007795",
    color: "#00acc1",
  },
  { icon: Star, label: "Fundador desde 2017", color: "#f59e0b" },
  { icon: MapPin, label: "Jaén, Cajamarca, Perú", color: "#e53935" },
  { icon: Users, label: "+30 empresas atendidas", color: "#1a4b8c" },
];

export function FounderSection() {
  const { openModal } = useBooking();
  return (
    <section
      id="sobre-nosotros"
      className="section-py overflow-hidden bg-white"
    >
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          {/* ── Foto ──────────────────────────────────────── */}
          <div className="relative order-2 lg:order-1">
            {/* Placeholder — siempre visible, reserva el espacio con fondo navy */}
            <div
              className="rounded-3xl shadow-2xl"
              style={{
                aspectRatio: "4/5",
                background: "linear-gradient(135deg, #0f2d5c 0%, #1a4b8c 100%)",
              }}
            />

            {/* Foto — absolute sobre el placeholder, whileInView nativo */}
            <motion.div
              className="absolute inset-0 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.85, ease: EASE }}
            >
              <img
                src={FOUNDER_PHOTO}
                alt="Emilio Vásquez Cabrera — Fundador VC Soluciones Empresariales"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 15%" }}
                loading="eager"
                fetchPriority="high"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 50%, rgba(7,17,31,0.82) 100%)",
                }}
              />

              {/* Name card */}
              <div className="absolute bottom-6 left-6 right-6">
                <motion.div
                  className="rounded-2xl p-4"
                  style={{
                    background: isLowEndDevice
                      ? "rgba(20,25,35,0.72)"
                      : "rgba(255,255,255,0.1)",
                    ...(isLowEndDevice
                      ? {}
                      : {
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                        }),
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ delay: 0.7, duration: 0.55, ease: EASE }}
                >
                  <p className="font-extrabold text-white text-base leading-tight">
                    Emilio Vásquez Cabrera
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    Contador Público Colegiado · CCPLL Mat. 007795
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={11}
                        style={{ color: "#facc15", fill: "#facc15" }}
                      />
                    ))}
                    <span
                      className="text-[10px] ml-1"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      5.0 en Google
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Badge +7 años */}
            <motion.div
              className="absolute -top-4 -right-4 lg:-right-8 rounded-2xl px-5 py-4 text-white"
              style={{
                background: "linear-gradient(135deg, #e53935, #c62828)",
                border: "3px solid #fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
              }}
              initial={{ opacity: 0, scale: 0.7, rotate: 6 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="text-3xl font-extrabold leading-none">+7</p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                años de
                <br />
                experiencia
              </p>
            </motion.div>

            {/* Badge +30 empresas — a media altura para no tapar la tarjeta inferior */}
            <motion.div
              className="absolute -left-4 lg:-left-8 bg-white rounded-2xl px-5 py-4"
              style={{
                top: "42%",
                border: "3px solid #fff",
                boxShadow: "0 14px 36px rgba(0,0,0,0.14)",
              }}
              initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p
                className="text-3xl font-extrabold leading-none"
                style={{ color: "#0f2d5c" }}
              >
                +30
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                empresas
                <br />
                en Jaén
              </p>
            </motion.div>
          </div>

          {/* ── Contenido — cada bloque tiene su propio Reveal ── */}
          <div className="order-1 lg:order-2">
            {/* Label */}
            <Reveal
              delay={0}
              y={16}
              x={-16}
              blur={6}
              amount={0.3}
              className="mb-6"
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{
                  background: "rgba(26,75,140,0.08)",
                  border: "1px solid rgba(26,75,140,0.18)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "#1a4b8c" }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-[0.14em]"
                  style={{ color: "#1a4b8c" }}
                >
                  Sobre nosotros
                </span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={0} y={24} blur={10} amount={0.2} className="mb-5">
              <h2
                className="font-extrabold leading-tight"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.8rem)",
                  color: "#0f2d5c",
                }}
              >
                Contadores de Jaén
                <br />
                <span style={{ color: "#e53935" }}>para empresas</span> de Jaén
              </h2>
            </Reveal>

            {/* Body */}
            <Reveal delay={0} y={18} blur={8} amount={0.2} className="mb-8">
              <p
                className="text-base leading-relaxed"
                style={{ color: "#6b7280", maxWidth: 480 }}
              >
                Somos{" "}
                <strong style={{ color: "#0f2d5c" }}>
                  VC Soluciones Empresariales S.A.C.
                </strong>
                , una firma contable fundada en 2017 por Emilio Vásquez
                Cabrera, CPC. Nacimos en Jaén porque vimos que los emprendedores
                locales
                necesitaban un contador de confianza, accesible y que hablara su
                mismo idioma.
              </p>
            </Reveal>

            {/* Credentials grid — cada chip individual */}
            <div className="grid grid-cols-2 gap-2.5 mb-8">
              {credentials.map(({ icon: Icon, label, color }, i) => (
                <Reveal
                  key={label}
                  delay={i * 0.07}
                  y={16}
                  blur={6}
                  amount={0.2}
                >
                  <div
                    className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border h-full"
                    style={{ background: "#f8f9fb", borderColor: "#e5e7eb" }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${color}14` }}
                    >
                      <Icon size={14} style={{ color }} />
                    </div>
                    <span
                      className="text-xs font-semibold leading-tight"
                      style={{ color: "#374151" }}
                    >
                      {label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Quote */}
            <Reveal
              delay={0}
              x={-16}
              y={0}
              blur={8}
              amount={0.25}
              className="mb-8"
            >
              <blockquote
                className="border-l-[3px] pl-5"
                style={{ borderColor: "#e53935" }}
              >
                <p
                  className="text-sm italic leading-relaxed mb-2"
                  style={{ color: "#4b5563" }}
                >
                  "Fundé VC Soluciones porque los emprendedores de Jaén merecen
                  un servicio contable de primer nivel, sin tener que salir de
                  su ciudad."
                </p>
                <footer
                  className="text-xs font-bold"
                  style={{ color: "#0f2d5c" }}
                >
                  — Emilio Vásquez Cabrera, CPC · Fundador
                </footer>
              </blockquote>
            </Reveal>

            {/* CTA */}
            <Reveal delay={0} y={18} blur={8} amount={0.4}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/nosotros"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #0f2d5c, #1a4b8c)",
                    boxShadow: "0 8px 28px rgba(15,45,92,0.35)",
                  }}
                >
                  Conocer más sobre nosotros
                  <ArrowUpRight size={15} />
                </Link>
                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 border"
                  style={{
                    color: "#0f2d5c",
                    borderColor: "#0f2d5c22",
                    background: "transparent",
                  }}
                >
                  Reservar una cita
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
