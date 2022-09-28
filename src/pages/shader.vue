<template>
  <div id="WebGL-output"></div>
</template>

<script>
/**
 * webgl try
 */
import { reactive,onMounted } from 'vue'
import CameraControls from "../controls/cameraControls"
import createMaterial from "../shader/shaderTest/test";
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
    }
    const addMesh = () =>{
      // addBufferMesh()
      addBoxMesh()
    }
    const addBufferMesh = () =>{
      const geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
      const vertices = new Float32Array([
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,

        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0, -1.0,  1.0
      ]);
      // 创建属性缓冲区对象  3个为一组，表示一个顶点的xyz坐标
      const attribue = new THREE.BufferAttribute(vertices, 3);
      // 设置几何体attributes属性的位置属性
      geometry.addAttribute( 'position', attribue );
      const material = createMaterial()
      const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      scene.add(mesh); //网格模型添加到场景中
    }
    const addBoxMesh = () =>{
      const geometry = new THREE.BoxGeometry()
      const material = createMaterial()
      const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      scene.add(mesh); //网格模型添加到场景中
    }
    const initOrbit = () => {
      CameraControls.install({THREE: window.THREE})
      controls = new CameraControls(camera, renderer.domElement, false)
      controls.saveState()

      controls.enableDamping = true;
      controls.enableZoom = true;
      controls.autoRotate = false;
      controls.minDistance = 20;
      //设置相机距离原点的最远距离
      controls.maxDistance = 10000;
      //是否开启右键拖拽
      controls.enablePan = true;
    }

    const initCamera = () => {
      camera = new THREE.PerspectiveCamera(90,
        window.innerWidth / window.innerHeight,
        0.01, 10000);
      camera.position.set(0,0, 1);
      camera.lookAt(new THREE.Vector3(100, 100, 100));
    }

    const initRender = () => {
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setClearColor(new THREE.Color(0x000000)) //设置背景颜色
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.getElementById('WebGL-output').appendChild(renderer.domElement)
    }

    const animate = () =>{
      const delta = clock.getDelta();
      controls.update(delta);
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
    onMounted(() => {
      init()
      addMesh()
    })
  }
}
</script>

<style scoped>
  #WebGL-output{
    height: 400px;
    width: 400px;
  }
</style>
