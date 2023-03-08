import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import camera from "./camera";
import rendererModule from "./render";

// 初始化控制器
const controls = new OrbitControls(camera, rendererModule.renderer.domElement);
// 设置控制器阻尼
controls.enableDamping = true;
// 设置自动旋转
// controls.autoRotate = true;

export default controls;
