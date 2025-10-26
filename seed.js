const GestionnaireBD = require('./BaseDeDonnees/GestionnaireBD');
const Livre = require('./Modeles/Livre');

(async () => {
  const db = new GestionnaireBD();

  const livres = [
    new Livre('9782266205146', "L'Étranger", 'Albert Camus', 1942),
    new Livre('9782070368228', 'Le Petit Prince', 'Antoine de Saint-Exupéry', 1943),
    new Livre('9780132350884', 'Clean Code', 'Robert C. Martin', 2008),
  ];

  for (const l of livres) {
    const ok = db.ajouterLivre(l);
    console.log(ok ? `✓ Ajouté: ${l.isbn} — ${l.titre}`
      : `• Déjà présent (ISBN doublon): ${l.isbn} — ${l.titre}`
    );
  }

  db.close();
  console.log('\nSeed terminé. La base `bibliotheque.db` est à la racine du projet.');
})();
  