'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import { Suspense } from 'react';
import VectorArrow from './VectorArrow';
import VectorGrid from './VectorGrid';

export interface VectorData {
  id: string;
  values: [number, number, number];
  color: string;
  label: string;
  origin?: [number, number, number];
}

interface VectorCanvasProps {
  vectors: VectorData[];
  viewMode: '2d' | '3d';
  showGrid: boolean;
  gridSize: number;
}

export default function VectorCanvas({
  vectors,
  viewMode,
  showGrid,
  gridSize,
}: VectorCanvasProps) {
  // Calculate camera position to see all vectors
  const cameraPosition: [number, number, number] = viewMode === '2d' 
    ? [0, 0, 12] 
    : [8, 6, 8];

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-950 via-gray-900 to-black rounded-xl overflow-hidden">
      <Canvas shadows>
        <Suspense fallback={<LoadingFallback />}>
          <PerspectiveCamera
            makeDefault
            position={cameraPosition}
            fov={50}
          />
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={viewMode === '3d'}
            minDistance={3}
            maxDistance={30}
            // Lock to 2D view when in 2D mode
            minPolarAngle={viewMode === '2d' ? Math.PI / 2 : 0}
            maxPolarAngle={viewMode === '2d' ? Math.PI / 2 : Math.PI}
            minAzimuthAngle={viewMode === '2d' ? 0 : -Infinity}
            maxAzimuthAngle={viewMode === '2d' ? 0 : Infinity}
          />

          {/* Ambient light for overall scene illumination */}
          <ambientLight intensity={0.4} />
          
          {/* Point lights for dramatic effect */}
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4a90d9" />

          {/* Grid */}
          {showGrid && <VectorGrid size={gridSize} divisions={gridSize} is3D={viewMode === '3d'} />}

          {/* Vectors */}
          {vectors.map((vec) => (
            <group key={vec.id}>
              <VectorArrow
                vector={vec.values}
                color={vec.color}
                origin={vec.origin || [0, 0, 0]}
                label={vec.label}
              />
              {/* HTML label for vector */}
              <Html
                position={[
                  (vec.origin?.[0] || 0) + vec.values[0] + 0.3,
                  (vec.origin?.[1] || 0) + vec.values[1] + 0.3,
                  (vec.origin?.[2] || 0) + vec.values[2],
                ]}
                center
                style={{
                  color: vec.color,
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  textShadow: `0 0 10px ${vec.color}`,
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {vec.label}
              </Html>
            </group>
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="text-cyan-400 font-mono animate-pulse">
        Loading Vector Space...
      </div>
    </Html>
  );
}
