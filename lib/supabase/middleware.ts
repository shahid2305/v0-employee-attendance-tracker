import { createClient } from "@supabase/supabase-js"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: "Supabase environment variables are not set. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY." },
      { status: 500 }
    )
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (request.nextUrl.pathname !== "/" && !user && !request.nextUrl.pathname.startsWith("/auth")) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/signin"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
  // IMPORTANT: You *must* return the supabaseResponse object as it is.\n  // If you're creating a new response object with NextResponse.next() make sure to:\n  // 1. Pass the request in it, like so:\n  //    const myNewResponse = NextResponse.next({ request })\n  // 2. Copy over the cookies, like so:\n  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())\n  // 3. Change the myNewResponse object to fit your needs, but avoid changing\n  //    the cookies!\n  // 4. Finally:\n  //    return myNewResponse\n  // If this is not done, you may be causing the browser and server to go out\n  // of sync and terminate the user\'s session prematurely!\n
  return supabaseResponse
}
