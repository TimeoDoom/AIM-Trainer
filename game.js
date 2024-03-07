const target = document.querySelector(".target");
const targetPopUp = document.querySelector(".target-popo-up");
const gameArea = document.querySelector(".area");
const pointsDeLaPartie = document.querySelector(".pointsDeLaPartie");
const inputTentacles = document.getElementById("tentacles"); // temps de la partie
const playButton = document.getElementById("playButton");
const playSection = document.querySelector(".playd");
const endGame = document.querySelector(".endGame");
const pointsFin = document.querySelector(".pointsFin");
const pourcent = document.querySelector(".pourcent");
const popUp = document.querySelector(".popUp");

let points = -1;
let totalClicks = 0;
let clicksOnTarget = 0;
let countdownTimer;

target.style.display = "none";

function position() {
  // Définir de nouvelles coordonnées aléatoires
  let nouvellePositionGauche = Math.random() * (gameArea.offsetWidth - 100);
  let nouvellePositionHaut = Math.random() * (gameArea.offsetHeight - 100);

  // Appliquer les nouvelles coordonnées et faire réapparaître le rond
  target.style.marginLeft = nouvellePositionGauche + "px";
  target.style.marginTop = nouvellePositionHaut + "px";

  if (Math.random() < 0.2) {
    // 20% de chances d'apparition d'une cible piégée
    target.style.backgroundColor = "rgb(0, 0, 255)"; // couleur de la cible piégée
    // Masquer la cible bleue après 2 secondes
    setTimeout(() => {
      target.style.display = "none";
      position(); // Réappeler la fonction position pour générer une nouvelle cible
    }, 2500);
  } else {
    target.style.backgroundColor = "#ff0000"; // couleur de la cible normale
  }

  target.style.display = "block";
}

function startGame(tempsEnSecondes) {
  countdownTimer = setTimeout(() => {
    // Afficher le texte au centre de l'écran
    endGame.style.display = "block";
    pointsFin.innerHTML = points;
    pourcent.innerHTML = calculatePrecision() + "%";

    // Masquer la cible à la fin du jeu
    target.style.display = "none";

    // Arrêter le jeu (vous pouvez ajouter ici d'autres actions à effectuer à la fin du jeu)
  }, tempsEnSecondes * 1000); // Convertir en millisecondes
}

// Calculer la précision en pourcentage
function calculatePrecision() {
  return totalClicks === 0
    ? 0
    : ((clicksOnTarget / totalClicks) * 100).toFixed(0);
}

// Ajouter un gestionnaire d'événements pour le changement de l'input
inputTentacles.addEventListener("change", function () {
  // Ne faites rien ici, le temps sera récupéré lors du clic sur le bouton Jouer
});

// Ajouter un gestionnaire d'événements pour le clic sur le bouton Jouer
playButton.addEventListener("click", function () {
  const tempsEnSecondes = parseInt(inputTentacles.value);

  // Vérifier si le temps est valide
  if (!isNaN(tempsEnSecondes) && tempsEnSecondes > 0) {
    // Masquer la section
    playSection.style.display = "none";

    // Démarrer le compte à rebours
    startGame(tempsEnSecondes);
    position();
  }
});

// Ajouter un gestionnaire d'événements de clic sur la zone de jeu
gameArea.addEventListener("click", function (event) {
  // Incrémenter le nombre total de clics
  totalClicks++;

  // Obtenir les coordonnées du clic
  const clickX = event.clientX;
  const clickY = event.clientY;

  // Obtenir les coordonnées de la cible
  const targetRect = target.getBoundingClientRect();
  const targetX = targetRect.left + targetRect.width / 2;
  const targetY = targetRect.top + targetRect.height / 2;

  const targetColor = target.style.backgroundColor;
  // Calculer la distance entre le clic et la cible
  const distance = Math.sqrt((clickX - targetX) ** 2 + (clickY - targetY) ** 2);

  // Vérifier si le clic est à côté de la cible (distance < rayon de la cible)
  if (distance > targetRect.width / 2) {
    // Si le clic est en dehors de la cible, ne rien faire
  } else {
    if (targetColor === "rgb(0, 0, 255)") {
      // Si la cible cliquée est de couleur bleue (piégée), décrémenter le score
      pointsDeLaPartie.innerHTML = points -= 1;
      popUp.style.display = "block";
    } else {
      // Clic sur la cible, incrémenter le nombre de clics sur la cible
      clicksOnTarget++;
      // Réactualiser le score
      pointsDeLaPartie.innerHTML = points += 1;
    }
    // Relocaliser la cible
    position();
  }

  // Mise à jour du pourcentage de précision
  pourcent.innerHTML = calculatePrecision() + "%";
});

// Ajouter un gestionnaire d'événements pour arrêter le compte à rebours (par exemple, lorsque le jeu est terminé avant le délai)
function stopGame() {
  clearTimeout(countdownTimer);
}
