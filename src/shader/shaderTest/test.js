const vertexShader = `
  void main(){
    gl_Position = vec4( position, 10.0 );
  }
`
const fragmentShader = `
  void main(){
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  }
`
export default function createMaterial () {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    // transparent: true,
    depthWrite: false
  })
}