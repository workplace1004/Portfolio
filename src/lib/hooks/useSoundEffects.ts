'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * useSoundEffects Hook
 * 
 * Provides click sound for UI interactions.
 * Respects the global audio enabled state.
 */

interface SoundEffectsOptions {
    volume?: number;
}

interface SoundEffectsReturn {
    playClick: () => void;
}

const CLICK_SOUND_PATH = '/sounds/mixkit-sci-fi-interface-robot-click-901.wav';

export function useSoundEffects(options: SoundEffectsOptions = {}): SoundEffectsReturn {
    const { volume = 0.5 } = options;

    const audioEnabled = useSpaceStore((state) => state.audioEnabled);
    const audioVolume = useSpaceStore((state) => state.audioVolume);

    const clickSoundRef = useRef<Howl | null>(null);

    // Initialize click sound
    useEffect(() => {
        clickSoundRef.current = new Howl({
            src: [CLICK_SOUND_PATH],
            volume: 0,
            preload: true,
            html5: false,
        });

        return () => {
            clickSoundRef.current?.unload();
        };
    }, []);

    // Play click sound
    const playClick = useCallback(() => {
        if (!audioEnabled || !clickSoundRef.current) return;
        clickSoundRef.current.volume(audioVolume * volume * 0.6);
        clickSoundRef.current.play();
    }, [audioEnabled, audioVolume, volume]);

    return {
        playClick,
    };
}

