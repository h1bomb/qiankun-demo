import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock qiankun functions
vi.mock('qiankun', () => ({
  registerMicroApps: vi.fn(),
  start: vi.fn(),
  setDefaultMountApp: vi.fn(),
}))
