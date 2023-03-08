<template>
  <div>
    <div class="progress" v-if="progress != 100">
      <img src="../assets/loading.gif" alt="" />
      <span>资源加载中：{{ progress }}%</span>
    </div>
    <div class="scene" ref="sceneDiv"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
import gsap from "gsap";
import * as THREE from "three";
// 场景
import scene from "@/three/scene";
// 相机
import camera from "@/three/camera";
// 控制器
import controls from "@/three/controls";
// 导入辅助坐标轴
import axesHelper from "@/three/axesHelper";
// 导入渲染器
import rendererModule from "@/three/render";
// 导入渲染函数
import animate from "@/three/animate";
// 初始化调整屏幕
import "@/three/Init";
// 添加渲染物体
import createMesh from "@/three/createMesh";
// 添加标记精灵
import { AlarmSprite } from '@/three/mesh/createSprite'
//  添加灯光
import { ligthGroup } from "@/three/light";
// 添加事件
import eventHub from '@/utils/eventHub'

// 灯光渲染
scene.add(ligthGroup.DirectionalLight)
const sceneDiv: Ref = ref();
//  相机
scene.add(camera);
// 坐标轴
// scene.add(axesHelper);
// 物体渲染
const city = createMesh(scene);
// city.showFloor1()
// 模拟数据

// const data = [
//   {
//     type: '火警',
//     position: {
//       x: 100,
//       z: 200
//     }
//   },
//   {
//     type: '治安',
//     position: {
//       x: -100,
//       z: 200
//     }
//   },
//   {
//     type: '电力',
//     position: {
//       x: 100,
//       z: -200
//     }
//   },
//   {
//     type: '监控',
//     position: {
//       x: 400,
//       z: -200
//     }
//   }
// ]
// data.forEach((item, i) => {
//   const sprite = new AlarmSprite(item.type, item.position)
//   sprite.onClick(() => {
//     eventHub.emit("spriteClick", { event: item, i,css3DEle:sprite.css3dObject });
//   })
//   scene.add(sprite.mesh)
//   scene.add(sprite.css3dObject)
//   // sprite.css3dObject.visible = true
// })
const progress = ref(0)
onMounted(() => {
  sceneDiv.value.appendChild(rendererModule.renderer.domElement);
  controls.update();

  THREE.DefaultLoadingManager.onProgress = (item, loaded, total) => {
    progress.value = +(new Number((loaded / total) * 100).toFixed(2));
    if (progress.value === 100) {
      // var box = new THREE.Box3().setFromObject(city.wallGroup);
      // var size = box.getSize(new THREE.Vector3(0,0,0));
      // console.log(size)

    }
  };
  animate();
});
</script>
<style lang="scss" scoped>
.scene {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}

.progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 103;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #fff;
  background: $basic-color;

  img {
    padding: 0 15px;
  }
}
</style>