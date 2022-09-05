<template>
  <div id="WebGL-output"></div>
</template>

<script>
/**
 * 点击按钮换天气
 */
import { reactive,onMounted } from 'vue'
import * as THREE from 'three' //引入Threejs
export default {

  setup () {
    let scene = reactive({})
    let camera = reactive({})
    let renderer = reactive({})
    const initScene = () => {
      scene = new THREE.Scene()
    }

    const initCamera = () => {
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200);
    }

    const initRender = () => {
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setClearColor(new THREE.Color(0x000000)) //设置背景颜色
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.getElementById('WebGL-output').appendChild(renderer.domElement)
    }

    const animate = () =>{
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    const init = () => {
      initScene()
      initCamera()
      initRender()
      animate()
    }
    onMounted(() => {
      init()
    })
  }
}
</script>

<style scoped>
  #WebGL-output{
    height: 400px;
    width: 400px;
  }
  .aaa{
    height: 400px;
    width: 400px;
  }
</style>
