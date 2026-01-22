'use client';

import { useEffect } from 'react';
import clarity from '@microsoft/clarity';

/**
 * Microsoft Clarity Analytics Component
 * 
 * Initializes Clarity for session recordings, heatmaps, and user analytics.
 * 
 * To get your Project ID:
 * 1. Go to https://clarity.microsoft.com/
 * 2. Create a new project or select existing
 * 3. Copy your Project ID from Settings
 */

// Replace this with your actual Clarity Project ID
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'v25tqu6ws0';

export default function ClarityAnalytics() {
    useEffect(() => {
        // Only initialize in production or if explicitly enabled
        if (typeof window !== 'undefined' && CLARITY_PROJECT_ID !== 'YOUR_PROJECT_ID') {
            try {
                clarity.init(CLARITY_PROJECT_ID);
                console.log('Microsoft Clarity initialized');
            } catch (error) {
                console.error('Failed to initialize Microsoft Clarity:', error);
            }
        }
    }, []);

    return null;
}
