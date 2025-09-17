import { NextResponse } from "next/server"

export async function GET() {
  const stats = {
    videosWatched: 25,
    tasksCompleted: 8,
    studyHours: 12.5,
    messagesSent: 34,
    weeklyProgress: 82,
    totalCourses: 3,
  }

  return NextResponse.json({
    success: true,
    data: stats,
  })
}
