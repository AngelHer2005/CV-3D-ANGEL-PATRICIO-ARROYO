import { useMemo, memo } from 'react';
import { Instances, Instance } from '@react-three/drei';
import { InstancedRigidBodies } from '@react-three/rapier';
import { BuildingMaterial } from '../materials/Materials';

export const CityGrid = memo(() => {
  // useMemo ya optimizaba el cálculo, pero memo optimiza el componente React entero
  const instances = useMemo(() => {
    const temp = [];
    const gridSize = 12;
    const spacing = 12;
    for (let x = -gridSize/2; x < gridSize/2; x++) {
      for (let z = -gridSize/2; z < gridSize/2; z++) {
        if (Math.abs(x) < 2 && Math.abs(z) < 3) continue;
        const height = Math.random() * 25 + 15;
        temp.push({
          key: `inst-${x}-${z}`,
          position: [x * spacing, height / 2, z * spacing] as const,
          scale: [9, height, 9] as const, 
          rotation: [0, 0, 0] as const
        });
      }
    }
    return temp;
  }, []);

  return (
    <InstancedRigidBodies instances={instances} type="fixed" colliders="cuboid">
      <Instances range={instances.length} castShadow receiveShadow>
        <boxGeometry />
        <BuildingMaterial />
        {instances.map((data: any) => (
          <Instance key={data.key} position={data.position as any} scale={data.scale as any} />
        ))}
      </Instances>
    </InstancedRigidBodies>
  );
});