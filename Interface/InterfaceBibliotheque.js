const prompt = require('prompt-sync')({ sigint: true });
const GestionnaireBD = require ('../BaseDeDonnees/GestionnaireBD');
const Livre = require('../Modeles/Livre');

class InterfaceBibliotheque {
  constructor() {
    this.gestionnaireBD = new GestionnaireBD();
  }

  afficherMenu() {
    console.log("\n=== BIBLIOTHÈQUE ===");
    console.log("1. Ajouter un livre");
    console.log("2. Afficher tous les livres");
    console.log("3. Rechercher un livre");
    console.log("4. Emprunter un livre");
    console.log("5. Retourner un livre");
    console.log("6. Quitter");
    const choix = prompt("Votre choix: ");
    return choix?.trim();
  }

  ajouterLivreInterface()  {
    console.log("\n--- Ajouter un livre ---");
    const isbn = prompt("ISBN : ").trim();
    const titre = prompt("Titre : ").trim();
    const auteur = prompt("Auteur : ").trim();
    const anneeStr = prompt("Année : ").trim();

    if(!isbn || isbn.length < 10) {
      console.log("❌ ISBN invalide (minimum 10 caractères)");
      return;      
    }
    if(!titre || !auteur) {
      console.log("❌ Titre et auteur obligatoires");
      return;      
    }

    const annee = Number.parseInt(anneeStr, 10);
    const currentYear = new Date().getFullYear();
    if(Number.isNaN(annee)) {
      console.log("❌ Année doit être un nombre");
      return;
    }
    if (annee < 1000 || annee > currentYear) {
      console.log("❌ Année invalide");
      return;
    }

    const livre = new Livre(isbn, titre, auteur, annee);
    const ok = this.gestionnaireBD.ajouterLivre(livre);
    console.log(ok ? "✓ Livre ajouté avec succès!" : "❌ Erreur : ISBN déjà existant");
  }

  afficherTousLesLivres() {
    console.log("\n--- Liste des livres ---");
    const livres = this.gestionnaireBD.obtenirTousLesLivres();
    if (!livres.length) {
      console.log("Aucun livre dans la bibliothèque");
      return;
    }
    for (const l of livres) console.log("• " + l.afficherInfo());
  }

  rechercherLivreInterface() {
    const isbn = prompt("ISBN à rechercher : ").trim();
    const livre = this.gestionnaireBD.rechercherLivre(isbn);
    console.log(livre ? "✓ " + livre.afficherInfo() : "❌ Livre non trouvé");
  }

  emprunterLivreInterface() {
    const isbn = prompt("ISBN du livre à emprunter : ").trim();
    const ok = this.gestionnaireBD.emprunterLivre(isbn);
    console.log(ok ? "✓ Livre emprunté avec succès!" : "❌ Livre non disponible ou inexistant");   
  }

  retournerLivreInterface() {
    const isbn = prompt("ISBN du livre à retourner : ").trim();
    const ok = this.gestionnaireBD.rechercherLivre(isbn);
    console.log(ok ? "✓ Livre retourné avec succès!" : "❌ Erreur lors du retour");
  }

  executer() {
    while(true) {
      const choix = this.afficherMenu();
      switch (choix) {
        case "1": this.ajouterLivreInterface(); break;
        case "2": this.afficherTousLesLivres(); break;
        case "3": this.rechercherLivreInterface(); break;
        case "4": this.emprunterLivreInterface(); break;
        case "5": this.retournerLivreInterface(); break;
        case "6":
          console.log("Au revoir!");
          this.gestionnaireBD.close();
          return;
          default:
            console.log("Choix invalide");
      }
    }
  }
}

module.exports = InterfaceBibliotheque;