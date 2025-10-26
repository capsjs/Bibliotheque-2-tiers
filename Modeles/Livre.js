class Livre {
  constructor(isbn, titre, auteur, annee) {
    this.isbn = isbn;
    this.titre = titre;
    this.auteur = auteur;
    this.annee = annee;
    this.disponible;
  }

  afficherInfo() {
    const statut = this.disponible ? "Disponible" : "Emprunté";
    return `${this.titre} par ${this.auteur} (${this.annee}) - ${statut}`;
  }
}

module.exports = Livre;