import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PageReadyContext = createContext(false)

export const usePageReady = () => useContext(PageReadyContext)

export function PageReadyProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const { key } = useLocation()

  useEffect(() => {
    setIsReady(false)
    // Espera a que el overlay termine su animación antes de revelar el contenido
    const t = setTimeout(() => setIsReady(true), 1050)
    return () => clearTimeout(t)
  }, [key])

  return <PageReadyContext.Provider value={isReady}>{children}</PageReadyContext.Provider>
}
