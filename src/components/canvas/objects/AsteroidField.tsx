'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * AsteroidField - Uses asteroid_low_poly and space_rocks GLTF models
 * 
 * Features:
 * - Multiple instances of both asteroid models
 * - Slow drift and rotation synchronized with scene
 * - Scroll parallax integration
 * - Different sizes and positions for depth
 */
export default function AsteroidField() {
    const { scene: asteroidModel } = useGLTF('/3d-modals/asteroid_low_poly/scene.gltf');
    const { scene: spaceRocksModel } = useGLTF('/3d-modals/space_rocks/scene.gltf');

    // Asteroid configurations - spread throughout the scene
    const configs = useMemo(() => [
        // Asteroid low poly instances
        { pos: [-45, 15, -50] as [number, number, number], scale: 0.8, model: 'asteroid', rotSpeed: 0.3 },
        { pos: [50, -20, -65] as [number, number, number], scale: 1.2, model: 'asteroid', rotSpeed: 0.2 },
        { pos: [-30, -28, -80] as [number, number, number], scale: 1.5, model: 'asteroid', rotSpeed: 0.15 },
        { pos: [35, 25, -40] as [number, number, number], scale: 0.6, model: 'asteroid', rotSpeed: 0.4 },
        { pos: [-60, 5, -90] as [number, number, number], scale: 1.0, model: 'asteroid', rotSpeed: 0.25 },

        // Space rocks instances
        { pos: [55, 18, -55] as [number, number, number], scale: 1.0, model: 'rocks', rotSpeed: 0.35 },
        { pos: [-40, -15, -45] as [number, number, number], scale: 0.7, model: 'rocks', rotSpeed: 0.28 },
        { pos: [25, -30, -75] as [number, number, number], scale: 1.3, model: 'rocks', rotSpeed: 0.18 },
        { pos: [-55, 30, -60] as [number, number, number], scale: 0.9, model: 'rocks', rotSpeed: 0.22 },
        { pos: [40, 8, -85] as [number, number, number], scale: 1.1, model: 'rocks', rotSpeed: 0.32 },
    ], []);

    return (
        <group>
            {configs.map((config, i) => (
                <AsteroidInstance
                    key={i}
                    model={config.model === 'asteroid' ? asteroidModel : spaceRocksModel}
                    position={config.pos}
                    scale={config.scale}
                    rotSpeed={config.rotSpeed}
                    index={i}
                />
            ))}
        </group>
    );
}

interface AsteroidInstanceProps {
    model: THREE.Object3D;
    position: [number, number, number];
    scale: number;
    rotSpeed: number;
    index: number;
}

function AsteroidInstance({ model, position, scale, rotSpeed, index }: AsteroidInstanceProps) {
    const ref = useRef<THREE.Group>(null);
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);

    // Clone model once
    const clonedModel = useMemo(() => {
        const clone = model.clone();
        // Enhance materials for better visibility
        clone.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material) {
                const mat = child.material as THREE.MeshStandardMaterial;
                mat.roughness = 0.8;
                mat.metalness = 0.2;
            }
        });
        return clone;
    }, [model]);

    // Unique phase offset for each asteroid
    const phase = useMemo(() => index * 1.7 + Math.random(), [index]);
    const initialRotation = useMemo(() => [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
    ], []);

    useFrame((state) => {
        if (!ref.current) return;
        const time = state.clock.getElapsedTime();

        // Slow noise-based drift - synchronized with scene time
        const driftX = Math.sin(time * 0.05 + phase) * 2;
        const driftY = Math.cos(time * 0.04 + phase * 0.7) * 1.5;
        const driftZ = Math.sin(time * 0.03 + phase * 1.2) * 1;

        // Apply position with scroll parallax
        const parallaxZ = scrollProgress * (8 + index * 2); // Each asteroid moves differently

        ref.current.position.x = position[0] + driftX;
        ref.current.position.y = position[1] + driftY;
        ref.current.position.z = position[2] + driftZ + parallaxZ;

        // Slow tumbling rotation - unique to each asteroid
        ref.current.rotation.x = initialRotation[0] + time * rotSpeed * 0.1;
        ref.current.rotation.y = initialRotation[1] + time * rotSpeed * 0.15;
        ref.current.rotation.z = initialRotation[2] + time * rotSpeed * 0.08;
    });

    return (
        <group ref={ref} position={position} scale={scale}>
            <primitive object={clonedModel} />
        </group>
    );
}

// Preload models
useGLTF.preload('/3d-modals/asteroid_low_poly/scene.gltf');
useGLTF.preload('/3d-modals/space_rocks/scene.gltf');