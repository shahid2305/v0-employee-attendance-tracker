import { describe, it, expect } from 'vitest'

describe('Admin API', () => {
  it('should return admin tools data', async () => {
    const res = await fetch('http://localhost:3000/api/admin')
    const data = await res.json()
    expect(data.policies).toBeDefined()
    expect(data.geofences).toBeDefined()
  })
})
