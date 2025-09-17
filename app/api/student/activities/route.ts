import { NextResponse } from "next/server"

export async function GET() {
  const activities = [
    {
      id: "1",
      type: "video",
      title: "Calculus Integration - Chapter 5",
      time: "30 minutes ago",
      userId: "student-123",
      courseId: "1",
    },
    {
      id: "2",
      type: "task",
      title: "Physics Problem Set 3 Completed",
      time: "2 hours ago",
      userId: "student-123",
      courseId: "2",
    },
    {
      id: "3",
      type: "message",
      title: "Feedback received from Dr. Smith",
      time: "4 hours ago",
      userId: "student-123",
    },
    {
      id: "4",
      type: "video",
      title: "Molecular Bonding Explained",
      time: "1 day ago",
      userId: "student-123",
      courseId: "3",
    },
  ]

  return NextResponse.json({
    success: true,
    data: activities,
  })
}
