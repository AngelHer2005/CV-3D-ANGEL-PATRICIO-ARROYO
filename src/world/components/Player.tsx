// src/world/components/Player.tsx
import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import * as THREE from 'three';

const MONOLITH_POS = new THREE.Vector3(0, 8.5, -20);

export const Player = ({ setNearMonolith, speed }: { setNearMonolith: (is: boolean) => void, speed: number }) => {
  const body = useRef<any>(null);
  const [, getKeys] = useKeyboardControls();
  const { camera } = useThree();
  const [isNear, setIsNear] = useState(false);
  
  useFrame(() => {
    if (!body.current) return;
    const { forward, backward, left, right } = getKeys();
    
    const frontVector = new THREE.Vector3(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0));
    const sideVector = new THREE.Vector3((left ? 1 : 0) - (right ? 1 : 0), 0, 0);
    const direction = new THREE.Vector3()
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed)
      .applyEuler(camera.rotation);

    const linvel = body.current.linvel();
    body.current.setLinvel({ x: direction.x, y: linvel.y, z: direction.z }, true);
    
    const translation = body.current.translation();
    camera.position.set(translation.x, translation.y + 1.5, translation.z);

    const dist = new THREE.Vector3(translation.x, 0, translation.z).distanceTo(new THREE.Vector3(MONOLITH_POS.x, 0, MONOLITH_POS.z));
    if ((dist < 18) !== isNear) {
      setIsNear(dist < 18);
      setNearMonolith(dist < 18);
    }
  });

  return (
    <RigidBody ref={body} colliders={false} mass={1} type="dynamic" position={[0, 2, 12]} enabledRotations={[false, false, false]} lockRotations>
      <CapsuleCollider args={[0.75, 0.5]} />
    </RigidBody>
  );
};