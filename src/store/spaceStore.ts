import { create } from 'zustand';

/**
 * SpaceStore - Global state for space background interactions
 * 
 * Manages:
 * - Mouse position and interaction state
 * - Scroll progress
 * - Wave effects
 * - Audio state
 */

interface SpaceStore {
    // Mouse interaction
    mousePosition: { x: number; y: number };
    mouseVelocity: number;
    waveIntensity: number;

    // Scroll state
    scrollProgress: number;
    scrollVelocity: number;

    // Audio
    audioEnabled: boolean;
    audioVolume: number;

    // Actions
    setMousePosition: (x: number, y: number) => void;
    setMouseVelocity: (velocity: number) => void;
    setWaveIntensity: (intensity: number) => void;
    setScrollProgress: (progress: number) => void;
    setScrollVelocity: (velocity: number) => void;
    toggleAudio: () => void;
    setAudioVolume: (volume: number) => void;
}

export const useSpaceStore = create<SpaceStore>((set) => ({
    // Initial state
    mousePosition: { x: 0, y: 0 },
    mouseVelocity: 0,
    waveIntensity: 0,
    scrollProgress: 0,
    scrollVelocity: 0,
    audioEnabled: false,
    audioVolume: 0.3,

    // Actions
    setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
    setMouseVelocity: (velocity) => set({ mouseVelocity: velocity }),
    setWaveIntensity: (intensity) => set({ waveIntensity: intensity }),
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    setScrollVelocity: (velocity) => set({ scrollVelocity: velocity }),
    toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
    setAudioVolume: (volume) => set({ audioVolume: Math.max(0, Math.min(1, volume)) }),
}));
