import camera from "./camera";
import rendererModule from "./render";

// 更新摄像头
camera.aspect = window.innerWidth / window.innerHeight;
//   更新摄像机的投影矩阵
camera.updateProjectionMatrix();

// 监听屏幕大小改变的变化，设置渲染的尺寸
window.addEventListener("resize", () => {
  //   console.log("resize");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  rendererModule.renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比例
  rendererModule.renderer.setPixelRatio(window.devicePixelRatio);
  // 更新cssrender
  rendererModule.css3drender.setSize(window.innerWidth, window.innerHeight);
});
