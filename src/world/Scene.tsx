import { useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls, Environment, BakeShadows, Html, KeyboardControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';

import { Player } from './components/Player';
import { CityGrid } from './components/CityGrid';
import { Monolith } from './components/Monolith';
import { Altar } from './components/Altars';
import { Floor } from './components/Floor';
// 1. IMPORTAR EL NUEVO COMPONENTE
import { JellyClouds } from './components/JellyClouds';

export const Scene = ({ onOpenSection, isLocked, setNearMonolith, settings }: any) => {
  const map = useMemo(() => [
    { name: 'forward', keys: ['w', 'W'] }, 
    { name: 'backward', keys: ['s', 'S'] }, 
    { name: 'left', keys: ['a', 'A'] }, 
    { name: 'right', keys: ['d', 'D'] }
  ], []);

  return (
    <KeyboardControls map={map}>
      <Canvas dpr={[0.6, 1]} camera={{ fov: 60, far: 300 }} gl={{ antialias: false, powerPreference: "high-performance" }} shadows>
        
        <color attach="background" args={['#2a0a00']} />
        {/* Aumentamos un poco la distancia de la niebla para ver mejor el cielo */}
        <fog attach="fog" args={['#ff5500', 20, 180]} /> 
        
        <Environment preset="sunset" resolution={512} blur={0.8} background={false} />
        <ambientLight intensity={0.5} color="#ffaa55" />
        <directionalLight 
            position={[50, 80, 30]} intensity={1.5} color="#ffeedd" 
            castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001}
        />
        <BakeShadows />

        <Suspense fallback={<Html center><div className="text-orange-500 font-bold animate-pulse tracking-widest">CARGANDO MUNDO...</div></Html>}>
          <Physics gravity={[0, -20, 0]}>
            {isLocked && <PointerLockControls pointerSpeed={settings.sensitivity} />}
            <Player setNearMonolith={setNearMonolith} speed={settings.speed} />
            
            {/* 2. AÑADIR EL COMPONENTE A LA ESCENA */}
            <JellyClouds />

            <CityGrid />
            <Monolith />
            <Floor />

            <Altar position={[-12, 4, 4]} color="#00ffaa" label="PERFIL" type="profile" onClick={() => onOpenSection('profile')} />
            <Altar position={[12, 4, 4]} color="#ff4444" label="ESTUDIOS" type="education" onClick={() => onOpenSection('education')} />
            <Altar position={[-8, 4, 16]} color="#ffdd00" label="SKILLS" type="skills" onClick={() => onOpenSection('hardSkills')} />
            <Altar position={[8, 4, 16]} color="#aa44ff" label="CERTIF." type="certifications" onClick={() => onOpenSection('certifications')} />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
};