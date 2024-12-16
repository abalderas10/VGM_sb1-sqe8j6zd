import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface PhotoUploaderProps {
  onUpload: (formData: FormData) => Promise<void>;
  section: string;
  onClose: () => void;
}

export function PhotoUploader({ onUpload, section, onClose }: PhotoUploaderProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('photo', file);
      formData.append('section', section);
      formData.append('alt', file.name); // Default alt text, can be edited later

      await onUpload(formData);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  }, [onUpload, section]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-caribbean-900">
          Upload New Photo
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-caribbean-50 text-caribbean-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8",
          "flex flex-col items-center justify-center gap-4",
          "cursor-pointer transition-all duration-200",
          isDragActive
            ? "border-caribbean-500 bg-caribbean-50"
            : "border-caribbean-200 hover:border-caribbean-300"
        )}
      >
        <input {...getInputProps()} />
        <div className="p-4 bg-caribbean-100 rounded-full">
          <Upload className="w-8 h-8 text-caribbean-600" />
        </div>
        <div className="text-center">
          <p className="text-caribbean-600 font-medium">
            {isDragActive
              ? "Drop the image here"
              : "Drag & drop an image here, or click to select"}
          </p>
          <p className="text-sm text-caribbean-500 mt-1">
            PNG, JPG or WebP up to 5MB
          </p>
        </div>
      </div>
    </div>
  );
}