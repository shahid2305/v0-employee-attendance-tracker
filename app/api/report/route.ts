// Report API Route
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  // Return reports (mock data for testing)
  return NextResponse.json({ reports: [] })
}
