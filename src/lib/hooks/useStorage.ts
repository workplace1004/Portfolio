'use client';

import { useState } from 'react';
import {
    ref,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
    listAll,
    UploadTaskSnapshot
} from 'firebase/storage';
import { storage } from '../firebase/config';

interface UploadProgress {
    progress: number;
    bytesTransferred: number;
    totalBytes: number;
}

interface UploadState {
    uploading: boolean;
    progress: UploadProgress | null;
    error: string | null;
    downloadURL: string | null;
}

/**
 * Hook for Firebase Storage operations
 */
export const useStorage = () => {
    const [uploadState, setUploadState] = useState<UploadState>({
        uploading: false,
        progress: null,
        error: null,
        downloadURL: null
    });

    /**
     * Upload a file to Firebase Storage
     * @param file - File to upload
     * @param path - Storage path (e.g., 'images/profile.jpg')
     * @param onProgress - Optional callback for upload progress
     */
    const uploadFile = async (
        file: File,
        path: string,
        onProgress?: (progress: UploadProgress) => void
    ) => {
        try {
            setUploadState({
                uploading: true,
                progress: null,
                error: null,
                downloadURL: null
            });

            const storageRef = ref(storage, path);
            const uploadTask = uploadBytesResumable(storageRef, file);

            return new Promise<{ success: boolean; downloadURL?: string; error?: string }>(
                (resolve) => {
                    uploadTask.on(
                        'state_changed',
                        (snapshot: UploadTaskSnapshot) => {
                            const progress = {
                                progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                                bytesTransferred: snapshot.bytesTransferred,
                                totalBytes: snapshot.totalBytes
                            };

                            setUploadState(prev => ({
                                ...prev,
                                progress
                            }));

                            if (onProgress) {
                                onProgress(progress);
                            }
                        },
                        (error) => {
                            const errorMessage = error.message || 'Upload failed';
                            setUploadState({
                                uploading: false,
                                progress: null,
                                error: errorMessage,
                                downloadURL: null
                            });
                            resolve({ success: false, error: errorMessage });
                        },
                        async () => {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            setUploadState({
                                uploading: false,
                                progress: null,
                                error: null,
                                downloadURL
                            });
                            resolve({ success: true, downloadURL });
                        }
                    );
                }
            );
        } catch (error: any) {
            const errorMessage = error.message || 'Upload failed';
            setUploadState({
                uploading: false,
                progress: null,
                error: errorMessage,
                downloadURL: null
            });
            return { success: false, error: errorMessage };
        }
    };

    /**
     * Upload a file without progress tracking (simpler, faster)
     * @param file - File to upload
     * @param path - Storage path
     */
    const uploadFileSimple = async (file: File, path: string) => {
        try {
            setUploadState({
                uploading: true,
                progress: null,
                error: null,
                downloadURL: null
            });

            const storageRef = ref(storage, path);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            setUploadState({
                uploading: false,
                progress: null,
                error: null,
                downloadURL
            });

            return { success: true, downloadURL };
        } catch (error: any) {
            const errorMessage = error.message || 'Upload failed';
            setUploadState({
                uploading: false,
                progress: null,
                error: errorMessage,
                downloadURL: null
            });
            return { success: false, error: errorMessage };
        }
    };

    /**
     * Delete a file from Firebase Storage
     * @param path - Storage path of the file to delete
     */
    const deleteFile = async (path: string) => {
        try {
            const storageRef = ref(storage, path);
            await deleteObject(storageRef);
            return { success: true };
        } catch (error: any) {
            const errorMessage = error.message || 'Delete failed';
            return { success: false, error: errorMessage };
        }
    };

    /**
     * Get download URL for a file
     * @param path - Storage path
     */
    const getFileURL = async (path: string) => {
        try {
            const storageRef = ref(storage, path);
            const downloadURL = await getDownloadURL(storageRef);
            return { success: true, downloadURL };
        } catch (error: any) {
            const errorMessage = error.message || 'Failed to get download URL';
            return { success: false, error: errorMessage };
        }
    };

    /**
     * List all files in a directory
     * @param path - Storage directory path
     */
    const listFiles = async (path: string) => {
        try {
            const storageRef = ref(storage, path);
            const result = await listAll(storageRef);

            const files = await Promise.all(
                result.items.map(async (itemRef) => {
                    const url = await getDownloadURL(itemRef);
                    return {
                        name: itemRef.name,
                        fullPath: itemRef.fullPath,
                        url
                    };
                })
            );

            return { success: true, files };
        } catch (error: any) {
            const errorMessage = error.message || 'Failed to list files';
            return { success: false, error: errorMessage };
        }
    };

    return {
        uploading: uploadState.uploading,
        progress: uploadState.progress,
        error: uploadState.error,
        downloadURL: uploadState.downloadURL,
        uploadFile,
        uploadFileSimple,
        deleteFile,
        getFileURL,
        listFiles
    };
};
