"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Send, Users, Search, MoreVertical, Phone, Video } from "lucide-react"
import Link from "next/link"

interface User {
  id: string
  name: string
  avatar?: string
  status: "online" | "offline" | "away"
  lastSeen?: string
}

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  type: "text" | "image" | "file"
}

interface ChatRoom {
  id: string
  name: string
  type: "direct" | "group"
  participants: User[]
  lastMessage?: Message
  unreadCount: number
}

export default function ChatroomPage() {
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showChatList, setShowChatList] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [chatRooms] = useState<ChatRoom[]>([
    {
      id: "1",
      name: "John Smith",
      type: "direct",
      participants: [{ id: "2", name: "John Smith", status: "online", avatar: "/placeholder.svg" }],
      lastMessage: {
        id: "1",
        senderId: "2",
        senderName: "John Smith",
        content: "Hey, can you help me with the math assignment?",
        timestamp: "2 minutes ago",
        type: "text",
      },
      unreadCount: 2,
    },
    {
      id: "2",
      name: "Study Group - Math",
      type: "group",
      participants: [
        { id: "2", name: "John Smith", status: "online" },
        { id: "3", name: "Sarah Johnson", status: "away" },
        { id: "4", name: "Mike Wilson", status: "offline", lastSeen: "1 hour ago" },
      ],
      lastMessage: {
        id: "2",
        senderId: "3",
        senderName: "Sarah Johnson",
        content: "I uploaded the notes from today's class",
        timestamp: "1 hour ago",
        type: "text",
      },
      unreadCount: 0,
    },
    {
      id: "3",
      name: "Emma Davis",
      type: "direct",
      participants: [{ id: "5", name: "Emma Davis", status: "offline", lastSeen: "3 hours ago" }],
      lastMessage: {
        id: "3",
        senderId: "5",
        senderName: "Emma Davis",
        content: "Thanks for the help with physics!",
        timestamp: "3 hours ago",
        type: "text",
      },
      unreadCount: 0,
    },
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "2",
      senderName: "John Smith",
      content: "Hey, can you help me with the math assignment?",
      timestamp: "10:30 AM",
      type: "text",
    },
    {
      id: "2",
      senderId: "current",
      senderName: "You",
      content: "Which part are you stuck on?",
      timestamp: "10:32 AM",
      type: "text",
    },
    {
      id: "3",
      senderId: "2",
      senderName: "John Smith",
      content: "The quadratic equations in chapter 5",
      timestamp: "10:33 AM",
      type: "text",
    },
  ])

  const filteredChats = chatRooms.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "current",
      senderName: "You",
      content: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const handleChatSelect = (chat: ChatRoom) => {
    setSelectedChat(chat)
    setShowChatList(false) // Hide chat list on mobile when chat is selected
  }

  const handleBackToChats = () => {
    setShowChatList(true)
    setSelectedChat(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/student/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-semibold">
                  {!showChatList && selectedChat ? selectedChat.name : "Chatroom"}
                </h1>
              </div>
            </div>
            {!showChatList && selectedChat && (
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={handleBackToChats}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Chats
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-6 h-[calc(100vh-200px)]">
          {/* Chat List Sidebar */}
          <div className={`lg:col-span-1 ${showChatList ? "block" : "hidden lg:block"}`}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Chats</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-350px)] lg:h-[calc(100vh-350px)]">
                  <div className="space-y-1 p-4">
                    {filteredChats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChat?.id === chat.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
                        }`}
                        onClick={() => handleChatSelect(chat)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={chat.participants[0]?.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {chat.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            {chat.type === "direct" && (
                              <div
                                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(
                                  chat.participants[0]?.status || "offline",
                                )}`}
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium truncate">{chat.name}</p>
                              {chat.unreadCount > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {chat.unreadCount}
                                </Badge>
                              )}
                            </div>
                            {chat.lastMessage && (
                              <p className="text-xs text-muted-foreground truncate">{chat.lastMessage.content}</p>
                            )}
                            <p className="text-xs text-muted-foreground">{chat.lastMessage?.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div
            className={`lg:col-span-3 ${!showChatList ? "block" : "hidden lg:block"} ${!showChatList ? "mt-0" : "mt-6 lg:mt-0"}`}
          >
            {selectedChat ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button variant="ghost" size="sm" className="lg:hidden p-1" onClick={handleBackToChats}>
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedChat.participants[0]?.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {selectedChat.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedChat.name}</h3>
                        {selectedChat.type === "direct" ? (
                          <p className="text-sm text-muted-foreground">
                            {selectedChat.participants[0]?.status === "online"
                              ? "Online"
                              : selectedChat.participants[0]?.lastSeen
                                ? `Last seen ${selectedChat.participants[0].lastSeen}`
                                : "Offline"}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">{selectedChat.participants.length} members</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[calc(100vh-300px)] lg:h-[calc(100vh-400px)] p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.senderId === "current" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              msg.senderId === "current" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            {msg.senderId !== "current" && selectedChat.type === "group" && (
                              <p className="text-xs font-medium mb-1">{msg.senderName}</p>
                            )}
                            <p className="text-sm">{msg.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                msg.senderId === "current" ? "text-primary-foreground/70" : "text-muted-foreground"
                              }`}
                            >
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={!message.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Select a chat to start messaging</h3>
                  <p className="text-muted-foreground">Choose from your existing conversations or start a new one</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
