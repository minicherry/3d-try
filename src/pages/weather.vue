<template>
  <div id="WebGL-output"></div>
</template>

<script>
/**
 * 点击按钮换天气
 */
import { reactive,onMounted } from 'vue'
import * as THREE from 'three' //引入Threejs
import CameraControls from "../../public/lib/controls/cameraControls"
export default {

  setup () {
    let scene = reactive({})
    let camera = reactive({})
    let renderer = reactive({})
    let controls = reactive({})

    const initScene = () => {
      scene = new THREE.Scene()
      var urls = [
          new URL('../assets/weather/posx.jpg', import.meta.url),
          new URL('../assets/weather/negx.jpg', import.meta.url),
          new URL('../assets/weather/posy.jpg', import.meta.url),
          new URL('../assets/weather/negy.jpg', import.meta.url),
          new URL('../assets/weather/posz.jpg', import.meta.url),
          new URL('../assets/weather/negz.jpg', import.meta.url)
      ];
      var textureCube = scene.background = new THREE.CubeTextureLoader()
          .load(urls);
    }

    const initOrbit = () => {
      CameraControls.install({THREE: window.THREE})
      controls = new CameraControls(camera, renderer.domElement, false)
    }

    const initCamera = () => {
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200);
      camera.position.set(0, 0, 1);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
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
            initOrbit()
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
