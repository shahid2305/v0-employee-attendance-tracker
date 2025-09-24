// Role-based Navigation Component
import React from "react"
import Link from "next/link"

const navItems = [
  { href: "/dashboard", label: "Dashboard", roles: ["Admin", "HR", "Manager", "Employee"] },
  { href: "/attendance", label: "Attendance", roles: ["Admin", "HR", "Manager", "Employee"] },
  { href: "/leave", label: "Leave", roles: ["Admin", "HR", "Manager", "Employee"] },
  { href: "/activity", label: "Activity", roles: ["Admin", "HR", "Manager", "Employee"] },
  { href: "/report", label: "Reports", roles: ["Admin", "HR", "Manager"] },
  { href: "/admin", label: "Admin Tools", roles: ["Admin", "HR"] },
]

export default function Nav({ role }: { role: string }) {
  return (
    <nav className="bg-gray-100 border-b px-4 py-2 flex gap-4">
      {navItems.filter(item => item.roles.includes(role)).map(item => (
        <Link key={item.href} href={item.href} className="text-gray-700 hover:text-blue-600 font-medium">
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
