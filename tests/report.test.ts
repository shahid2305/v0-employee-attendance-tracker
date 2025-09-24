import { describe, it, expect } from 'vitest'

describe('Report API', () => {
  it('should return reports', async () => {
    const res = await fetch('http://localhost:3000/api/report')
    const data = await res.json()
    expect(Array.isArray(data.reports)).toBe(true)
  })
})
