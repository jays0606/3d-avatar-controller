"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Lights from "./Canvas/Lights";
import CameraController from "./Canvas/CameraController";
import Avatar from "./Canvas/Avatar";
import Helpers from "./Canvas/Helpers";

const Scene = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ fov: 35, position: [0, 1, 10] }}>
        <Avatar></Avatar>
        <Lights />
        <Helpers />
        <CameraController />
      </Canvas>
    </div>
  );
};

export default Scene;
