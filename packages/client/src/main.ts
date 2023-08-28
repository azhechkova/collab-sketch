import Vue3ColorPicker from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import socket from './api/socket'
import router from './router'
import VueFeather from 'vue-feather'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(socket)
app.use(Vue3ColorPicker)
app.component(VueFeather.name, VueFeather)

app.mount('#app')
