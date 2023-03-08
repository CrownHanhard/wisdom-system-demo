import * as THREE from "three";
export class MeshLine {
  material: THREE.LineBasicMaterial;
  geometry: THREE.EdgesGeometry<any>;
  mesh: THREE.LineSegments<THREE.EdgesGeometry<any>, any>;
  constructor(geometry:any) {
    const edges = new THREE.EdgesGeometry(geometry);
    this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const line = new THREE.LineSegments(edges, this.material);
    this.geometry = edges;
    this.mesh = line;
  }
}
