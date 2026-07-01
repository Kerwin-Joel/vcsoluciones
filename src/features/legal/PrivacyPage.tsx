import { motion } from 'framer-motion'
import { Seo } from '@/components/Seo'

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Política de Privacidad"
        description="Cómo VC Soluciones Empresariales S.A.C. recopila, usa y protege tus datos personales."
      />
      <section className="bg-(--color-noir) pt-12 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="section-label">Legal</p>
            <h1 className="text-4xl font-extrabold text-white">Política de Privacidad</h1>
          </motion.div>
        </div>
      </section>
      <section className="section-py bg-white">
        <div className="container max-w-3xl prose prose-lg text-(--color-gray-700)">
          <p><strong>Última actualización:</strong> Junio 2025</p>
          <p>VC Soluciones Empresariales S.A.C. (en adelante "la Empresa") se compromete a proteger la privacidad de sus usuarios. Esta política describe cómo recopilamos, usamos y protegemos su información personal de conformidad con la Ley N° 29733, Ley de Protección de Datos Personales del Perú.</p>
          <h2>1. Datos que recopilamos</h2>
          <p>Recopilamos los datos que usted nos proporciona voluntariamente a través de nuestros formularios de contacto: nombre, correo electrónico, teléfono y el mensaje que nos envía.</p>
          <h2>2. Uso de sus datos</h2>
          <p>Utilizamos sus datos exclusivamente para atender sus consultas, brindarle cotizaciones y mantener comunicación sobre los servicios solicitados. No compartimos su información con terceros sin su consentimiento.</p>
          <h2>3. Sus derechos</h2>
          <p>Tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, contáctenos en <a href="mailto:contavilo@gmail.com" className="text-(--color-navy)">contavilo@gmail.com</a>.</p>
          <h2>4. Contacto</h2>
          <p>Pasaje Unión N° 105, Morro Solar, Jaén, Cajamarca — <a href="mailto:contavilo@gmail.com" className="text-(--color-navy)">contavilo@gmail.com</a></p>
        </div>
      </section>
    </>
  )
}
