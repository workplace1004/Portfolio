'use client';

import { useEffect, useRef } from 'react';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * useScrollIntegration Hook
 * 
 * Integrates GSAP ScrollTrigger with Lenis smooth scrolling.
 * Tracks scroll progress and velocity for space background effects.
 * 
 * Note: This hook sets up the integration but doesn't require
 * ScrollTrigger animations to be active - it just tracks scroll state.
 */
export function useScrollIntegration() {
    const lastScrollY = useRef(0);
    const setScrollProgress = useSpaceStore((state) => state.setScrollProgress);
    const setScrollVelocity = useSpaceStore((state) => state.setScrollVelocity);

    useEffect(() => {
        let rafId: number;

        const updateScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

            // Calculate velocity
            const velocity = Math.abs(scrollY - lastScrollY.current);
            lastScrollY.current = scrollY;

            setScrollProgress(progress);
            setScrollVelocity(velocity);

            rafId = requestAnimationFrame(updateScroll);
        };

        rafId = requestAnimationFrame(updateScroll);

        return () => {
            cancelAnimationFrame(rafId);
        };
    }, [setScrollProgress, setScrollVelocity]);
}
