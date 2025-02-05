import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock DOM
const mockContainer = document.createElement('div')
const mockAppElement = document.createElement('div')
mockAppElement.id = 'app'
mockContainer.appendChild(mockAppElement)

// Mock Vue
const mockMount = vi.fn()
const mockUnmount = vi.fn()
const mockApp = {
  mount: mockMount,
  unmount: mockUnmount
}

vi.mock('vue', () => ({
  ref: vi.fn((val) => ({ value: val })),
  createApp: vi.fn(() => mockApp),
  defineComponent: vi.fn((component) => component)
}))

describe('Counter Entry', () => {
  let qiankunConfig: any = null
  
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
    qiankunConfig = null
    
    // Mock qiankun
    vi.doMock('vite-plugin-qiankun/dist/helper', () => ({
      renderWithQiankun: (config: any) => {
        qiankunConfig = config
      },
      qiankunWindow: {
        __POWERED_BY_QIANKUN__: true
      }
    }))
  })

  it('initializes app with qiankun', async () => {
    await import('../main')
    expect(qiankunConfig).toBeTruthy()
    expect(qiankunConfig).toHaveProperty('mount')
    expect(qiankunConfig).toHaveProperty('bootstrap')
    expect(qiankunConfig).toHaveProperty('unmount')
    expect(qiankunConfig).toHaveProperty('update')
  })

  it('mounts app correctly', async () => {
    await import('../main')
    expect(qiankunConfig).toBeTruthy()
    await qiankunConfig.mount({ container: mockContainer })
    expect(mockMount).toHaveBeenCalledWith(mockAppElement)
  })

  it('unmounts app correctly', async () => {
    await import('../main')
    expect(qiankunConfig).toBeTruthy()
    await qiankunConfig.mount({ container: mockContainer })
    qiankunConfig.unmount()
    expect(mockUnmount).toHaveBeenCalled()
  })

  it('logs bootstrap message', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    await import('../main')
    expect(qiankunConfig).toBeTruthy()
    qiankunConfig.bootstrap()
    expect(consoleSpy).toHaveBeenCalledWith('vue app bootstraped')
  })

  it('logs update message', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    await import('../main')
    expect(qiankunConfig).toBeTruthy()
    const props = { foo: 'bar' }
    qiankunConfig.update(props)
    expect(consoleSpy).toHaveBeenCalledWith('update props', props)
  })

  it('renders without qiankun when not in qiankun environment', async () => {
    // 修改环境标志
    vi.doMock('vite-plugin-qiankun/dist/helper', () => ({
      renderWithQiankun: vi.fn(),
      qiankunWindow: {
        __POWERED_BY_QIANKUN__: false
      }
    }))
    
    document.getElementById = vi.fn(() => mockAppElement)
    
    await import('../main')
    expect(mockMount).toHaveBeenCalledWith(mockAppElement)
  })
})
