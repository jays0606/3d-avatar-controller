import AvatarController from "@/class/AvatarController";
import { useState, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface AvatarProps {
  targetDirection: React.RefObject<THREE.Vector3 | null>;
}

const Avatar = ({ targetDirection }: AvatarProps) => {
  const [scene, setScene] = useState<THREE.Scene>();
  const avatarController = useRef(new AvatarController());

  const modelUrl = "https://models.readyplayer.me/640594355167081fc2ed91be.glb";
  const happyIdleUrl = "../assets/animation/HappyIdle.fbx";
  const walkAnimationUrl = "../assets/animation/Walking.fbx";
  const translateSpeed = 0.03;
  const rotateSpeed = 0.05;

  useEffect(() => {
    const loadModel = async () => {
      await avatarController.current.loadModel(modelUrl);
      await avatarController.current.loadAnimation(happyIdleUrl, "happyIdle");
      await avatarController.current.loadAnimation(walkAnimationUrl, "walk");
      setScene(avatarController.current.getScene());
    };
    loadModel();
  }, []);

  useFrame((_, delta) => {
    const avatar = avatarController.current.getScene();

    if (!avatar || !targetDirection.current) {
      avatarController.current.playAnimation("happyIdle");
    } else {
      avatar.position.x += targetDirection.current.x * translateSpeed;
      avatar.position.z += targetDirection.current.y * translateSpeed;

      const targetQuaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.atan2(targetDirection.current.x, targetDirection.current.y)
      );
      avatar.quaternion.slerp(targetQuaternion, rotateSpeed);
      avatarController.current.playAnimation("walk");
    }
    avatarController.current.update(delta);
  });

  return <>{scene && <primitive object={scene} />}</>;
};

export default Avatar;
