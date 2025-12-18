// src/world/components/JellyClouds.tsx
import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';

// Material específico para las nubes (translúcido y brillante)
const CloudMaterial = () => (
  <meshStandardMaterial
    color="#ff9933"
    emissive="#ff5500"
    emissiveIntensity={0.5}
    roughness={0.3}
    metalness={0.1}
    transparent
    opacity={0.7}
    flatShading // Sombreado plano para resaltar las facetas low-poly
  />
);

// Componente para cada nube individual que maneja su propio movimiento
const CloudInstance = ({ initialPos, scale, speed }: any) => {
  const ref = useRef<any>(null);
  const initialOffset = useMemo(() => Math.random() * 100, []); // Desfase inicial para que no se muevan en bloque

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    
    // Movimiento lateral constante (eje X)
    // Usamos módulo (%) para que reaparezcan por el otro lado
    const worldWidth = 600;
    let newX = (initialPos[0] + t * speed + initialOffset) % worldWidth;
    // Ajustar para centrar el rango de movimiento
    if (newX > worldWidth / 2) newX -= worldWidth;
    
    ref.current.position.x = newX;
    // Un ligero movimiento ondulatorio vertical (eje Y) para que parezca que flotan
    ref.current.position.y = initialPos[1] + Math.sin(t * speed * 0.3 + initialOffset) * 3;
    ref.current.rotation.x += 0.001 * speed;
    ref.current.rotation.z += 0.002 * speed;
  });

  // La posición inicial Z se mantiene constante
  return <Instance ref={ref} position={[initialPos[0], initialPos[1], initialPos[2]]} scale={scale} />;
};

export const JellyClouds = memo(() => {
  // Generamos los datos de las nubes una sola vez
  const cloudsData = useMemo(() => {
    const temp = [];
    const count = 40; // Cantidad de nubes
    for (let i = 0; i < count; i++) {
      temp.push({
        // Posición aleatoria alta en el cielo: X extendido, Y alto, Z profundo
        initialPos: [
          (Math.random() - 0.5) * 600, // Ancho del mundo
          Math.random() * 50 + 90,     // Altura (entre 90 y 140)
          (Math.random() - 0.5) * 400  // Profundidad
        ],
        // Tamaño aleatorio
        scale: Math.random() * 3 + 2,
        // Velocidad aleatoria
        speed: Math.random() * 5 + 2
      });
    }
    return temp;
  }, []);

  return (
    // Usamos un grupo lejano para que no interfieran con las sombras de la ciudad
    <group position={[0, 0, -50]}>
      <Instances range={cloudsData.length}>
        {/* Usamos un dodecaedro low-poly para dar forma de "pegote" de gelatina */}
        <dodecahedronGeometry args={[8, 0]} />
        <CloudMaterial />
        {cloudsData.map((data, i) => (
          <CloudInstance key={i} {...data} />
        ))}
      </Instances>
    </group>
  );
});