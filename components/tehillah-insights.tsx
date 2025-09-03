"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sparkles, TrendingUp, Clock, Target, BookOpen } from "lucide-react"

interface InsightData {
  type: "progress" | "recommendation" | "achievement" | "reminder"
  title: string
  description: string
  action?: string
  progress?: number
  priority?: "high" | "medium" | "low"
}

interface TehillahInsightsProps {
  userRole: "student" | "tutor"
  context?: string
}

export function TehillahInsights({ userRole, context = "dashboard" }: TehillahInsightsProps) {
  const getInsights = (): InsightData[] => {
    if (userRole === "student") {
      return [
        {
          type: "progress",
          title: "Great Progress This Week!",
          description: "You've completed 3 video tutorials and submitted 2 assignments. Keep up the excellent work!",
          progress: 75,
          priority: "high",
        },
        {
          type: "recommendation",
          title: "Recommended Next Steps",
          description:
            "Based on your learning pattern, I suggest reviewing JavaScript fundamentals before moving to React.",
          action: "View Recommendations",
          priority: "medium",
        },
        {
          type: "reminder",
          title: "Assignment Due Soon",
          description: "Your Math assignment is due in 2 days. Would you like me to help you organize your study time?",
          action: "Plan Study Time",
          priority: "high",
        },
        {
          type: "achievement",
          title: "Learning Streak: 7 Days!",
          description: "You've been consistently active for a week. That's fantastic dedication!",
          priority: "low",
        },
      ]
    } else {
      return [
        {
          type: "progress",
          title: "Class Performance Overview",
          description: "Your students have an average completion rate of 78% this week. 3 students need attention.",
          progress: 78,
          priority: "medium",
        },
        {
          type: "recommendation",
          title: "Student Engagement Insights",
          description: "Students are most active between 7-9 PM. Consider scheduling live sessions during this time.",
          action: "Schedule Sessions",
          priority: "medium",
        },
        {
          type: "reminder",
          title: "Pending Task Reviews",
          description: "You have 12 assignments waiting for review. Students are eager for feedback!",
          action: "Review Tasks",
          priority: "high",
        },
      ]
    }
  }

  const insights = getInsights()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "progress":
        return <TrendingUp className="h-4 w-4" />
      case "recommendation":
        return <Target className="h-4 w-4" />
      case "reminder":
        return <Clock className="h-4 w-4" />
      case "achievement":
        return <BookOpen className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span>Tehillah's Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                {getIcon(insight.type)}
                <h4 className="font-medium text-sm">{insight.title}</h4>
              </div>
              <Badge variant={getPriorityColor(insight.priority || "default")} className="text-xs">
                {insight.priority}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">{insight.description}</p>

            {insight.progress !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{insight.progress}%</span>
                </div>
                <Progress value={insight.progress} className="h-2" />
              </div>
            )}

            {insight.action && (
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                {insight.action}
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
