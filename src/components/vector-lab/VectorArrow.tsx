'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, extend } from '@react-three/fiber';
import { Line } from '@react-three/drei';

interface VectorArrowProps {
  vector: [number, number, number];
  color?: string;
  origin?: [number, number, number];
  label?: string;
  animated?: boolean;
}

export default function VectorArrow({
  vector,
  color = '#00ffff',
  origin = [0, 0, 0],
  animated = true,
}: VectorArrowProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const { length, coneRotation } = useMemo(() => {
    const dir = new THREE.Vector3(...vector).normalize();
    const len = new THREE.Vector3(...vector).length();

    // Calculate rotation to align cone with vector direction
    const quaternion = new THREE.Quaternion();
    if (len > 0) {
      quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    }
    const euler = new THREE.Euler().setFromQuaternion(quaternion);

    return {
      length: len,
      coneRotation: euler,
    };
  }, [vector]);

  // Subtle glow animation
  useFrame((state) => {
    if (animated && glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.9;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  // Line points for the shaft
  const linePoints = useMemo(() => {
    return [
      [origin[0], origin[1], origin[2]] as [number, number, number],
      [
        origin[0] + vector[0] * 0.85,
        origin[1] + vector[1] * 0.85,
        origin[2] + vector[2] * 0.85,
      ] as [number, number, number],
    ];
  }, [vector, origin]);

  if (length === 0) return null;

  return (
    <group ref={groupRef}>
      {/* Main shaft line using drei Line */}
      <Line
        points={linePoints}
        color={color}
        lineWidth={3}
      />

      {/* Glowing shaft cylinder */}
      <mesh
        position={[
          origin[0] + vector[0] * 0.425,
          origin[1] + vector[1] * 0.425,
          origin[2] + vector[2] * 0.425,
        ]}
        rotation={coneRotation}
        ref={glowRef}
      >
        <cylinderGeometry args={[0.04, 0.04, length * 0.85, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>

      {/* Arrow head cone */}
      <mesh
        position={[
          origin[0] + vector[0] * 0.85,
          origin[1] + vector[1] * 0.85,
          origin[2] + vector[2] * 0.85,
        ]}
        rotation={coneRotation}
      >
        <coneGeometry args={[0.12, 0.3, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Origin sphere */}
      <mesh position={origin}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}
