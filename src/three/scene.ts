import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
// 初始化场景
const scene = new THREE.Scene();


// 添加圆柱形天空
const rgbeloader = new RGBELoader();

rgbeloader.loadAsync("./textures/2k.hdr").then((texture) => {
  // 设置纹理为圆柱形纹理
  texture.mapping = THREE.EquirectangularReflectionMapping;
  // 添加天空环境
  scene.background = texture;
  scene.environment = texture;
});

// 场景亮度物理灯光效果
// 1设置色调映射
// 2设置曝光
// 3设置场景灯光

// 给场景添加平行光
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 100, 10);
scene.add(light);

export default scene;
