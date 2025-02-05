import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ path, element }: { path: string; element: React.ReactNode }) => (
    <div data-testid={`route-${path.replace('/', '')}`}>{element}</div>
  )
}))

// Mock qiankun
vi.mock('qiankun', () => ({
  registerMicroApps: vi.fn(),
  start: vi.fn(),
  setDefaultMountApp: vi.fn()
}))

describe('Main App', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('renders navigation links', () => {
    expect(screen.getByText('TodoList')).toBeInTheDocument()
    expect(screen.getByText('Counter')).toBeInTheDocument()
  })

  it('renders container for sub-applications', () => {
    const container = screen.getByTestId('subapp-viewport')
    expect(container).toBeInTheDocument()
    expect(container).toHaveAttribute('id', 'subapp-viewport')
  })

  it('renders todo route with container', () => {
    const todoRoute = screen.getByTestId('route-todo')
    const todoContainer = todoRoute.querySelector('#todo-container')
    expect(todoContainer).toBeInTheDocument()
  })

  it('renders counter route with container', () => {
    const counterRoute = screen.getByTestId('route-counter')
    const counterContainer = counterRoute.querySelector('#counter-container')
    expect(counterContainer).toBeInTheDocument()
  })

  it('has correct navigation links', () => {
    const todoLink = screen.getByText('TodoList')
    const counterLink = screen.getByText('Counter')
    
    expect(todoLink).toHaveAttribute('href', '/todo')
    expect(counterLink).toHaveAttribute('href', '/counter')
  })
})
