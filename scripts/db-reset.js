const fs = require('fs');
const path = 'bibliotheque.db';
if (fs.existsSync(path)) {
  fs.rmSync(path);
  console.log('🗑️  Fichier bibliotheque.db supprimé (reset complet).');
} else {
  console.log('ℹ️  Aucun fichier DB à supprimer (déjà vierge).');
}
