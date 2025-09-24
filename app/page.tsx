import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { createServerClient } from "@supabase/ssr"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Authentication/session should be handled client-side for Cloudflare compatibility

  return (
  <html lang="en" className={`${inter.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
