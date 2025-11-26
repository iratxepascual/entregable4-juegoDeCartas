const playerCardImg = document.getElementById("player-card");
const machineCardImg = document.getElementById("machine-card");
let playerScoreCounter = 0;
let machineScoreCounter = 0;
const scorePlayerElement = document.getElementById("score-player");
const scoreMachineElement = document.getElementById("score-machine");
const drawButton = document.getElementById("draw-button");
const CARDS_PATH = "assets/cards/";
const elements = ["air", "earth", "fire", "water"];
function getRandomCard() {
    const element = elements[Math.floor(Math.random() * elements.length)];
    const number = Math.floor(Math.random() * 10) + 1;
    return `${element}-${number}.svg`;
}
function parseCard(cardName) {
    const [element, valueWithExt] = cardName.split("-");
    const value = parseInt(valueWithExt);
    return { element, value };
}
const elementBeats = {
    fire: "water",
    water: "earth",
    earth: "air",
    air: "fire"
};
function determineWinner(playerCard, machineCard) {
    const player = parseCard(playerCard);
    const machine = parseCard(machineCard);
    if (elementBeats[player.element] === machine.element) {
        return "player";
    }
    if (elementBeats[machine.element] === player.element) {
        return "machine";
    }
    return player.value > machine.value ? "player" : "machine";
}
drawButton.onclick = () => {
    const playerCard = getRandomCard();
    const machineCard = getRandomCard();
    playerCardImg.src = CARDS_PATH + playerCard;
    machineCardImg.src = CARDS_PATH + machineCard;
    const result = determineWinner(playerCard, machineCard);
    if (result === "player") {
        playerScoreCounter++;
        scorePlayerElement.textContent = playerScoreCounter.toString();
    }
    else {
        machineScoreCounter++;
        scoreMachineElement.textContent = machineScoreCounter.toString();
    }
    checkForWinner();
};
function checkForWinner() {
    const isWinner = 5;
    if (playerScoreCounter >= isWinner) {
        window.location.href = "win.html";
    }
    else if (machineScoreCounter >= isWinner) {
        window.location.href = "lose.html";
    }
}
export {};
//# sourceMappingURL=index.js.map