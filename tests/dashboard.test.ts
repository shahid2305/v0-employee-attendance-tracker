import { describe, it, expect } from 'vitest'

describe('Dashboard API', () => {
  it('should return dashboard data', async () => {
    const res = await fetch('http://localhost:3000/api/dashboard')
    const data = await res.json()
    expect(data.data).toBeDefined()
  })
})
