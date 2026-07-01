export interface Service {
  id: string
  slug: string
  title: string
  shortDesc: string
  fullDesc: string
  icon: string
  features: string[]
  color: string
  image?: string
}

export interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  text: string
  rating: number
  initials: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: number
  imageUrl: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}
