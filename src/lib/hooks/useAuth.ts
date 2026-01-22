'use client';

import { useState, useEffect } from 'react';
import {
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthState({
                user,
                loading: false,
                error: null
            });
        });

        return () => unsubscribe();
    }, []);

    // Sign in with email and password
    const signIn = async (email: string, password: string) => {
        try {
            setAuthState(prev => ({ ...prev, loading: true, error: null }));
            const result = await signInWithEmailAndPassword(auth, email, password);
            setAuthState({
                user: result.user,
                loading: false,
                error: null
            });
            return { success: true, user: result.user };
        } catch (error: any) {
            const errorMessage = error.message || 'Failed to sign in';
            setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
            return { success: false, error: errorMessage };
        }
    };

    // Sign up with email and password
    const signUp = async (email: string, password: string, displayName?: string) => {
        try {
            setAuthState(prev => ({ ...prev, loading: true, error: null }));
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Update display name if provided
            if (displayName && result.user) {
                await updateProfile(result.user, { displayName });
            }

            setAuthState({
                user: result.user,
                loading: false,
                error: null
            });
            return { success: true, user: result.user };
        } catch (error: any) {
            const errorMessage = error.message || 'Failed to sign up';
            setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
            return { success: false, error: errorMessage };
        }
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            setAuthState(prev => ({ ...prev, loading: true, error: null }));
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            setAuthState({
                user: result.user,
                loading: false,
                error: null
            });
            return { success: true, user: result.user };
        } catch (error: any) {
            const errorMessage = error.message || 'Failed to sign in with Google';
            setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
            return { success: false, error: errorMessage };
        }
    };

    // Sign out
    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            setAuthState({
                user: null,
                loading: false,
                error: null
            });
            return { success: true };
        } catch (error: any) {
            const errorMessage = error.message || 'Failed to sign out';
            setAuthState(prev => ({ ...prev, error: errorMessage }));
            return { success: false, error: errorMessage };
        }
    };

    // Reset password
    const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return { success: true };
        } catch (error: any) {
            const errorMessage = error.message || 'Failed to send reset email';
            return { success: false, error: errorMessage };
        }
    };

    return {
        user: authState.user,
        loading: authState.loading,
        error: authState.error,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        resetPassword,
        isAuthenticated: !!authState.user
    };
};
