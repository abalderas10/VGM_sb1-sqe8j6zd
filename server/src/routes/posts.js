import { Router } from 'express';
import { getDb } from '../database/init.js';

const router = Router();

router.get('/', (req, res) => {
  const db = getDb();
  db.all('SELECT * FROM posts ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { title, content, image, category, author, authorImage } = req.body;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const db = getDb();
  db.run(
    'INSERT INTO posts (title, slug, content, image, category, author, author_image) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, slug, content, image, category, author, authorImage],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        title,
        slug,
        content,
        image,
        category,
        author,
        authorImage,
        createdAt: new Date()
      });
    }
  );
});

router.delete('/:id', (req, res) => {
  const db = getDb();
  db.run('DELETE FROM posts WHERE id = ?', req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Post deleted successfully' });
  });
});

export const postsRouter = router;