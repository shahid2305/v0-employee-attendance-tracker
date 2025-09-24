// Attendance Page
import React from "react"

import { useEffect, useState } from "react"

type AttendanceRecord = {
  id: number
  checkin_time: string
  checkout_time: string
  method: string
  is_late: boolean
  is_early_exit: boolean
  overtime_minutes: number
}

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [checkin, setCheckin] = useState(false)
  const [method, setMethod] = useState("manual")

  useEffect(() => {
    setLoading(true)
    fetch("/api/attendance")
      .then(res => res.json())
      .then(data => setRecords(data.records || []))
      .finally(() => setLoading(false))
  }, [])

  const handleCheckin = async () => {
    setLoading(true)
    await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method }),
    })
    setCheckin(true)
    setLoading(false)
  }

  const handleCheckout = async () => {
    setLoading(true)
    await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method, checkout: true }),
    })
    setCheckin(false)
    setLoading(false)
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance</h1>
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Attendance Records</h2>
        {loading ? <div>Loading...</div> : (
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Method</th>
                <th>Late</th>
                <th>Early Exit</th>
                <th>Overtime (min)</th>
              </tr>
            </thead>
            <tbody>
              {records.map(r => (
                <tr key={r.id}>
                  <td>{r.checkin_time?.slice(0,10)}</td>
                  <td>{r.checkin_time?.slice(11,19)}</td>
                  <td>{r.checkout_time?.slice(11,19) || '-'}</td>
                  <td>{r.method}</td>
                  <td>{r.is_late ? "Yes" : "No"}</td>
                  <td>{r.is_early_exit ? "Yes" : "No"}</td>
                  <td>{r.overtime_minutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="bg-white rounded shadow p-4 mt-4">
        <h2 className="font-semibold mb-2">Check-in/Check-out</h2>
        <div className="flex gap-2 mb-2">
          <label>Method:</label>
          <select value={method} onChange={e => setMethod(e.target.value)} className="border rounded px-2">
            <option value="manual">Manual</option>
            <option value="qr">QR Code</option>
            <option value="rfid">RFID</option>
            <option value="gps">GPS</option>
          </select>
        </div>
        {!checkin ? (
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCheckin} disabled={loading}>
            Check In
          </button>
        ) : (
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleCheckout} disabled={loading}>
            Check Out
          </button>
        )}
      </div>
    </main>
  )
}
