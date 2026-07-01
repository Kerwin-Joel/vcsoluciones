import { createContext, useContext, useState } from 'react'
import { BookingModal } from '@/components/ui/BookingModal'

interface BookingContextType {
  openModal: () => void
}

const BookingContext = createContext<BookingContextType>({ openModal: () => {} })

export const useBooking = () => useContext(BookingContext)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <BookingContext.Provider value={{ openModal: () => setOpen(true) }}>
      {children}
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </BookingContext.Provider>
  )
}
