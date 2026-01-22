/**
 * Canvas Components - Barrel Export
 * 
 * Centralized exports for all 3D canvas components
 * 
 * GLTF Models Used:
 * - /3d-modals/spaceship/scene.gltf (SpaceshipFlyby)
 * - /3d-modals/asteroid_low_poly/scene.gltf (AsteroidField)
 * - /3d-modals/space_rocks/scene.gltf (AsteroidField)
 * 
 * Note: Background elements replaced with static image
 */

export { default as SpaceBackground } from './SpaceBackground';
export { default as SpaceScene } from './SpaceScene';

// Objects (GLTF Models)
export { default as AsteroidField } from './objects/AsteroidField';

// Effects
export { default as SpaceshipFlyby } from './effects/SpaceshipFlyby';
