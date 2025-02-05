import { describe, it, expect, vi, beforeEach } from 'vitest'
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'

// Mock qiankun
vi.mock('qiankun', () => ({
  registerMicroApps: vi.fn(),
  start: vi.fn(),
  setDefaultMountApp: vi.fn()
}))

// Mock react-dom/client
vi.mock('react-dom/client', () => ({
  default: {
    createRoot: vi.fn(() => ({
      render: vi.fn()
    }))
  }
}))

// Mock document.getElementById
document.getElementById = vi.fn(() => document.createElement('div'))

describe('Main Entry', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes qiankun correctly', async () => {
    await import('../main')

    expect(registerMicroApps).toHaveBeenCalledWith([
      {
        name: 'todo-app',
        entry: '/todo/',
        container: '#todo-container',
        activeRule: '/todo',
      },
      {
        name: 'counter-app',
        entry: '/counter/',
        container: '#counter-container',
        activeRule: '/counter',
      },
    ])

    expect(setDefaultMountApp).toHaveBeenCalledWith('/todo')
    expect(start).toHaveBeenCalled()
  })
})
