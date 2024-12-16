import sqlite3 from 'sqlite3';
import { DATABASE_PATH } from '../config.js';

export function initDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DATABASE_PATH, (err) => {
      if (err) {
        reject(err);
        return;
      }
      
      db.run(`
        CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          content TEXT NOT NULL,
          image TEXT NOT NULL,
          category TEXT NOT NULL,
          author TEXT NOT NULL,
          author_image TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(db);
        }
      });
    });
  });
}