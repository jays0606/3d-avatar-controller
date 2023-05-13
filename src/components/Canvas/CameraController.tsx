import { useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const CameraController = () => {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    controlsRef.current?.target.set(0, 1.0, 0);
  }, []);

  return <OrbitControls ref={controlsRef} />;
};

export default CameraController;
