// Report Page
import React from "react"

export default function ReportPage() {
  // TODO: Fetch and display reports, export options
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
      {/* Reports and export controls go here */}
      <div className="bg-white rounded shadow p-4">Monthly Reports</div>
      <div className="bg-white rounded shadow p-4 mt-4">Export Controls (PDF, Excel, CSV)</div>
    </main>
  )
}
