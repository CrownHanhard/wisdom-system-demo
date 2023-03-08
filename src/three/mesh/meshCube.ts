import * as THREE from 'three'
const geometry = new THREE.BoxGeometry(10,10,10)
const material = new THREE.MeshBasicMaterial({color:'#fff'})
const plane = new THREE.Mesh(geometry,material)
export default plane