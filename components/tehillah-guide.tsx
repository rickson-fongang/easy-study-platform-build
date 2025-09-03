"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface TehillahGuideProps {
  message: string
  isVisible: boolean
}

export function TehillahGuide({ message, isVisible }: TehillahGuideProps) {
  if (!isVisible) return null

  return (
    <Card className="mb-4 border-primary/20 bg-primary/5">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Tehillah</p>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
