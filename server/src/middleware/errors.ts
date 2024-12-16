import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export const handlePhotoErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ error: err.message });
  }
  
  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({ error: err.message });
  }
  
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
};