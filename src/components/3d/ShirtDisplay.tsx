'use client';

import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export default function ShirtDisplay() {

    const texture = useLoader(
        THREE.TextureLoader,
        '/shirts/white-shirt.png'
    );

    texture.flipY = false;

    return (
        <mesh
            position={[0, 0.6, 0]}
            scale={1.8}
        >
            <planeGeometry args={[1, 1.4]} />

            <meshStandardMaterial
                map={texture}
                transparent
                alphaTest={0.1}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}