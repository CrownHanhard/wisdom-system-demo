
import City from "./mesh/Park";
let city: City;
export default function createMesh(scene:THREE.Scene) {
  // 创建城市
  city = new City(scene);
  return city;
}

export function updateMesh(t:number) {
  // 更新城市
  city.update(t);
}
