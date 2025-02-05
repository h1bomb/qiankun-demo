import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('Counter App', () => {
  it('renders initial count', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('0')
  })

  it('increments count when + button is clicked', async () => {
    const wrapper = mount(App)
    const incrementButton = wrapper.findAll('button')[0]
    
    await incrementButton.trigger('click')
    expect(wrapper.text()).toContain('1')
  })

  it('decrements count when - button is clicked', async () => {
    const wrapper = mount(App)
    const decrementButton = wrapper.findAll('button')[1]
    
    await decrementButton.trigger('click')
    expect(wrapper.text()).toContain('-1')
  })
})
