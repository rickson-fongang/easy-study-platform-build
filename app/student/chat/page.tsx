"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ArrowLeft, Search, Users, MessageCircle, Plus } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"

export default function StudentChat() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock chat data with enhanced features
  const chatList = [
    {
      id: 1,
      name: "Sarah Chen",
      lastMessage: "Thanks for helping with the math problem!",
      time: "2 min ago",
      unread: 2,
      online: true,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "direct",
      role: "student",
    },
    {
      id: 2,
      name: "Rickson Fongang",
      lastMessage: "Great progress on your assignments!",
      time: "1 hour ago",
      unread: 1,
      online: true,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "direct",
      role: "tutor",
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      lastMessage: "Did you finish the physics assignment?",
      time: "3 hours ago",
      unread: 0,
      online: true,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "direct",
      role: "student",
    },
    {
      id: 4,
      name: "Study Group - Math",
      lastMessage: "Alex: Anyone free for practice session?",
      time: "1 day ago",
      unread: 5,
      online: false,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "group",
      memberCount: 8,
    },
    {
      id: 5,
      name: "Physics Help Group",
      lastMessage: "Emma: Check out this helpful video",
      time: "2 days ago",
      unread: 3,
      online: false,
      avatar: "/placeholder.svg?height=40&width=40",
      type: "group",
      memberCount: 12,
    },
  ]

  const messages = [
    {
      id: "1",
      sender: "Sarah Chen",
      content: "Hey! Can you help me with question 5 from the math assignment?",
      time: "10:30 AM",
      isOwn: false,
      type: "text" as const,
      avatar: "/placeholder.svg?height=32&width=32",
      senderRole: "student" as const,
      isRead: true,
    },
    {
      id: "2",
      sender: "You",
      content: "Which part are you stuck on?",
      time: "10:32 AM",
      isOwn: true,
      type: "text" as const,
      isRead: true,
    },
    {
      id: "3",
      sender: "Sarah Chen",
      content: "I'm not sure how to approach the quadratic equation part",
      time: "10:33 AM",
      isOwn: false,
      type: "text" as const,
      avatar: "/placeholder.svg?height=32&width=32",
      senderRole: "student" as const,
      isRead: true,
    },
    {
      id: "4",
      sender: "You",
      content: "Let me break it down for you. First, you need to identify the coefficients a, b, and c...",
      time: "10:35 AM",
      isOwn: true,
      type: "text" as const,
      isRead: true,
    },
    {
      id: "5",
      sender: "Sarah Chen",
      content: "math_notes.pdf",
      time: "10:40 AM",
      isOwn: false,
      type: "file" as const,
      fileName: "math_notes.pdf",
      fileSize: "2.3 MB",
      avatar: "/placeholder.svg?height=32&width=32",
      senderRole: "student" as const,
      isRead: true,
    },
    {
      id: "6",
      sender: "Sarah Chen",
      content: "Thanks for helping with the math problem!",
      time: "10:45 AM",
      isOwn: false,
      type: "text" as const,
      avatar: "/placeholder.svg?height=32&width=32",
      senderRole: "student" as const,
      isRead: false,
    },
  ]

  const handleSendMessage = (content: string, type: "text" | "file" | "image" = "text") => {
    // TODO: Implement message sending logic
    console.log("Sending message:", { content, type, chatId: selectedChat })
  }

  const handleFileUpload = (file: File, type: "file" | "image") => {
    // TODO: Implement file upload logic
    console.log("Uploading file:", { file: file.name, type, chatId: selectedChat })
  }

  const handleReply = (messageId: string) => {
    // TODO: Implement reply functionality
    console.log("Replying to message:", messageId)
  }

  const handleDeleteMessage = (messageId: string) => {
    // TODO: Implement message deletion
    console.log("Deleting message:", messageId)
  }

  const filteredChats = chatList.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const selectedChatData = chatList.find((chat) => chat.id === selectedChat)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/student/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">EasyStudy</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 h-[calc(100vh-80px)]">
        <div className="grid lg:grid-cols-4 gap-6 h-full">
          {/* Chat List */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>Messages</span>
                  </CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-y-auto">
                <div className="space-y-1">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`p-3 cursor-pointer hover:bg-muted/50 border-l-4 transition-colors ${
                        selectedChat === chat.id ? "border-l-primary bg-muted/50" : "border-l-transparent"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {chat.type === "group" ? <Users className="h-4 w-4" /> : chat.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {chat.online && chat.type === "direct" && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-foreground truncate">{chat.name}</p>
                              {chat.role === "tutor" && (
                                <Badge variant="secondary" className="text-xs px-1 py-0">
                                  Tutor
                                </Badge>
                              )}
                              {chat.type === "group" && (
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  {chat.memberCount}
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3">
            {selectedChat && selectedChatData ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedChatData.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {selectedChatData.type === "group" ? (
                            <Users className="h-4 w-4" />
                          ) : (
                            selectedChatData.name.charAt(0)
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-foreground">{selectedChatData.name}</p>
                          {selectedChatData.role === "tutor" && (
                            <Badge variant="secondary" className="text-xs">
                              Tutor
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {selectedChatData.type === "group"
                            ? `${selectedChatData.memberCount} members`
                            : selectedChatData.online
                              ? "Online"
                              : "Offline"}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        onReply={handleReply}
                        onDelete={handleDeleteMessage}
                      />
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <ChatInput
                  onSendMessage={handleSendMessage}
                  onFileUpload={handleFileUpload}
                  placeholder={`Message ${selectedChatData.name}...`}
                />
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground">Select a conversation</p>
                  <p className="text-muted-foreground">Choose a chat from the list to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
