import { NextResponse } from "next/server"

export async function GET() {
  const profile = {
    id: "student-123",
    name: "Sarah Johnson",
    email: "sarah.johnson@easystudy.com",
    role: "student",
    avatar: "/placeholder.svg?height=32&width=32",
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
  }

  return NextResponse.json({
    success: true,
    data: profile,
  })
}
