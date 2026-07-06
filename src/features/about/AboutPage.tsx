import { motion } from "framer-motion";
import { CheckCircle, Star, MapPin, Users } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/features/home/components/CTASection";
import { Reveal } from "@/components/ui/Reveal";
import { useBooking } from "@/context/BookingContext";
import {
  staggerContainer,
  staggerItem,
  fadeLeft,
  fadeRight,
  EASE,
} from "@/lib/animations";
import { isLowEndDevice } from "@/lib/deviceCapability";
import { Seo } from "@/components/Seo";

const FOUNDER_PHOTO = "/images/emilio-about.avif";

const founderCredentials = [
  {
    icon: CheckCircle,
    label: "Contador Público Colegiado · CCPLL Mat. 007795",
    color: "#00acc1",
  },
  { icon: Star, label: "Fundador desde 2017", color: "#f59e0b" },
  { icon: MapPin, label: "Jaén, Cajamarca, Perú", color: "#e53935" },
  { icon: Users, label: "+30 empresas atendidas", color: "#1a4b8c" },
];

const values = [
  {
    icon: "🤝",
    title: "Confianza",
    desc: "Manejamos tu información con absoluta transparencia y ética profesional.",
  },
  {
    icon: "🎯",
    title: "Compromiso",
    desc: "Nos involucramos en el crecimiento de tu empresa como si fuera la nuestra.",
  },
  {
    icon: "💡",
    title: "Expertise",
    desc: "Equipo actualizado en las últimas normas tributarias y contables del Perú.",
  },
  {
    icon: "⚡",
    title: "Puntualidad",
    desc: "Cero retrasos. Tus declaraciones siempre a tiempo, sin multas.",
  },
];

const timeline = [
  {
    year: "2017",
    event:
      "Fundación de VC Soluciones Empresariales S.A.C. en Jaén, Cajamarca.",
  },
  {
    year: "2018",
    event:
      "Ampliación del equipo y primeros 15 clientes corporativos en la región.",
  },
  {
    year: "2020",
    event:
      "Adaptación al trabajo remoto e implementación de servicios digitales.",
  },
  {
    year: "2022",
    event:
      "Especialización en libros electrónicos y SIRE — Registros de Ventas y Compras.",
  },
  {
    year: "2024",
    event:
      "Más de 30 clientes activos y expansión a nivel regional en el norte del Perú.",
  },
];

