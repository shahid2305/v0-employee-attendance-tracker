"use client"
// Leave Page
import React from "react"

import { useEffect, useState } from "react"

type LeaveRecord = {
  id: number
  type: string
  start_date: string
  end_date: string
  status: string
  applied_on: string
}

export default function LeavePage() {
  const [records, setRecords] = useState<LeaveRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ type: "casual", start_date: "", end_date: "" })

  useEffect(() => {
    setLoading(true)
    fetch("/api/leave")
      .then(res => res.json())
      .then(data => setRecords(data.records || []))
      .finally(() => setLoading(false))
  }, [])

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch("/api/leave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setLoading(false)
    // Optionally refresh records
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leave Management</h1>
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Leave Records</h2>
        {loading ? <div>Loading...</div> : (
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Applied On</th>
              </tr>
            </thead>
            <tbody>
              {records.map(r => (
                <tr key={r.id}>
                  <td>{r.type}</td>
                  <td>{r.start_date}</td>
                  <td>{r.end_date}</td>
                  <td>{r.status}</td>
                  <td>{r.applied_on?.slice(0,10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="bg-white rounded shadow p-4 mt-4">
        <h2 className="font-semibold mb-2">Apply for Leave</h2>
        <form className="flex flex-col gap-2" onSubmit={handleApply}>
          <label>
            Type:
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="border rounded px-2 ml-2">
              <option value="casual">Casual</option>
              <option value="sick">Sick</option>
              <option value="earned">Earned</option>
            </select>
          </label>
          <label>
            Start Date:
            <input type="date" value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} className="border rounded px-2 ml-2" required />
          </label>
          <label>
            End Date:
            <input type="date" value={form.end_date} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} className="border rounded px-2 ml-2" required />
          </label>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2" type="submit" disabled={loading}>
            Apply
          </button>
        </form>
      </div>
    </main>
  )
}
