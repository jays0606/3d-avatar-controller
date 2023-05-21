"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Lights from "./Canvas/Lights";
import CameraController from "./Canvas/CameraController";
import Avatar from "./Canvas/Avatar";
import Floor from "./Canvas/Floor";
import AvatarJoyStick from "./AvatarJoystick";
import ReadyPlayerCreator from "./ReadyPlayerCreator";

const Scene = () => {
  const [modelUrl, setModelUrl] = useState(
    "https://models.readyplayer.me/640594355167081fc2ed91be.glb"
  );
  const [isSelectingModel, setIsSelectingModel] = useState(false);
  const targetDirection = useRef<THREE.Vector3 | null>(null);

  const onCompleteModelSelection = (url: string) => {
    setModelUrl(url);
    setIsSelectingModel(false);
  };

  return (
    <div className="w-screen h-screen">
      <AvatarJoyStick
        onChange={(direction) => (targetDirection.current = direction)}
      ></AvatarJoyStick>
      {!isSelectingModel ? (
        <button onClick={() => setIsSelectingModel((prev) => !prev)}>
          Choose your model!
        </button>
      ) : (
        <ReadyPlayerCreator
          handleComplete={onCompleteModelSelection}
        ></ReadyPlayerCreator>
      )}
      <Canvas camera={{ fov: 35, position: [0, 2, 20] }}>
        <color attach="background" args={["#1A1A1A"]} />
        <Avatar targetDirection={targetDirection} modelUrl={modelUrl}></Avatar>
        <Lights />
        <Floor />
        <CameraController />
      </Canvas>
    </div>
  );
};

export default Scene;
