import * as THREE from "three";
import { Joystick } from "react-joystick-component";

interface AvatarJoyStickProps {
  onChange: (direction: THREE.Vector3 | null) => void;
}

const AvatarJoyStick = ({ onChange }: AvatarJoyStickProps) => {
  const handleMove = (event: any) => {
    if (event.x !== null && event.y !== null) {
      onChange(new THREE.Vector3(event.x, -event.y, 0));
    }
  };

  const handleStop = () => {
    onChange(null);
  };

  return (
    <div className="joystick-container absolute bottom-10 right-10 z-10">
      <Joystick
        move={handleMove}
        stop={handleStop}
        baseColor={"#212121"}
        stickColor={"#FFFFFF"}
      />
    </div>
  );
};

export default AvatarJoyStick;
