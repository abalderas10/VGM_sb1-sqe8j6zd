import { z } from 'zod';

export type PhotoSection = 'hero' | 'villa' | 'boat' | 'amenities' | 'experiences';

export interface Photo {
  id: string;
  url: string;
  alt: string;
  section: PhotoSection;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export const PhotoSchema = z.object({
  url: z.string().url('Must be a valid URL'),
  alt: z.string().min(1, 'Alt text is required'),
  section: z.enum(['hero', 'villa', 'boat', 'amenities', 'experiences']),
  priority: z.number().min(0).max(999)
});