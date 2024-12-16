import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database setup
const db = new sqlite3.Database(join(__dirname, '../../database.sqlite'), (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  }
  console.log('Connected to SQLite database');
});

// Initialize database tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    author TEXT NOT NULL,
    author_image TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080'
}));

// Routes
app.get('/api/posts', (req, res) => {
  db.all('SELECT * FROM posts ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/posts', (req, res) => {
  const { title, content, image, category, author, authorImage } = req.body;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  db.run(
    `INSERT INTO posts (title, slug, content, image, category, author, author_image) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
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

app.delete('/api/posts/:id', (req, res) => {
  db.run('DELETE FROM posts WHERE id = ?', req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Post deleted successfully' });
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});