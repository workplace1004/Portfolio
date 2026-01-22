'use client';

import { useState, useCallback, useMemo } from 'react';
import { VectorData } from './VectorCanvas';

interface VectorOperationsProps {
  vectors: VectorData[];
  onAddResultVector: (vector: VectorData) => void;
  viewMode: '2d' | '3d';
}

type OperationType = 
  | 'add' 
  | 'subtract' 
  | 'dot' 
  | 'cross' 
  | 'scale' 
  | 'normalize' 
  | 'projection'
  | 'angle';

const OPERATIONS: { id: OperationType; label: string; icon: string; description: string; needsTwo: boolean; needs3D?: boolean }[] = [
  { id: 'add', label: 'Add', icon: '+', description: 'v₁ + v₂', needsTwo: true },
  { id: 'subtract', label: 'Subtract', icon: '−', description: 'v₁ − v₂', needsTwo: true },
  { id: 'dot', label: 'Dot Product', icon: '·', description: 'v₁ · v₂ = scalar', needsTwo: true },
  { id: 'cross', label: 'Cross Product', icon: '×', description: 'v₁ × v₂ (3D only)', needsTwo: true, needs3D: true },
  { id: 'scale', label: 'Scale', icon: 'k', description: 'k × v', needsTwo: false },
  { id: 'normalize', label: 'Normalize', icon: 'û', description: 'v / |v|', needsTwo: false },
  { id: 'projection', label: 'Projection', icon: 'proj', description: 'proj_v₂(v₁)', needsTwo: true },
  { id: 'angle', label: 'Angle Between', icon: '∠', description: 'θ = cos⁻¹(v₁·v₂/|v₁||v₂|)', needsTwo: true },
];

const RESULT_COLORS = ['#ff9f43', '#ee5a24', '#10ac84', '#5f27cd', '#01a3a4', '#f368e0'];

