import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import path from 'path';
import { authRouter } from './routes/auth';
import { postsRouter } from './routes/posts';
import { photosRouter } from './routes/photos';

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/photos', photosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});