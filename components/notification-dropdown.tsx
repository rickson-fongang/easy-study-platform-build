"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, MessageCircle, BookOpen, FileText } from "lucide-react"

interface Notification {
  id: string
  type: "message" | "task" | "course" | "system"
  title: string
  description: string
  time: string
  read: boolean
  actionUrl?: string
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "message",
      title: "New message from John",
      description: "Hey, can you help me with the math assignment?",
      time: "2 minutes ago",
      read: false,
      actionUrl: "/student/chatroom",
    },
    {
      id: "2",
      type: "task",
      title: "Assignment due soon",
      description: "Physics homework is due in 2 hours",
      time: "1 hour ago",
      read: false,
      actionUrl: "/student/tasks/2",
    },
    {
      id: "3",
      type: "course",
      title: "New video available",
      description: "Advanced Mathematics - Chapter 5 is now available",
      time: "3 hours ago",
      read: true,
      actionUrl: "/student/courses/1",
    },
    {
      id: "4",
      type: "system",
      title: "Welcome to EasyStudy!",
      description: "Complete your profile to get started",
      time: "1 day ago",
      read: true,
      actionUrl: "/student/profile",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "task":
        return <FileText className="h-4 w-4 text-orange-500" />
      case "course":
        return <BookOpen className="h-4 w-4 text-green-500" />
      case "system":
        return <Bell className="h-4 w-4 text-purple-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-3 cursor-pointer ${!notification.read ? "bg-primary/5" : ""}`}
                onClick={() => {
                  markAsRead(notification.id)
                  if (notification.actionUrl) {
                    window.location.href = notification.actionUrl
                  }
                }}
              >
                <div className="flex items-start space-x-3 w-full">
                  <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate">{notification.title}</p>
                      {!notification.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
