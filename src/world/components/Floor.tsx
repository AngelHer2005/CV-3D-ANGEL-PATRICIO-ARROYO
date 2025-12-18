import { memo } from 'react';
import { RigidBody } from '@react-three/rapier';
import { FloorMaterial } from '../materials/Materials';

// "memo" evita que React recalcule esto cada vez que te mueves
export const Floor = memo(() => (
  <RigidBody type="fixed" friction={1}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <FloorMaterial />
    </mesh>
  </RigidBody>
));