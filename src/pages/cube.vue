<template>
</template>
<script>
 import * as THREE from '../../public/lib/three.moudule';
console.log(THREE);
export default {
  setup() {
    var camera, scene, renderer;
    var mesh;

    var clock = new THREE.Clock();

    init();
    animate();

    function init() {

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.outputEncoding = THREE.sRGBEncoding;
        document.body.appendChild( renderer.domElement );

        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
        camera.position.z = 500;

        scene = new THREE.Scene();

        // const geometry = new THREE.PlaneGeometry( 100, 100 );

        var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );

        let a = new URL('../assets/textureCompression/9000.png', import.meta.url).href
        let map = new THREE.TextureLoader().load(a);

        var material = new THREE.MeshBasicMaterial({ map: map });
        material.needsUpdate = true;

        mesh = new THREE.Mesh( geometry, material );

        scene.add( mesh );

        window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

        requestAnimationFrame( animate );

        var delta = clock.getDelta() * 0.5;

        mesh.rotation.x += delta;
        mesh.rotation.y += delta;

        renderer.render( scene, camera );

    }
  },
}
</script>
<style scoped>
  .test1{
    width: 500px;
  }
</style>
