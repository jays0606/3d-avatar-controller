import AvatarController from "@/class/AvatarController";
import { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AvatarProps {
  targetDirection: React.RefObject<THREE.Vector3 | null>;
}

const Avatar = ({ targetDirection }: AvatarProps) => {
  const [scene, setScene] = useState<THREE.Scene>();
  const avatarController = useRef(new AvatarController());

  const modelUrl = "https://models.readyplayer.me/640594355167081fc2ed91be.glb";
  const translateSpeed = 0.03;
  const rotateSpeed = 0.1;

  useEffect(() => {
    avatarController.current.loadModel(modelUrl).then(() => {
      setScene(avatarController.current.getScene());
    });
  }, []);

  useFrame(() => {
    const avatar = avatarController.current
      .getScene()
      .getObjectByName("Armature");

    if (avatar && targetDirection.current) {
      avatar.position.x += targetDirection.current.x * translateSpeed;
      avatar.position.z += targetDirection.current.y * translateSpeed;

      const targetQuaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.atan2(targetDirection.current.x, targetDirection.current.y)
      );
      avatar.quaternion.rotateTowards(targetQuaternion, rotateSpeed);
    }
  });

  return <>{scene && <primitive object={scene} />}</>;
};

export default Avatar;
