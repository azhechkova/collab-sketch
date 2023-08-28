import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import BaseRadio from '../atoms/BaseRadio.vue'

describe('Base Radio', () => {
  it('emits update:modelValue event on radio change', async () => {
    const wrapper = mount(BaseRadio, {
      props: {
        label: 'Test Radio',
        isChecked: false,
        modelValue: false
      }
    })

    const input = wrapper.find('input[type="radio"]')

    await input.trigger('click')
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['on'])
  })

  it('renders correct label', () => {
    const label = 'Test Radio Label'
    const wrapper = mount(BaseRadio, {
      props: {
        label,
        isChecked: false,
        modelValue: 'value1' // Assuming you have a model value
      }
    })

    const labelText = wrapper.find('span')

    expect(labelText.exists()).toBe(true)
    expect(labelText.text()).toBe(label)
  })
})
