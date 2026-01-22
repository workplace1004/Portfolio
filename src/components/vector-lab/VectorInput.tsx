'use client';

import { useState, useCallback } from 'react';
import { VectorData } from './VectorCanvas';

interface VectorInputProps {
  vectors: VectorData[];
  onVectorsChange: (vectors: VectorData[]) => void;
  viewMode: '2d' | '3d';
  onViewModeChange: (mode: '2d' | '3d') => void;
  showGrid: boolean;
  onShowGridChange: (show: boolean) => void;
  gridSize: number;
  onGridSizeChange: (size: number) => void;
}

// Simple math evaluator for basic expressions
const safeEvaluate = (expr: string): number => {
  const sanitized = expr.replace(/[^0-9+\-*/.()\s]/g, '');
  try {
    // Using Function constructor for simple math evaluation
    const result = new Function(`return (${sanitized})`)();
    return typeof result === 'number' && isFinite(result) ? result : NaN;
  } catch {
    return parseFloat(sanitized) || NaN;
  }
};

const VECTOR_COLORS = [
  '#00ffff', // Cyan
  '#ff00ff', // Magenta
  '#ffff00', // Yellow
  '#00ff00', // Green
  '#ff6600', // Orange
  '#ff0066', // Pink
  '#6600ff', // Purple
  '#00ff99', // Mint
];

