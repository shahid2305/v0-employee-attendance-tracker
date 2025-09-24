import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getUser() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (request.nextUrl.pathname !== "/" && !user && !request.nextUrl.pathname.startsWith("/auth")) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = "/auth/signin"
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.\n  // If you're creating a new response object with NextResponse.next() make sure to:\n  // 1. Pass the request in it, like so:\n  //    const myNewResponse = NextResponse.next({ request })\n  // 2. Copy over the cookies, like so:\n  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())\n  // 3. Change the myNewResponse object to fit your needs, but avoid changing\n  //    the cookies!\n  // 4. Finally:\n  //    return myNewResponse\n  // If this is not done, you may be causing the browser and server to go out\n  // of sync and terminate the user\'s session prematurely!\n
  return supabaseResponse
}
