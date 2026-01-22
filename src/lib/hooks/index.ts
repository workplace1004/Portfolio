/**
 * Hooks - Barrel Export
 * 
 * Centralized exports for all custom hooks
 */

// Animation & Interaction Hooks
export { useMouseInteraction } from './useMouseInteraction';
export { useScrollIntegration } from './useScrollIntegration';
export { useScrollAnimation } from './useScrollAnimation';
export { useSoundEffects } from './useSoundEffects';
export { useSpaceshipAudio } from './useSpaceshipAudio';

// Firebase Hooks
export { useAuth } from './useAuth';
export { useDocument, useCollection, useFirestore } from './useFirestore';
export { useStorage } from './useStorage';
