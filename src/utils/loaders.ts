import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const loadGltf = async (url: string): Promise<GLTF> => {
  const loader = new GLTFLoader();
  return await new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => resolve(gltf),
      (progress) => {},
      (error) => reject(error)
    );
  });
};

export const loadAnimationClip = async (url: string) => {
  const loader = new FBXLoader();
  const asset = await loader.loadAsync(url);
  const clip = asset.animations[0]
  return clip
};

export { loadGltf };
