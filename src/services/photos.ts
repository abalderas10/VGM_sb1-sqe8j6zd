import { Photo, PhotoSection } from '../types/photo';
import { SERVER_CONFIG } from '../config';

const API_URL = `${SERVER_CONFIG.BASE_URL}/api/photos`;

export async function fetchPhotos(section: PhotoSection): Promise<Photo[]> {
  const response = await fetch(`${API_URL}?section=${section}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch photos');
  }
  
  return response.json();
}

export async function uploadPhoto(formData: FormData): Promise<Photo> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    },
    body: formData
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to upload photo');
  }

  return response.json();
}

export async function updatePhoto(id: string, data: Partial<Photo>): Promise<Photo> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update photo');
  }

  return response.json();
}

export async function deletePhoto(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete photo');
  }
}