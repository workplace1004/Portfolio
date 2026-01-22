import { useEffect, useRef } from 'react';
import { Vector2 } from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * useMouseInteraction Hook
 * 
 * Tracks mouse movement for:
 * - Subtle camera parallax (space bending feel)
 * - Gentle wave effects in particles
 * - No snapping, no jitter
 */
export function useMouseInteraction() {
    const lastMousePos = useRef(new Vector2(0, 0));
    const targetPos = useRef(new Vector2(0, 0));
    const currentPos = useRef(new Vector2(0, 0));

    const setMousePosition = useSpaceStore((state) => state.setMousePosition);
    const setMouseVelocity = useSpaceStore((state) => state.setMouseVelocity);
    const setWaveIntensity = useSpaceStore((state) => state.setWaveIntensity);

    useEffect(() => {
        let animationFrame: number;
        let decayInterval: NodeJS.Timeout;

        const handleMouseMove = (event: MouseEvent) => {
            // Normalize to [-1, 1]
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            targetPos.current.set(x, y);

            // Calculate velocity for wave effect
            const currentMouse = new Vector2(x, y);
            const velocity = currentMouse.distanceTo(lastMousePos.current);
            lastMousePos.current.copy(currentMouse);

            setMouseVelocity(velocity);

            // Subtle wave trigger (much lower intensity)
            if (velocity > 0.015) {
                setWaveIntensity(Math.min(velocity * 0.8, 0.12));
            }
        };

        // Very smooth interpolation loop
        const animate = () => {
            // Slower lerp for cinematic feel
            currentPos.current.lerp(targetPos.current, 0.04);
            setMousePosition(currentPos.current.x, currentPos.current.y);
            animationFrame = requestAnimationFrame(animate);
        };

        // Slow decay of wave intensity
        decayInterval = setInterval(() => {
            const currentIntensity = useSpaceStore.getState().waveIntensity;
            setWaveIntensity(Math.max(currentIntensity * 0.92, 0));
        }, 60);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrame);
            clearInterval(decayInterval);
        };
    }, [setMousePosition, setMouseVelocity, setWaveIntensity]);
}
