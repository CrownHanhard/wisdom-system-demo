import * as THREE from "three";
import camera from "../camera";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import scene from "../scene";
export class AlarmSprite {
  material: THREE.SpriteMaterial;
  mesh: THREE.Sprite;
  callbacks: Function[];
  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2;
  css3dObject: CSS3DObject;
  constructor(
    type = "火警",
    position = {
      x: -300,
      z: 200,
    },
    color = 0xffffff
  ) {
    const textureLoader = new THREE.TextureLoader();
    const typeObj: {
      [key: string]: string;
    } = {
      火警: "./textures/tag/fire.png",
      治安: "./textures/tag/jingcha.png",
      电力: "./textures/tag/e.png",
      监控: "./textures/tag/camera.png",
    };
    const map = textureLoader.load(typeObj[type]);
    this.material = new THREE.SpriteMaterial({
      map: map,
      color: color,
      transparent: true,
      depthTest: false,
    });
    this.mesh = new THREE.Sprite(this.material);
    // 设置位置
    this.mesh.scale.set(100, 100, 100);
    this.mesh.position.set(position.x, 140, position.z);
    this.css3dObject = this.createTag({
      name: type,
      position: new THREE.Vector3(position.x, 360, position.z),
    });
    this.css3dObject.visible = false;
    // 封装点击事件
    this.callbacks = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    window.addEventListener("click", (event) => {
      // event.stopPropagation()
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
      this.raycaster.setFromCamera(this.mouse, camera);
      const intersects = this.raycaster.intersectObject(this.mesh);
      if (intersects.length > 0) {
        this.callbacks.forEach((callback) => {
          callback(event);
        });
      }
    });
  }
  onClick(callback: Function) {
    this.callbacks.push(callback);
  }
  createTag(object3d: { name: any; position: THREE.Vector3 }) {
    // 创建各个区域的元素
    const element = document.createElement("div");
    element.className = "elementTag";
    element.innerHTML = `
      <div class="elementContent">
        <h3>${object3d.name}</h3>
        <p>温度：26℃</p>
        <p>湿度：50%</p>
        <EventBox class="model_bg" :is_rem="true" :size="{ width: 3, height: 2 }" />
      </div>
    `;

    const objectCSS3D = new CSS3DObject(element);
    objectCSS3D.position.copy(object3d.position);
    objectCSS3D.scale.set(2, 2, 2);
    return objectCSS3D;
  }
  remove() {
    this.mesh.parent!.remove(this.mesh);
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
