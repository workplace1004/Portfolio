'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * SpaceshipFlyby - Enhanced with cinematic effects
 * 
 * Features:
 * - Laser Cannons: Fire during dramatic turn phase
 * - Shield Bubble: Holographic protection effect
 * - All synchronized with scroll-based animation phases
 */

// ============================================
// LASER CANNON COMPONENT
// ============================================
function LaserCannon({
    position,
    direction,
    active,
    color = new THREE.Color(1, 0.2, 0.2)
}: {
    position: [number, number, number];
    direction: [number, number, number];
    active: boolean;
    color?: THREE.Color;
}) {
    const laserRef = useRef<THREE.Group>(null);
    const beamRef = useRef<THREE.Mesh>(null);
    const [laserLength, setLaserLength] = useState(0);
    const [opacity, setOpacity] = useState(0);

    // Create beam geometry
    const beamGeometry = useMemo(() => {
        return new THREE.CylinderGeometry(0.02, 0.01, 1, 8);
    }, []);

    // Beam material
    const beamMaterial = useMemo(() => {
        return new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
        });
    }, [color]);

    // Glow material
    const glowMaterial = useMemo(() => {
        return new THREE.MeshBasicMaterial({
            color: color.clone().multiplyScalar(0.5),
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
        });
    }, [color]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (active) {
            // Extend laser
            setLaserLength(prev => Math.min(prev + 0.5, 15));
            setOpacity(prev => Math.min(prev + 0.1, 1));
        } else {
            // Retract laser
            setLaserLength(prev => Math.max(prev - 0.3, 0));
            setOpacity(prev => Math.max(prev - 0.05, 0));
        }

        if (beamRef.current && laserLength > 0) {
            beamRef.current.scale.set(1 + Math.sin(time * 30) * 0.3, laserLength, 1 + Math.sin(time * 30) * 0.3);
            beamRef.current.position.set(0, laserLength / 2, 0);
            (beamRef.current.material as THREE.MeshBasicMaterial).opacity = opacity * (0.8 + Math.sin(time * 40) * 0.2);
        }

        if (laserRef.current) {
            // Point laser in direction
            const dir = new THREE.Vector3(...direction).normalize();
            laserRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        }
    });

    if (laserLength <= 0 && opacity <= 0) return null;

    return (
        <group ref={laserRef} position={position}>
            {/* Main beam */}
            <mesh ref={beamRef} geometry={beamGeometry} material={beamMaterial} />

            {/* Muzzle flash */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={opacity * 0.8}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}

// ============================================
// SHIELD BUBBLE COMPONENT
// ============================================
function ShieldBubble({
    active,
    radius = 1.5,
    color = new THREE.Color(0.2, 0.8, 1.0)
}: {
    active: boolean;
    radius?: number;
    color?: THREE.Color;
}) {
    const shieldRef = useRef<THREE.Mesh>(null);
    const innerShieldRef = useRef<THREE.Mesh>(null);
    const [shieldScale, setShieldScale] = useState(0);
    const [shieldOpacity, setShieldOpacity] = useState(0);

    // Shield geometry
    const shieldGeometry = useMemo(() => {
        return new THREE.IcosahedronGeometry(radius, 2);
    }, [radius]);

    // Hexagonal pattern shader material
    const shieldMaterial = useMemo(() => {
        return new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0,
            wireframe: true,
            blending: THREE.AdditiveBlending,
        });
    }, [color]);

    // Inner glow material
    const innerMaterial = useMemo(() => {
        return new THREE.MeshBasicMaterial({
            color: color.clone().multiplyScalar(0.3),
            transparent: true,
            opacity: 0,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
        });
    }, [color]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (active) {
            // Expand shield
            setShieldScale(prev => Math.min(prev + 0.08, 1));
            setShieldOpacity(prev => Math.min(prev + 0.05, 0.6));
        } else {
            // Contract shield
            setShieldScale(prev => Math.max(prev - 0.04, 0));
            setShieldOpacity(prev => Math.max(prev - 0.03, 0));
        }

        if (shieldRef.current && shieldScale > 0) {
            // Pulsing scale
            const pulse = shieldScale * (1 + Math.sin(time * 5) * 0.05);
            shieldRef.current.scale.setScalar(pulse);
            shieldRef.current.rotation.x = time * 0.2;
            shieldRef.current.rotation.y = time * 0.3;

            // Flickering opacity
            const flicker = shieldOpacity * (0.7 + Math.sin(time * 15) * 0.15 + Math.sin(time * 23) * 0.15);
            (shieldRef.current.material as THREE.MeshBasicMaterial).opacity = flicker;
        }

        if (innerShieldRef.current && shieldScale > 0) {
            innerShieldRef.current.scale.setScalar(shieldScale * 0.98);
            (innerShieldRef.current.material as THREE.MeshBasicMaterial).opacity = shieldOpacity * 0.2;
        }
    });

    if (shieldScale <= 0 && shieldOpacity <= 0) return null;

    return (
        <group>
            {/* Outer wireframe shield */}
            <mesh ref={shieldRef} geometry={shieldGeometry} material={shieldMaterial} />

            {/* Inner glow */}
            <mesh ref={innerShieldRef}>
                <sphereGeometry args={[radius * 0.95, 32, 32]} />
                <primitive object={innerMaterial} attach="material" />
            </mesh>
        </group>
    );
}

