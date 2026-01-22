'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import VectorInput from '@/components/vector-lab/VectorInput';
import VectorInfoPanel from '@/components/vector-lab/VectorInfoPanel';
import VectorOperations from '@/components/vector-lab/VectorOperations';
import { VectorData } from '@/components/vector-lab/VectorCanvas';

// Dynamic import to avoid SSR issues with Three.js
const VectorCanvas = dynamic(
  () => import('@/components/vector-lab/VectorCanvas'),
  { ssr: false }
);

export default function VectorLabPage() {
  const [vectors, setVectors] = useState<VectorData[]>([]);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [showGrid, setShowGrid] = useState(true);
  const [gridSize, setGridSize] = useState(10);

  const handleAddResultVector = useCallback((vec: VectorData) => {
    setVectors(prev => [...prev, vec]);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-row h-screen p-4 gap-4">
        {/* 3D Canvas Area */}
        <div className="flex-1 relative rounded-xl overflow-hidden border border-cyan-900/30 shadow-2xl shadow-cyan-500/10">
          {/* Canvas header */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-cyan-400/70 font-mono text-sm">
                vector-space.render
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
              <span>Mode: <span className="text-cyan-400">{viewMode.toUpperCase()}</span></span>
              <span>Vectors: <span className="text-cyan-400">{vectors.length}</span></span>
            </div>
          </div>

          {/* Canvas */}
          <VectorCanvas
            vectors={vectors}
            viewMode={viewMode}
            showGrid={showGrid}
            gridSize={gridSize}
          />

          {/* Formula overlay */}
          {vectors.length > 0 && (
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="p-3 bg-black/60 backdrop-blur-sm rounded-lg border border-cyan-800/30">
                <div className="flex flex-wrap gap-3 font-mono text-sm">
                  {vectors.map((vec, i) => (
                    <span key={vec.id} style={{ color: vec.color, textShadow: `0 0 10px ${vec.color}40` }}>
                      v<sub>{i + 1}</sub> = [{vec.values.slice(0, viewMode === '2d' ? 2 : 3).join(', ')}]
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {vectors.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-20">⟨⃗⟩</div>
                <p className="text-gray-500 font-mono text-sm">
                  Add a vector to begin visualization
                </p>
                <p className="text-gray-600 font-mono text-xs mt-2">
                  Try: [2, 3] or [1, 2, 3]
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Control Panel - Scrollable */}
        <div className="w-full lg:w-96 flex-shrink-0 overflow-y-auto max-h-screen pb-4 space-y-4">
          <VectorInput
            vectors={vectors}
            onVectorsChange={setVectors}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            showGrid={showGrid}
            onShowGridChange={setShowGrid}
            gridSize={gridSize}
            onGridSizeChange={setGridSize}
          />

          {/* Vector Operations */}
          <VectorOperations
            vectors={vectors}
            onAddResultVector={handleAddResultVector}
            viewMode={viewMode}
          />

          {/* Info panel */}
          <VectorInfoPanel vectors={vectors} viewMode={viewMode} />

          {/* About card */}
          <div className="p-4 bg-gray-900/60 rounded-xl border border-gray-800/50">
            <h3 className="text-cyan-400 font-mono text-sm font-bold mb-2">
              📐 About Vector Space Lab
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Visualize vectors in 2D and 3D space. Perfect for learning linear algebra
              and understanding AI/ML math concepts like transformations, projections,
              and neural network weight matrices.
            </p>
            <div className="mt-3 pt-3 border-t border-gray-800/50">
              <p className="text-green-500 text-xs font-mono">✓ Phase 1: 2D Vectors</p>
              <p className="text-green-500 text-xs font-mono">✓ Phase 2: 3D Vectors</p>
              <p className="text-green-500 text-xs font-mono">✓ Vector Operations</p>
              <p className="text-gray-600 text-xs font-mono">◯ Matrix Transforms (coming)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
