import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { registerMicroApps, start } from 'qiankun'

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Link: ({ children, to, className }: { children: React.ReactNode; to: string; className?: string }) => (
    <a href={to} className={className}>{children}</a>
  ),
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ path, element }: { path: string; element: React.ReactNode }) => (
    <div data-testid={`route-${path.replace('/', '')}`}>{element}</div>
  )
}))

// Mock qiankun
vi.mock('qiankun', () => ({
  registerMicroApps: vi.fn(),
  start: vi.fn()
}))

// Mock React useEffect to execute immediately
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useEffect: (fn: () => void) => fn(),
  }
})

describe('Main App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NODE_ENV = 'production' // 默认设置为生产环境
    render(<App />)
  })

  it('renders navigation links with correct text', () => {
    expect(screen.getByText('首页')).toBeInTheDocument()
    expect(screen.getByText('Todo List')).toBeInTheDocument()
    expect(screen.getByText('Counter')).toBeInTheDocument()
  })

  it('applies correct CSS classes to navigation links', () => {
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveClass('nav-link')
    })
  })

  it('renders main content container', () => {
    const mainContent = screen.getByRole('main')
    expect(mainContent).toBeInTheDocument()
  })

  it('renders containers for sub-applications', () => {
    const todoContainer = screen.getByTestId('route-todo')
    const counterContainer = screen.getByTestId('route-counter')
    
    expect(todoContainer).toBeInTheDocument()
    expect(counterContainer).toBeInTheDocument()
    
    expect(todoContainer.querySelector('#todo-container')).toBeInTheDocument()
    expect(counterContainer.querySelector('#counter-container')).toBeInTheDocument()
  })

  it('has correct navigation links', () => {
    const homeLink = screen.getByText('首页')
    const todoLink = screen.getByText('Todo List')
    const counterLink = screen.getByText('Counter')
    
    expect(homeLink).toHaveAttribute('href', '/')
    expect(todoLink).toHaveAttribute('href', '/todo')
    expect(counterLink).toHaveAttribute('href', '/counter')
  })
})

describe('Main App Environment Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('configures micro apps for production environment', () => {
    process.env.NODE_ENV = 'production'
    render(<App />)
    
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
      }
    ])
    expect(start).toHaveBeenCalled()
  })

  it('configures micro apps for development environment', () => {
    process.env.NODE_ENV = 'development'
    render(<App />)
    
    expect(registerMicroApps).toHaveBeenCalledWith([
      {
        name: 'todo-app',
        entry: '//localhost:5174',
        container: '#todo-container',
        activeRule: '/todo',
      },
      {
        name: 'counter-app',
        entry: '//localhost:5175',
        container: '#counter-container',
        activeRule: '/counter',
      }
    ])
    expect(start).toHaveBeenCalled()
  })
})