export default function VectorInput({
  vectors,
  onVectorsChange,
  viewMode,
  onViewModeChange,
  showGrid,
  onShowGridChange,
  gridSize,
  onGridSizeChange,
}: VectorInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const parseVectorInput = useCallback((input: string): [number, number, number] | null => {
    try {
      // Try to parse as array notation: [x, y] or [x, y, z]
      const arrayMatch = input.match(/\[([^\]]+)\]/);
      if (arrayMatch) {
        const values = arrayMatch[1].split(',').map(v => {
          const parsed = safeEvaluate(v.trim());
          return typeof parsed === 'number' ? parsed : parseFloat(parsed);
        });
        
        if (values.length === 2) {
          return [values[0], values[1], 0];
        } else if (values.length === 3) {
          return [values[0], values[1], values[2]];
        }
      }

      // Try to parse as "v = [x, y]" format
      const assignMatch = input.match(/\w+\s*=\s*\[([^\]]+)\]/);
      if (assignMatch) {
        const values = assignMatch[1].split(',').map(v => {
          const parsed = safeEvaluate(v.trim());
          return typeof parsed === 'number' ? parsed : parseFloat(parsed);
        });
        
        if (values.length === 2) {
          return [values[0], values[1], 0];
        } else if (values.length === 3) {
          return [values[0], values[1], values[2]];
        }
      }

      // Try to parse as "x, y" or "x, y, z"
      const commaMatch = input.match(/^([\d.\-+*/\s]+),\s*([\d.\-+*/\s]+)(?:,\s*([\d.\-+*/\s]+))?$/);
      if (commaMatch) {
        const x = safeEvaluate(commaMatch[1].trim());
        const y = safeEvaluate(commaMatch[2].trim());
        const z = commaMatch[3] ? safeEvaluate(commaMatch[3].trim()) : 0;
        return [x, y, z];
      }

      return null;
    } catch {
      return null;
    }
  }, []);

  const handleAddVector = useCallback(() => {
    if (!inputValue.trim()) {
      setError('Please enter a vector');
      return;
    }

    const parsed = parseVectorInput(inputValue);
    if (!parsed) {
      setError('Invalid format. Try: [2, 3] or v = [1, 2, 3]');
      return;
    }

    // In 2D mode, ignore z component
    const vectorValues: [number, number, number] = viewMode === '2d' 
      ? [parsed[0], parsed[1], 0] 
      : parsed;

    const newVector: VectorData = {
      id: `v${Date.now()}`,
      values: vectorValues,
      color: VECTOR_COLORS[vectors.length % VECTOR_COLORS.length],
      label: `v${vectors.length + 1} = [${vectorValues.slice(0, viewMode === '2d' ? 2 : 3).join(', ')}]`,
    };

    onVectorsChange([...vectors, newVector]);
    setInputValue('');
    setError(null);
  }, [inputValue, parseVectorInput, vectors, onVectorsChange, viewMode]);

  const handleRemoveVector = useCallback((id: string) => {
    onVectorsChange(vectors.filter(v => v.id !== id));
  }, [vectors, onVectorsChange]);

  const handleClearAll = useCallback(() => {
    onVectorsChange([]);
    setError(null);
  }, [onVectorsChange]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddVector();
    }
  }, [handleAddVector]);

  // Quick add preset vectors
  const presetVectors = [
    { label: 'Unit X', value: '[1, 0]' },
    { label: 'Unit Y', value: '[0, 1]' },
    { label: 'Diagonal', value: '[1, 1]' },
    { label: 'Example', value: '[2, 3]' },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-cyan-900/50">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <h2 className="text-cyan-400 font-mono text-lg font-bold tracking-wider">
          VECTOR SPACE LAB
        </h2>
      </div>

      {/* Formula Display */}
      <div className="p-3 bg-black/50 rounded-lg border border-cyan-800/30 font-mono text-xs text-cyan-300/70">
        <span className="text-gray-500">// Enter vector:</span>
        <br />
        <span className="text-cyan-400">v</span> = [x, y] <span className="text-gray-600">or</span> [x, y, z]
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError(null);
          }}
          onKeyPress={handleKeyPress}
          placeholder="[2, 3] or v = [1, 2, 3]"
          className="flex-1 px-3 py-2 bg-black/60 border border-cyan-700/50 rounded-lg 
                     text-cyan-100 font-mono placeholder-gray-600
                     focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50
                     transition-all"
        />
        <button
          onClick={handleAddVector}
          className="px-4 py-2 bg-cyan-600/80 hover:bg-cyan-500 rounded-lg
                     text-white font-bold transition-all
                     hover:shadow-lg hover:shadow-cyan-500/30"
        >
          ADD
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-400 text-sm font-mono animate-pulse">{error}</p>
      )}

      {/* Quick presets */}
      <div className="flex flex-wrap gap-2">
        {presetVectors.map((preset) => (
          <button
            key={preset.label}
            onClick={() => setInputValue(preset.value)}
            className="px-2 py-1 text-xs bg-gray-800/60 hover:bg-gray-700/60 
                       border border-gray-700/50 rounded text-gray-400 
                       hover:text-cyan-400 transition-all font-mono"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* View controls */}
      <div className="flex flex-col gap-3 pt-3 border-t border-gray-700/50">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">View Mode</span>
          <div className="flex gap-1">
            <button
              onClick={() => onViewModeChange('2d')}
              className={`px-3 py-1 rounded text-sm font-mono transition-all ${
                viewMode === '2d'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              2D
            </button>
            <button
              onClick={() => onViewModeChange('3d')}
              className={`px-3 py-1 rounded text-sm font-mono transition-all ${
                viewMode === '3d'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              3D
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Show Grid</span>
          <button
            onClick={() => onShowGridChange(!showGrid)}
            className={`w-12 h-6 rounded-full transition-all ${
              showGrid ? 'bg-cyan-600' : 'bg-gray-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                showGrid ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Grid Size: {gridSize}</span>
          <input
            type="range"
            min="6"
            max="20"
            value={gridSize}
            onChange={(e) => onGridSizeChange(parseInt(e.target.value))}
            className="w-24 accent-cyan-500"
          />
        </div>
      </div>

      {/* Vector list */}
      {vectors.length > 0 && (
        <div className="flex flex-col gap-2 pt-3 border-t border-gray-700/50">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Vectors ({vectors.length})</span>
            <button
              onClick={handleClearAll}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
            {vectors.map((vec) => (
              <div
                key={vec.id}
                className="flex items-center justify-between p-2 bg-black/30 rounded border border-gray-800/50"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: vec.color, boxShadow: `0 0 8px ${vec.color}` }}
                  />
                  <span className="font-mono text-sm" style={{ color: vec.color }}>
                    {vec.label}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveVector(vec.id)}
                  className="text-gray-500 hover:text-red-400 transition-colors text-lg leading-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="pt-3 border-t border-gray-700/50 text-gray-500 text-xs font-mono">
        <p>💡 Use mouse to pan/zoom</p>
        <p>🔄 In 3D mode: drag to rotate</p>
      </div>
    </div>
  );
}
