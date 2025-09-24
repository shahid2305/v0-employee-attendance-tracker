import { describe, it, expect } from 'vitest'

describe('Leave API', () => {
  it('should return leave records', async () => {
    const res = await fetch('http://localhost:3000/api/leave')
    const data = await res.json()
    expect(Array.isArray(data.records)).toBe(true)
  })

  it('should allow leave application', async () => {
    const res = await fetch('http://localhost:3000/api/leave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'casual', start_date: '2025-09-25', end_date: '2025-09-26' })
    })
    const data = await res.json()
    expect(data.message).toContain('Leave')
  })
})
