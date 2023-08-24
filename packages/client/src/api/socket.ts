import { io } from 'socket.io-client'
import type { App } from 'vue'

export default {
  install: (app: App<Element>) => {
    const socket = io('http://localhost:4000/rooms', { transports: ['websocket'] })
    app.config.globalProperties.$socket = socket
    app.provide('socket', socket)
  }
}
