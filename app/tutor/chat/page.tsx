"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, ArrowLeft, Search, MessageCircle, Users, Bell, Plus } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"

export default function TutorChat() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("individual")

  // Mock individual student chats
  const individualChats = [
    {
      id: 1,
      name: "Alex Johnson",
      lastMessage: "Thank you for the feedback on my assignment!",
      time: "5 min ago",
      unread: 2,
      online: true,
      avatar: "/placeholder.svg?height=40&width=40",
      progress: 75,
      subject: "Mathematics",
    },
    {
      id: 2,
      name: "Sarah Chen",
      lastMessage: "Could you explain the physics concept again?",
      time: "1 hour ago",
      unread: 1,
      online: true,
      avatar: "/placeholder.svg?height=40&width=40",
      progress: 60,
      subject: "Physics",
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      lastMessage: "I submitted my chemistry report",
      time: "3 hours ago",
      unread: 0,
      online: false,
      avatar: "/placeholder.svg?height=40&width=40",
      progress: 45,
      subject: "Chemistry",
    },
  ]

  // Mock group chats
  const groupChats = [
    {
      id: 4,
      name: "Mathematics Study Group",
      lastMessage: "Tutor: Great discussion today everyone!",
      time: "2 hours ago",
      unread: 3,
      memberCount: 12,
      avatar: "/placeholder.svg?height=40&width=40",
      subject: "Mathematics",
    },
    {
      id: 5,
      name: "Physics Help Group",
      lastMessage: "Student: When is the next session?",
      time: "1 day ago",
      unread: 5,
      memberCount: 8,
      avatar: "/placeholder.svg?height=40&width=40",
      subject: "Physics",
    },
  ]

  const messages = [
    {
      id: "1",
      sender: "Alex Johnson",
      content: "Hi Mr. Fongang, I have a question about the algebra assignment",
      time: "2:30 PM",
      isOwn: false,
      type: "text" as const,
      avatar: "/placeholder.svg?height=32&width=32",
      senderRole: "student" as const,
      isRead: true,
    },
    {
      id: "2",
      sender: "You",
      content: "Of course! What specific part are you having trouble with?",
      time: "2:32 PM",
      isOwn: true,
      type: "text" as const,
      isRead: true,
    },
    {
      id: "3",
      sender: "Alex Johnson",
      content: "I'm struggling with question 7 about quadratic equations",
      time: "2:33 PM",
      isOwn: false,
      type: "text" as const,
      avatar: "/placeholder.svg?height=32&width=32",
      senderRole: "student" as const,
      isRead: true,
    },
    {
      id: "4",
      sender: "You",
      content:
        "Let me send you a helpful resource. Remember, for quadratic equations in the form ax² + bx + c = 0, you can use the quadratic formula: x = (-b ± √(b²-4ac)) / 2a",
      time: "2:35 PM",
      isOwn: true,
      type: "text" as const,
      isRead: true,
    },
    {
      id: "5",
      sender: "You",
      content: "quadratic_formula_guide.pdf",
      time: "2:36 PM",
      isOwn: true,
      type: "file" as const,
      fileName: "quadratic_formula_guide.pdf",
      fileSize: "1.2 MB",
      isRead: true,
    },
    {
      id: "6",
      sender: "Alex Johnson",
      content: "Thank you for the feedback on my assignment!",
      time: "2:45 PM",
      isOwn: false,
      type: "text" as const,
      avatar: "/placeholder.svg?height=32&width=32",
      senderRole: "student" as const,
      isRead: false,
    },
  ]

  const handleSendMessage = (content: string, type: "text" | "file" | "image" = "text") => {
    // TODO: Implement message sending logic
    console.log("Tutor sending message:", { content, type, chatId: selectedChat })
  }

  const handleFileUpload = (file: File, type: "file" | "image") => {
    // TODO: Implement file upload logic
    console.log("Tutor uploading file:", { file: file.name, type, chatId: selectedChat })
  }

  const handleBroadcastMessage = () => {
    // TODO: Implement broadcast message functionality
    console.log("Broadcasting message to all students")
  }

  const currentChats = activeTab === "individual" ? individualChats : groupChats
  const filteredChats = currentChats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))
  const selectedChatData = [...individualChats, ...groupChats].find((chat) => chat.id === selectedChat)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/tutor/dashboard">
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
                    <span>Student Messages</span>
                  </CardTitle>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" onClick={handleBroadcastMessage}>
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="individual">Individual</TabsTrigger>
                    <TabsTrigger value="groups">Groups</TabsTrigger>
                  </TabsList>
                </Tabs>

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
                              {activeTab === "groups" ? <Users className="h-4 w-4" /> : chat.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {"online" in chat && chat.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-foreground truncate">{chat.name}</p>
                              {"memberCount" in chat && (
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  {chat.memberCount}
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                          <div className="flex items-center justify-between mt-1">
                            <Badge variant="outline" className="text-xs">
                              {chat.subject}
                            </Badge>
                            {"progress" in chat && (
                              <span className="text-xs text-muted-foreground">{chat.progress}% progress</span>
                            )}
                          </div>
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
                          {"memberCount" in selectedChatData ? (
                            <Users className="h-4 w-4" />
                          ) : (
                            selectedChatData.name.charAt(0)
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-foreground">{selectedChatData.name}</p>
                          <Badge variant="secondary" className="text-xs">
                            Tutor Chat
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {"memberCount" in selectedChatData
                            ? `${selectedChatData.memberCount} members • ${selectedChatData.subject}`
                            : `${"online" in selectedChatData && selectedChatData.online ? "Online" : "Offline"} • ${selectedChatData.subject}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Search className="h-4 w-4" />
                      </Button>
                      {"progress" in selectedChatData && (
                        <Button variant="outline" size="sm">
                          View Progress
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
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
                  <p className="text-muted-foreground">Choose a student or group chat to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
