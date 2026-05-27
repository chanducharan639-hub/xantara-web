'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  PresentationControls,
} from '@react-three/drei';

import * as THREE from 'three';
import { useRef } from 'react';

function LuxuryObject() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // AUTO ROTATION
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x =
        Math.sin(t * 0.5) * 0.08;
    }

    // LUXURY RING MOTION
    if (ringRef.current) {
      ringRef.current.rotation.y =
        Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>

      {/* First Bar */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[2.5, 0.22, 0.22]} />

        <meshPhysicalMaterial
          color="#050505"
          metalness={1}
          roughness={0.05}
          clearcoat={1}
          reflectivity={1}
        />
      </mesh>

      {/* Second Bar */}
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[2.5, 0.22, 0.22]} />

        <meshPhysicalMaterial
          color="#050505"
          metalness={1}
          roughness={0.05}
          clearcoat={1}
          reflectivity={1}
        />
      </mesh>

      {/* Luxury Ring */}
      <mesh
        ref={ringRef}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.5}
      >
        <torusGeometry args={[1, 0.012, 32, 200]} />

        <meshPhysicalMaterial
          color="#c8a96b"
          metalness={1}
          roughness={0.08}
          clearcoat={1}
          emissive="#7a5a2b"
          emissiveIntensity={0.12}
        />
      </mesh>

    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-screen z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>

        {/* Background */}
        <color attach="background" args={['#f5f5f5']} />

        {/* Lights */}
        <ambientLight intensity={1.8} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <directionalLight
          position={[-5, -5, 2]}
          intensity={1}
        />

        {/* INTERACTIVE CONTROLS */}
        <PresentationControls
          global
          cursor
          speed={1.5}
          snap={false}
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 2, Math.PI / 2]}
          azimuth={[-Math.PI, Math.PI]}
        >
          <LuxuryObject />
        </PresentationControls>

        {/* Shadow */}
        <ContactShadows
          position={[0, -2.8, 0]}
          opacity={0.3}
          scale={14}
          blur={3}
          far={5}
        />

        {/* Environment */}
        <Environment preset="city" />

      </Canvas>
    </div>
  );
}