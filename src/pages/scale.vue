<script setup>
import { ref } from 'vue'
const THREE = window.THREE

let scaleX = ref(1)
let scaleY = ref(1)
let scaleZ = ref(1)

let cube = {}
const init = () => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  camera.position.z = 5

  function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
  }
  animate()
}
init()
// 输入x，y，z拉伸
const changeX = param => {
  scaleX.value = param
  cube.scale.set(param,scaleY.value,scaleZ.value)
}
const changeY = param => {
  scaleY.value = param
  cube.scale.set(scaleX.value,param,scaleZ.value)
}
const changeZ = param => {
  scaleZ.value = param
  cube.scale.set(scaleX.value,scaleY.value,param)
}

</script>

<template>
<input type="text"  @change="changeX(scaleX)" v-model.trim.lazy="scaleX">
<input type="text"  @change="changeY(scaleY)" v-model.trim.lazy="scaleY">
<input type="text"  @change="changeZ(scaleZ)" v-model.trim.lazy="scaleZ">

</template>


<style scoped>
a {
  color: #42b983;
}
</style>
