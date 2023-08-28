import { describe, it, expect } from 'vitest'
import { DOMWrapper, mount } from '@vue/test-utils'
import BaseCheckbox from '../atoms/BaseCheckbox.vue'

const mountWrapper = () =>
  mount(BaseCheckbox, {
    props: {
      label: 'Test Label',
      modelValue: false
    }
  })

describe('BaseCheckbox', () => {
  it('renders input', () => {
    const wrapper = mountWrapper()
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.exists()).toBe(true)
  })
  it('renders label', () => {
    const wrapper = mountWrapper()

    const label = wrapper.find('label')
    const labelText = wrapper.find('span')
    expect(label.exists()).toBe(true)
    expect(labelText.exists()).toBe(true)
  })
  it('renders label with text Test Label', () => {
    const wrapper = mountWrapper()

    const labelText = wrapper.find('span')

    expect(labelText.text()).toBe('Test Label')
  })
  it('emits update:modelValue event on checkbox change', async () => {
    const wrapper = mountWrapper()

    const input = wrapper.find('input[type="checkbox"]') as DOMWrapper<HTMLInputElement>

    input.trigger('click')
    input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })
})
