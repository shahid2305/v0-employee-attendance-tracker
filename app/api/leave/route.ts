// Leave API Route
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  // Return leave records (mock data for testing)
  return NextResponse.json({ records: [] })
}

export async function POST(req: Request) {
  // Apply for leave (mock response for testing)
  return NextResponse.json({ message: "Leave application endpoint" })
}
