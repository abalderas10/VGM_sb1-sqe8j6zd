import fs from 'fs';
import path from 'path';
import { UPLOAD_DIR } from '../config/constants';

export function ensureUploadDir() {
  const uploadPath = path.join(process.cwd(), UPLOAD_DIR);
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  return uploadPath;
}

export function generateFileName(originalname: string) {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
  return `photo-${uniqueSuffix}${path.extname(originalname)}`;
}