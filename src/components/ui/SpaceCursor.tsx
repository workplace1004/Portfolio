'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    hue: number;
    opacity: number;
    type: 'gas' | 'dust' | 'ice';
}

interface TrailPoint {
    x: number;
    y: number;
    age: number;
}

/**
 * CometCursor - A comet-like cursor effect
 * 
 * "A comet is an icy, small Solar System body that warms and begins to 
 * release gases when passing close to the Sun, a process called outgassing."
 * 
 * This creates a beautiful comet effect with:
 * - Nucleus (bright core following cursor)
 * - Coma (glowing gas cloud around the nucleus)
 * - Ion tail (blue/white gases streaming away)
 * - Dust tail (warmer colored particles)
 * - Outgassing particles (released gas/ice particles)
 */
export default function SpaceCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0);
    const mousePos = useRef({ x: -100, y: -100 });
    const prevMousePos = useRef({ x: -100, y: -100 });
    const velocity = useRef({ x: 0, y: 0 });
    const particles = useRef<Particle[]>([]);
    const trail = useRef<TrailPoint[]>([]);
    const isVisible = useRef(false);
    const isPointer = useRef(false);
    const lastTime = useRef(0);

    // Comet properties
    const PARTICLE_COUNT = 150;
    const TRAIL_LENGTH = 40;
    const NUCLEUS_SIZE = 8;

    const createParticle = useCallback((x: number, y: number, speed: number): Particle => {
        const angle = Math.random() * Math.PI * 2;
        const particleSpeed = (0.5 + Math.random() * 2) * Math.min(speed * 0.3, 3);
        const type = Math.random() < 0.4 ? 'gas' : Math.random() < 0.7 ? 'ice' : 'dust';

        // Different colors for different particle types
        let hue: number;
        if (type === 'gas') {
            hue = 200 + Math.random() * 40; // Blue/cyan for ion gas
        } else if (type === 'ice') {
            hue = 180 + Math.random() * 60; // Cyan/white for ice
        } else {
            hue = 30 + Math.random() * 30; // Orange/yellow for dust
        }

        return {
            x,
            y,
            vx: Math.cos(angle) * particleSpeed - velocity.current.x * 0.2,
            vy: Math.sin(angle) * particleSpeed - velocity.current.y * 0.2,
            life: 1,
            maxLife: 0.8 + Math.random() * 0.7,
            size: type === 'gas' ? 1 + Math.random() * 3 : 0.5 + Math.random() * 2,
            hue,
            opacity: 0.3 + Math.random() * 0.5,
            type,
        };
    }, []);

    const animate = useCallback((time: number) => {
        const canvas = canvasRef.current;
        if (!canvas) {
            requestRef.current = requestAnimationFrame(animate);
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            requestRef.current = requestAnimationFrame(animate);
            return;
        }

        // Calculate delta time
        const deltaTime = lastTime.current ? (time - lastTime.current) / 16.67 : 1;
        lastTime.current = time;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!isVisible.current) {
            requestRef.current = requestAnimationFrame(animate);
            return;
        }

        // Calculate velocity
        velocity.current.x = (mousePos.current.x - prevMousePos.current.x) * deltaTime;
        velocity.current.y = (mousePos.current.y - prevMousePos.current.y) * deltaTime;
        const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);

        prevMousePos.current = { ...mousePos.current };

        // Add to trail
        trail.current.unshift({ x: mousePos.current.x, y: mousePos.current.y, age: 0 });
        if (trail.current.length > TRAIL_LENGTH) {
            trail.current.pop();
        }

        // Age trail points
        trail.current.forEach(point => {
            point.age += 0.02 * deltaTime;
        });

        // Create outgassing particles based on movement
        const particlesToCreate = Math.min(Math.floor(speed * 0.5) + 1, 5);
        for (let i = 0; i < particlesToCreate; i++) {
            if (particles.current.length < PARTICLE_COUNT) {
                const offsetX = (Math.random() - 0.5) * 10;
                const offsetY = (Math.random() - 0.5) * 10;
                particles.current.push(
                    createParticle(mousePos.current.x + offsetX, mousePos.current.y + offsetY, speed)
                );
            }
        }

        // Update and draw particles
        particles.current = particles.current.filter(particle => {
            particle.life -= (0.015 / particle.maxLife) * deltaTime;
            if (particle.life <= 0) return false;

            // Add some drift away from cursor (outgassing effect)
            const dx = particle.x - mousePos.current.x;
            const dy = particle.y - mousePos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0) {
                particle.vx += (dx / dist) * 0.05 * deltaTime;
                particle.vy += (dy / dist) * 0.05 * deltaTime;
            }

            // Apply velocity
            particle.x += particle.vx * deltaTime;
            particle.y += particle.vy * deltaTime;

            // Slow down
            particle.vx *= 0.98;
            particle.vy *= 0.98;

            // Draw particle
            const alpha = particle.life * particle.opacity;
            const size = particle.size * (0.5 + particle.life * 0.5);

            ctx.beginPath();
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, size * 2
            );
            gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 70%, ${alpha})`);
            gradient.addColorStop(0.5, `hsla(${particle.hue}, 70%, 60%, ${alpha * 0.5})`);
            gradient.addColorStop(1, `hsla(${particle.hue}, 60%, 50%, 0)`);
            ctx.fillStyle = gradient;
            ctx.arc(particle.x, particle.y, size * 2, 0, Math.PI * 2);
            ctx.fill();

            return true;
        });

        // Draw comet tail (ion tail - straighter, blue)
        if (trail.current.length > 2) {
            ctx.beginPath();
            ctx.moveTo(trail.current[0].x, trail.current[0].y);

            for (let i = 1; i < trail.current.length - 1; i++) {
                const point = trail.current[i];
                const nextPoint = trail.current[i + 1];
                const midX = (point.x + nextPoint.x) / 2;
                const midY = (point.y + nextPoint.y) / 2;
                ctx.quadraticCurveTo(point.x, point.y, midX, midY);
            }

            // Create tail gradient
            const tailGradient = ctx.createLinearGradient(
                trail.current[0].x, trail.current[0].y,
                trail.current[trail.current.length - 1].x, trail.current[trail.current.length - 1].y
            );
            tailGradient.addColorStop(0, 'rgba(100, 200, 255, 0.8)');
            tailGradient.addColorStop(0.3, 'rgba(120, 180, 255, 0.4)');
            tailGradient.addColorStop(0.7, 'rgba(140, 160, 255, 0.1)');
            tailGradient.addColorStop(1, 'rgba(160, 140, 255, 0)');

            ctx.strokeStyle = tailGradient;
            ctx.lineWidth = isPointer.current ? 6 : 4;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Draw secondary dust tail (slightly curved, warmer)
            ctx.beginPath();
            ctx.moveTo(trail.current[0].x, trail.current[0].y);

            for (let i = 1; i < trail.current.length - 1; i++) {
                const point = trail.current[i];
                const nextPoint = trail.current[i + 1];
                // Add slight curve to dust tail
                const curve = Math.sin(i * 0.2) * 3;
                const midX = (point.x + nextPoint.x) / 2 + curve;
                const midY = (point.y + nextPoint.y) / 2 + curve;
                ctx.quadraticCurveTo(point.x, point.y, midX, midY);
            }

            const dustGradient = ctx.createLinearGradient(
                trail.current[0].x, trail.current[0].y,
                trail.current[trail.current.length - 1].x, trail.current[trail.current.length - 1].y
            );
            dustGradient.addColorStop(0, 'rgba(255, 200, 100, 0.5)');
            dustGradient.addColorStop(0.4, 'rgba(255, 180, 80, 0.2)');
            dustGradient.addColorStop(1, 'rgba(255, 160, 60, 0)');

            ctx.strokeStyle = dustGradient;
            ctx.lineWidth = isPointer.current ? 4 : 2;
            ctx.stroke();
        }

        // Draw coma (glowing gas cloud around nucleus)
        const comaSize = isPointer.current ? 35 : 25;
        const comaGradient = ctx.createRadialGradient(
            mousePos.current.x, mousePos.current.y, 0,
            mousePos.current.x, mousePos.current.y, comaSize
        );
        comaGradient.addColorStop(0, 'rgba(180, 220, 255, 0.4)');
        comaGradient.addColorStop(0.3, 'rgba(150, 200, 255, 0.2)');
        comaGradient.addColorStop(0.6, 'rgba(120, 180, 255, 0.1)');
        comaGradient.addColorStop(1, 'rgba(100, 160, 255, 0)');

        ctx.beginPath();
        ctx.fillStyle = comaGradient;
        ctx.arc(mousePos.current.x, mousePos.current.y, comaSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw outer glow
        const glowSize = isPointer.current ? 50 : 40;
        const outerGlow = ctx.createRadialGradient(
            mousePos.current.x, mousePos.current.y, comaSize * 0.5,
            mousePos.current.x, mousePos.current.y, glowSize
        );
        outerGlow.addColorStop(0, 'rgba(100, 180, 255, 0.15)');
        outerGlow.addColorStop(0.5, 'rgba(130, 150, 255, 0.08)');
        outerGlow.addColorStop(1, 'rgba(160, 120, 255, 0)');

        ctx.beginPath();
        ctx.fillStyle = outerGlow;
        ctx.arc(mousePos.current.x, mousePos.current.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw nucleus (bright icy core)
        const nucleusSize = isPointer.current ? NUCLEUS_SIZE * 1.3 : NUCLEUS_SIZE;
        const nucleusGradient = ctx.createRadialGradient(
            mousePos.current.x, mousePos.current.y, 0,
            mousePos.current.x, mousePos.current.y, nucleusSize
        );

        if (isPointer.current) {
            nucleusGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            nucleusGradient.addColorStop(0.3, 'rgba(200, 230, 255, 0.9)');
            nucleusGradient.addColorStop(0.6, 'rgba(150, 200, 255, 0.6)');
            nucleusGradient.addColorStop(1, 'rgba(100, 180, 255, 0)');
        } else {
            nucleusGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            nucleusGradient.addColorStop(0.4, 'rgba(180, 220, 255, 0.8)');
            nucleusGradient.addColorStop(0.7, 'rgba(120, 180, 255, 0.4)');
            nucleusGradient.addColorStop(1, 'rgba(80, 160, 255, 0)');
        }

        ctx.beginPath();
        ctx.fillStyle = nucleusGradient;
        ctx.arc(mousePos.current.x, mousePos.current.y, nucleusSize, 0, Math.PI * 2);
        ctx.fill();

        // Add bright core highlight
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.arc(mousePos.current.x, mousePos.current.y, nucleusSize * 0.3, 0, Math.PI * 2);
        ctx.fill();

        requestRef.current = requestAnimationFrame(animate);
    }, [createParticle]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size
        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        updateSize();
        window.addEventListener('resize', updateSize);

        // Start animation
        requestRef.current = requestAnimationFrame(animate);

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            if (!isVisible.current) {
                isVisible.current = true;
                prevMousePos.current = { x: e.clientX, y: e.clientY };
            }

            // Check for interactive elements
            const target = e.target as HTMLElement;
            const interactive = Boolean(
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer'
            );
            isPointer.current = interactive;
        };

        const handleMouseLeave = () => {
            isVisible.current = false;
            mousePos.current = { x: -100, y: -100 };
            trail.current = [];
            particles.current = [];
        };

        const handleMouseEnter = (e: MouseEvent) => {
            isVisible.current = true;
            mousePos.current = { x: e.clientX, y: e.clientY };
            prevMousePos.current = { x: e.clientX, y: e.clientY };
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
        document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

        return () => {
            cancelAnimationFrame(requestRef.current);
            window.removeEventListener('resize', updateSize);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [animate]);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-[9999]"
            style={{
                opacity: 1,
                mixBlendMode: 'screen',
            }}
        />
    );
}
