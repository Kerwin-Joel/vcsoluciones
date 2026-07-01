import { useEffect } from 'react'

interface SeoProps {
  title: string
  description: string
  noindex?: boolean
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

// Actualiza <title> y meta description/OG/Twitter por página. Los crawlers de
// redes sociales (Facebook, WhatsApp, Twitter) no ejecutan JS y solo leen los
// valores estáticos de index.html — esto es para el título de pestaña del
// navegador y para que Google (que sí renderiza JS) indexe cada ruta con su
// propio título y descripción.
export function Seo({ title, description, noindex }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | VC Soluciones Empresariales`
    document.title = fullTitle
    setMeta('description', description)
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow')

    return () => {
      // Al desmontar (cambio de ruta) restauramos el robots por defecto
      if (noindex) setMeta('robots', 'index, follow')
    }
  }, [title, description, noindex])

  return null
}
