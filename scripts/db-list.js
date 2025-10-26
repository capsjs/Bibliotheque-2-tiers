const DB = require('better-sqlite3');
const path = require('path');
const dbPath = path.resolve(process.cwd(), 'bibliotheque.db');
const db = new DB(dbPath);
try {
  const rows = db.prepare('SELECT isbn, titre, auteur, annee, disponible FROM livres').all();
  console.table(rows);
} catch (e) {
  console.log('ℹ️  Table introuvable ou vide.', e.message);
}
db.close();
