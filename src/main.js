import { createApp } from 'vue'
import App from './App.vue'
import * as THREE from 'three' //引入Threejs
import router from './router/index'

const app = createApp(App)
app.use(THREE)
app.use(router)
app.mount('#app')