// ============================================
// MAIN SPACESHIP FLYBY COMPONENT
// ============================================
export default function SpaceshipFlyby() {
    const { scene } = useGLTF('/3d-modals/spaceship/scene.gltf');
    const groupRef = useRef<THREE.Group>(null);

    // Use refs for smooth interpolation
    const targetProgress = useRef(0);
    const currentProgress = useRef(0);
    const currentPosition = useRef(new THREE.Vector3(-20, -5, 80));
    const currentRotation = useRef(new THREE.Euler(0.1, Math.PI * 0.6, 0));
    const currentScale = useRef(15);

    // Effect states
    const [laserActive, setLaserActive] = useState(false);
    const [shieldActive, setShieldActive] = useState(false);
    const [currentPhase, setCurrentPhase] = useState(0);

    // Clone and prepare the model
    const clonedScene = useMemo(() => {
        const clone = scene.clone();
        const objectsToRemove: THREE.Object3D[] = [];

        clone.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                const geometry = child.geometry;
                const material = child.material as THREE.Material;

                if (geometry) {
                    const posAttr = geometry.getAttribute('position');
                    if (posAttr && (posAttr.count === 4 || posAttr.count === 6)) {
                        objectsToRemove.push(child);
                        return;
                    }
                }

                const name = child.name.toLowerCase();
                if (name.includes('plane') || name.includes('background') || name.includes('floor')) {
                    objectsToRemove.push(child);
                    return;
                }

                if (material) {
                    const mat = material as THREE.MeshStandardMaterial;
                    mat.side = THREE.FrontSide;
                    mat.transparent = false;
                    mat.depthWrite = true;
                    mat.emissiveIntensity = 0.2;
                }
            }
        });

        objectsToRemove.forEach(obj => obj.parent?.remove(obj));
        return clone;
    }, [scene]);

    // Listen to scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

            const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
            targetProgress.current = progress;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame(() => {
        if (!groupRef.current) return;

        // Smooth interpolation
        const lerpFactor = 0.012;
        currentProgress.current += (targetProgress.current - currentProgress.current) * lerpFactor;

        const t = currentProgress.current;

        // ============================================
        // PHASE-BASED CINEMATIC ANIMATION
        // Phase 1 (0-0.25): Come from behind camera into view (BIG and CLOSE)
        // Phase 2 (0.25-0.45): Pass by camera, start turning
        // Phase 3 (0.45-0.6): DRAMATIC TURN + LASER FIRE + SHIELD
        // Phase 4 (0.6-1.0): Fly DEEP into background
        // ============================================

        let targetX: number, targetY: number, targetZ: number;
        let targetYaw: number, targetPitch: number, targetRoll: number;
        let targetScale: number;

        if (t < 0.25) {
            // Phase 1: Coming from BEHIND camera into view
            const phase = t / 0.25;
            const phaseEase = easeOutQuad(phase);

            targetX = -20 + 25 * phaseEase;
            targetY = -5 + 10 * phaseEase;
            targetZ = 80 - 70 * phaseEase;

            targetYaw = Math.PI * 0.6;
            targetPitch = 0.1 - 0.1 * phaseEase;
            targetRoll = 0;

            targetScale = 15;

            // Effects: Warming up
            setCurrentPhase(1);
            setLaserActive(false);
            setShieldActive(false);

        } else if (t < 0.45) {
            // Phase 2: Passing by camera, very close and big
            const phase = (t - 0.25) / 0.2;

            targetX = 5 + 20 * phase;
            targetY = 5 + 5 * phase;
            targetZ = 10 - 60 * phase;

            targetYaw = Math.PI * 0.6 + Math.PI * 0.15 * phase;
            targetPitch = 0;
            targetRoll = 0.05 * phase;

            targetScale = 15 - 3 * phase;

            // Effects: Preparing for action
            setCurrentPhase(2);
            setLaserActive(false);
            setShieldActive(phase > 0.7); // Shield starts activating

        } else if (t < 0.6) {
            // Phase 3: DRAMATIC TURN - FIRE LASERS!
            const phase = (t - 0.45) / 0.15;
            const turnEase = easeInOutQuad(phase);

            targetX = 25 - 5 * phase;
            targetY = 10 + 8 * turnEase;
            targetZ = -50 - 80 * phase;

            targetYaw = Math.PI * 0.75 + Math.PI * 0.25 * turnEase;
            targetPitch = -0.15 * turnEase;
            targetRoll = 0.05 + 0.45 * Math.sin(phase * Math.PI);

            targetScale = 12 - 4 * phase;

            // Effects: MAX POWER! Lasers firing, shield up!
            setCurrentPhase(3);
            setLaserActive(true);
            setShieldActive(true);

        } else {
            // Phase 4: Fly DEEP into background
            const phase = (t - 0.6) / 0.4;
            const flyEase = easeOutQuad(phase);

            targetX = 20 - 18 * flyEase;
            targetY = 18 + 15 * flyEase;
            targetZ = -130 - 500 * flyEase;

            targetYaw = Math.PI;
            targetPitch = -0.2;
            targetRoll = 0.05 * (1 - flyEase);

            targetScale = 8 - 5 * flyEase;

            // Effects: Retreating
            setCurrentPhase(4);
            setLaserActive(phase < 0.3); // Stop firing as we retreat
            setShieldActive(phase < 0.5); // Shield deactivates
        }

        // Smooth interpolation
        currentPosition.current.x += (targetX - currentPosition.current.x) * lerpFactor * 2;
        currentPosition.current.y += (targetY - currentPosition.current.y) * lerpFactor * 2;
        currentPosition.current.z += (targetZ - currentPosition.current.z) * lerpFactor * 2;

        groupRef.current.position.copy(currentPosition.current);

        currentRotation.current.x += (targetPitch - currentRotation.current.x) * lerpFactor * 2;
        currentRotation.current.y += (targetYaw - currentRotation.current.y) * lerpFactor * 2;
        currentRotation.current.z += (targetRoll - currentRotation.current.z) * lerpFactor * 2;

        groupRef.current.rotation.copy(currentRotation.current);

        currentScale.current += (targetScale - currentScale.current) * lerpFactor * 2;
        groupRef.current.scale.setScalar(currentScale.current);
    });

    return (
        <group ref={groupRef}>
            {/* Main spaceship model */}
            <primitive object={clonedScene} />

            {/* ========== LASER CANNONS ========== */}
            {/* Left wing cannon */}
            <LaserCannon
                position={[-0.4, 0, -0.2]}
                direction={[0, 0, -1]}
                active={laserActive}
                color={new THREE.Color(1, 0.3, 0.1)}
            />

            {/* Right wing cannon */}
            <LaserCannon
                position={[0.4, 0, -0.2]}
                direction={[0, 0, -1]}
                active={laserActive}
                color={new THREE.Color(1, 0.3, 0.1)}
            />

            {/* Center cannon (green for variety) */}
            <LaserCannon
                position={[0, -0.05, -0.3]}
                direction={[0, -0.1, -1]}
                active={laserActive && currentPhase === 3}
                color={new THREE.Color(0.2, 1, 0.3)}
            />

            {/* ========== SHIELD BUBBLE ========== */}
            <ShieldBubble
                active={shieldActive}
                radius={0.8}
                color={new THREE.Color(0.3, 0.7, 1.0)}
            />
        </group>
    );
}

function easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function easeOutQuad(t: number): number {
    return 1 - (1 - t) * (1 - t);
}

useGLTF.preload('/3d-modals/spaceship/scene.gltf');
