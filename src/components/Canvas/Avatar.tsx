import AvatarController from "@/class/AvatarController";
import { useState, useRef, useEffect } from "react";

const Avatar = () => {
  const [scene, setScene] = useState<THREE.Scene>();
  const avatarController = useRef(new AvatarController());
  const modelUrl = "https://models.readyplayer.me/640594355167081fc2ed91be.glb";

  useEffect(() => {
    avatarController.current.loadModel(modelUrl).then(() => {
      console.log(avatarController.current.getScene());
      setScene(avatarController.current.getScene());
    });
  }, []);

  return <>{scene && <primitive object={scene} />}</>;
};

export default Avatar;
