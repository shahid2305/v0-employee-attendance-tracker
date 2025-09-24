// Admin Tools Page
import React from "react"

import { useEffect, useState } from "react"

type Policy = { id: number; name: string; value: string }
type Geofence = { id: number; name: string; latitude: number; longitude: number; radius_meters: number }

export default function AdminPage() {
  const [policies, setPolicies] = useState<Policy[]>([])
  const [geofences, setGeofences] = useState<Geofence[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("/api/admin")
      .then(res => res.json())
      .then(data => {
        setPolicies(data.policies || [])
        setGeofences(data.geofences || [])
      })
      .finally(() => setLoading(false))
  }, [])

  const handleImport = () => {
    // TODO: Implement bulk import
    alert("Bulk import triggered")
  }
  const handleExport = () => {
    // TODO: Implement bulk export
    alert("Bulk export triggered")
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin & HR Tools</h1>
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Bulk Import/Export</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2" onClick={handleImport}>Import Employees</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleExport}>Export Employees</button>
      </div>
      <div className="bg-white rounded shadow p-4 mt-4">
        <h2 className="font-semibold mb-2">Policy Management</h2>
        {loading ? <div>Loading...</div> : (
          <ul>
            {policies.map(p => (
              <li key={p.id} className="mb-2">{p.name}: {p.value}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="bg-white rounded shadow p-4 mt-4">
        <h2 className="font-semibold mb-2">Payroll Timesheets</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Download Timesheets</button>
      </div>
      <div className="bg-white rounded shadow p-4 mt-4">
        <h2 className="font-semibold mb-2">Geofencing</h2>
        {loading ? <div>Loading...</div> : (
          <ul>
            {geofences.map(g => (
              <li key={g.id} className="mb-2">{g.name}: ({g.latitude}, {g.longitude}) radius {g.radius_meters}m</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
