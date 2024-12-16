import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Photo, PhotoSchema } from '../../../types/photo';
import { cn } from '../../../utils/cn';

interface PhotoEditorProps {
  photo: Photo;
  onSave: (id: string, data: Partial<Photo>) => Promise<void>;
  onClose: () => void;
}

export function PhotoEditor({ photo, onSave, onClose }: PhotoEditorProps) {
  const [formData, setFormData] = useState({
    alt: photo.alt,
    priority: photo.priority
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await onSave(photo.id, formData);
      onClose();
    } catch (err) {
      setError('Failed to update photo');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-caribbean-900">
            Edit Photo
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-caribbean-50 text-caribbean-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-caribbean-700 mb-1">
              Alt Text
            </label>
            <input
              type="text"
              value={formData.alt}
              onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-caribbean-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-caribbean-700 mb-1">
              Priority
            </label>
            <input
              type="number"
              min="0"
              max="999"
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-caribbean-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-caribbean-600 hover:bg-caribbean-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-caribbean-500 text-white rounded-lg hover:bg-caribbean-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}