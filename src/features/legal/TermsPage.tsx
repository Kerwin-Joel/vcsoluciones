import { motion } from 'framer-motion'
import { Seo } from '@/components/Seo'

export default function TermsPage() {
  return (
    <>
      <Seo
        title="Términos y Condiciones"
        description="Términos y condiciones de uso de los servicios de VC Soluciones Empresariales S.A.C."
      />
      <section className="bg-(--color-noir) pt-12 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="section-label">Legal</p>
            <h1 className="text-4xl font-extrabold text-white">Términos y Condiciones</h1>
          </motion.div>
        </div>
      </section>
      <section className="section-py bg-white">
        <div className="container max-w-3xl prose prose-lg text-(--color-gray-700)">
          <p><strong>Última actualización:</strong> Junio 2025</p>
          <p>Al acceder y utilizar el sitio web de VC Soluciones Empresariales S.A.C., usted acepta estos términos y condiciones.</p>
          <h2>1. Uso del sitio</h2>
          <p>Este sitio web es de carácter informativo. La información publicada no constituye asesoría legal ni tributaria formal. Para asesoría personalizada, contáctenos directamente.</p>
          <h2>2. Propiedad intelectual</h2>
          <p>Todos los contenidos de este sitio (textos, imágenes, logotipos) son propiedad de VC Soluciones Empresariales S.A.C. y están protegidos por las leyes de propiedad intelectual.</p>
          <h2>3. Limitación de responsabilidad</h2>
          <p>La Empresa no se responsabiliza por el uso indebido de la información publicada en este sitio ni por daños derivados de decisiones tomadas con base en dicha información sin consulta previa.</p>
          <h2>4. Contacto</h2>
          <p><a href="mailto:contavilo@gmail.com" className="text-(--color-navy)">contavilo@gmail.com</a> · +51 972 630 736</p>
        </div>
      </section>
    </>
  )
}
