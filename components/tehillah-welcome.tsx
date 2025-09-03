"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Sparkles } from "lucide-react"

interface TehillahWelcomeProps {
  onClose: () => void
  onStartRegistration: () => void
}

export function TehillahWelcome({ onClose, onStartRegistration }: TehillahWelcomeProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleStartRegistration = () => {
    setIsVisible(false)
    setTimeout(() => {
      onStartRegistration()
    }, 300)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card
        className={`w-full max-w-md transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Tehillah</h3>
                <p className="text-xs text-muted-foreground">Your AI Assistant</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <p className="text-foreground">
              Hello and welcome to EasyStudy! I'm Tehillah, your assistant. I'll help you get started with your
              registration. Let's make this quick and easy.
            </p>

            <div className="flex space-x-2">
              <Button onClick={handleStartRegistration} className="flex-1">
                Let's Get Started
              </Button>
              <Button variant="outline" onClick={onClose}>
                Maybe Later
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
