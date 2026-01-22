'use client';

import { useState, useEffect } from 'react';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    DocumentData,
    QueryConstraint,
    Timestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

interface FirestoreState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

interface FirestoreListState<T> {
    data: T[];
    loading: boolean;
    error: string | null;
}

/**
 * Hook to fetch a single document from Firestore
 * @param collectionName - Name of the Firestore collection
 * @param documentId - ID of the document to fetch
 */
export const useDocument = <T = DocumentData>(
    collectionName: string,
    documentId: string | null
) => {
    const [state, setState] = useState<FirestoreState<T>>({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        if (!documentId) {
            setState({ data: null, loading: false, error: null });
            return;
        }

        const fetchDocument = async () => {
            try {
                setState(prev => ({ ...prev, loading: true, error: null }));
                const docRef = doc(db, collectionName, documentId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setState({
                        data: { id: docSnap.id, ...docSnap.data() } as T,
                        loading: false,
                        error: null
                    });
                } else {
                    setState({
                        data: null,
                        loading: false,
                        error: 'Document not found'
                    });
                }
            } catch (error: any) {
                setState({
                    data: null,
                    loading: false,
                    error: error.message || 'Failed to fetch document'
                });
            }
        };

        fetchDocument();
    }, [collectionName, documentId]);

    return state;
};

/**
 * Hook to fetch a collection from Firestore with real-time updates
 * @param collectionName - Name of the Firestore collection
 * @param constraints - Query constraints (where, orderBy, limit, etc.)
 * @param realtime - Enable real-time updates
 */
export const useCollection = <T = DocumentData>(
    collectionName: string,
    constraints: QueryConstraint[] = [],
    realtime: boolean = false
) => {
    const [state, setState] = useState<FirestoreListState<T>>({
        data: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, ...constraints);

        if (realtime) {
            // Real-time listener
            const unsubscribe = onSnapshot(
                q,
                (snapshot) => {
                    const documents = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as T[];

                    setState({
                        data: documents,
                        loading: false,
                        error: null
                    });
                },
                (error) => {
                    setState({
                        data: [],
                        loading: false,
                        error: error.message || 'Failed to fetch collection'
                    });
                }
            );

            return () => unsubscribe();
        } else {
            // One-time fetch
            const fetchCollection = async () => {
                try {
                    setState(prev => ({ ...prev, loading: true, error: null }));
                    const snapshot = await getDocs(q);
                    const documents = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as T[];

                    setState({
                        data: documents,
                        loading: false,
                        error: null
                    });
                } catch (error: any) {
                    setState({
                        data: [],
                        loading: false,
                        error: error.message || 'Failed to fetch collection'
                    });
                }
            };

            fetchCollection();
        }
    }, [collectionName, JSON.stringify(constraints), realtime]);

    return state;
};

/**
 * Hook to perform Firestore CRUD operations
 */
export const useFirestore = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Create a new document
    const createDocument = async <T extends DocumentData>(
        collectionName: string,
        data: T,
        customId?: string
    ) => {
        try {
            setLoading(true);
            setError(null);

            const timestamp = Timestamp.now();
            const documentData = {
                ...data,
                createdAt: timestamp,
                updatedAt: timestamp
            };

            let docRef;
            if (customId) {
                docRef = doc(db, collectionName, customId);
                await setDoc(docRef, documentData);
            } else {
                docRef = await addDoc(collection(db, collectionName), documentData);
            }

            setLoading(false);
            return { success: true, id: docRef.id };
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to create document';
            setError(errorMessage);
            setLoading(false);
            return { success: false, error: errorMessage };
        }
    };

    // Update an existing document
    const updateDocument = async <T extends Partial<DocumentData>>(
        collectionName: string,
        documentId: string,
        data: T
    ) => {
        try {
            setLoading(true);
            setError(null);

            const docRef = doc(db, collectionName, documentId);
            const updateData = {
                ...data,
                updatedAt: Timestamp.now()
            };

            await updateDoc(docRef, updateData);

            setLoading(false);
            return { success: true };
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to update document';
            setError(errorMessage);
            setLoading(false);
            return { success: false, error: errorMessage };
        }
    };

    // Delete a document
    const deleteDocument = async (collectionName: string, documentId: string) => {
        try {
            setLoading(true);
            setError(null);

            const docRef = doc(db, collectionName, documentId);
            await deleteDoc(docRef);

            setLoading(false);
            return { success: true };
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to delete document';
            setError(errorMessage);
            setLoading(false);
            return { success: false, error: errorMessage };
        }
    };

    return {
        loading,
        error,
        createDocument,
        updateDocument,
        deleteDocument
    };
};
