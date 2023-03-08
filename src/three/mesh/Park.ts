import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import gsap from "gsap";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import eventHub from "@/utils/eventHub";
import { MeshLine } from "./meshLine";
import camera from "../camera";
export default class City {
  scene: THREE.Scene;
  floor1Group!: THREE.Group;
  floor2Group!: THREE.Group;
  wallGroup!: THREE.Group;
  floor2Tags: CSS3DObject[];
  floor1Position: THREE.Vector3 = new THREE.Vector3();
  floor2Position: THREE.Vector3 = new THREE.Vector3();
  wallPosition: THREE.Vector3 = new THREE.Vector3();
  mixer: any;
  constructor(scene: THREE.Scene) {
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    dracoLoader.setDecoderConfig({ type: "js" });
    dracoLoader.preload();
    gltfLoader.setDRACOLoader(dracoLoader);

    this.scene = scene;
    this.floor1Group;
    this.floor2Group;
    this.wallGroup;
    this.floor2Tags = [];
    gltfLoader.load("./gltf/floor2.glb", (gltf) => {
      this.floor2Group = gltf.scene;
      let array = ["小型会议室", "核心科技室", "科技展台", "设计总监办公室"];
      // 判断子元素是否是物体
      gltf.scene.traverse((child) => {
        //@ts-ignore
        if (child.isMesh) {
          //@ts-ignore
          child.material.emissiveIntensity = 15;
          // child.receiveShadow = true;
          // child.castShadow = true;
        }
        if (array.indexOf(child.name) != -1) {
          // console.log("小型会议室", child);
          const css3dObject = this.createTag(child);
          css3dObject.visible = false;
          this.floor2Tags.push(css3dObject);
          this.floor2Group.add(css3dObject);
        }
      });
      this.floor2Position = this.floor2Group.position.clone();
      this.floor2Group.add(camera);
      this.floor2Group.visible = false;
      scene.add(this.floor2Group);
    });

    gltfLoader.load("./gltf/floor1.glb", (gltf) => {
      this.floor1Group = gltf.scene;

      // 判断子元素是否是物体
      gltf.scene.traverse((child) => {
        //@ts-ignore
        if (child.isMesh) {
          // console.log(child);
          //@ts-ignore
          child.material.emissiveIntensity = 5;
          // child.receiveShadow = true;
          // child.castShadow = true;
        }
      });
      this.floor1Position = this.floor1Group.position.clone();
      this.floor1Group.add(camera);
      this.floor1Group.visible = false;
      scene.add(gltf.scene);
    });

    gltfLoader.load("./gltf/wall.glb", (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.traverse((item) => {
        // @ts-ignore
        const meshLine = new MeshLine(item.geometry);
        if (item.name === "工厂外墙") {
          const size = item.scale.x + 1;
        }
        meshLine.mesh.scale.set(13, 13, 13);
        meshLine.mesh.position.set(0, 58, 0);
        // scene.add(meshLine.mesh);
      });
      this.wallGroup = gltf.scene;
      this.wallGroup.add(camera);
      this.wallPosition = this.wallGroup.position.clone();
      // this.wallGroup.visible = false;
    });
    this.initEvent();
  }

  update(time: any) {
    if (this.mixer) {
      // console.log(time);
      this.mixer.update(time);
    }
  }

  createTag(object3d: THREE.Object3D<THREE.Event>) {
    // 创建各个区域的元素
    const element = document.createElement("div");
    element.className = "elementTag";
    element.innerHTML = `
      <div class="elementContent">
        <h3>${object3d.name}</h3>
        <p>温度：26℃</p>
        <p>湿度：50%</p>
      </div>
    `;

    const objectCSS3D = new CSS3DObject(element);
    objectCSS3D.position.copy(object3d.position);
    objectCSS3D.scale.set(0.2, 0.2, 0.2);
    return objectCSS3D;
    // scene.add(objectCSS3D);
  }

  showFloor1() {
    this.floor1Group.visible = true;
    camera.lookAt(this.floor1Group.position);
  }
  showFloor2() {
    this.floor2Group.visible = true;
    // this.fighterGroup.visible = true;
    this.floor2Tags.forEach((tag) => {
      tag.visible = true;
    });
    camera.lookAt(this.floor2Group.position);
  }

  hideFloor1() {
    this.floor1Group.visible = false;
  }
  hideFloor2() {
    this.floor2Group.visible = false;
    // this.fighterGroup.visible = false;
    this.floor2Tags.forEach((tag) => {
      tag.visible = false;
    });
  }

  hideWall() {
    this.wallGroup.visible = false;
  }
  showWall() {
    this.wallGroup.visible = true;
    camera.lookAt(this.wallGroup.position);
  }
  initEvent() {
    eventHub.on("showFloor1", () => {
      this.initPosition();
      this.showFloor1();
      gsap.to(this.floor1Group.position, {
        y: 50,
        duration: 1,
        delay: 1,
      });
    });
    eventHub.on("showFloor2", () => {
      this.initPosition();
      this.showFloor2();
      gsap.to(this.floor2Group.position, {
        y: 50,
        duration: 1,
        delay: 1,
      });
    });
    eventHub.on("showWall", () => {
      this.initPosition();
      this.showWall();
    });
    eventHub.on("showAll", () => {
      this.initPosition();

      this.showFloor1();
      this.showFloor2();
      this.showWall();
      gsap.to(this.wallGroup.position, {
        y: 200,
        duration: 1,
      });
      gsap.to(this.floor2Group.position, {
        y: 100,
        duration: 1,
        delay: 1,
      });
    });
  }
  initPosition() {
    camera.lookAt(0, 0, 0);
    this.hideFloor1();
    this.hideFloor2();
    this.hideWall();
    this.floor1Group.position.set(
      this.floor1Position.x,
      this.floor1Position.y,
      this.floor1Position.z
    );
    this.floor2Group.position.set(
      this.floor2Position.x,
      this.floor2Position.y,
      this.floor2Position.z
    );
    this.wallGroup.position.set(
      this.wallPosition.x,
      this.wallPosition.y,
      this.wallPosition.z
    );
  }
}
