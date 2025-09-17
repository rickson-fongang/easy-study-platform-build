import { NextResponse } from "next/server"

export async function GET() {
  const courses = [
    {
      id: "1",
      title: "Advanced Mathematics",
      description: "Master calculus and algebra concepts",
      progress: 85,
      totalVideos: 15,
      watchedVideos: 13,
      nextDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: "active",
      tutorId: "tutor-1",
      enrolledAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Physics Mechanics",
      description: "Understanding motion and forces",
      progress: 60,
      totalVideos: 12,
      watchedVideos: 7,
      nextDeadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
      status: "active",
      tutorId: "tutor-2",
      enrolledAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Organic Chemistry",
      description: "Chemical reactions and molecular structures",
      progress: 30,
      totalVideos: 18,
      watchedVideos: 5,
      nextDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      status: "active",
      tutorId: "tutor-3",
      enrolledAt: new Date().toISOString(),
    },
  ]

  return NextResponse.json({
    success: true,
    data: courses,
  })
}
