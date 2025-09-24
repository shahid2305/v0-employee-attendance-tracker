// Dashboard API Route
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  // Return dashboard data (mock data for testing)
  return NextResponse.json({ data: { attendance: "OK", leave: "OK", productivity: 100, absenteeism: "None" } })
}
