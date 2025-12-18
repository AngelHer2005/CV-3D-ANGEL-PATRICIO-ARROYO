import { memo } from 'react';
import { Float, Text, Sparkles } from '@react-three/drei';
import { MonolithBlockMaterial, MonolithScreen } from '../materials/Materials';

export const Monolith = memo(() => {
  return (
    <group position={[0, 8.5, -20]}>
      <group rotation={[-0.2, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[11, 15, 2]} /> 
          <MonolithBlockMaterial />
        </mesh>
        <mesh position={[0, 0, 1.05]}> 
           <planeGeometry args={[10, 14.1]} /> 
           <MonolithScreen />
        </mesh>
        
        {/* Luces y partículas optimizadas */}
        <pointLight color="#ffaa00" intensity={2} distance={15} position={[0, 2, 5]} />
        <Sparkles count={15} scale={[12, 16, 5]} size={8} speed={0.2} color="#ffd700" />
        
        <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
          <Text position={[0, 9, 0]} fontSize={1.5} color="#fff" anchorX="center" anchorY="middle" outlineWidth={0.05} outlineColor="#d94e00">
            MI CV
          </Text>
        </Float>
      </group>
    </group>
  );
});