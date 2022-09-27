import { createRouter,createWebHashHistory} from "vue-router";
const scale = () => import("../pages/scale.vue")
const Home = () => import("../pages/Home.vue")
const weather = () => import("../pages/weather.vue")
const shader = () => import("../pages/shader.vue")

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
  }
]
let router = null
export default router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})