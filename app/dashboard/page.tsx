"use client"
// Dashboard Page
import React from "react"

import { useEffect, useState } from "react"

type DashboardData = {
  attendance: string
  leave: string
  productivity: number
  absenteeism: string
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(d => setData(d.data || null))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Attendance Overview</h2>
          {loading ? "Loading..." : (data ? data.attendance : "No data")}
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Leave Status</h2>
          {loading ? "Loading..." : (data ? data.leave : "No data")}
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Productivity Score</h2>
          {loading ? "Loading..." : (data ? data.productivity : "No data")}
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Absenteeism Alerts</h2>
          {loading ? "Loading..." : (data ? data.absenteeism : "No data")}
        </div>
      </div>
    </main>
  )
}
