import { useState, useCallback } from 'react';
import { Photo, PhotoSection } from '../types/photo';
import { fetchPhotos, uploadPhoto, updatePhoto, deletePhoto } from '../services/photos';

export function usePhotos(section: PhotoSection) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPhotos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPhotos(section);
      setPhotos(data.sort((a, b) => a.priority - b.priority));
    } catch (err) {
      console.error('Failed to load photos:', err);
      setError('Failed to load photos. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [section]);

  const addPhoto = useCallback(async (formData: FormData) => {
    try {
      const newPhoto = await uploadPhoto(formData);
      setPhotos(prev => [...prev, newPhoto].sort((a, b) => a.priority - b.priority));
      return newPhoto;
    } catch (err) {
      console.error('Failed to upload photo:', err);
      throw new Error('Failed to upload photo. Please check file size and type.');
    }
  }, []);

  const editPhoto = useCallback(async (id: string, data: Partial<Photo>) => {
    try {
      const updatedPhoto = await updatePhoto(id, data);
      setPhotos(prev => 
        prev.map(p => p.id === id ? updatedPhoto : p)
           .sort((a, b) => a.priority - b.priority)
      );
      return updatedPhoto;
    } catch (err) {
      console.error('Failed to update photo:', err);
      throw new Error('Failed to update photo. Please try again.');
    }
  }, []);

  const removePhoto = useCallback(async (id: string) => {
    try {
      await deletePhoto(id);
      setPhotos(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete photo:', err);
      throw new Error('Failed to delete photo. Please try again.');
    }
  }, []);

  return {
    photos,
    loading,
    error,
    loadPhotos,
    addPhoto,
    editPhoto,
    removePhoto
  };
}