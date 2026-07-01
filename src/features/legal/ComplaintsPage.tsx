import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Seo } from '@/components/Seo'

const schema = z.object({
  name: z.string().min(2, 'Ingresa tu nombre'),
  dni: z.string().min(8, 'Ingresa tu DNI o RUC'),
  email: z.string().email('Correo inválido'),
  phone: z.string().min(7, 'Ingresa un teléfono'),
  type: z.enum(['reclamo', 'queja'] as const, { error: 'Selecciona el tipo' }),
  description: z.string().min(20, 'Describe tu reclamo o queja (mínimo 20 caracteres)'),
  request: z.string().min(10, 'Indica qué solicitas'),
})

type FormData = z.infer<typeof schema>

export default function ComplaintsPage() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    const text = `*LIBRO DE RECLAMACIONES*\n\nNombre: ${data.name}\nDNI/RUC: ${data.dni}\nCorreo: ${data.email}\nTeléfono: ${data.phone}\nTipo: ${data.type.toUpperCase()}\nDescripción: ${data.description}\nSolicitud: ${data.request}`
    window.open(`https://wa.me/51972630736?text=${encodeURIComponent(text)}`, '_blank')
    setSubmitted(true)
  }

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all bg-white ${
      errors[field] ? 'border-red-400' : 'border-(--color-gray-300) focus:border-(--color-navy) focus:ring-2 focus:ring-(--color-navy)/10'
    }`

  return (
    <>
      <Seo
        title="Libro de Reclamaciones"
        description="Registra tu reclamo o queja según la normativa de protección al consumidor del Perú."
      />
      <section className="bg-(--color-noir) pt-12 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="section-label">Legal</p>
            <h1 className="text-4xl font-extrabold text-white">Libro de Reclamaciones</h1>
            <p className="text-white/60 mt-3 max-w-xl">De conformidad con el Código de Protección y Defensa del Consumidor (Ley N° 29571).</p>
          </motion.div>
        </div>
      </section>
      <section className="section-py bg-(--color-gray-100)">
        <div className="container max-w-2xl">
          {submitted ? (
            <div className="bg-white rounded-3xl p-12 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-(--color-dark) mb-3">Reclamación registrada</h2>
              <p className="text-(--color-gray-500) text-sm">Tu reclamo fue enviado por WhatsApp. Te responderemos en un plazo máximo de 15 días hábiles.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8">
              <p className="text-sm text-(--color-gray-500) mb-6 p-4 bg-(--color-gray-100) rounded-xl">
                <strong>Nota:</strong> El proveedor deberá dar respuesta al reclamo o queja en un plazo no mayor a 15 días hábiles.
              </p>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-(--color-gray-700) mb-1">Nombre completo *</label>
                    <input {...register('name')} className={inputClass('name')} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-(--color-gray-700) mb-1">DNI o RUC *</label>
                    <input {...register('dni')} className={inputClass('dni')} />
                    {errors.dni && <p className="text-xs text-red-500 mt-1">{errors.dni.message}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-(--color-gray-700) mb-1">Correo *</label>
                    <input {...register('email')} type="email" className={inputClass('email')} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-(--color-gray-700) mb-1">Teléfono *</label>
                    <input {...register('phone')} className={inputClass('phone')} />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-(--color-gray-700) mb-1">Tipo *</label>
                  <select {...register('type')} className={`${inputClass('type')} appearance-none`}>
                    <option value="">Seleccionar</option>
                    <option value="reclamo">Reclamo (disconformidad con el servicio)</option>
                    <option value="queja">Queja (malestar sin afectación económica)</option>
                  </select>
                  {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-(--color-gray-700) mb-1">Descripción del reclamo *</label>
                  <textarea {...register('description')} rows={4} className={`${inputClass('description')} resize-none`} />
                  {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-(--color-gray-700) mb-1">¿Qué solicitas? *</label>
                  <textarea {...register('request')} rows={2} className={`${inputClass('request')} resize-none`} />
                  {errors.request && <p className="text-xs text-red-500 mt-1">{errors.request.message}</p>}
                </div>
                <button type="submit" className="w-full bg-(--color-navy) text-white font-bold py-4 rounded-full text-sm hover:bg-(--color-navy-dark) transition-colors">
                  Enviar Reclamación
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
