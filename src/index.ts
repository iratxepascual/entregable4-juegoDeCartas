const playerCardImg = document.getElementById("player-card") as HTMLImageElement;
const machineCardImg = document.getElementById("machine-card") as HTMLImageElement;

const scorePlayer = document.getElementById("score-player")!;
const scoreMachine = document.getElementById("score-machine")!;

const drawButton = document.getElementById("draw-button")!;

const CARDS_PATH = "assets/cards/";

const elements = ["air", "earth", "fire", "water"];

function getRandomCard() {
  const element = elements[Math.floor(Math.random() * elements.length)];
  const number = Math.floor(Math.random() * 10) + 1;

  return `${element}-${number}.svg`;  
}

drawButton.addEventListener("click", ()=> {
  const playerCard = getRandomCard();
  const machineCard = getRandomCard();

  playerCardImg.src = CARDS_PATH + playerCard;
  machineCardImg.src = CARDS_PATH + machineCard;
});