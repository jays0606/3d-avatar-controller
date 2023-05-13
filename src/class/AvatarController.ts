import { loadGltf, loadAnimationClip } from "@/utils/loaders";
import * as THREE from "three";

class AvatarController {
  private scene!: THREE.Scene;
  private mixer!: THREE.AnimationMixer;
  private actionMap: { [key: string]: THREE.AnimationAction } = {};
  private currentAction!: string | null;
  private actionDelay = 0.5;

  constructor() {
    this.scene = new THREE.Scene();
    this.mixer = new THREE.AnimationMixer(this.scene);
  }

  getScene() {
    return this.scene;
  }

  update(delta: number) {
    this.mixer.update(delta);
  }

  playAnimation(name: string) {
    if (name === this.currentAction) return;
    if (!this.actionMap[name]) return;

    if (this.currentAction) {
      this.actionMap[this.currentAction].fadeOut(this.actionDelay);
    }
    this.actionMap[name].reset().fadeIn(this.actionDelay).play();
    this.currentAction = name;
  }

  stopAnimation() {
    if (!this.currentAction) return;
    this.actionMap[this.currentAction].fadeOut(this.actionDelay);
    this.currentAction = null;
  }

  async loadModel(url: string) {
    if (this.scene.children.length === 1) {
      this.scene.children[0].removeFromParent();
    }
    const gltf = await loadGltf(url);
    gltf.scene.traverse((obj) => (obj.frustumCulled = false));
    this.scene.add(gltf.scene);
  }

  async loadAnimation(url: string, name: string) {
    const clip = await loadAnimationClip(url);

    // Remove hip, armature for walk animation since we will be updating them through joystick
    for (let i = clip.tracks.length - 1; i >= 0; i--) {
      const name = clip.tracks[i].name;
      if (name.includes("Hip") || name.includes("Armature")) {
        clip.tracks.splice(i, 1);
      }
    }

    const action = this.mixer.clipAction(clip);
    this.actionMap[name] = action;
    this.currentAction = name;
  }
}

export default AvatarController;
