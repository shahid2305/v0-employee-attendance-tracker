"use client"
// Report Page
import React from "react"

import { useEffect, useState } from "react"

type Report = {
  id: number
  month: string
  productivity: number
  absenteeism: number
}

export default function ReportPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("/api/report")
      .then(res => res.json())
      .then(data => setReports(data.reports || []))
      .finally(() => setLoading(false))
  }, [])

  const handleExport = (type: string) => {
    window.open(`/api/report?export=${type}`, "_blank")
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Monthly Reports</h2>
        {loading ? <div>Loading...</div> : (
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Month</th>
                <th>Productivity</th>
                <th>Absenteeism</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(r => (
                <tr key={r.id}>
                  <td>{r.month}</td>
                  <td>{r.productivity}</td>
                  <td>{r.absenteeism}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="bg-white rounded shadow p-4 mt-4">
        <h2 className="font-semibold mb-2">Export Controls</h2>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleExport("pdf")}>Export PDF</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleExport("excel")}>Export Excel</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleExport("csv")}>Export CSV</button>
        </div>
      </div>
    </main>
  )
}
