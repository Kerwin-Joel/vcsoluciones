import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronLeft, ChevronRight, Check,
  User, Phone, Mail,
  BookOpen, Receipt, Users, Landmark, Scale, MoreHorizontal,
  Calendar, CalendarCheck, Clock,
} from 'lucide-react'

/* ─── Easing / spring ────────────────────────────────────── */

const EASE_OUT  = [0.0, 0.0, 0.2, 1.0] as const   // gentle decelerate
const EASE_IN   = [0.4, 0.0, 1.0, 1.0] as const   // gentle accelerate
const SPRING    = { type: 'spring', stiffness: 220, damping: 30, mass: 1.0 } as const

/* ─── Data ──────────────────────────────────────────────── */

const SERVICES = [
  { id: 'contabilidad', label: 'Contabilidad General',    Icon: BookOpen,       color: '#1a4b8c' },
  { id: 'sunat',        label: 'Declaraciones SUNAT',     Icon: Receipt,        color: '#e53935' },
  { id: 'planilla',     label: 'Planilla / RRHH',         Icon: Users,          color: '#00acc1' },
  { id: 'constitucion', label: 'Constitución de Empresa', Icon: Landmark,       color: '#1a4b8c' },
  { id: 'asesoria',     label: 'Asesoría Tributaria',     Icon: Scale,          color: '#e53935' },
  { id: 'otro',         label: 'Otro servicio',           Icon: MoreHorizontal, color: '#6b7280' },
]

const BIZ_TYPES = ['Persona Natural', 'MYPE', 'Empresa']

const TIME_SLOTS = [
  { id: '08:00', label: '8:00 – 10:00 am'  },
  { id: '10:00', label: '10:00 – 12:00 pm' },
  { id: '12:00', label: '12:00 – 2:00 pm'  },
  { id: '14:00', label: '2:00 – 4:00 pm'   },
  { id: '16:00', label: '4:00 – 6:00 pm'   },
]

const DAY_HEADERS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']
const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

const STEPS = ['Tu información', 'Tu empresa', 'Fecha y hora']

/* ─── Types ─────────────────────────────────────────────── */

interface FormData {
  name: string; phone: string; email: string
  bizType: string; service: string
  date: string; timeSlot: string; message: string
}
const EMPTY: FormData = { name:'', phone:'', email:'', bizType:'', service:'', date:'', timeSlot:'', message:'' }
type Setter = (key: keyof FormData) => (val: string) => void

/* ─── Step transition — fade only, no x movement ────────── */

const stepVariants = {
  enter: { opacity: 0, y: 10, filter: 'blur(5px)' },
  center: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.48, ease: EASE_OUT },
  },
  exit: {
    opacity: 0, y: -6, filter: 'blur(3px)',
    transition: { duration: 0.28, ease: EASE_IN },
  },
}

/* ─── Field ──────────────────────────────────────────────── */

