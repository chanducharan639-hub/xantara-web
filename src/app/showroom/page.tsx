'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars, Box, useTexture, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import ShirtDisplay from '@/components/3d/ShirtDisplay';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

function ShowroomWalls() {
  return (
    <group>

      {/* FLOOR */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        receiveShadow
      >
        <planeGeometry args={[60, 60]} />

        <meshStandardMaterial
          color="#050505"
          roughness={0.08}
          metalness={1}
        />
      </mesh>

      {/* MAIN ROUND PLATFORM */}
      <mesh
        position={[0, -1.7, 0]}
        receiveShadow
        castShadow
      >
        <cylinderGeometry args={[4.5, 5, 0.5, 64]} />

        <meshPhysicalMaterial
          color="#d9d9d9"
          roughness={0.25}
          metalness={0.15}
          clearcoat={1}
        />
      </mesh>

      {/* FLOATING WHITE PLATFORM */}
      <mesh
        position={[0, -0.8, 0]}
        castShadow
      >
        <cylinderGeometry args={[1.4, 1.4, 0.12, 64]} />

        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
        />
      </mesh>

      {/* GLOW LIGHT UNDER PLATFORM */}
      <pointLight
        position={[0, -1.2, 0]}
        intensity={8}
        distance={8}
        color="#ffffff"
      />

    </group>
  );
}
function ProductDisplay({ position, rotation, index }: { position: [number, number, number], rotation: [number, number, number], index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Display Case */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[1.5, 0.1, 1.5]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>

      {/* Floating Product (Placeholder abstract shape) */}
      <mesh ref={meshRef} castShadow>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} wireframe />
      </mesh>

      {/* SpotLight for product */}
      <spotLight position={[0, 4, 0]} angle={0.2} penumbra={0.5} intensity={5} castShadow target-position={[0, 0, 0]} color="#ffffff" />
    </group>
  );
}

export default function ShowroomPage() {
  return (
    <div className="w-full h-screen bg-black relative">
      <Link href="/" className="absolute top-24 left-8 z-20 flex items-center gap-2 text-white/50 hover:text-white transition-colors tracking-widest text-xs uppercase">
        <ChevronLeft size={16} /> Back to Reality
      </Link>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white/50 text-xs tracking-widest uppercase pointer-events-none text-center">
        <p className="mb-2">Drag to explore</p>
        <p>Xantara Virtual Concept Store</p>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={50} />
        <color attach="background" args={['#050505']} />

        <ambientLight intensity={0.2} />
        <Environment preset="night" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <ShowroomWalls />

        {/* Ring of products */}
        <ProductDisplay position={[0, 0, 0]} rotation={[0, 0, 0]} index={0} />
        <ProductDisplay
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          index={0}
        />

        {/* FRONT */}
        <ProductDisplay
          position={[0, 0, 2.2]}
          rotation={[0, 0, 0]}
          index={1}
        />

        {/* BACK */}
        <ProductDisplay
          position={[0, 0, -2.2]}
          rotation={[0, Math.PI, 0]}
          index={2}
        />

        {/* LEFT */}
        <ProductDisplay
          position={[-2.2, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          index={3}
        />

        {/* RIGHT */}
        <ProductDisplay
          position={[2.2, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          index={4}
        />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
