import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
    onImageUpload: (file: File) => void;
    onDragStatusChange?: (isDragging: boolean) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, onDragStatusChange }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            onImageUpload(acceptedFiles[0]);
        }
    }, [onImageUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        multiple: false
    });

    React.useEffect(() => {
        if (onDragStatusChange) {
            onDragStatusChange(isDragActive);
        }
    }, [isDragActive, onDragStatusChange]);

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-robot-primary bg-robot-primary/10' : 'border-gray-300 hover:border-robot-secondary'}
      `}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p className="text-robot-primary font-bold">Drop the image here...</p>
            ) : (
                <p className="text-gray-500">
                    Drag & drop an image here, or click to select one
                </p>
            )}
        </div>
    );
};
