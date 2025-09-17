import { NextResponse } from "next/server"

export async function GET() {
  const timeRemaining = {
    timeRemaining: 28800, // 8 hours in seconds
  }

  return NextResponse.json({
    success: true,
    data: timeRemaining,
  })
}
