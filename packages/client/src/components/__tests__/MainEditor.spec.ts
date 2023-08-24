import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import MainEditor from '../atoms/MainEditor.vue'

describe('Main Editor', () => {
  it('renders properly', () => {
    const wrapper = mount(MainEditor)
    expect(wrapper.text()).toMatchSnapshot()
  })

  it('renders the canvas element', async () => {
    const wrapper = mount(MainEditor)

    const canvas = wrapper.find('canvas')
    expect(canvas.exists()).toBe(true)
  })

  it('stops drawing when the mouse button is released', async () => {
    const wrapper = mount(MainEditor)
    const canvas = wrapper.find('canvas')

    await canvas.trigger('mousedown', { offsetX: 10, offsetY: 10 })
    await canvas.trigger('mousemove', { offsetX: 20, offsetY: 20 })
    await canvas.trigger('mouseup')

    expect(wrapper.vm.isDrawing).toBe(false)
  })
})
