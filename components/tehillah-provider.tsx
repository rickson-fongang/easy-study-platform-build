"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { TehillahChat } from "./tehillah-chat"

interface TehillahContextType {
  isOpen: boolean
  isMinimized: boolean
  openChat: () => void
  closeChat: () => void
  toggleMinimize: () => void
  sendMessage: (message: string) => void
}

const TehillahContext = createContext<TehillahContextType | undefined>(undefined)

export function useTehillah() {
  const context = useContext(TehillahContext)
  if (!context) {
    throw new Error("useTehillah must be used within a TehillahProvider")
  }
  return context
}

interface TehillahProviderProps {
  children: ReactNode
  userRole?: "student" | "tutor"
  context?: string
}

export function TehillahProvider({ children, userRole = "student", context = "dashboard" }: TehillahProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)

  const openChat = () => {
    setIsOpen(true)
    setIsMinimized(false)
  }

  const closeChat = () => {
    setIsOpen(false)
    setIsMinimized(true)
  }

  const toggleMinimize = () => {
    if (!isOpen) {
      setIsOpen(true)
    }
    setIsMinimized(!isMinimized)
  }

  const sendMessage = (message: string) => {
    // This would integrate with the chat component
    console.log("[v0] Tehillah message:", message)
  }

  return (
    <TehillahContext.Provider
      value={{
        isOpen,
        isMinimized,
        openChat,
        closeChat,
        toggleMinimize,
        sendMessage,
      }}
    >
      {children}
      {isOpen && (
        <TehillahChat
          isMinimized={isMinimized}
          onToggleMinimize={toggleMinimize}
          onClose={closeChat}
          context={context}
          userRole={userRole}
        />
      )}
    </TehillahContext.Provider>
  )
}
