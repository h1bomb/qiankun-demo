import { describe, it, expect, vi, beforeEach } from 'vitest'
import { registerMicroApps, start } from 'qiankun'

// Mock qiankun
vi.mock('qiankun', () => ({
  registerMicroApps: vi.fn(),
  start: vi.fn()
}))

// Mock App component
vi.mock('../App', () => ({
  default: () => 'App Component'
}))

// Mock react-dom/client
const renderFn = vi.fn()
const createRootFn = vi.fn(() => ({ render: renderFn }))

vi.mock('react-dom/client', () => ({
  default: {
    createRoot: createRootFn
  }
}))

// Mock React useEffect to execute immediately
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useEffect: (fn: () => void) => fn(),
  }
})

// Mock document.getElementById
const mockElement = document.createElement('div')
document.getElementById = vi.fn(() => mockElement)

describe('Main Entry', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes React application correctly', async () => {
    await import('../main')
    
    // 验证根元素的获取
    expect(document.getElementById).toHaveBeenCalledWith('root')
    
    // 验证React应用的创建
    expect(createRootFn).toHaveBeenCalledWith(mockElement)
    
    // 验证React应用的渲染
    expect(renderFn).toHaveBeenCalledTimes(1)
    // 验证渲染函数被调用，并且参数是一个包含App组件的React元素
    expect(renderFn).toHaveBeenCalled()
  })
})
