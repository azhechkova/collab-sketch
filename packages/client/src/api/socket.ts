import { io } from 'socket.io-client'
import type { App } from 'vue'

export default {
  install: (app: App<Element>) => {
    const socket = io(import.meta.env.VITE_APP_BASE_URL + '/rooms', { transports: ['websocket'] })
    app.config.globalProperties.$socket = socket
    app.provide('socket', socket)
  }
}
