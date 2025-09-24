import React from "react"

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Employee Attendance & Activity Tracker</h1>
      <p className="mb-6">Welcome! Use the navigation above to access attendance, leave, activity, dashboard, and admin tools.</p>
      <div className="bg-white rounded shadow p-4">
        <ul className="list-disc pl-6">
          <li>Attendance Tracking</li>
          <li>Leave Management</li>
          <li>Activity Logging</li>
          <li>Dashboards & Reports</li>
          <li>Admin & HR Tools</li>
        </ul>
      </div>
    </main>
  )
}
