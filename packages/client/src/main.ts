import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import socket from './api/socket'

const app = createApp(App)

app.use(createPinia())
app.use(socket)

app.mount('#app')
