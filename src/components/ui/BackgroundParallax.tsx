'use client';

import { useEffect } from 'react';

/**
 * BackgroundParallax Component
 * 
 * Adds mouse parallax effect to the cosmic background image
 * - Smooth movement based on mouse position
 * - Subtle effect for professional look
 */
export default function BackgroundParallax() {
    useEffect(() => {
        const background = document.querySelector('.cosmic-background') as HTMLElement;
        if (!background) return;

        const handleMouseMove = (e: MouseEvent) => {
            // Get mouse position as percentage of viewport
            const xPercent = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
            const yPercent = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

            // Apply subtle parallax movement (max 20px in each direction)
            const moveX = xPercent * 20;
            const moveY = yPercent * 20;

            // Update background position with scale to prevent edge showing
            background.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        };

        // Add event listener
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return null; // This component doesn't render anything
}
