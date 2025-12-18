import { useRef, useState, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { IconMaterial } from '../materials/Materials';
import * as THREE from 'three';

export const Altar = memo(({ position, color, label, type, onClick }: any) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);

  // La animación se maneja fuera del ciclo de renderizado de React (en la GPU/loop de Threejs)
  useFrame((state) => { 
    if (meshRef.current) { 
        meshRef.current.rotation.y += 0.01;
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.2; 
    }
  });

  const renderShape = () => {
    switch (type) {
      case 'profile': return <dodecahedronGeometry args={[1.2, 0]} />;
      case 'education': return <boxGeometry args={[1.5, 2, 0.4]} />;
      case 'skills': return <torusGeometry args={[0.8, 0.3, 6, 12]} />; // Geometría reducida (Low Poly)
      case 'certifications': return <cylinderGeometry args={[0.3, 0.3, 2, 8]} />; // Geometría reducida
      default: return <octahedronGeometry args={[1.5, 0]} />;
    }
  };

  return (
    <group ref={meshRef} position={position}>
      <mesh 
        onClick={(e) => { e.stopPropagation(); onClick(); }} 
        onPointerOver={() => setHover(true)} 
        onPointerOut={() => setHover(false)} 
        scale={hovered ? 1.3 : 1.0}
        rotation={type === 'certifications' ? [0,0,Math.PI/4] : [0,0,0]}
      >
        {renderShape()}
        <IconMaterial color={color} />
      </mesh>
      <mesh position={[0, -3, 0]} rotation={[-Math.PI/2,0,0]}>
         <ringGeometry args={[1.2, 1.4, 16]} /> 
         <meshBasicMaterial color={color} opacity={0.6} transparent side={THREE.DoubleSide} />
      </mesh>
      <Text position={[0, 3.5, 0]} fontSize={0.8} color="white" anchorX="center" anchorY="middle" outlineWidth={0.05} outlineColor={color}>
        {label}
      </Text>
    </group>
  );
});