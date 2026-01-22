'use client';

import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * useSpaceshipAudio Hook
 * 
 * Manages spaceship flyby sound synchronized with ACTUAL SHIP POSITION.
 * 
 * Calculates ship z-position using same formulas as SpaceshipFlyby.tsx:
 * - Phase 1: z = 80 → 10 (approaching)
 * - Phase 2: z = 10 → -50 (passing by, CLOSEST at z=10)
 * - Phase 3: z = -50 → -130 (turning away)
 * - Phase 4: z = -130 → -630 (flying deep into background)
 * 
 * Volume is based on ship's DISTANCE from camera (z position):
 * - Closest (z ~ 10): Maximum volume
 * - Far away (z > 50 or z < -100): Low/no volume
 */

// Easing function (same as SpaceshipFlyby.tsx)
function easeOutQuad(t: number): number {
    return 1 - (1 - t) * (1 - t);
}

interface SpaceshipAudioOptions {
    maxVolume?: number;
}

interface SpaceshipAudioReturn {
    currentPhase: number;
    isPlaying: boolean;
    shipZ: number;
}

const AUDIO_PATH = '/sounds/spaceship-ambient-sfx-164114.mp3';

export function useSpaceshipAudio(
    options: SpaceshipAudioOptions = {}
): SpaceshipAudioReturn {
    const { maxVolume = 0.9 } = options;

    const audioEnabled = useSpaceStore((state) => state.audioEnabled);
    const audioVolume = useSpaceStore((state) => state.audioVolume);
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);

    const [currentPhase, setCurrentPhase] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [shipZ, setShipZ] = useState(80);

    const flybyRef = useRef<Howl | null>(null);

    const lastPhaseRef = useRef(0);
    const flybyPlayedRef = useRef(false);

    // Initialize spaceship sound
    useEffect(() => {
        flybyRef.current = new Howl({
            src: [AUDIO_PATH],
            loop: false,
            volume: 0,
            preload: true,
            html5: true,
            onend: () => {
                setIsPlaying(false);
            },
        });

        return () => {
            flybyRef.current?.unload();
        };
    }, []);

    // Calculate ship position and update volume based on it
    useEffect(() => {
        if (!flybyRef.current || !audioEnabled) return;

        const t = scrollProgress;
        let newPhase = 0;
        let zPosition = 80; // Default far behind camera

        // ============================================
        // CALCULATE SHIP Z POSITION
        // (Same formulas as SpaceshipFlyby.tsx)
        // ============================================

        if (t < 0.25) {
            // Phase 1: Coming from BEHIND camera into view
            newPhase = 1;
            const phase = t / 0.25;
            const phaseEase = easeOutQuad(phase);
            zPosition = 80 - 70 * phaseEase; // z: 80 → 10

        } else if (t < 0.45) {
            // Phase 2: Passing by camera, very close
            newPhase = 2;
            const phase = (t - 0.25) / 0.2;
            zPosition = 10 - 60 * phase; // z: 10 → -50

        } else if (t < 0.6) {
            // Phase 3: Dramatic turn
            newPhase = 3;
            const phase = (t - 0.45) / 0.15;
            zPosition = -50 - 80 * phase; // z: -50 → -130

        } else {
            // Phase 4: Fly DEEP into background
            newPhase = 4;
            const phase = (t - 0.6) / 0.4;
            const flyEase = easeOutQuad(phase);
            zPosition = -130 - 500 * flyEase; // z: -130 → -630
        }

        setShipZ(zPosition);

        // ============================================
        // CALCULATE VOLUME BASED ON Z POSITION
        // ============================================

        // Ship is closest when z is near 10 (start of Phase 2)
        // Volume curve based on distance from "sweet spot" (z = 10)

        let targetVolume = 0;

        if (zPosition > 50) {
            // Ship is behind camera, far away - no sound or very quiet
            targetVolume = Math.max(0, 1 - (zPosition - 50) / 30); // Fade in from z=80 to z=50
        } else if (zPosition > 10) {
            // Ship is approaching, getting closer (z: 50 → 10)
            // Volume ramps up
            targetVolume = 1 - (zPosition - 10) / 40; // 0 at z=50, 1 at z=10
        } else if (zPosition > -30) {
            // Ship is CLOSEST (z: 10 → -30) - MAXIMUM VOLUME
            targetVolume = 1.0;
        } else if (zPosition > -100) {
            // Ship is passing and moving away (z: -30 → -100)
            // Volume starts to fade
            targetVolume = 1 - Math.abs(zPosition + 30) / 70; // 1 at z=-30, ~0 at z=-100
        } else {
            // Ship is far away (z < -100)
            // Volume very low
            targetVolume = Math.max(0.1, 0.3 - Math.abs(zPosition + 100) / 200);
        }

        // ============================================
        // TRIGGER SOUNDS BASED ON POSITION
        // ============================================

        // Start playing when ship enters visible range (z < 50)
        if (zPosition < 50 && !flybyPlayedRef.current) {
            flybyRef.current.play();
            setIsPlaying(true);
            flybyPlayedRef.current = true;
        }

        // Reset when ship goes back behind camera (z > 70)
        if (zPosition > 70) {
            flybyPlayedRef.current = false;
        }

        // ============================================
        // APPLY VOLUME
        // ============================================

        if (flybyPlayedRef.current && flybyRef.current.playing()) {
            const finalVolume = Math.max(0, Math.min(1, targetVolume)) * maxVolume * audioVolume;
            flybyRef.current.volume(finalVolume);
        }

        // Update phase state
        if (newPhase !== lastPhaseRef.current) {
            setCurrentPhase(newPhase);
            lastPhaseRef.current = newPhase;
        }

    }, [scrollProgress, audioEnabled, audioVolume, maxVolume]);

    // Stop sounds when audio is disabled
    useEffect(() => {
        if (!audioEnabled) {
            flybyRef.current?.stop();
            setIsPlaying(false);
        }
    }, [audioEnabled]);

    return {
        currentPhase,
        isPlaying,
        shipZ,
    };
}
