import { getRandomCard, CARDS_PATH } from "./RandomCard.js";
import { isStorm, isEarthquake, handleEarthquake } from "./SpecialCards.js";
import { determineWinner } from "./Game.js";
import { showSpecialCardAlert } from "./SpecialCardAlert.js";

const drawButton = document.getElementById("draw-button") as HTMLButtonElement;

const playerCardImg = document.getElementById("player-card") as HTMLImageElement;
const machineCardImg = document.getElementById("machine-card") as HTMLImageElement;

const playerExtraImg = document.getElementById("player-extra-card") as HTMLImageElement;
const machineExtraImg = document.getElementById("machine-extra-card") as HTMLImageElement;

const scorePlayerElement = document.getElementById("score-player") as HTMLElement;
const scoreMachineElement = document.getElementById("score-machine") as HTMLElement;

let playerScoreCounter = 0;
let machineScoreCounter = 0;
let pendingEarthquake: "player" | "machine" | null = null;
let lastPlayerCard: string | null = null;
let lastMachineCard: string | null = null;

function showExtraCard(who: "player" | "machine", cardName: string) {
  const path = CARDS_PATH + cardName;

  if (who === "player") {
    playerExtraImg.src = path;
    playerExtraImg.classList.remove("hidden");
  } else {
    machineExtraImg.src = path;
    machineExtraImg.classList.remove("hidden");
  }
}

function hideExtraCards() {
  playerExtraImg.classList.add("hidden");
  machineExtraImg.classList.add("hidden");
}

function incrementScore(player: "player" | "machine") {
  if (player === "player") {
    playerScoreCounter++;
    scorePlayerElement.textContent = playerScoreCounter.toString();
  } else {
    machineScoreCounter++;
    scoreMachineElement.textContent = machineScoreCounter.toString();
  }
}

function checkForWinner() {
  if (playerScoreCounter >= 5) {
        window.location.href = "win.html";
    } else if (machineScoreCounter >= 5) {
        window.location.href = "lose.html";
    }
}

drawButton.onclick = () => {
  hideExtraCards();

  if (pendingEarthquake) {
    const extraCard = getRandomCard();
    showExtraCard(pendingEarthquake, extraCard);

    if (pendingEarthquake === "player") {
      if (!lastMachineCard) {
        incrementScore("player");
      } else {
        const winner = determineWinner(extraCard, lastMachineCard);
        incrementScore(winner);
      }
    } else {
      if (!lastPlayerCard) {
        incrementScore("machine");
      } else {
        const winner = determineWinner(lastPlayerCard, extraCard);
        incrementScore(winner);
      }
    }

    pendingEarthquake = null;
    lastPlayerCard = null;
    lastMachineCard = null;
    checkForWinner();
    return;
  }

  const playerCard = getRandomCard();
  const machineCard = getRandomCard();

  playerCardImg.src = CARDS_PATH + playerCard;
  machineCardImg.src = CARDS_PATH + machineCard;

  lastPlayerCard = playerCard;
  lastMachineCard = machineCard;

  if (isStorm(playerCard)) {
    showSpecialCardAlert("⚡ Tormenta: intercambias puntos con la máquina.");
    [playerScoreCounter, machineScoreCounter] = [
      machineScoreCounter,
      playerScoreCounter,
    ];
    scorePlayerElement.textContent = playerScoreCounter.toString();
    scoreMachineElement.textContent = machineScoreCounter.toString();
    return;
  }

  if (isStorm(machineCard)) {
    showSpecialCardAlert("⚡ Tormenta del rival: intercambia contigo los puntos.");
    [playerScoreCounter, machineScoreCounter] = [
      machineScoreCounter,
      playerScoreCounter,
    ];
    scorePlayerElement.textContent = playerScoreCounter.toString();
    scoreMachineElement.textContent = machineScoreCounter.toString();
    return;
  }

  if (isEarthquake(playerCard)) {
    pendingEarthquake = "player";
    handleEarthquake("player", showSpecialCardAlert);
    return;
  }

  if (isEarthquake(machineCard)) {
    pendingEarthquake = "machine";
    handleEarthquake("machine", showSpecialCardAlert);
    return;
  }

  const winner = determineWinner(playerCard, machineCard);
  incrementScore(winner);
  checkForWinner();
};