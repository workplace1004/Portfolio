'use client';

import { useMemo } from 'react';
import { VectorData } from './VectorCanvas';

interface VectorInfoPanelProps {
  vectors: VectorData[];
  viewMode: '2d' | '3d';
}

export default function VectorInfoPanel({ vectors, viewMode }: VectorInfoPanelProps) {
  const vectorInfo = useMemo(() => {
    return vectors.map((vec) => {
      const [x, y, z] = vec.values;
      
      // Calculate magnitude
      const magnitude = Math.sqrt(x * x + y * y + (viewMode === '3d' ? z * z : 0));
      
      // Calculate angle (for 2D: angle from positive X axis)
      const angleRad = Math.atan2(y, x);
      const angleDeg = (angleRad * 180) / Math.PI;
      
      // For 3D: calculate spherical coordinates
      const theta = Math.atan2(y, x); // azimuthal angle
      const phi = magnitude > 0 ? Math.acos(z / magnitude) : 0; // polar angle
      
      return {
        ...vec,
        magnitude: magnitude.toFixed(2),
        angleFrom2D: angleDeg.toFixed(1),
        theta: ((theta * 180) / Math.PI).toFixed(1),
        phi: ((phi * 180) / Math.PI).toFixed(1),
        unitVector: magnitude > 0 
          ? [x / magnitude, y / magnitude, z / magnitude].map(v => v.toFixed(2))
          : [0, 0, 0],
      };
    });
  }, [vectors, viewMode]);

  if (vectors.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 p-3 bg-gray-900/60 rounded-xl border border-gray-800/50">
      <h3 className="text-cyan-400 font-mono text-sm font-bold flex items-center gap-2">
        <span className="text-lg">📊</span> Vector Properties
      </h3>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {vectorInfo.map((info, i) => (
          <div 
            key={info.id}
            className="p-2 rounded-lg bg-black/40 border-l-2"
            style={{ borderColor: info.color }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: info.color, boxShadow: `0 0 6px ${info.color}` }}
              />
              <span className="font-mono text-sm font-bold" style={{ color: info.color }}>
                v{i + 1}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono">
              {/* Components */}
              <div className="text-gray-500">Components:</div>
              <div className="text-gray-300">
                ({info.values.slice(0, viewMode === '2d' ? 2 : 3).join(', ')})
              </div>
              
              {/* Magnitude */}
              <div className="text-gray-500">Magnitude |v|:</div>
              <div className="text-yellow-400">{info.magnitude}</div>
              
              {/* Angle */}
              {viewMode === '2d' ? (
                <>
                  <div className="text-gray-500">Angle θ:</div>
                  <div className="text-purple-400">{info.angleFrom2D}°</div>
                </>
              ) : (
                <>
                  <div className="text-gray-500">Azimuth θ:</div>
                  <div className="text-purple-400">{info.theta}°</div>
                  <div className="text-gray-500">Polar φ:</div>
                  <div className="text-purple-400">{info.phi}°</div>
                </>
              )}
              
              {/* Unit vector */}
              <div className="text-gray-500">Unit vector:</div>
              <div className="text-cyan-300 text-[10px]">
                ({info.unitVector.slice(0, viewMode === '2d' ? 2 : 3).join(', ')})
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-2 pt-2 border-t border-gray-800/50 text-[10px] text-gray-600 font-mono">
        <div className="flex items-center gap-2">
          <span className="text-red-400">X</span> = horizontal
          <span className="text-green-400">Y</span> = vertical
          {viewMode === '3d' && <><span className="text-blue-400">Z</span> = depth</>}
        </div>
        <div className="mt-1">
          |v| = √(x² + y²{viewMode === '3d' && ' + z²'})
        </div>
      </div>
    </div>
  );
}
