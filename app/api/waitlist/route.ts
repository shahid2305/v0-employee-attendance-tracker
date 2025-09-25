import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  // Fail fast if env vars are missing
  throw new Error("Supabase environment variables are not set. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.")
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  try {
    const { data, error } = await supabase.from("waitlist").insert({ email }).select()

    if (error) {
      console.error("Error inserting into waitlist:", error)
      return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 })
    }

    return NextResponse.json({ message: "Successfully joined waitlist" })
  } catch (error: any) {
    console.error("Error during waitlist insertion:", error)
    return NextResponse.json({ error: error.message || "Failed to join waitlist" }, { status: 500 })
  }
}
