import { NextResponse } from "next/server"

export async function GET() {
  const tasks = [
    {
      id: "1",
      title: "Calculus Assignment 6",
      description: "Solve integration problems 15-25",
      subject: "Mathematics",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: "pending",
      courseId: "1",
      studentId: "student-123",
      tutorId: "tutor-1",
    },
    {
      id: "2",
      title: "Physics Lab Report - Momentum",
      description: "Complete lab analysis and conclusions",
      subject: "Physics",
      dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      status: "in-progress",
      courseId: "2",
      studentId: "student-123",
      tutorId: "tutor-2",
    },
    {
      id: "3",
      title: "Chemistry Quiz Preparation",
      description: "Study chapters 8-10 for upcoming quiz",
      subject: "Chemistry",
      dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
      status: "pending",
      courseId: "3",
      studentId: "student-123",
      tutorId: "tutor-3",
    },
  ]

  return NextResponse.json({
    success: true,
    data: tasks,
  })
}
