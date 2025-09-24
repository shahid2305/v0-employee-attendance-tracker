import { describe, it, expect } from 'vitest'

describe('Activity API', () => {
  it('should return activity logs', async () => {
    const res = await fetch('http://localhost:3000/api/activity')
    const data = await res.json()
    expect(Array.isArray(data.records)).toBe(true)
  })

  it('should allow logging activity', async () => {
    const res = await fetch('http://localhost:3000/api/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project: 'Test', task: 'QA', description: 'Testing activity logging' })
    })
    const data = await res.json()
    expect(data.message).toContain('Activity')
  })
})
