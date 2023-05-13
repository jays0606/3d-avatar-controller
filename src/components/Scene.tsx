"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Lights from "./Canvas/Lights";
import CameraController from "./Canvas/CameraController";
import Avatar from "./Canvas/Avatar";
import Helpers from "./Canvas/Helpers";
import AvatarJoyStick from "./AvatarJoystick";

const Scene = () => {
  const [targetDirection, setTargetDirection] = useState<THREE.Vector3 | null>(
    null
  );

  return (
    <div className="w-screen h-screen">
      <AvatarJoyStick onChange={setTargetDirection}></AvatarJoyStick>
      <Canvas camera={{ fov: 35, position: [0, 1, 10] }}>
        <Avatar targetDirection={targetDirection}></Avatar>
        <Lights />
        <Helpers />
        <CameraController />
      </Canvas>
    </div>
  );
};

export default Scene;
