import { Router } from 'express';
import { upload } from '../config/multer';
import { verifyAdminToken } from '../middleware/auth';
import { prisma } from '../config/database';
import { handlePhotoErrors } from '../middleware/errors';

const router = Router();

router.use(handlePhotoErrors);

router.get('/', verifyAdminToken, async (req, res) => {
  try {
    const { section } = req.query;
    if (!section) {
      return res.status(400).json({ error: 'Section parameter is required' });
    }

    const photos = await prisma.photo.findMany({
      where: { section: section as string },
      orderBy: { priority: 'asc' }
    });
    res.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

router.post('/', verifyAdminToken, upload.single('photo'), async (req, res) => {
  try {
    const { section, alt } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const photo = await prisma.photo.create({
      data: {
        url: `/uploads/photos/${file.filename}`,
        alt: alt || file.originalname,
        section,
        priority: 999 // Will be updated by reordering
      }
    });

    res.json(photo);
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
});

router.patch('/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { alt, priority } = req.body;

    const photo = await prisma.photo.update({
      where: { id },
      data: { alt, priority }
    });

    res.json(photo);
  } catch (error) {
    console.error('Error updating photo:', error);
    res.status(500).json({ error: 'Failed to update photo' });
  }
});

router.delete('/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.photo.delete({ where: { id } });
    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
});

export const photosRouter = router;