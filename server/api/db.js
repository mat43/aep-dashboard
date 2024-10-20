import Database from 'better-sqlite3';
import { resolve } from 'path';

export default defineEventHandler(async () => {
  const dbPath = resolve(process.cwd(), 'HackathonDB.db');
  
  console.log('Database path:', dbPath); // Log to ensure you're accessing the correct file

  // Reopen the database explicitly on each request
  const db = new Database(dbPath, { verbose: console.log });

  // Check if the table `data` exists
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='data'").all();
  
  if (tables.length === 0) {
    throw new Error("Table `data` does not exist in the database.");
  }

  // Query the database
  const data = db.prepare('SELECT * FROM data').all();

  return data;
});
