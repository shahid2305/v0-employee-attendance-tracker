// Admin Tools Page
import React from "react"

export default function AdminPage() {
  // TODO: Admin tools (bulk import/export, policy management, payroll, geofencing)
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin & HR Tools</h1>
      {/* Admin tools widgets go here */}
      <div className="bg-white rounded shadow p-4">Bulk Import/Export</div>
      <div className="bg-white rounded shadow p-4 mt-4">Policy Management</div>
      <div className="bg-white rounded shadow p-4 mt-4">Payroll Timesheets</div>
      <div className="bg-white rounded shadow p-4 mt-4">Geofencing</div>
    </main>
  )
}
