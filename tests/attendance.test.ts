import { describe, it, expect } from 'vitest'

// Example Attendance API test

describe('Attendance API', () => {
  it('should return attendance records', async () => {
    const res = await fetch('http://localhost:3000/api/attendance')
    const data = await res.json()
    expect(Array.isArray(data.records)).toBe(true)
  })

  it('should allow check-in', async () => {
    const res = await fetch('http://localhost:3000/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method: 'manual' })
    })
    const data = await res.json()
    expect(data.message).toContain('Attendance')
  })
})
