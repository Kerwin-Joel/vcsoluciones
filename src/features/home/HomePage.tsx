import { Seo } from '@/components/Seo'
import { HeroSection } from './components/HeroSection'
import { FounderSection } from './components/FounderSection'
import { TickerSection } from './components/TickerSection'
import { StatsSection } from './components/StatsSection'
import { ServicesSection } from './components/ServicesSection'
import { WhyUsSection } from './components/WhyUsSection'
import { ProcessSection } from './components/ProcessSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { FAQSection } from './components/FAQSection'
import { CTASection } from './components/CTASection'

export default function HomePage() {
  return (
    <>
      <Seo
        title="Contabilidad y Tributación en Jaén, Perú"
        description="Asesoramiento contable, tributario y financiero en Jaén. Más de 7 años de experiencia ayudando a empresas a cumplir con la SUNAT y crecer tranquilas."
      />
      <HeroSection />
      <FounderSection />
      <TickerSection />
      <StatsSection />
      <ServicesSection />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
