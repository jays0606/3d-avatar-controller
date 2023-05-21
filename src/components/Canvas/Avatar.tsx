import AvatarController from "@/class/AvatarController";
import { useState, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  happyIdleUrl,
  walkAnimationUrl,
  translateSpeed,
  rotateSpeed,
} from "../../constants/avatar";
interface AvatarProps {
  modelUrl: string;
  targetDirection: React.RefObject<THREE.Vector3 | null>;
}

const Avatar = ({ modelUrl, targetDirection }: AvatarProps) => {
  const { camera } = useThree();
  const [scene, setScene] = useState<THREE.Scene>();
  const [isLoading, setIsLoading] = useState(true);
  const avatarController = useRef<AvatarController | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      setIsLoading(true);
      avatarController.current = new AvatarController();
      await avatarController.current.loadModel(modelUrl);
      await avatarController.current?.loadAnimation(happyIdleUrl, "happyIdle");
      await avatarController.current?.loadAnimation(walkAnimationUrl, "walk");
      setScene(avatarController.current.getScene());
      setIsLoading(false);
    };
    loadModel();
  }, [modelUrl]);

  useFrame((_, delta) => {
    if (isLoading || !avatarController.current) return;

    const avatar = avatarController.current.getScene();

    if (!avatar || !targetDirection.current) {
      avatarController.current.playAnimation("happyIdle");
    } else {
      // Calculate the camera's forward and right directions
      const cameraForward = camera
        .getWorldDirection(new THREE.Vector3())
        .normalize()
        .setY(0);
      const cameraRight = new THREE.Vector3().crossVectors(
        cameraForward,
        new THREE.Vector3(0, 1, 0)
      );

      // Calculate the updatedDirection based on targetDirection and the camera's orientation
      const updatedDirection = new THREE.Vector3()
        .addScaledVector(cameraForward, -targetDirection.current.y)
        .addScaledVector(cameraRight, targetDirection.current.x)
        .normalize();
      avatar.position.add(updatedDirection.multiplyScalar(translateSpeed));

      const targetQuaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.atan2(updatedDirection.x, updatedDirection.z)
      );
      avatar.quaternion.slerp(targetQuaternion, rotateSpeed);
      avatarController.current.playAnimation("walk");
    }
    avatarController.current.update(delta);
  });

  return <>{scene && <primitive object={scene} />}</>;
};

export default Avatar;
