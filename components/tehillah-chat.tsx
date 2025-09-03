"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Send, Minimize2, X, Mic, MicOff } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "tehillah"
  timestamp: Date
  type?: "text" | "suggestion" | "analytics"
}

interface TehillahChatProps {
  isMinimized?: boolean
  onToggleMinimize?: () => void
  onClose?: () => void
  context?: string
  userRole?: "student" | "tutor"
}

export function TehillahChat({
  isMinimized = false,
  onToggleMinimize,
  onClose,
  context = "dashboard",
  userRole = "student",
}: TehillahChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hi! I'm Tehillah, your AI study assistant. I'm here to help you ${userRole === "student" ? "learn effectively" : "manage your students"} and answer any questions you have about the platform.`,
      sender: "tehillah",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, context, userRole)
      const tehillahMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        sender: "tehillah",
        timestamp: new Date(),
        type: aiResponse.type,
      }
      setMessages((prev) => [...prev, tehillahMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (input: string, context: string, role: string) => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("progress") || lowerInput.includes("analytics")) {
      return {
        content:
          role === "student"
            ? "Based on your recent activity, you've completed 75% of your current courses! You're doing great. I recommend focusing on the JavaScript fundamentals video next - it will help with your upcoming assignment."
            : "Your students are showing excellent progress! Sarah has completed 90% of her courses, while Mike might need some encouragement - he's at 45%. Would you like me to suggest some personalized study plans?",
        type: "analytics" as const,
      }
    }

    if (lowerInput.includes("help") || lowerInput.includes("how")) {
      return {
        content:
          role === "student"
            ? "I can help you with study planning, explain concepts, track your progress, or answer questions about using the platform. What specific area would you like help with?"
            : "I can assist with student management, content creation, progress tracking, and platform administration. What would you like to know more about?",
        type: "suggestion" as const,
      }
    }

    if (lowerInput.includes("study") || lowerInput.includes("learn")) {
      return {
        content:
          "Here are some personalized study tips: 1) Take breaks every 25 minutes (Pomodoro technique), 2) Review your notes within 24 hours, 3) Practice active recall by testing yourself. Would you like me to create a study schedule for you?",
        type: "suggestion" as const,
      }
    }

    return {
      content:
        "I understand you're asking about " +
        input +
        ". Let me help you with that! Could you provide a bit more context so I can give you the most relevant assistance?",
      type: "text" as const,
    }
  }

  const toggleVoice = () => {
    setIsListening(!isListening)
    // Voice recognition would be implemented here
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={onToggleMinimize} className="rounded-full w-14 h-14 shadow-lg" size="icon">
          <Sparkles className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 h-96 z-50 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Tehillah</h4>
            <p className="text-xs text-muted-foreground">AI Assistant</p>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" onClick={onToggleMinimize}>
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-full">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : message.type === "analytics"
                        ? "bg-blue-50 text-blue-900 border border-blue-200"
                        : message.type === "suggestion"
                          ? "bg-green-50 text-green-900 border border-green-200"
                          : "bg-muted text-muted-foreground"
                  }`}
                >
                  {message.type && message.type !== "text" && (
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {message.type === "analytics" ? "Analytics" : "Suggestion"}
                    </Badge>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Tehillah anything..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={toggleVoice}
              className={isListening ? "bg-red-50 text-red-600" : ""}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
