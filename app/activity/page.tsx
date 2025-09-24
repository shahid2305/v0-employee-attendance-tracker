// Activity Page
import React from "react"

import { useEffect, useState } from "react"

type ActivityRecord = {
  id: number
  project: string
  task: string
  start_time: string
  end_time: string
  description: string
  idle_minutes: number
  break_minutes: number
}

export default function ActivityPage() {
  const [records, setRecords] = useState<ActivityRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ project: "", task: "", description: "" })

  useEffect(() => {
    setLoading(true)
    fetch("/api/activity")
      .then(res => res.json())
      .then(data => setRecords(data.records || []))
      .finally(() => setLoading(false))
  }, [])

  const handleLog = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setLoading(false)
    // Optionally refresh records
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Activity Tracking</h1>
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Activity Logs</h2>
        {loading ? <div>Loading...</div> : (
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Project</th>
                <th>Task</th>
                <th>Start</th>
                <th>End</th>
                <th>Description</th>
                <th>Idle (min)</th>
                <th>Break (min)</th>
              </tr>
            </thead>
            <tbody>
              {records.map(r => (
                <tr key={r.id}>
                  <td>{r.project}</td>
                  <td>{r.task}</td>
                  <td>{r.start_time?.slice(0,16)}</td>
                  <td>{r.end_time?.slice(0,16) || '-'}</td>
                  <td>{r.description}</td>
                  <td>{r.idle_minutes}</td>
                  <td>{r.break_minutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="bg-white rounded shadow p-4 mt-4">
        <h2 className="font-semibold mb-2">Log New Activity</h2>
        <form className="flex flex-col gap-2" onSubmit={handleLog}>
          <label>
            Project:
            <input type="text" value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))} className="border rounded px-2 ml-2" required />
          </label>
          <label>
            Task:
            <input type="text" value={form.task} onChange={e => setForm(f => ({ ...f, task: e.target.value }))} className="border rounded px-2 ml-2" required />
          </label>
          <label>
            Description:
            <input type="text" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="border rounded px-2 ml-2" />
          </label>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2" type="submit" disabled={loading}>
            Log Activity
          </button>
        </form>
      </div>
    </main>
  )
}
