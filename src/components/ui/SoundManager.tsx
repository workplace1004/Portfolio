'use client';

import { useEffect } from 'react';
import { useSpaceshipAudio } from '@/lib/hooks/useSpaceshipAudio';
import { useSoundEffects } from '@/lib/hooks/useSoundEffects';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * SoundManager Component
 * 
 * Global sound management component that:
 * 1. Manages spaceship audio synced with ship position
 * 2. Updates scroll progress in global store for audio synchronization
 * 3. Adds click sounds to interactive elements
 * 
 * This should be rendered once at the app level.
 */

export function SoundManager() {
    const setScrollProgress = useSpaceStore((state) => state.setScrollProgress);
    const setScrollVelocity = useSpaceStore((state) => state.setScrollVelocity);

    // Initialize spaceship audio (synced with ship position)
    useSpaceshipAudio({
        maxVolume: 0.9,
    });

    // Get click sound function
    const { playClick } = useSoundEffects();

    // Track scroll progress for audio synchronization
    useEffect(() => {
        let lastScrollY = window.scrollY;
        let lastTime = Date.now();

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.max(0, Math.min(1, scrollY / maxScroll));

            // Calculate velocity
            const now = Date.now();
            const dt = (now - lastTime) / 1000;
            const velocity = Math.abs(scrollY - lastScrollY) / (dt || 0.016);

            setScrollProgress(progress);
            setScrollVelocity(velocity);

            lastScrollY = scrollY;
            lastTime = now;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [setScrollProgress, setScrollVelocity]);

    // Add click sounds to interactive elements
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Guard against non-element targets
            if (!target || !target.tagName) return;

            // Skip the audio toggle button (it handles its own sound)
            if (target.closest('[aria-label="Mute sounds"]') ||
                target.closest('[aria-label="Enable sounds"]')) {
                return;
            }

            // Check if clicked element is interactive
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                (target.hasAttribute && target.hasAttribute('role') && target.getAttribute('role') === 'button');

            if (isInteractive) {
                playClick();
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [playClick]);

    // This component doesn't render anything visible
    return null;
}

