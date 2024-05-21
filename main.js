const nomObjet = ['Une chaise gaming', 'Un costume d\'Halloween', 'Un barbecue', 'Une guitare', 'Un sac à main']; // Noms des objets à deviner
const imageObjet = ['chaise.png', 'costume-haloween.png', 'grill.png', 'guitare.png', 'sac-a-main.png']; // Noms des images correspondant aux objets

let prixPropose; // Le prix proposé par le joueur
let prixMystere; // Le prix mystère à deviner par le joueur
let nbreAleatoire; // Le nombre aléatoire pour choisir l'objet à deviner
let compteurTentative; // Compteur du nombre de tentatives restantes
let image = document.getElementById("objet"); // Élément HTML pour afficher l'image de l'objet
let nomImage = document.getElementById('nom-objet'); // Élément HTML pour afficher le nom de l'objet
let bouton = document.getElementById('bouton'); // Bouton de soumission du prix proposé
let message = document.getElementById('message'); // Élément HTML pour afficher les messages de jeu
let affichageTentative = document.getElementById('nbre-tentative'); // Élément HTML pour afficher le nombre de tentatives restantes

// Fonction pour générer un nombre aléatoire entre 0 et valeurMax (non inclus)
function genererUnChiffre(valeurMax) {
  return Math.floor(Math.random() * valeurMax);
}

// Fonction pour afficher l'image correspondant à l'objet
function afficherImage(valeur) {
  return '<img src="./image-juste-prix/' + valeur + '" class="img-fluid" width="30%" alt="Responsive image">';
}

// Initialisation du jeu
function initialiserJeu() {
  prixMystere = genererUnChiffre(100) + 1; // Générer un prix mystère aléatoire entre 1 et 100
  nbreAleatoire = genererUnChiffre(5); // Choisir aléatoirement un objet à deviner
  image.innerHTML = afficherImage(imageObjet[nbreAleatoire]); // Afficher l'image de l'objet choisi
  nomImage.innerHTML = nomObjet[nbreAleatoire]; // Afficher le nom de l'objet choisi
  compteurTentative = 10; // Initialiser le compteur de tentatives
  affichageTentative.innerHTML = "Il vous reste " + compteurTentative + " tentatives..."; // Afficher le nombre de tentatives restantes
  bouton.disabled = false; // Activer le bouton de soumission du prix proposé
  message.innerHTML = ""; // Réinitialiser le message de jeu
}

// Fonction pour vérifier la proposition du joueur
function verifierProposition() {

  prixPropose = parseInt(document.getElementById('prix-propose').value); // Récupérer le prix proposé par le joueur

  if(isNaN(prixPropose) || prixPropose == ""|| prixPropose<0 || prixPropose>100){
    message.innerHTML= "Prix Invalide! Veuillez entrez  un chiffre entre 1 et 100 ";
    bouton.disabled = false; // Réactiver le bouton après avoir affiché le message d'erreur
    

    }
  
    else if (compteurTentative > 0) {
    
    if (prixPropose > prixMystere) {
      message.innerHTML = "C'est moins !"; // Afficher un message si le prix proposé est trop élevé
    } else if (prixPropose < prixMystere) {
      message.innerHTML = "C'est plus !"; // Afficher un message si le prix proposé est trop bas
    } else {
      if(prixPropose==prixMystere)
      message.innerHTML = "Bravo, vous avez gagné !"; // Afficher un message de victoire si le prix est correct
      bouton.disabled = true; // Désactiver le bouton de soumission du prix proposé
    }
    compteurTentative--; // Décrémenter le nombre de tentatives restantes
    affichageTentative.innerHTML = "Il vous reste " + compteurTentative + " tentatives..."; // Mettre à jour l'affichage du nombre de tentatives restantes
  } else {
    message.innerHTML = "Désolé, vous avez perdu ! Le juste prix était de " + prixMystere + " euros."; // Afficher un message de défaite si le joueur a utilisé toutes ses tentatives
    bouton.disabled = true; // Désactiver le bouton de soumission du prix proposé
  }
}

// Écouteur d'événement pour le bouton de soumission du prix proposé
bouton.addEventListener('click', verifierProposition);

// Appel de la fonction d'initialisation du jeu au chargement de la page
initialiserJeu();