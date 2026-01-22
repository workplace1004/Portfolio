'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useScrollAnimation } from '@/lib/hooks';

interface AnimatedTextProps {
    children: React.ReactNode;
    className?: string;
    animation?:
    | 'fade-in-up'
    | 'fade-in-left'
    | 'fade-in-right'
    | 'scale-in-glow'
    | 'blur-in'
    | 'typewriter'
    | 'shimmer'
    | 'neon'
    | 'float'
    | 'holographic';
    delay?: number;
    duration?: number;
}

/**
 * AnimatedText Component
 * Wraps text with scroll-triggered animations
 */
export function AnimatedText({
    children,
    className = '',
    animation = 'fade-in-up',
    delay = 0,
    duration,
}: AnimatedTextProps) {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

    const animationClasses: Record<string, string> = {
        'fade-in-up': 'fade-in-up',
        'fade-in-left': 'fade-in-left',
        'fade-in-right': 'fade-in-right',
        'scale-in-glow': 'scale-in-glow',
        'blur-in': 'blur-in',
        'typewriter': 'typewriter',
        'shimmer': 'shimmer-text',
        'neon': 'neon-text',
        'float': 'float',
        'holographic': 'holographic-text',
    };

    const style: React.CSSProperties = {
        animationDelay: delay ? `${delay}s` : undefined,
        animationDuration: duration ? `${duration}s` : undefined,
    };

    return (
        <div
            ref={ref}
            className={`${isVisible ? animationClasses[animation] : 'opacity-0'} ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}

interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number;
    startDelay?: number;
    showCursor?: boolean;
}

/**
 * TypewriterText Component
 * Character-by-character text reveal with cosmic cursor
 */
export function TypewriterText({
    text,
    className = '',
    speed = 50,
    startDelay = 500,
    showCursor = true,
}: TypewriterTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [showCursorState, setShowCursorState] = useState(true);
    const [ref, isVisible] = useScrollAnimation<HTMLSpanElement>();
    const hasStarted = useRef(false);

    useEffect(() => {
        if (!isVisible || hasStarted.current) return;
        hasStarted.current = true;

        const startTimeout = setTimeout(() => {
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayText(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, speed);

            return () => clearInterval(interval);
        }, startDelay);

        return () => clearTimeout(startTimeout);
    }, [isVisible, text, speed, startDelay]);

    // Blinking cursor effect
    useEffect(() => {
        if (!showCursor) return;
        const cursorInterval = setInterval(() => {
            setShowCursorState((prev) => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, [showCursor]);

    return (
        <span ref={ref} className={className}>
            {displayText}
            {showCursor && (
                <span
                    className="inline-block w-[3px] h-[1em] ml-1 align-middle"
                    style={{
                        backgroundColor: showCursorState ? '#22d3ee' : 'transparent',
                        boxShadow: showCursorState ? '0 0 10px #22d3ee, 0 0 20px #22d3ee' : 'none',
                        transition: 'opacity 0.1s',
                    }}
                />
            )}
        </span>
    );
}

interface GlitchTextProps {
    children: string;
    className?: string;
}

/**
 * GlitchText Component
 * Space-themed glitch/distortion effect
 */
export function GlitchText({ children, className = '' }: GlitchTextProps) {
    return (
        <span className={`relative inline-block ${className}`}>
            <span className="relative z-10">{children}</span>
            <span
                className="absolute inset-0 text-cyan-400 opacity-80"
                style={{
                    animation: 'glitch1 0.3s infinite',
                    clipPath: 'inset(40% 0 61% 0)',
                }}
                aria-hidden="true"
            >
                {children}
            </span>
            <span
                className="absolute inset-0 text-pink-400 opacity-80"
                style={{
                    animation: 'glitch2 0.3s infinite',
                    clipPath: 'inset(67% 0 0 0)',
                }}
                aria-hidden="true"
            >
                {children}
            </span>
        </span>
    );
}

interface TextRevealProps {
    children: string;
    className?: string;
    staggerDelay?: number;
}

/**
 * TextReveal Component
 * Word-by-word reveal animation
 */
export function TextReveal({
    children,
    className = '',
    staggerDelay = 0.05,
}: TextRevealProps) {
    const [ref, isVisible] = useScrollAnimation<HTMLSpanElement>();
    const words = children.split(' ');

    return (
        <span ref={ref} className={className}>
            {words.map((word, index) => (
                <span
                    key={index}
                    className="inline-block overflow-hidden"
                    style={{
                        marginRight: '0.25em',
                    }}
                >
                    <span
                        className="inline-block transition-all duration-500"
                        style={{
                            transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                            opacity: isVisible ? 1 : 0,
                            transitionDelay: `${index * staggerDelay}s`,
                        }}
                    >
                        {word}
                    </span>
                </span>
            ))}
        </span>
    );
}

interface FloatingElementProps {
    children: React.ReactNode;
    className?: string;
    speed?: 'slow' | 'normal' | 'fast';
    delay?: number;
}

/**
 * FloatingElement Component
 * Creates a floating/levitating effect
 */
export function FloatingElement({
    children,
    className = '',
    speed = 'normal',
    delay = 0,
}: FloatingElementProps) {
    const speedClasses = {
        slow: 'float-slow',
        normal: 'float',
        fast: 'float-fast',
    };

    return (
        <div
            className={`${speedClasses[speed]} ${className}`}
            style={{ animationDelay: `${delay}s` }}
        >
            {children}
        </div>
    );
}

interface PulsingGlowProps {
    children: React.ReactNode;
    className?: string;
    color?: string;
}

/**
 * PulsingGlow Component
 * Adds a pulsing glow ring effect
 */
export function PulsingGlow({
    children,
    className = '',
}: PulsingGlowProps) {
    return (
        <div className={`pulse-ring ${className}`}>
            {children}
        </div>
    );
}

interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}

/**
 * StaggerContainer Component
 * Container that staggers children animations
 */
export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.1,
}: StaggerContainerProps) {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

    return (
        <div ref={ref} className={className}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    const childProps = child.props as { className?: string; style?: React.CSSProperties };
                    return (
                        <div
                            className={`${childProps.className || ''} ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
                            style={{
                                ...childProps.style,
                                animationDelay: `${index * staggerDelay}s`,
                            }}
                        >
                            {child}
                        </div>
                    );
                }
                return child;
            })}
        </div>
    );
}
