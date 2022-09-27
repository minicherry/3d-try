<template>
  <div id="WebGL-output"></div>
</template>

<script>
/**
 * 点击按钮换天气
 */
import { reactive,onMounted } from 'vue'
import CameraControls from "../controls/cameraControls"
const THREE = window.THREE

export default {

  setup () {
    let scene = reactive({})
    let camera = reactive({})
    let renderer = reactive({})
    let controls = reactive({})
    let clock = new THREE.Clock()

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
      // controls.saveState()

      // controls.enableDamping = true;
      // controls.enableZoom = true;
      // controls.autoRotate = false;
      // controls.minDistance = 20;
      // //设置相机距离原点的最远距离
      // controls.maxDistance = 10000;
      // //是否开启右键拖拽
      // controls.enablePan = true;
    }

    const initCamera = () => {
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200);
      camera.position.set(0,0, 1);
      camera.lookAt(new THREE.Vector3(100, 100, 100));
    }

    const initRender = () => {
      renderer = new THREE.WebGLRenderer({ antialias: true })
      // renderer.setClearColor(new THREE.Color(0x000000)) //设置背景颜色
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.getElementById('WebGL-output').appendChild(renderer.domElement)
    }

    const animate = () =>{
      const delta = clock.getDelta();
      controls.update(delta);
      // scene.children.forEach(function (child) {
      //   if (child instanceof THREE.Points) {
      //     var vertices = child.geometry.vertices;
      //     vertices.forEach(function (v) {
      //       v.y = v.y - (v.velocityY);
      //       v.x = v.x - (v.velocityX);
      //       if (v.y <= -20) v.y = 60;
      //       if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
      //     });
      //     // 顶点变动之后需要更新，否则无法实现特效
      //     child.geometry.verticesNeedUpdate = true
      //   }
      // })
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    const init = () => {
      initScene()
      initCamera()
      initRender()
      initOrbit()
      animate()
    }
    const createSnowClouds =(size, transparent, opacity, sizeAttenuation, color) =>{
      let snowflake1 = new URL('../assets/weather/points/snowflake1.png', import.meta.url).href
      let snowflake2 = new URL('../assets/weather/points/snowflake2.png', import.meta.url).href
      let snowflake3 = new URL('../assets/weather/points/snowflake3.png', import.meta.url).href
      let snowflake4 = new URL('../assets/weather/points/snowflake4.png', import.meta.url).href
      let snowflake5 = new URL('../assets/weather/points/snowflake5.png', import.meta.url).href

      var texture1 = new THREE.TextureLoader().load(snowflake1);
      var texture2 = new THREE.TextureLoader().load(snowflake2);
      var texture3 = new THREE.TextureLoader().load(snowflake3);
      var texture4 = new THREE.TextureLoader().load(snowflake4);
      var texture5 = new THREE.TextureLoader().load(snowflake5);

      scene.add(createPointCloud("snowflake", texture1, size, transparent, opacity, sizeAttenuation, color));
      scene.add(createPointCloud("snowflake", texture2, size, transparent, opacity, sizeAttenuation, color));
      scene.add(createPointCloud("snowflake", texture3, size, transparent, opacity, sizeAttenuation, color));
      scene.add(createPointCloud("snowflake", texture4, size, transparent, opacity, sizeAttenuation, color));
      scene.add(createPointCloud("snowflake", texture5, size, transparent, opacity, sizeAttenuation, color));
      console.log(scene)
    }
    const createPointCloud = (name, texture, size, transparent, opacity, sizeAttenuation, color) =>{
      var geom = new THREE.Geometry();
      var material = new THREE.PointsMaterial({
          size: size,
          transparent: transparent,
          opacity: opacity,
          map: texture,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: sizeAttenuation,
      });

      var range = 120;
      for (var i = 0; i < 5000; i++) {
        var particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
        particle.velocityY = 0.1 + Math.random() / 5;
        particle.velocityX = (Math.random() - 0.5) / 3;
        geom.vertices.push(particle);
      }

      let system = new THREE.Points(geom, material);
      // system.name = name;
      // system.sortParticles = true;
      system.verticesNeedUpdate = true;

      return system;
    }
    const createRainClouds = (size, transparent, opacity, sizeAttenuation, color) =>{
      let raindrop = new URL('../assets/weather/points/raindrop-3.png', import.meta.url).href
      console.log(raindrop)
      const texture1 = new THREE.TextureLoader().load(raindrop)
      scene.add(createPointCloud("system1", texture1, size, transparent, opacity, sizeAttenuation, color));
    }
    onMounted(() => {
      init()
      createSnowClouds(controls.size, controls.transparent, controls.opacity, controls.sizeAttenuation, controls.color);
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
