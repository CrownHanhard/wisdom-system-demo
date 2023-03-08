import * as THREE from 'three'
 const PointLight = new THREE.PointLight(0xff000,5,10)
 PointLight.position.set(10,10,20)
 const DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
 DirectionalLight.position.set(10, 100, 10);


 export const ligthGroup ={
    PointLight,
    DirectionalLight
 }