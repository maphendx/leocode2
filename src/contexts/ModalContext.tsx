'use client'

import { createContext, useState, useContext, ReactNode } from 'react'
import FreeLesson from '@/components/other/FreeLesson'

type ModalContextType = {
  openFreeLesson: () => void
  closeFreeLesson: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isFreeLessonOpen, setIsFreeLessonOpen] = useState(false)

  const openFreeLesson = () => setIsFreeLessonOpen(true)
  const closeFreeLesson = () => setIsFreeLessonOpen(false)

  return (
    <ModalContext.Provider value={{ openFreeLesson, closeFreeLesson }}>
      {children}
      <FreeLesson isOpen={isFreeLessonOpen} onClose={closeFreeLesson} />
    </ModalContext.Provider>
  )
}