export default function VectorOperations({ vectors, onAddResultVector, viewMode }: VectorOperationsProps) {
  const [selectedOp, setSelectedOp] = useState<OperationType>('add');
  const [vector1Idx, setVector1Idx] = useState(0);
  const [vector2Idx, setVector2Idx] = useState(1);
  const [scalarValue, setScalarValue] = useState(2);
  const [result, setResult] = useState<string | null>(null);
  const [resultCount, setResultCount] = useState(0);

  const currentOp = OPERATIONS.find(op => op.id === selectedOp)!;

  // Vector math functions
  const vecMath = useMemo(() => ({
    add: (a: number[], b: number[]): number[] => a.map((v, i) => v + b[i]),
    subtract: (a: number[], b: number[]): number[] => a.map((v, i) => v - b[i]),
    scale: (a: number[], k: number): number[] => a.map(v => v * k),
    dot: (a: number[], b: number[]): number => a.reduce((sum, v, i) => sum + v * b[i], 0),
    cross: (a: number[], b: number[]): number[] => [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ],
    magnitude: (a: number[]): number => Math.sqrt(a.reduce((sum, v) => sum + v * v, 0)),
    normalize: (a: number[]): number[] => {
      const mag = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
      return mag > 0 ? a.map(v => v / mag) : a;
    },
    projection: (a: number[], b: number[]): number[] => {
      const dotAB = a.reduce((sum, v, i) => sum + v * b[i], 0);
      const dotBB = b.reduce((sum, v) => sum + v * v, 0);
      const scalar = dotBB > 0 ? dotAB / dotBB : 0;
      return b.map(v => v * scalar);
    },
    angle: (a: number[], b: number[]): number => {
      const dotAB = a.reduce((sum, v, i) => sum + v * b[i], 0);
      const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
      const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
      if (magA === 0 || magB === 0) return 0;
      const cosAngle = Math.max(-1, Math.min(1, dotAB / (magA * magB)));
      return Math.acos(cosAngle) * (180 / Math.PI);
    },
  }), []);

  const executeOperation = useCallback(() => {
    if (vectors.length === 0) {
      setResult('Add vectors first!');
      return;
    }

    const v1 = vectors[vector1Idx]?.values || [0, 0, 0];
    const v2 = vectors[vector2Idx]?.values || [0, 0, 0];

    let resultVec: number[] | null = null;
    let scalarResult: number | null = null;
    let label = '';

    switch (selectedOp) {
      case 'add':
        resultVec = vecMath.add(v1, v2);
        label = `v${vector1Idx + 1} + v${vector2Idx + 1}`;
        break;
      case 'subtract':
        resultVec = vecMath.subtract(v1, v2);
        label = `v${vector1Idx + 1} − v${vector2Idx + 1}`;
        break;
      case 'scale':
        resultVec = vecMath.scale(v1, scalarValue);
        label = `${scalarValue} × v${vector1Idx + 1}`;
        break;
      case 'normalize':
        resultVec = vecMath.normalize(v1);
        label = `û${vector1Idx + 1}`;
        break;
      case 'dot':
        scalarResult = vecMath.dot(v1, v2);
        setResult(`v${vector1Idx + 1} · v${vector2Idx + 1} = ${scalarResult.toFixed(3)}`);
        return;
      case 'cross':
        if (viewMode === '2d') {
          setResult('Cross product requires 3D mode!');
          return;
        }
        resultVec = vecMath.cross(v1, v2);
        label = `v${vector1Idx + 1} × v${vector2Idx + 1}`;
        break;
      case 'projection':
        resultVec = vecMath.projection(v1, v2);
        label = `proj_v${vector2Idx + 1}(v${vector1Idx + 1})`;
        break;
      case 'angle':
        scalarResult = vecMath.angle(v1, v2);
        setResult(`∠(v${vector1Idx + 1}, v${vector2Idx + 1}) = ${scalarResult.toFixed(2)}°`);
        return;
    }

    if (resultVec) {
      const newVector: VectorData = {
        id: `result_${Date.now()}`,
        values: [resultVec[0], resultVec[1], resultVec[2]] as [number, number, number],
        color: RESULT_COLORS[resultCount % RESULT_COLORS.length],
        label: `${label} = [${resultVec.map(v => v.toFixed(2)).slice(0, viewMode === '2d' ? 2 : 3).join(', ')}]`,
      };
      onAddResultVector(newVector);
      setResultCount(prev => prev + 1);
      setResult(`Added: ${label}`);
    }
  }, [vectors, vector1Idx, vector2Idx, selectedOp, scalarValue, vecMath, onAddResultVector, viewMode, resultCount]);

  return (
    <div className="flex flex-col gap-3 p-3 bg-gray-900/60 rounded-xl border border-purple-900/30">
      <h3 className="text-purple-400 font-mono text-sm font-bold flex items-center gap-2">
        <span className="text-lg">🧮</span> Vector Operations
      </h3>

      {/* Operation selector */}
      <div className="grid grid-cols-4 gap-1">
        {OPERATIONS.map((op) => (
          <button
            key={op.id}
            onClick={() => setSelectedOp(op.id)}
            disabled={op.needs3D && viewMode === '2d'}
            title={op.description}
            className={`p-2 rounded text-center transition-all font-mono text-sm
              ${selectedOp === op.id 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800/60 text-gray-400 hover:bg-gray-700/60 hover:text-white'}
              ${op.needs3D && viewMode === '2d' ? 'opacity-40 cursor-not-allowed' : ''}
            `}
          >
            <div className="text-lg">{op.icon}</div>
            <div className="text-[10px] truncate">{op.label}</div>
          </button>
        ))}
      </div>

      {/* Formula display */}
      <div className="p-2 bg-black/40 rounded border border-purple-800/30 font-mono text-xs">
        <span className="text-gray-500">Formula: </span>
        <span className="text-purple-300">{currentOp.description}</span>
      </div>

      {/* Vector selectors */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs w-8">v₁:</span>
          <select
            value={vector1Idx}
            onChange={(e) => setVector1Idx(Number(e.target.value))}
            className="flex-1 px-2 py-1 bg-black/60 border border-gray-700 rounded text-sm text-white"
            disabled={vectors.length === 0}
          >
            {vectors.length === 0 ? (
              <option>No vectors</option>
            ) : (
              vectors.map((v, i) => (
                <option key={v.id} value={i}>
                  v{i + 1}: [{v.values.slice(0, viewMode === '2d' ? 2 : 3).join(', ')}]
                </option>
              ))
            )}
          </select>
        </div>

        {currentOp.needsTwo && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs w-8">v₂:</span>
            <select
              value={vector2Idx}
              onChange={(e) => setVector2Idx(Number(e.target.value))}
              className="flex-1 px-2 py-1 bg-black/60 border border-gray-700 rounded text-sm text-white"
              disabled={vectors.length < 2}
            >
              {vectors.length < 2 ? (
                <option>Need 2+ vectors</option>
              ) : (
                vectors.map((v, i) => (
                  <option key={v.id} value={i}>
                    v{i + 1}: [{v.values.slice(0, viewMode === '2d' ? 2 : 3).join(', ')}]
                  </option>
                ))
              )}
            </select>
          </div>
        )}

        {selectedOp === 'scale' && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs w-8">k:</span>
            <input
              type="number"
              value={scalarValue}
              onChange={(e) => setScalarValue(Number(e.target.value))}
              step="0.5"
              className="flex-1 px-2 py-1 bg-black/60 border border-gray-700 rounded text-sm text-white"
            />
          </div>
        )}
      </div>

      {/* Execute button */}
      <button
        onClick={executeOperation}
        disabled={vectors.length === 0 || (currentOp.needsTwo && vectors.length < 2)}
        className="w-full py-2 bg-purple-600/80 hover:bg-purple-500 disabled:bg-gray-700 
                   disabled:cursor-not-allowed rounded-lg text-white font-bold transition-all
                   hover:shadow-lg hover:shadow-purple-500/30"
      >
        Calculate {currentOp.label}
      </button>

      {/* Result display */}
      {result && (
        <div className="p-2 bg-black/40 rounded border border-green-800/30 text-green-400 text-sm font-mono animate-pulse">
          {result}
        </div>
      )}

      {/* Quick reference */}
      <div className="text-[10px] text-gray-600 font-mono space-y-0.5 pt-2 border-t border-gray-800/50">
        <div><span className="text-cyan-500">Dot:</span> scalar = |a||b|cos(θ)</div>
        <div><span className="text-cyan-500">Cross:</span> |a×b| = |a||b|sin(θ)</div>
        <div><span className="text-cyan-500">Proj:</span> (a·b/|b|²)b</div>
      </div>
    </div>
  );
}
