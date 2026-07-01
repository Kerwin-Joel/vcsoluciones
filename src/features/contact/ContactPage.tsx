import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { services } from '@/data/services'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { useBooking } from '@/context/BookingContext'
import { Seo } from '@/components/Seo'

const schema = z.object({
  name: z.string().min(2, 'Ingresa tu nombre completo'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().min(7, 'Ingresa un teléfono válido'),
  service: z.string().min(1, 'Selecciona un servicio'),
  message: z.string().min(10, 'Cuéntanos un poco más (mínimo 10 caracteres)'),
})

type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const { openModal } = useBooking()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async () => {
    openModal()
  }

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all duration-200 bg-white ${
      errors[field]
        ? 'border-red-400 focus:ring-2 focus:ring-red-100'
        : 'border-(--color-gray-300) focus:border-(--color-navy) focus:ring-2 focus:ring-(--color-navy)/10'
    }`

  return (
    <>
      <Seo
        title="Contacto"
        description="Escríbenos o llámanos. Estamos en Pasaje Unión 105, Morro Solar, Jaén. Respuesta rápida por WhatsApp."
      />
      {/* Hero */}
      <section className="bg-(--color-noir) pt-12 pb-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Contacto</p>
            <h1 className="text-5xl font-extrabold text-white mb-5 leading-tight">
              Hablemos sobre tu empresa
            </h1>
            <p className="text-white/60 text-lg max-w-xl">
              Completa el formulario o reserva tu cita directamente en línea.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-py bg-(--color-gray-100)">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12">
            {/* Left info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem} className="mb-8">
                <h2 className="text-2xl font-bold text-(--color-dark) mb-2">Información de contacto</h2>
                <p className="text-(--color-gray-500) text-sm">Estamos disponibles para ayudarte con cualquier consulta.</p>
              </motion.div>

              {[
                { icon: '📍', label: 'Oficina', val: 'Pasaje Unión N° 105, Morro Solar, Jaén, Cajamarca' },
                { icon: '📞', label: 'Teléfono', val: '+51 972 630 736', href: 'tel:+51972630736' },
                { icon: '✉️', label: 'Correo', val: 'contavilo@gmail.com', href: 'mailto:contavilo@gmail.com' },
                { icon: '🕐', label: 'Horario', val: 'Lun–Vie: 8:00am – 6:00pm · Sáb: 8:00am – 1:00pm' },
              ].map((item) => (
                <motion.div key={item.label} variants={staggerItem}
                  className="flex gap-4 p-5 bg-white rounded-2xl mb-4 border border-(--color-gray-100)"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-(--color-gray-500) mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium text-(--color-navy) hover:underline">{item.val}</a>
                    ) : (
                      <p className="text-sm font-medium text-(--color-dark)">{item.val}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              <motion.button
                variants={staggerItem}
                onClick={openModal}
                className="flex items-center justify-center gap-2 w-full bg-(--color-red) text-white font-bold py-4 rounded-2xl text-sm hover:bg-(--color-red-dark) transition-colors duration-300 mt-2"
              >
                📅 Reservar una cita ahora
              </motion.button>
            </motion.div>

            {/* Right form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 shadow-[var(--shadow-card)]"
            >
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <h2 className="text-xl font-bold text-(--color-dark) mb-6">Envíanos un mensaje</h2>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-xs font-semibold text-(--color-gray-700) mb-2">Nombre completo *</label>
                      <input {...register('name')} className={inputClass('name')} placeholder="Ej: Juan Pérez" />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-(--color-gray-700) mb-2">Teléfono *</label>
                      <input {...register('phone')} className={inputClass('phone')} placeholder="Ej: 972 630 736" />
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-(--color-gray-700) mb-2">Correo electrónico *</label>
                    <input {...register('email')} type="email" className={inputClass('email')} placeholder="tu@correo.com" />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-(--color-gray-700) mb-2">Servicio de interés *</label>
                    <select {...register('service')} className={`${inputClass('service')} appearance-none`}>
                      <option value="">Selecciona un servicio</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                      <option value="Consulta general">Consulta general</option>
                    </select>
                    {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service.message}</p>}
                  </div>

                  <div className="mb-7">
                    <label className="block text-xs font-semibold text-(--color-gray-700) mb-2">Cuéntanos sobre tu empresa *</label>
                    <textarea {...register('message')} rows={4} className={`${inputClass('message')} resize-none`}
                      placeholder="¿A qué se dedica tu empresa? ¿Qué necesitas?" />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-(--color-navy) text-white font-bold py-4 rounded-full text-sm hover:bg-(--color-navy-dark) transition-colors duration-300 disabled:opacity-60"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isSubmitting ? 'Enviando...' : 'Reservar mi cita →'}
                  </motion.button>

                  <p className="text-xs text-(--color-gray-500) text-center mt-4">
                    Al enviar, podrás elegir la fecha y hora de tu cita.
                  </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
