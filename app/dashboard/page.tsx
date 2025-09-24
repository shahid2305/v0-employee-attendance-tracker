// Dashboard Page
import React from "react"

export default function DashboardPage() {
  // TODO: Fetch dashboard data from API, show role-based widgets
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {/* Role-based dashboard widgets go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded shadow p-4">Attendance Overview</div>
        <div className="bg-white rounded shadow p-4">Leave Status</div>
        <div className="bg-white rounded shadow p-4">Productivity Score</div>
        <div className="bg-white rounded shadow p-4">Absenteeism Alerts</div>
      </div>
    </main>
  )
}
