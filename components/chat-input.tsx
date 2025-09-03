"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, ImageIcon, Smile } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ChatInputProps {
  onSendMessage: (message: string, type?: "text" | "file" | "image") => void
  onFileUpload: (file: File, type: "file" | "image") => void
  placeholder?: string
  disabled?: boolean
}

export function ChatInput({
  onSendMessage,
  onFileUpload,
  placeholder = "Type your message...",
  disabled,
}: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "file" | "image") => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      onFileUpload(file, type)
      // Reset input
      e.target.value = ""
      setTimeout(() => setIsUploading(false), 1000)
    }
  }

  return (
    <div className="border-t border-border p-4 bg-card">
      <div className="flex items-end space-x-2">
        {/* File Upload Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" disabled={disabled || isUploading}>
              <Paperclip className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
              <Paperclip className="h-4 w-4 mr-2" />
              Upload File
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => imageInputRef.current?.click()}>
              <ImageIcon className="h-4 w-4 mr-2" />
              Upload Image
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.zip"
          onChange={(e) => handleFileSelect(e, "file")}
        />
        <input
          ref={imageInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileSelect(e, "image")}
        />

        {/* Message Input */}
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isUploading ? "Uploading..." : placeholder}
            disabled={disabled || isUploading}
            className="pr-10"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            disabled={disabled}
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        {/* Send Button */}
        <Button onClick={handleSend} disabled={!message.trim() || disabled || isUploading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
