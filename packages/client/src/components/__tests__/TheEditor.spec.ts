import { describe, it, expect } from 'vitest'
import { SocketServerMock } from 'socket.io-mock-ts'

import TheEditor from '../organisms/TheEditor.vue'
import mountWithStore from '@/helpers/mountWithStore'

describe('Editor', () => {
  it('renders properly', () => {
    const socket = new SocketServerMock()

    const wrapper = mountWithStore(TheEditor, {
      props: {
        socket: socket.clientMock
      }
    })
    expect(wrapper.text()).toMatchSnapshot()
  })

  it('renders the canvas element', async () => {
    const socket = new SocketServerMock()

    const wrapper = mountWithStore(TheEditor, {
      props: {
        socket: socket.clientMock
      }
    })

    const canvas = wrapper.find('canvas')
    expect(canvas.exists()).toBe(true)
  })

  it('stops drawing when the mouse button is released', async () => {
    const socket = new SocketServerMock()

    const wrapper = mountWithStore(TheEditor, {
      props: {
        socket: socket.clientMock
      }
    })

    const canvas = wrapper.find('canvas')

    await canvas.trigger('mousedown', { offsetX: 10, offsetY: 10 })
    await canvas.trigger('mousemove', { offsetX: 20, offsetY: 20 })
    await canvas.trigger('mouseup')

    expect(wrapper.vm.$refs.isDrawing).toBeFalsy()
  })
})
