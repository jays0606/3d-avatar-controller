import { loadGltf } from "@/utils/loaders";
import * as THREE from "three";

class AvatarController {
  private scene!: THREE.Scene;
  constructor() {
    this.scene = new THREE.Scene();
  }

  getScene() {
    return this.scene;
  }

  async loadModel(url: string) {
    const gltf = await loadGltf(url);
    gltf.scene.traverse((obj) => (obj.frustumCulled = false));
    this.scene.add(gltf.scene);
  }
}

export default AvatarController;
