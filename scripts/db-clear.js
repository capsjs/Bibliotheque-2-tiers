const DB = require('better-sqlite3');
const db = new DB('bibliotheque.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS livres (
    isbn TEXT PRIMARY KEY,
    titre TEXT NOT NULL,
    auteur TEXT NOT NULL,
    annee INTEGER,
    disponible INTEGER DEFAULT 1
  )
`);

const info = db.prepare('DELETE FROM livres').run();
console.log(`🧹 Table "livres" vidée (${info.changes} ligne(s) supprimée(s)).`);
db.close();
