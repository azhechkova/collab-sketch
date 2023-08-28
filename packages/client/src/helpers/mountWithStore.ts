import { createTestingPinia } from '@pinia/testing'
import { mount, VueWrapper, type MountingOptions } from '@vue/test-utils'
import { vi } from 'vitest'
import type { Component, ComponentPropsOptions } from 'vue'

/**
 * Mounts the given Vue component for testing with additional configurations.
 *
 * @param {Component} component - The Vue component to be tested.
 * @param {MountingOptions<ComponentPropsOptions>} options - Mounting options for the component.
 * @returns {VueWrapper} - A mounted test wrapper with createTestingPinia plugin and specified options.
 */

const mountWithStore = (
  component: Component,
  options: MountingOptions<ComponentPropsOptions>
): VueWrapper => {
  return mount(component, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })]
    },
    ...options
  })
}

export default mountWithStore
