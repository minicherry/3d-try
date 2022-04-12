import { createRouter,createWebHashHistory} from "vue-router";
const scale = () => import("../pages/scale.vue")

const routes = [
  { path: "/", redirect: "/scale" },
  {
    path: "/scale",
    name: "scale",
    component: scale
  }
]
let router = null
export default router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})