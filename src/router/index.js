import { createRouter,createWebHashHistory} from "vue-router";
const scale = () => import("../pages/scale.vue")
const Home = () => import("../pages/Home.vue")
const weather = () => import("../pages/weather.vue")
const shader = () => import("../pages/shader.vue")
const skyBox = () => import("../pages/skyBox.vue")
const textureCompression = () => import("../pages/textureCompression.vue")
const cube = () => import("../pages/cube.vue")

const routes = [
  { path: "/", 
    redirect: "/Home"
  },
  { 
    path: "/Home", 
    name: 'Home',
    component: Home 
  },
  {
    path: "/scale",
    name: "scale",
    component: scale
  },
  {
    path: "/weather",
    name: "weather",
    component: weather
  },
  {
    path: "/shader",
    name: "shader",
    component: shader
  },
  {
    path: "/skyBox",
    name: "skyBox",
    component: skyBox
  },
  {
    path: "/textureCompression",
    name: "textureCompression",
    component: textureCompression
  },
  {
    path: "/cube",
    name: "cube",
    component: cube
  }
]
let router = null
export default router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})