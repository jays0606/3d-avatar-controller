"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Lights from "./Canvas/Lights";
import CameraController from "./Canvas/CameraController";
import Avatar from "./Canvas/Avatar";
import Floor from "./Canvas/Floor";
import AvatarJoyStick from "./AvatarJoystick";

const Scene = () => {
  const targetDirection = useRef<THREE.Vector3 | null>(null);

  return (
    <div className="w-screen h-screen">
      <AvatarJoyStick
        onChange={(direction) => (targetDirection.current = direction)}
      ></AvatarJoyStick>
      <Canvas camera={{ fov: 35, position: [0, 1, 10] }}>
        <color attach="background" args={['#1A1A1A']} />
        <Avatar targetDirection={targetDirection}></Avatar>
        <Lights />
        <Floor />
        <CameraController />
      </Canvas>
    </div>
  );
};

export default Scene;
