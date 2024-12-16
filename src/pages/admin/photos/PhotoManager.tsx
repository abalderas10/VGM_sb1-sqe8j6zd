import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Image, ArrowLeft } from 'lucide-react';
import { PhotoGrid } from '../../../components/admin/photos/PhotoGrid';
import { PhotoUploader } from '../../../components/admin/photos/PhotoUploader';
import { PhotoEditor } from '../../../components/admin/photos/PhotoEditor';
import { Photo, PhotoSection } from '../../../types/photo';
import { usePhotos } from '../../../hooks/usePhotos';
import { cn } from '../../../utils/cn';

const SECTIONS: PhotoSection[] = ['hero', 'villa', 'boat', 'amenities', 'experiences'];

export function PhotoManager() {
  const [selectedSection, setSelectedSection] = useState<PhotoSection>('hero');
  const [showUploader, setShowUploader] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  
  const {
    photos,
    loading,
    error,
    loadPhotos,
    addPhoto,
    editPhoto,
    removePhoto
  } = usePhotos(selectedSection);

  useEffect(() => {
    loadPhotos();
  }, [selectedSection]);

  const handleUpload = async (formData: FormData) => {
    try {
      await addPhoto(formData);
      setShowUploader(false);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    try {
      await removePhoto(id);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const photo = photos.find(p => p.id === id);
    if (!photo) return;

    const newPriority = direction === 'up' 
      ? Math.max(0, photo.priority - 1)
      : photo.priority + 1;

    try {
      await editPhoto(id, { priority: newPriority });
    } catch (err) {
      console.error('Reorder failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-caribbean-50">
      {/* Navigation */}
      <nav className="bg-caribbean-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <Link 
            to="/admin/dashboard" 
            className="inline-flex items-center gap-2 text-white hover:text-caribbean-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-display font-bold text-caribbean-900">
              Photo Manager
            </h1>
            <button
              onClick={() => setShowUploader(true)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                "bg-caribbean-500 text-white",
                "hover:bg-caribbean-600 transition-colors"
              )}
            >
              <Plus className="w-5 h-5" />
              Add Photo
            </button>
          </div>

          {/* Section Tabs */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={cn(
                  "px-4 py-2 rounded-lg flex items-center gap-2",
                  "transition-colors whitespace-nowrap",
                  selectedSection === section
                    ? "bg-caribbean-500 text-white"
                    : "bg-caribbean-50 text-caribbean-600 hover:bg-caribbean-100"
                )}
              >
                <Image className="w-4 h-4" />
                <span className="capitalize">{section}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center py-12 text-caribbean-600">
              Loading photos...
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              {error}
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-12 text-caribbean-600">
              No photos found in this section
            </div>
          ) : (
            <PhotoGrid
              photos={photos}
              onEdit={setEditingPhoto}
              onDelete={handleDelete}
              onReorder={handleReorder}
            />
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploader && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <h3 className="text-lg font-medium text-caribbean-900 mb-4">
              Upload New Photo
            </h3>
            <PhotoUploader
              onUpload={handleUpload}
              section={selectedSection}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowUploader(false)}
                className="px-4 py-2 text-caribbean-600 hover:bg-caribbean-50 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingPhoto && (
        <PhotoEditor
          photo={editingPhoto}
          onSave={editPhoto}
          onClose={() => setEditingPhoto(null)}
        />
      )}
    </div>
  );
}