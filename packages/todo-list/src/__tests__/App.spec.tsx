import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('Todo List App', () => {
  it('renders todo list title', () => {
    render(<App />)
    expect(screen.getByText('Todo List')).toBeInTheDocument()
  })

  it('adds a new todo item', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText('添加新任务...')
    const button = screen.getByText('添加')
    
    await userEvent.type(input, '测试任务')
    fireEvent.click(button)
    
    expect(screen.getByText('测试任务')).toBeInTheDocument()
  })

  it('marks todo as completed', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText('添加新任务...')
    const button = screen.getByText('添加')
    
    await userEvent.type(input, '测试任务')
    fireEvent.click(button)
    
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    const todoText = screen.getByText('测试任务')
    expect(todoText).toHaveStyle({ textDecoration: 'line-through' })
  })

  it('deletes a todo item', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText('添加新任务...')
    const addButton = screen.getByText('添加')
    
    await userEvent.type(input, '测试任务')
    fireEvent.click(addButton)
    
    const deleteButton = screen.getByText('删除')
    fireEvent.click(deleteButton)
    
    expect(screen.queryByText('测试任务')).not.toBeInTheDocument()
  })

  it('does not add empty todo', async () => {
    render(<App />)
    const button = screen.getByText('添加')
    fireEvent.click(button)
    
    const todos = screen.queryAllByRole('listitem')
    expect(todos).toHaveLength(0)
  })

  it('does not add todo with only whitespace', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText('添加新任务...')
    const button = screen.getByText('添加')
    
    await userEvent.type(input, '   ')
    fireEvent.click(button)
    
    const todos = screen.queryAllByRole('listitem')
    expect(todos).toHaveLength(0)
  })

  it('handles input change', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText('添加新任务...') as HTMLInputElement
    
    await userEvent.type(input, '测试任务')
    expect(input.value).toBe('测试任务')
  })
})
