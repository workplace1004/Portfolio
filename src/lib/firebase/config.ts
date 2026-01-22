// Firebase Configuration
// Add your Firebase config from Firebase Console

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// Replace with your actual Firebase config from Firebase Console
// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
//     measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
// };


const firebaseConfig = {
    apiKey: "AIzaSyCneHkh8f9ciHPKL2jUNBglOeU_1toMxiI",
    authDomain: "gauravsportfolio-a273a.firebaseapp.com",
    projectId: "gauravsportfolio-a273a",
    storageBucket: "gauravsportfolio-a273a.firebasestorage.app",
    messagingSenderId: "952247735226",
    appId: "1:952247735226:web:e778752070a02dae938383",
    measurementId: "G-W1D8JXCG8V"
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (typeof window !== 'undefined') {
    // Only initialize on client side
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApps()[0];
    }

    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
}

export { app, auth, db, storage };
