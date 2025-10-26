const DB = require('better-sqlite3');
const path = require('path');
const dbPath = path.resolve(process.cwd(), 'bibliotheque.db');
console.log('Recreate on DB =>', dbPath);

const db = new DB(dbPath);
db.exec(`
  DROP TABLE IF EXISTS livres;
  CREATE TABLE IF NOT EXISTS livres (
    isbn TEXT PRIMARY KEY,
    titre TEXT NOT NULL,
    auteur TEXT NOT NULL,
    annee INTEGER,
    disponible INTEGER DEFAULT 1
  );
`);
db.close();
console.log('✅ Table "livres" recréée.');
