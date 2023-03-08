import * as THREE from "three";
import scene from "./scene";
import camera from "./camera";
import rendererModule from "./render";
import { updateMesh } from "./createMesh";
const clock = new THREE.Clock();
const animate = () => {
  // eslint-disable-next-line no-unused-vars
  const time = clock.getDelta();
  updateMesh(time)
  // 使用渲染器渲染相机看这个场景的内容渲染出来
  rendererModule.renderer.render(scene, camera);
  rendererModule.css3drender.render(scene, camera);
  requestAnimationFrame(animate);
};
export default animate;
