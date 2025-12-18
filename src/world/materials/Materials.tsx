import * as THREE from 'three';
import { useState, useEffect } from 'react';

// Gelatina Premium (Más profundidad y brillo interno)
export const MonolithBlockMaterial = () => (
  <meshPhysicalMaterial 
    color="#ff6600" 
    emissive="#ff3300" 
    emissiveIntensity={0.4} 
    roughness={0.1} 
    metalness={0.1} 
    transmission={0.6} // Transparencia tipo vidrio
    thickness={8}      // Grosor visual para refracción
    clearcoat={1}      // Capa de barniz extra brillo
    transparent 
    opacity={0.9}
  />
);

// Edificios con gradiente sutil simulado por física
export const BuildingMaterial = () => (
  <meshPhysicalMaterial 
    color="#ff8800" 
    emissive="#ff4400" 
    emissiveIntensity={0.2} 
    roughness={0.1} 
    metalness={0.3}
    transmission={0.2}
    thickness={5}
    transparent
    opacity={0.85}
  />
);

// Suelo espejo líquido
export const FloorMaterial = () => (
  <meshStandardMaterial 
    color="#ff4400" 
    roughness={0.05} 
    metalness={0.6} 
  />
);

export const IconMaterial = ({ color }: { color: string }) => (
  <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} toneMapped={false} />
);

export const MonolithScreen = () => {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    new THREE.TextureLoader().load('/CV-image.jpg', (t) => setTexture(t));
  }, []);
  return texture ? <meshBasicMaterial map={texture} toneMapped={false} /> : <meshStandardMaterial color="orange" />;
};