import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

import Nav from "@/components/nav"

// TODO: Replace with actual role from auth/session
const userRole = "Admin" // Example: "Admin", "HR", "Manager", "Employee"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
  <body className={`font-sans ${inter.variable}`}>
        <Nav role={userRole} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
