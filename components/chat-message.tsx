"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, ImageIcon, Video, Reply, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ChatMessageProps {
  message: {
    id: string
    sender: string
    content: string
    time: string
    isOwn: boolean
    type?: "text" | "file" | "image" | "video"
    fileUrl?: string
    fileName?: string
    fileSize?: string
    avatar?: string
    senderRole?: "student" | "tutor"
    isRead?: boolean
  }
  onReply?: (messageId: string) => void
  onDelete?: (messageId: string) => void
}

export function ChatMessage({ message, onReply, onDelete }: ChatMessageProps) {
  const [imageError, setImageError] = useState(false)

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const renderMessageContent = () => {
    switch (message.type) {
      case "file":
        return (
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg max-w-xs">
            {getFileIcon(message.type)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{message.fileName}</p>
              <p className="text-xs text-muted-foreground">{message.fileSize}</p>
            </div>
            <Button size="sm" variant="ghost">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        )
      case "image":
        return (
          <div className="max-w-xs">
            {!imageError ? (
              <img
                src={message.fileUrl || "/placeholder.svg"}
                alt="Shared image"
                className="rounded-lg max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                onError={() => setImageError(true)}
                onClick={() => window.open(message.fileUrl, "_blank")}
              />
            ) : (
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <ImageIcon className="h-4 w-4" />
                <span className="text-sm">Image</span>
              </div>
            )}
          </div>
        )
      case "video":
        return (
          <div className="max-w-xs">
            <video
              src={message.fileUrl}
              controls
              className="rounded-lg max-w-full h-auto"
              style={{ maxHeight: "200px" }}
            />
          </div>
        )
      default:
        return <p className="text-sm whitespace-pre-wrap">{message.content}</p>
    }
  }

  return (
    <div className={`flex ${message.isOwn ? "justify-end" : "justify-start"} group`}>
      <div
        className={`flex items-end space-x-2 max-w-[70%] ${message.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
      >
        {!message.isOwn && (
          <Avatar className="h-8 w-8">
            <AvatarImage src={message.avatar || "/placeholder.svg"} />
            <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
          </Avatar>
        )}

        <div className="flex flex-col">
          {!message.isOwn && (
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-medium text-foreground">{message.sender}</span>
              {message.senderRole === "tutor" && (
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  Tutor
                </Badge>
              )}
            </div>
          )}

          <div
            className={`relative px-4 py-2 rounded-lg ${
              message.isOwn
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground border border-border"
            }`}
          >
            {renderMessageContent()}

            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs ${message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {message.time}
              </span>

              {message.isOwn && (
                <div className="flex items-center space-x-1">
                  {message.isRead && <span className="text-xs text-primary-foreground/70">Read</span>}
                </div>
              )}
            </div>

            {/* Message Actions */}
            <div
              className={`absolute top-1 ${
                message.isOwn ? "left-1" : "right-1"
              } opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onReply?.(message.id)}>
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </DropdownMenuItem>
                  {message.isOwn && (
                    <DropdownMenuItem onClick={() => onDelete?.(message.id)} className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
