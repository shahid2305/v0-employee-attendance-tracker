// Admin API Route
import { NextResponse } from "next/server"

export const runtime = 'edge';

export async function GET(req: Request) {
  // Return admin tools data (mock data for testing)
  return NextResponse.json({ policies: [], geofences: [] })
}

export async function POST(req: Request) {
  // Perform admin actions (import/export, update policies, etc.)
  return NextResponse.json({ message: "Admin action endpoint" })
}
