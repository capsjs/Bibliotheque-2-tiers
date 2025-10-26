const Database = require('better-sqlite3');
const path = require('path');
const Livre = require('../Modeles/Livre');

class GestionnaireBD {
  constructor(dbPath = path.resolve(process.cwd(), 'bibliotheque.db')) {
    this.dbPath = dbPath;
    this.db = new Database(this.dbPath);
    this.initialiserTables();
  }

  initialiserTables() {
    const sql = `
    CREATE TABLE IF NOT EXISTS livres (
      isbn TEXT PRIMARY KEY,
      titre TEXT NOT NULL,
      auteur TEXT NOT NULL,
      annee INTEGER,
      disponible INTEGER DEFAULT 1
     )
    `;
    this.db.exec(sql);
  }

  ajouterLivre(livre) {
    try {
      const stmt = this.db.prepare(
        'INSERT OR IGNORE INTO livres (isbn, titre, auteur, annee, disponible) VALUES (?, ?, ?, ?, 1)'
      );
      const info = stmt.run(livre.isbn, livre.titre, livre.auteur, livre.annee);
      return info.changes === 1;
    } catch (e) {
      console.error('ajouterLivre error =>', e.message);
      return false;
    }
  }

  obtenirTousLesLivres() {
    const rows = this.db.prepare('SELECT isbn, titre, auteur, annee, disponible FROM livres').all();
    return rows.map(r => {
      const livre = new Livre(r.isbn, r.titre, r.auteur, r.annee);
      livre.disponible = r.disponible === 1;
      return livre;
    });
  }

  rechercherLivre(isbn) {
    const r = this.db.prepare(
      'SELECT isbn, titre, auteur, annee, disponible FROM livres WHERE isbn = ?'
    ).get(isbn);
    if(!r) return null;
    const livre = new Livre(r.isbn, r.titre, r.auteur, r.annee);
    livre.disponible = r.disponible === 1;
    return livre;
  }

  emprunterLivre(isbn) {
    const info = this.db.prepare(
      'UPDATE livres SET disponible = 0 WHERE isbn = ? AND disponible = 1'
    ).run(isbn);
    return info.changes > 0;
  }

  retournerLivre(isbn) {
    const info = this.db.prepare(
      'UPDATE livres SET disponible = 1 WHERE isbn = ?'
    ).run(isbn);
    return info.changes > 0;
  }

  close() {
    try { this.db.close(); } catch {}
  }
}

module.exports = GestionnaireBD;