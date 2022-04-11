import { createApp } from 'vue'
import App from './App.vue'
import * as THREE from 'three' //引入Threejs

const app = createApp(App)
app.use(THREE)

app.mount('#app')
