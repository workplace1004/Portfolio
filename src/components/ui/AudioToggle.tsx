'use client';

import { useEffect, useRef } from 'react';
import { useSpaceStore } from '@/store/spaceStore';
import { Volume2, VolumeX } from 'lucide-react';
import { Howl } from 'howler';

/**
 * AudioToggle Component
 * 
 * Fixed position audio toggle button that allows users to enable/disable
 * all sound effects. Features a sleek, futuristic design that matches
 * the space theme.
 */

interface AudioToggleProps {
    className?: string;
}

export function AudioToggle({ className = '' }: AudioToggleProps) {
    const audioEnabled = useSpaceStore((state) => state.audioEnabled);
    const toggleAudio = useSpaceStore((state) => state.toggleAudio);
    const audioVolume = useSpaceStore((state) => state.audioVolume);

    const confirmSoundRef = useRef<Howl | null>(null);
    const wasEnabledRef = useRef(false);

    // Initialize confirmation sound
    useEffect(() => {
        confirmSoundRef.current = new Howl({
            src: ['/sounds/mixkit-sci-fi-interface-robot-click-901.wav'],
            volume: 0.5,
            preload: true,
        });

        return () => {
            confirmSoundRef.current?.unload();
        };
    }, []);

    // Play confirmation sound when audio is enabled
    useEffect(() => {
        if (audioEnabled && !wasEnabledRef.current) {
            // Audio just got enabled - play confirmation
            setTimeout(() => {
                if (confirmSoundRef.current) {
                    confirmSoundRef.current.volume(audioVolume * 0.6);
                    confirmSoundRef.current.play();
                }
            }, 50);
        }
        wasEnabledRef.current = audioEnabled;
    }, [audioEnabled, audioVolume]);

    const handleToggle = () => {
        toggleAudio();
    };

    return (
        <button
            onClick={handleToggle}
            className={`
                group fixed bottom-6 right-6 z-50
                flex items-center justify-center
                w-12 h-12 rounded-full
                border border-white/20 
                bg-black/40 backdrop-blur-xl
                transition-all duration-300
                hover:border-cosmic-cyan/50 hover:bg-black/60
                hover:shadow-lg hover:shadow-cosmic-cyan/20
                ${audioEnabled ? 'ring-2 ring-cosmic-cyan/30' : ''}
                ${className}
            `}
            aria-label={audioEnabled ? 'Mute sounds' : 'Enable sounds'}
            title={audioEnabled ? 'Click to mute' : 'Click to enable sounds'}
        >
            {/* Animated background pulse when audio is enabled */}
            {audioEnabled && (
                <span className="absolute inset-0 rounded-full animate-ping bg-cosmic-cyan/20 opacity-75" />
            )}

            {/* Icon */}
            <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                {audioEnabled ? (
                    <Volume2 className="w-5 h-5 text-cosmic-cyan" />
                ) : (
                    <VolumeX className="w-5 h-5 text-muted" />
                )}
            </span>

            {/* Tooltip on hover */}
            <span className="
                absolute right-full mr-3 px-3 py-1.5
                text-xs font-medium text-white
                bg-black/80 backdrop-blur-md rounded-lg
                border border-white/10
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
                whitespace-nowrap pointer-events-none
            ">
                {audioEnabled ? 'Sound On 🔊' : 'Sound Off 🔇'}
            </span>
        </button>
    );
}

