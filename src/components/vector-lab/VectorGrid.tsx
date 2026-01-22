'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { Html, Line } from '@react-three/drei';

interface VectorGridProps {
  size?: number;
  divisions?: number;
  color?: string;
  opacity?: number;
  showLabels?: boolean;
  is3D?: boolean;
}

export default function VectorGrid({
  size = 10,
  divisions = 10,
  color = '#1a4a6e',
  opacity = 0.4,
  showLabels = true,
  is3D = false,
}: VectorGridProps) {
  const halfSize = size / 2;

  // Create axis lines data
  const axisLines = useMemo(() => {
    const lines: { points: [number, number, number][]; color: string; axis: string }[] = [];
    
    // X axis (red)
    lines.push({
      points: [[-halfSize, 0, 0], [halfSize, 0, 0]],
      color: '#ff6b6b',
      axis: 'x',
    });
    
    // Y axis (green)
    lines.push({
      points: [[0, -halfSize, 0], [0, halfSize, 0]],
      color: '#69db7c',
      axis: 'y',
    });
    
    // Z axis (blue) - for 3D mode
    if (is3D) {
      lines.push({
        points: [[0, 0, -halfSize], [0, 0, halfSize]],
        color: '#74c0fc',
        axis: 'z',
      });
    }
    
    return lines;
  }, [halfSize, is3D]);

  // Generate tick marks for axes
  const tickMarks = useMemo(() => {
    const ticks: { pos: [number, number, number]; value: number; axis: 'x' | 'y' | 'z' }[] = [];
    
    for (let i = -halfSize; i <= halfSize; i++) {
      if (i !== 0) {
        ticks.push({ pos: [i, 0, 0], value: i, axis: 'x' });
        ticks.push({ pos: [0, i, 0], value: i, axis: 'y' });
        if (is3D) {
          ticks.push({ pos: [0, 0, i], value: i, axis: 'z' });
        }
      }
    }
    
    return ticks;
  }, [halfSize, is3D]);

  return (
    <group>
      {/* Main grid on XY plane */}
      <gridHelper
        args={[size, divisions, color, color]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      />

      {/* XZ grid for 3D mode */}
      {is3D && (
        <gridHelper
          args={[size, divisions, color, color]}
          position={[0, 0, 0]}
        />
      )}

      {/* Coordinate axes using drei Line */}
      {axisLines.map((line, i) => (
        <group key={i}>
          <Line
            points={line.points}
            color={line.color}
            lineWidth={2}
          />
          
          {/* Arrow head at positive end */}
          <mesh
            position={line.points[1]}
            rotation={[
              line.axis === 'y' ? 0 : line.axis === 'z' ? Math.PI / 2 : -Math.PI / 2,
              line.axis === 'x' ? Math.PI / 2 : 0,
              0,
            ]}
          >
            <coneGeometry args={[0.08, 0.2, 8]} />
            <meshBasicMaterial color={line.color} />
          </mesh>
        </group>
      ))}

      {/* Axis labels (X, Y, Z) */}
      {showLabels && (
        <>
          <Html position={[halfSize + 0.5, 0, 0]} center>
            <div className="text-red-400 font-bold text-lg font-mono select-none" style={{ textShadow: '0 0 10px #ff6b6b' }}>
              X
            </div>
          </Html>
          <Html position={[0, halfSize + 0.5, 0]} center>
            <div className="text-green-400 font-bold text-lg font-mono select-none" style={{ textShadow: '0 0 10px #69db7c' }}>
              Y
            </div>
          </Html>
          {is3D && (
            <Html position={[0, 0, halfSize + 0.5]} center>
              <div className="text-blue-400 font-bold text-lg font-mono select-none" style={{ textShadow: '0 0 10px #74c0fc' }}>
                Z
              </div>
            </Html>
          )}
        </>
      )}

      {/* Tick marks with numbers */}
      {showLabels && tickMarks.map((tick, i) => (
        <group key={i}>
          <mesh position={tick.pos}>
            <boxGeometry args={[
              tick.axis === 'x' ? 0.02 : 0.1,
              tick.axis === 'y' ? 0.02 : 0.1,
              tick.axis === 'z' ? 0.02 : 0.1,
            ]} />
            <meshBasicMaterial color={
              tick.axis === 'x' ? '#ff6b6b' : 
              tick.axis === 'y' ? '#69db7c' : '#74c0fc'
            } transparent opacity={0.6} />
          </mesh>
          
          {tick.value % 2 === 0 && (
            <Html
              position={[
                tick.pos[0] + (tick.axis === 'x' ? 0 : -0.3),
                tick.pos[1] + (tick.axis === 'y' ? 0 : -0.3),
                tick.pos[2],
              ]}
              center
            >
              <div className="text-gray-400 text-xs font-mono select-none opacity-70">
                {tick.value}
              </div>
            </Html>
          )}
        </group>
      ))}

      {/* Origin indicator */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      {showLabels && (
        <Html position={[-0.4, -0.4, 0]} center>
          <div className="text-white text-xs font-mono select-none opacity-60">
            O
          </div>
        </Html>
      )}

      {/* Quadrant indicators for 2D mode */}
      {!is3D && showLabels && (
        <>
          <Html position={[halfSize * 0.6, halfSize * 0.6, 0]} center>
            <div className="text-gray-600 text-xs font-mono select-none opacity-40">
              I (+,+)
            </div>
          </Html>
          <Html position={[-halfSize * 0.6, halfSize * 0.6, 0]} center>
            <div className="text-gray-600 text-xs font-mono select-none opacity-40">
              II (-,+)
            </div>
          </Html>
          <Html position={[-halfSize * 0.6, -halfSize * 0.6, 0]} center>
            <div className="text-gray-600 text-xs font-mono select-none opacity-40">
              III (-,-)
            </div>
          </Html>
          <Html position={[halfSize * 0.6, -halfSize * 0.6, 0]} center>
            <div className="text-gray-600 text-xs font-mono select-none opacity-40">
              IV (+,-)
            </div>
          </Html>
        </>
      )}
    </group>
  );
}