export default function AboutPage() {
  const { openModal } = useBooking();
  return (
    <>
      <Seo
        title="Sobre Nosotros"
        description="Conoce a VC Soluciones Empresariales S.A.C., fundada en 2017 por Emilio Vásquez Cabrera, CPC. Contadores de Jaén para empresas de Jaén."
      />
      {/* Hero — mismo lenguaje visual que el Home: cuadrícula + foto de Emilio muy sutil */}
      <section className="relative bg-(--color-noir) pt-12 pb-24 overflow-hidden">
        {/* Fondo: foto tenue con desvanecido radial (sin bordes duros) + cuadrícula */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={FOUNDER_PHOTO}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: "center 15%",
              opacity: 0.16,
              filter: "grayscale(0.45) brightness(0.75)",
              WebkitMaskImage:
                "radial-gradient(circle at 78% 38%, black 0%, transparent 60%)",
              maskImage:
                "radial-gradient(circle at 78% 38%, black 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            className="max-w-3xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={staggerItem} className="section-label">
              VC Soluciones Empresariales · Sobre nosotros
            </motion.p>
            <motion.h1
              variants={staggerItem}
              className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              Somos <span className="text-(--color-cyan)">VC Soluciones</span>:
              más de 7 años construyendo confianza empresarial en Jaén
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-white/60 text-lg leading-relaxed"
            >
              VC Soluciones Empresariales S.A.C. nació en 2017 con una misión
              clara: brindar asesoramiento contable, tributario y financiero de
              calidad a empresas y emprendedores del norte del Perú, con
              transparencia, profesionalismo y atención personalizada.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Liderazgo — Emilio como rostro y marca personal de la empresa */}
      <section className="section-py bg-white overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-center">
            {/* ── Foto ──────────────────────────────────────── */}
            <div className="relative order-2 lg:order-1">
              <div
                className="rounded-3xl shadow-2xl"
                style={{
                  aspectRatio: "4/5",
                  background:
                    "linear-gradient(135deg, #0f2d5c 0%, #1a4b8c 100%)",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                initial={{ opacity: 0, scale: 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.85, ease: EASE }}
              >
                <img
                  src={FOUNDER_PHOTO}
                  alt="Emilio Vásquez Cabrera — Fundador y Director de VC Soluciones Empresariales"
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

            {/* ── Contenido ─────────────────────────────────── */}
            <div className="order-1 lg:order-2">
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
                    Liderazgo
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0} y={24} blur={10} amount={0.2} className="mb-5">
                <h2
                  className="font-extrabold leading-tight"
                  style={{
                    fontSize: "clamp(1.75rem, 3.5vw, 2.8rem)",
                    color: "#0f2d5c",
                  }}
                >
                  El rostro detrás de
                  <br />
                  <span style={{ color: "#e53935" }}>VC Soluciones</span>{" "}
                  Empresariales
                </h2>
              </Reveal>

              <Reveal delay={0} y={18} blur={8} amount={0.2} className="mb-8">
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#6b7280", maxWidth: 480 }}
                >
                  <strong style={{ color: "#0f2d5c" }}>
                    Emilio Vásquez Cabrera
                  </strong>
                  , Contador Público Colegiado (CCPLL Mat. 007795), fundó VC
                  Soluciones en 2017 con
                  un propósito personal: que cada emprendedor de Jaén tenga
                  acceso a un contador de confianza, cercano y comprometido con
                  su crecimiento. Hoy dirige personalmente cada relación con
                  nuestros clientes, respaldando la firma con su nombre y su
                  palabra.
                </p>
              </Reveal>

              <div className="grid grid-cols-2 gap-2.5 mb-8">
                {founderCredentials.map(({ icon: Icon, label, color }, i) => (
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
                    "En VC Soluciones creemos que la contabilidad no debería
                    generar estrés, sino tranquilidad. Por eso construimos cada
                    relación con transparencia y cercanía, cuidando tu empresa
                    como cuidamos la nuestra."
                  </p>
                  <footer
                    className="text-xs font-bold"
                    style={{ color: "#0f2d5c" }}
                  >
                    — Emilio Vásquez Cabrera, CPC · Fundador y Director
                  </footer>
                </blockquote>
              </Reveal>

              <Reveal delay={0} y={18} blur={8} amount={0.4}>
                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #e53935, #c62828)",
                    boxShadow: "0 8px 28px rgba(229,57,53,0.35)",
                  }}
                >
                  Agenda una cita con Emilio
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section-py bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-(--color-navy) rounded-3xl p-10 text-white"
            >
              <div className="text-4xl mb-5">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
              <p className="text-white/70 leading-relaxed">
                Brindar servicios contables, tributarios y financieros de
                excelencia que permitan a nuestros clientes cumplir con sus
                obligaciones legales, optimizar su carga fiscal y tomar
                decisiones empresariales informadas, con total confianza y
                transparencia.
              </p>
            </motion.div>
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-(--color-gray-100) rounded-3xl p-10"
            >
              <div className="text-4xl mb-5">🌟</div>
              <h3 className="text-2xl font-bold text-(--color-dark) mb-4">
                Nuestra Visión
              </h3>
              <p className="text-(--color-gray-500) leading-relaxed">
                Ser el estudio contable de referencia en el norte del Perú,
                reconocido por nuestra excelencia técnica, innovación digital y
                el impacto positivo que generamos en el crecimiento sostenible
                de nuestros clientes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-py bg-(--color-gray-100)">
        <div className="container">
          <SectionHeader label="Nuestros valores" title="Lo que nos define" />
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={staggerItem}
                className="bg-white rounded-2xl p-7 text-center hover:shadow-[0_16px_40px_rgba(26,75,140,0.1)] transition-all duration-300 group"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h4 className="font-bold text-(--color-dark) mb-2 group-hover:text-(--color-navy) transition-colors">
                  {v.title}
                </h4>
                <p className="text-sm text-(--color-gray-500) leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-py bg-white">
        <div className="container max-w-3xl">
          <SectionHeader label="Historia" title="Nuestro camino desde 2017" />
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-(--color-gray-100)" />
            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="flex gap-8 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="w-16 shrink-0 text-right">
                    <span className="text-sm font-extrabold text-(--color-navy)">
                      {item.year}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-(--color-red) border-2 border-white shadow" />
                    <p className="text-(--color-gray-700) text-sm leading-relaxed pl-2">
                      {item.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