function Field({ icon: Icon, label, placeholder, value, onChange, type = 'text' }: {
  icon: React.ElementType; label: string; placeholder: string
  value: string; onChange: (v: string) => void; type?: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <motion.div
      className="flex items-center gap-4 px-4 py-3.5 rounded-2xl"
      animate={{
        background:  focused ? 'rgba(0,172,193,0.07)' : 'rgba(255,255,255,0.05)',
        borderColor: focused ? 'rgba(0,172,193,0.5)'  : 'rgba(255,255,255,0.1)',
      }}
      transition={{ duration: 0.28, ease: EASE_OUT }}
      style={{ border: '1.5px solid' }}
    >
      {/* Icon badge */}
      <motion.div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        animate={{
          background: focused ? 'rgba(0,172,193,0.18)' : 'rgba(255,255,255,0.06)',
        }}
        transition={{ duration: 0.28 }}
      >
        <motion.div
          animate={{ color: focused ? '#00acc1' : 'rgba(255,255,255,0.36)' }}
          transition={{ duration: 0.28 }}
        >
          <Icon size={18} />
        </motion.div>
      </motion.div>

      {/* Label + input stacked */}
      <div className="flex-1 min-w-0">
        <motion.p
          className="text-[11px] font-bold uppercase tracking-widest leading-none mb-1.5"
          animate={{ color: focused ? '#00acc1' : 'rgba(255,255,255,0.38)' }}
          transition={{ duration: 0.28 }}
        >
          {label}
        </motion.p>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onFocus={e => {
            setFocused(true)
            const el = e.currentTarget
            setTimeout(() => el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 350)
          }}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent font-semibold text-white outline-none placeholder:text-white/20 leading-none"
          style={{ fontSize: '16px', caretColor: '#00acc1' }}
        />
      </div>

      {/* Check badge */}
      <AnimatePresence>
        {value && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ ...SPRING, stiffness: 380, damping: 22 }}
            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
            style={{ background: '#00acc1' }}
          >
            <Check size={10} className="text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Mini Calendar ──────────────────────────────────────── */

function MiniCalendar({ selected, onChange }: { selected: string; onChange: (id: string) => void }) {
  const now = new Date()
  const [view, setView] = useState({ year: now.getFullYear(), month: now.getMonth() })
  const [navDir, setNavDir] = useState(1)

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const goMonth = (dir: number) => {
    setNavDir(dir)
    setView(v => {
      const m = v.month + dir
      if (m < 0)  return { year: v.year - 1, month: 11 }
      if (m > 11) return { year: v.year + 1, month: 0 }
      return { year: v.year, month: m }
    })
  }

  const firstDow = (new Date(view.year, view.month, 1).getDay() + 6) % 7 // Mon=0
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()

  const cells: (null | { d: number; id: string; past: boolean; sel: boolean; isToday: boolean })[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => {
      const d = i + 1
      const date = new Date(view.year, view.month, d)
      const id   = date.toISOString().split('T')[0]
      return { d, id, past: date < today, sel: selected === id, isToday: date.getTime() === today.getTime() }
    }),
  ]

  const canPrev = view.year > now.getFullYear() || view.month > now.getMonth()

  const calVariants = {
    enter: (d: number) => ({ opacity: 0, x: d * 14, filter: 'blur(3px)' }),
    center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.3, ease: EASE_OUT } },
    exit:  (d: number) => ({ opacity: 0, x: d * -14, filter: 'blur(3px)', transition: { duration: 0.2, ease: EASE_IN } }),
  }

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <motion.button
          onClick={() => canPrev && goMonth(-1)}
          disabled={!canPrev}
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: canPrev ? 'rgba(255,255,255,0.06)' : 'transparent', cursor: canPrev ? 'pointer' : 'not-allowed' }}
          whileHover={canPrev ? { background: 'rgba(255,255,255,0.1)' } : undefined}
          whileTap={canPrev ? { scale: 0.9 } : undefined}
        >
          <ChevronLeft size={13} style={{ color: canPrev ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.18)' }} />
        </motion.button>

        <AnimatePresence mode="wait" custom={navDir}>
          <motion.span
            key={`${view.year}-${view.month}`}
            custom={navDir}
            variants={calVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="text-xs font-bold text-white"
          >
            {MONTH_NAMES[view.month]} {view.year}
          </motion.span>
        </AnimatePresence>

        <motion.button
          onClick={() => goMonth(1)}
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.06)' }}
          whileHover={{ background: 'rgba(255,255,255,0.1)' }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.6)' }} />
        </motion.button>
      </div>

      {/* Grid */}
      <div className="p-2">
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-0.5">
          {DAY_HEADERS.map(h => (
            <div key={h} className="flex items-center justify-center h-6 text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.28)' }}>
              {h}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <AnimatePresence mode="wait" custom={navDir}>
          <motion.div
            key={`${view.year}-${view.month}`}
            custom={navDir}
            variants={calVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-7"
          >
            {cells.map((cell, i) =>
              !cell ? (
                <div key={`e${i}`} />
              ) : (
                <motion.button
                  key={cell.id}
                  disabled={cell.past}
                  onClick={() => !cell.past && onChange(cell.id)}
                  className="flex items-center justify-center rounded-lg text-[11px] font-semibold"
                  style={{
                    height: '32px',
                    background: cell.sel
                      ? '#e53935'
                      : cell.isToday
                      ? 'rgba(229,57,53,0.12)'
                      : 'transparent',
                    color: cell.sel
                      ? '#fff'
                      : cell.past
                      ? 'rgba(255,255,255,0.16)'
                      : cell.isToday
                      ? '#e53935'
                      : 'rgba(255,255,255,0.72)',
                    cursor: cell.past ? 'not-allowed' : 'pointer',
                    transition: 'background 0.18s, color 0.18s',
                  }}
                  whileHover={!cell.past && !cell.sel ? { background: 'rgba(255,255,255,0.09)', scale: 1.08 } : undefined}
                  whileTap={!cell.past ? { scale: 0.88 } : undefined}
                  transition={{ duration: 0.14 }}
                >
                  {cell.d}
                </motion.button>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── Steps ──────────────────────────────────────────────── */

function Step1({ data, set }: { data: FormData; set: Setter }) {
  return (
    <div className="flex flex-col gap-3.5 pt-1">
      <Field icon={User}  label="Nombre completo"    placeholder="Ej: Juan Pérez Torres" value={data.name}  onChange={set('name')}  />
      <Field icon={Phone} label="WhatsApp"           placeholder="+51 9XX XXX XXX"        value={data.phone} onChange={set('phone')} type="tel"   />
      <Field icon={Mail}  label="Correo electrónico" placeholder="correo@empresa.com"     value={data.email} onChange={set('email')} type="email" />
    </div>
  )
}

function Step2({ data, set }: { data: FormData; set: Setter }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="mb-1">
        <h3 className="text-base font-extrabold text-white">Tu empresa</h3>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.36)' }}>
          Cuéntanos sobre tu negocio para orientarte mejor.
        </p>
      </div>

      {/* Business type */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'rgba(255,255,255,0.38)' }}>Tipo de negocio</p>
        <div className="flex gap-2">
          {BIZ_TYPES.map(t => {
            const active = data.bizType === t
            return (
              <motion.button
                key={t}
                onClick={() => set('bizType')(t)}
                whileHover={!active ? { borderColor: 'rgba(229,57,53,0.4)', color: 'rgba(255,255,255,0.7)' } : undefined}
                whileTap={{ scale: 0.94 }}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold"
                animate={{
                  background:  active ? 'rgba(229,57,53,0.14)' : 'rgba(255,255,255,0.04)',
                  borderColor: active ? '#e53935'               : 'rgba(255,255,255,0.09)',
                  color:       active ? '#fff'                  : 'rgba(255,255,255,0.42)',
                }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                style={{ border: '1.5px solid' }}
              >
                {t}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Services */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'rgba(255,255,255,0.38)' }}>Servicio de interés</p>
        <div className="grid grid-cols-2 gap-2">
          {SERVICES.map(({ id, label, Icon, color }) => {
            const active = data.service === id
            return (
              <motion.button
                key={id}
                onClick={() => set('service')(id)}
                whileTap={{ scale: 0.94 }}
                className="flex items-center gap-3 p-3.5 rounded-2xl text-left"
                animate={{
                  background:  active ? `${color}16` : 'rgba(255,255,255,0.04)',
                  borderColor: active ? color         : 'rgba(255,255,255,0.08)',
                }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                style={{ border: '1.5px solid' }}
              >
                <motion.div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  animate={{ background: active ? color : 'rgba(255,255,255,0.07)' }}
                  transition={{ duration: 0.25 }}
                >
                  <Icon size={14} style={{ color: active ? '#fff' : 'rgba(255,255,255,0.36)', transition: 'color 0.25s' }} />
                </motion.div>
                <span className="text-[11px] font-semibold leading-snug" style={{ color: active ? '#fff' : 'rgba(255,255,255,0.45)', transition: 'color 0.25s' }}>
                  {label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Step3({ data, set }: { data: FormData; set: Setter }) {
  // Format selected date for display
  const selectedDateLabel = (() => {
    if (!data.date) return null
    const [y, m, d] = data.date.split('-').map(Number)
    const date = new Date(y, m - 1, d)
    const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
    return `${days[date.getDay()]} ${d} de ${MONTH_NAMES[m - 1]}`
  })()

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-base font-extrabold text-white">Fecha y hora</h3>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.36)' }}>
          Disponible lunes a sábado.
        </p>
      </div>

      {/* ── Sección 1: Calendario ── */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
        {/* Header de sección */}
        <div className="flex items-center justify-between px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2">
            <Calendar size={13} style={{ color: '#e53935' }} />
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Fecha</span>
          </div>
          <AnimatePresence mode="wait">
            {selectedDateLabel ? (
              <motion.span
                key="date"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="text-[11px] font-bold"
                style={{ color: '#e53935' }}
              >
                {selectedDateLabel}
              </motion.span>
            ) : (
              <motion.span
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[11px]"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                Elige un día
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.02)' }}>
          <MiniCalendar selected={data.date} onChange={set('date')} />
        </div>
      </div>

      {/* ── Sección 2: Hora ── */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
        {/* Header de sección */}
        <div className="flex items-center justify-between px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2">
            <Clock size={13} style={{ color: '#00acc1' }} />
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Horario</span>
          </div>
          <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.28)' }}>Bloques de 2 horas</span>
        </div>
        <div className="p-3 grid grid-cols-2 gap-2" style={{ background: 'rgba(255,255,255,0.02)' }}>
          {TIME_SLOTS.map(slot => {
            const active = data.timeSlot === slot.id
            return (
              <motion.button
                key={slot.id}
                onClick={() => set('timeSlot')(slot.id)}
                whileTap={{ scale: 0.94 }}
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left"
                animate={{
                  background:  active ? 'rgba(0,172,193,0.16)' : 'rgba(255,255,255,0.04)',
                  borderColor: active ? '#00acc1'               : 'rgba(255,255,255,0.08)',
                }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                style={{ border: '1.5px solid' }}
              >
                <motion.div
                  animate={{ background: active ? '#00acc1' : 'rgba(255,255,255,0.08)' }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                >
                  <Clock size={11} style={{ color: active ? '#fff' : 'rgba(255,255,255,0.4)' }} />
                </motion.div>
                <span className="text-[11px] font-semibold leading-snug"
                  style={{ color: active ? '#fff' : 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}>
                  {slot.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* ── Mensaje opcional ── */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Mensaje <span style={{ color: 'rgba(255,255,255,0.2)', textTransform: 'none', letterSpacing: 0 }}>(opcional)</span>
        </p>
        <textarea
          value={data.message}
          onChange={e => set('message')(e.target.value)}
          placeholder="¿Algo que quieras contarnos antes de la cita?"
          rows={2}
          className="w-full resize-none rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)', caretColor: '#00acc1', transition: 'border-color 0.25s, background 0.25s' }}
          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,172,193,0.48)'; e.currentTarget.style.background = 'rgba(0,172,193,0.05)' }}
          onBlur={e =>  { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
        />
      </div>
    </div>
  )
}

/* ─── Confirmation ───────────────────────────────────────── */

function ConfirmationScreen({ data, onClose }: { data: FormData; onClose: () => void }) {
  const svc  = SERVICES.find(s => s.id === data.service)?.label || data.service
  const time = TIME_SLOTS.find(t => t.id === data.timeSlot)?.label || ''
  const [y, m, d] = data.date.split('-').map(Number)
  const dateObj = data.date ? new Date(y, m - 1, d) : null
  const DAYS_SHORT = ['Do','Lu','Ma','Mi','Ju','Vi','Sá']
  const dateStr = dateObj
    ? `${DAYS_SHORT[dateObj.getDay()]} ${d} ${MONTH_NAMES[m - 1].slice(0, 3)}`
    : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } }}
      className="flex flex-col gap-3 py-1"
    >
      {/* Header row: icon + title side by side */}
      <motion.div
        className="flex items-center gap-3.5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.4, ease: EASE_OUT }}
      >
        <div className="relative shrink-0">
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#1a4b8c,#00acc1)', boxShadow: '0 8px 24px rgba(0,172,193,0.32)' }}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ ...SPRING, delay: 0.05 }}
          >
            {/* Calculadora — botones se pulsan en bucle simulando un cálculo */}
            <svg width="30" height="30" viewBox="0 0 28 28" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* Cuerpo */}
              <motion.rect x="2" y="2" width="24" height="24" rx="3"
                stroke="white" strokeWidth="1.6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              />
              {/* Pantalla — destella en cyan al mostrar resultado */}
              <motion.rect x="4.5" y="4.5" width="19" height="5.5" rx="1.5"
                stroke="white" strokeWidth="1.1"
                animate={{ fill: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)', 'rgba(0,172,193,0.55)', 'rgba(0,172,193,0.55)', 'rgba(255,255,255,0.1)'] }}
                transition={{ delay: 1.6, duration: 0.8, times: [0, 0.05, 0.25, 0.65, 1], repeat: Infinity, repeatDelay: 2.2, ease: EASE_OUT }}
              />
              {/* Línea de resultado que crece en la pantalla */}
              <motion.line x1="7" y1="7.2" x2="7" y2="7.2" stroke="white" strokeWidth="1.1"
                animate={{ x2: [7, 7, 22, 22, 7] }}
                transition={{ delay: 1.6, duration: 0.8, times: [0, 0.1, 0.5, 0.75, 1], repeat: Infinity, repeatDelay: 2.2, ease: EASE_OUT }}
              />

              {/* ── 12 botones: 3 cols × 4 rows ─────────────────────────── */}
              {/* col x: 4 | 11 | 18   row y: 12 | 15.5 | 19 | 22.5   w=6 h=2.5 */}

              {/* ROW 0 */}
              <rect x="4"  y="12"   width="6" height="2.5" rx="0.8" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="0.7" />
              {/* btn(1,0) — primer número pulsado */}
              <motion.rect x="11" y="12" width="6" height="2.5" rx="0.8" stroke="white" strokeWidth="0.7"
                animate={{ fill: ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,0.12)'] }}
                transition={{ delay: 0.2, duration: 0.65, times: [0, 0.28, 1], repeat: Infinity, repeatDelay: 2.35, ease: EASE_OUT }}
              />
              {/* btn(2,0) — operador pulsado */}
              <motion.rect x="18" y="12" width="6" height="2.5" rx="0.8" stroke="white" strokeWidth="0.7"
                animate={{ fill: ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,0.12)'] }}
                transition={{ delay: 0.55, duration: 0.65, times: [0, 0.28, 1], repeat: Infinity, repeatDelay: 2.35, ease: EASE_OUT }}
              />

              {/* ROW 1 */}
              {/* btn(0,1) — segundo número pulsado */}
              <motion.rect x="4"  y="15.5" width="6" height="2.5" rx="0.8" stroke="white" strokeWidth="0.7"
                animate={{ fill: ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,0.12)'] }}
                transition={{ delay: 0.9, duration: 0.65, times: [0, 0.28, 1], repeat: Infinity, repeatDelay: 2.35, ease: EASE_OUT }}
              />
              <rect x="11" y="15.5" width="6" height="2.5" rx="0.8" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="0.7" />
              <rect x="18" y="15.5" width="6" height="2.5" rx="0.8" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="0.7" />

              {/* ROW 2 */}
              <rect x="4"  y="19" width="6" height="2.5" rx="0.8" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="0.7" />
              <rect x="11" y="19" width="6" height="2.5" rx="0.8" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="0.7" />
              <rect x="18" y="19" width="6" height="2.5" rx="0.8" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="0.7" />

              {/* ROW 3 */}
              <rect x="4"  y="22.5" width="6" height="2.5" rx="0.8" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="0.7" />
              <rect x="11" y="22.5" width="6" height="2.5" rx="0.8" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="0.7" />
              {/* btn(2,3) — tecla "=" en cyan, pulsada al final */}
              <motion.rect x="18" y="22.5" width="6" height="2.5" rx="0.8" stroke="white" strokeWidth="0.7"
                animate={{ fill: ['rgba(0,172,193,0.28)', 'rgba(0,172,193,0.95)', 'rgba(0,172,193,0.28)'] }}
                transition={{ delay: 1.25, duration: 0.65, times: [0, 0.28, 1], repeat: Infinity, repeatDelay: 2.35, ease: EASE_OUT }}
              />
            </svg>
          </motion.div>
          {/* One-time pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ border: '2px solid rgba(0,172,193,0.5)' }}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.65, opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut', delay: 0.4 }}
          />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-white leading-tight">¡Cita registrada!</h3>
          <p className="text-[11px] mt-0.5 leading-snug" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Emilio confirmará tu cita muy pronto.
          </p>
        </div>
      </motion.div>

      {/* Summary card */}
      <motion.div
        className="w-full rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.03)' }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease: EASE_OUT }}
      >
        {/* Fecha + hora — highlight */}
        <div
          className="flex items-stretch"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'linear-gradient(135deg,rgba(0,172,193,0.1),rgba(26,75,140,0.1))' }}
        >
          <div className="flex-1 px-4 py-3">
            <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(0,172,193,0.7)' }}>Fecha</p>
            <p className="text-sm font-extrabold text-white">{dateStr}</p>
          </div>
          <div className="w-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <div className="flex-1 px-4 py-3">
            <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(0,172,193,0.7)' }}>Horario</p>
            <p className="text-sm font-extrabold text-white">{time}</p>
          </div>
        </div>

        {/* Nombre / Tipo / Servicio en grid 3 columnas */}
        <div className="grid grid-cols-3">
          {[
            { label: 'Nombre',   value: data.name    },
            { label: 'Tipo',     value: data.bizType },
            { label: 'Servicio', value: svc          },
          ].map(({ label, value }, i) => (
            <motion.div
              key={label}
              className="px-3 py-2.5"
              style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32 + i * 0.06, duration: 0.35, ease: EASE_OUT }}
            >
              <p className="text-[9px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</p>
              <p className="text-[11px] font-bold text-white leading-tight truncate">{value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="w-full py-3.5 rounded-2xl text-sm font-extrabold text-white"
        style={{ background: 'linear-gradient(135deg,#e53935,#c62828)', boxShadow: '0 6px 20px rgba(229,57,53,0.3)' }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.35, ease: EASE_OUT }}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.97 }}
      >
        Perfecto, gracias
      </motion.button>
    </motion.div>
  )
}

/* ─── Step progress ──────────────────────────────────────── */

function StepProgress({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 px-5 pt-3 pb-2">
      {STEPS.map((_, i) => (
        <div key={i} className="flex items-center gap-2" style={{ flex: i < STEPS.length - 1 ? 1 : undefined }}>
          <motion.div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
            animate={{
              background:  i < step  ? '#e53935'              : i === step ? 'rgba(229,57,53,0.15)' : 'rgba(255,255,255,0.06)',
              borderColor: i <= step ? '#e53935'              : 'rgba(255,255,255,0.11)',
              color:       i <= step ? '#fff'                 : 'rgba(255,255,255,0.28)',
            }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            style={{ border: '1.5px solid' }}
          >
            {i < step ? <Check size={10} strokeWidth={3} /> : i + 1}
          </motion.div>

          {i < STEPS.length - 1 && (
            <div className="flex-1 h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg,#e53935,#c62828)', originX: 0 }}
                animate={{ scaleX: i < step ? 1 : 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Desktop detection ──────────────────────────────────── */

function useIsDesktop() {
  const [v, setV] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setV(mq.matches)
    const h = (e: MediaQueryListEvent) => setV(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])
  return v
}

/* ─── Visual viewport (follows keyboard on mobile) ──────── */

function useVisualViewport() {
  const init = () => ({
    height:    window.visualViewport?.height    ?? window.innerHeight,
    offsetTop: window.visualViewport?.offsetTop ?? 0,
  })
  const [vv, setVv] = useState(init)
  useEffect(() => {
    const vp = window.visualViewport
    if (!vp) return
    const update = () => setVv({ height: vp.height, offsetTop: vp.offsetTop })
    vp.addEventListener('resize', update)
    vp.addEventListener('scroll', update)
    return () => { vp.removeEventListener('resize', update); vp.removeEventListener('scroll', update) }
  }, [])
  return vv
}

/* ─── Modal ──────────────────────────────────────────────── */

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const isDesktop = useIsDesktop()
  const vv = useVisualViewport()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(EMPTY)
  const [done, setDone] = useState(false)

  // Prevent background scroll without touching body styles (body-fixed breaks Android modal scroll)
  useEffect(() => {
    if (!open) return
    const prevent = (e: TouchEvent) => {
      const modal = document.getElementById('booking-scroll')
      if (!modal?.contains(e.target as Node)) e.preventDefault()
    }
    document.addEventListener('touchmove', prevent, { passive: false })
    return () => document.removeEventListener('touchmove', prevent)
  }, [open])

  useEffect(() => {
    if (!open) setTimeout(() => { setStep(0); setData(EMPTY); setDone(false) }, 500)
  }, [open])

  const set: Setter = key => val => setData(d => ({ ...d, [key]: val }))

  const canNext = () => {
    if (step === 0) return !!(data.name.trim() && data.phone.trim() && data.email.trim())
    if (step === 1) return !!(data.bizType && data.service)
    if (step === 2) return !!(data.date && data.timeSlot)
    return true
  }

  const next = () => {
    if (!canNext()) return
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else setDone(true)
  }
  const back = () => setStep(s => s - 1)

  const modalAnim = isDesktop
    ? { initial: { opacity: 0, scale: 0.96, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.96, y: 20 } }
    : { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100]"
            style={{ background: 'rgba(4,10,22,0.80)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            onClick={onClose}
          />

          {/* Centering — tracks visual viewport so modal stays above keyboard */}
          <div
            className="z-[101] flex pointer-events-none"
            style={{
              position:    'fixed',
              left:        0,
              right:       0,
              top:         vv.offsetTop,
              height:      vv.height,
              alignItems:  isDesktop ? 'center'   : 'flex-end',
              justifyContent: isDesktop ? 'center' : 'stretch',
            }}
          >
            <motion.div
              className="pointer-events-auto w-full lg:max-w-[520px] flex flex-col"
              style={{
                background:   'linear-gradient(170deg,#0d2244 0%,#07111f 100%)',
                borderRadius: isDesktop ? '24px' : '24px 24px 0 0',
                maxHeight:    `${Math.floor(vv.height * 0.92)}px`,
                border:       '1px solid rgba(255,255,255,0.08)',
                borderBottom: isDesktop ? '1px solid rgba(255,255,255,0.08)' : 'none',
                boxShadow:    '0 -2px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
              {...modalAnim}
              transition={isDesktop
                ? { ...SPRING, stiffness: 200, damping: 28 }
                : { type: 'spring', stiffness: 240, damping: 30, mass: 1.1 }
              }
            >
              {/* Drag handle */}
              <div className="lg:hidden flex justify-center pt-2.5 pb-0 shrink-0">
                <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.14)' }} />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-3 pb-3 shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg,#e53935,#c62828)', boxShadow: '0 4px 14px rgba(229,57,53,0.3)' }}
                  >
                    <Calendar size={16} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-white text-base leading-none">Agenda tu Cita</h2>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={done ? 'done' : step}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } }}
                        exit={{ opacity: 0, y: -4, transition: { duration: 0.18, ease: EASE_IN } }}
                        className="text-[10px] mt-0.5"
                        style={{ color: 'rgba(255,255,255,0.34)' }}
                      >
                        {done ? 'Solicitud registrada ✓' : `Paso ${step + 1} de ${STEPS.length} · ${STEPS[step]}`}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                  whileHover={{ background: 'rgba(255,255,255,0.11)' }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={15} style={{ color: 'rgba(255,255,255,0.48)' }} />
                </motion.button>
              </div>

              {/* Progress bar */}
              <AnimatePresence>
                {!done && (
                  <motion.div
                    exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  >
                    <StepProgress step={step} />
                    <div className="px-5 pb-1.5">
                      <div className="h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg,#e53935,#00acc1)', originX: 0 }}
                          animate={{ scaleX: (step + 1) / STEPS.length }}
                          transition={{ duration: 0.6, ease: EASE_OUT }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Content */}
              <div
                id="booking-scroll"
                className="flex-1 overflow-y-auto px-5 pt-2 pb-4"
                style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' as never, touchAction: 'pan-y' }}
              >
                <AnimatePresence mode="wait">
                  {done ? (
                    <ConfirmationScreen key="done" data={data} onClose={onClose} />
                  ) : (
                    <motion.div
                      key={step}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      {step === 0 && <Step1 data={data} set={set} />}
                      {step === 1 && <Step2 data={data} set={set} />}
                      {step === 2 && <Step3 data={data} set={set} />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <AnimatePresence>
                {!done && (
                  <motion.div
                    className="px-6 py-4 flex items-center gap-3 shrink-0"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                    exit={{ opacity: 0, y: 6, transition: { duration: 0.22 } }}
                  >
                    <AnimatePresence>
                      {step > 0 && (
                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE_OUT } }}
                          exit={{ opacity: 0, x: -10, transition: { duration: 0.2, ease: EASE_IN } }}
                          onClick={back}
                          className="flex items-center gap-1.5 px-5 py-3 rounded-2xl text-sm font-semibold"
                          style={{ color: 'rgba(255,255,255,0.46)', background: 'rgba(255,255,255,0.06)' }}
                          whileHover={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)' }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.18 }}
                        >
                          <ChevronLeft size={15} />
                          Atrás
                        </motion.button>
                      )}
                    </AnimatePresence>

                    <motion.button
                      onClick={next}
                      disabled={!canNext()}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-extrabold"
                      animate={{
                        opacity: canNext() ? 1 : 0.45,
                        background: canNext()
                          ? 'linear-gradient(135deg,#e53935,#c62828)'
                          : 'rgba(255,255,255,0.08)',
                        color: canNext() ? '#ffffff' : 'rgba(255,255,255,0.35)',
                        boxShadow: canNext() ? '0 6px 22px rgba(229,57,53,0.33)' : '0 0 0 transparent',
                      }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                      whileHover={canNext() ? { scale: 1.02, y: -1 } : undefined}
                      whileTap={canNext() ? { scale: 0.97 } : undefined}
                    >
                      {step === STEPS.length - 1
                        ? <><CalendarCheck size={15} /> Confirmar cita</>
                        : <>Siguiente <ChevronRight size={15} /></>
                      }
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
