import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import BaseButton from '../atoms/BaseButton.vue'

describe('BaseButton.vue', () => {
  it('emits a click event when clicked', async () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me'
      }
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted().click).toBeTruthy()
  })
})
