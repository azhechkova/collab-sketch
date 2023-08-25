import { mount } from '@vue/test-utils'
import BaseRangeInput from '../atoms/BaseRangeInput.vue'
import { describe, expect, it } from 'vitest'

describe('BaseRangeInput', () => {
  it('emits update:modelValue event on input change', async () => {
    const wrapper = mount(BaseRangeInput, {
      props: {
        label: 'Test Range',
        modelValue: 50
      }
    })

    const input = wrapper.find('input[type="range"]')

    await input.setValue(75)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['75'])
  })

  it('renders correct label', () => {
    const label = 'Test Range Label'
    const wrapper = mount(BaseRangeInput, {
      props: {
        label,
        modelValue: 50
      }
    })

    const labelText = wrapper.find('label')

    expect(labelText.exists()).toBe(true)
    expect(labelText.text()).toBe(label)
  })
})
