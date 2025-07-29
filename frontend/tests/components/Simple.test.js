// tests/components/Simple.test.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// Simple component for testing
const SimpleComponent = {
  template: `
    <div class="simple-component">
      <h1>{{ title }}</h1>
      <button @click="increment">Count: {{ count }}</button>
    </div>
  `,
  data() {
    return {
      title: 'Test Component',
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}

describe('Simple Component Test', () => {
  it('renders correctly', () => {
    const wrapper = mount(SimpleComponent)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Test Component')
  })

  it('increments count when button is clicked', async () => {
    const wrapper = mount(SimpleComponent)
    const button = wrapper.find('button')
    
    expect(button.text()).toContain('Count: 0')
    
    await button.trigger('click')
    expect(button.text()).toContain('Count: 1')
    
    await button.trigger('click')
    expect(button.text()).toContain('Count: 2')
  })

  it('displays correct title', () => {
    const wrapper = mount(SimpleComponent)
    const title = wrapper.find('h1')
    expect(title.text()).toBe('Test Component')
  })
})
