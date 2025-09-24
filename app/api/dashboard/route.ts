// Dashboard API Route
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  // Return dashboard data (role-based)
  return NextResponse.json({ message: "Dashboard data endpoint" })
}
