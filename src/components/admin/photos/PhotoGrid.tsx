import React from 'react';
import { Image, ArrowUp, ArrowDown, Edit2, Trash2 } from 'lucide-react';
import { Photo } from '../../../types/photo';
import { cn } from '../../../utils/cn';

interface PhotoGridProps {
  photos: Photo[];
  onEdit: (photo: Photo) => void;
  onDelete: (id: string) => void;
  onReorder: (id: string, direction: 'up' | 'down') => void;
}

export function PhotoGrid({ photos, onEdit, onDelete, onReorder }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo) => (
        <div 
          key={photo.id}
          className={cn(
            "bg-white rounded-lg shadow-md overflow-hidden",
            "group hover:shadow-lg transition-shadow"
          )}
        >
          <div className="aspect-[16/9] relative overflow-hidden">
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover"
            />
            <div className={cn(
              "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100",
              "flex items-center justify-center gap-2 transition-opacity"
            )}>
              <button
                onClick={() => onEdit(photo)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(photo.id)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-caribbean-900">
                {photo.section}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onReorder(photo.id, 'up')}
                  className="p-1 rounded hover:bg-caribbean-50 text-caribbean-600"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <span className="text-sm text-caribbean-600">
                  {photo.priority}
                </span>
                <button
                  onClick={() => onReorder(photo.id, 'down')}
                  className="p-1 rounded hover:bg-caribbean-50 text-caribbean-600"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-caribbean-600 line-clamp-2">
              {photo.alt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}