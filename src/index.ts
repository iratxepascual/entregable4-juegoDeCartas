const playerCardImg = document.getElementById("player-card") as HTMLImageElement;
const machineCardImg = document.getElementById("machine-card") as HTMLImageElement;

let playerScoreCounter: number = 0;
let machineScoreCounter: number = 0;

const scorePlayerElement = document.getElementById("score-player")!;
const scoreMachineElement = document.getElementById("score-machine")!;

const drawButton = document.getElementById("draw-button")!;

const CARDS_PATH = "assets/cards/";

const elements = ["air", "earth", "fire", "water"];

function getRandomCard() {
    const random = Math.random();

    if (random < 0.05) {
        return "storm.svg";
    }
    if (random < 0.10) {
        return "earthquake.svg";
    }

    const element = elements[Math.floor(Math.random() * elements.length)];
    const number = Math.floor(Math.random() * 10) + 1;

    return `${element}-${number}.svg`;
}

function isStorm(card: string) {
    return card === "storm.svg";
}

function isEarthquake(card: string) {
    return card === "earthquake.svg";
}


function parseCard(cardName: string) {
    const [element, valueWithExt] = cardName.split("-");
    const value = parseInt(valueWithExt); 
    return { element, value };
}

const elementBeats: Record<string, string> = {
    fire: "water",
    water: "earth",
    earth: "air",
    air: "fire"
};

function determineWinner(playerCard: string, machineCard: string): "player" | "machine" {
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

    if (isStorm(playerCard)) {
        showSpecialCardAlert("⚡ Tormenta: Se intercambian los puntos de ambos jugadores.");

        const temp = playerScoreCounter;
        playerScoreCounter = machineScoreCounter;
        machineScoreCounter = temp;

        scorePlayerElement.textContent = playerScoreCounter.toString();
        scoreMachineElement.textContent = machineScoreCounter.toString();

        return;
    }

    if (isStorm(machineCard)) {
        showSpecialCardAlert("⚡ Tormenta del rival: ¡Se intercambian los marcadores!");

        const temp = playerScoreCounter;
        playerScoreCounter = machineScoreCounter;
        machineScoreCounter = temp;

        scorePlayerElement.textContent = playerScoreCounter.toString();
        scoreMachineElement.textContent = machineScoreCounter.toString();

        return; 
    }

    if (isEarthquake(playerCard)) {
         handleEarthquake("player");
         return;
    }

    if (isEarthquake(machineCard)) {
        handleEarthquake("machine");
        return;
    }

    const result = determineWinner(playerCard, machineCard);

    if (result === "player") {
        playerScoreCounter++;
        scorePlayerElement.textContent = playerScoreCounter.toString();
    } else {
        machineScoreCounter++;
        scoreMachineElement.textContent = machineScoreCounter.toString();
    }

    checkForWinner();
};

function handleEarthquake(who: "player" | "machine") {
    if (who === "player") {
        showSpecialCardAlert("🌍 Terremoto: Robas una carta extra y tienes más probabilidades de ganar.");
    } else {
        showSpecialCardAlert("🌍 Terremoto del rival: La máquina roba una carta extra.");
    }

    const extraCard = getRandomCard();
    const parsed = parseCard(extraCard);

    const sameElement = !isStorm(extraCard) &&
                        !isEarthquake(extraCard) &&
                        elements.includes(parsed.element);

    if (sameElement) {
        if (who === "player") {
        playerScoreCounter++;
        scorePlayerElement.textContent = playerScoreCounter.toString();
        } else {
        machineScoreCounter++;
        scoreMachineElement.textContent = machineScoreCounter.toString();
        }
    } else {
        if (who === "player") {
        playerScoreCounter++;
        scorePlayerElement.textContent = playerScoreCounter.toString();
        } else {
        machineScoreCounter++;
        scoreMachineElement.textContent = machineScoreCounter.toString();
        }
    }

    checkForWinner();
}


function checkForWinner() {
    const isWinner = 5;
    if (playerScoreCounter >= isWinner) {
         window.location.href = "win.html";
    } else if (machineScoreCounter >= isWinner) {
        window.location.href = "lose.html";
    }
}

function showSpecialCardAlert(message: string) {
    const alertBox = document.getElementById("special-card")!;
    
    alertBox.textContent = message;
    alertBox.classList.remove("hidden");
    
    setTimeout(() => {
        alertBox.classList.add("show");
    }, 10);

    setTimeout(() => {
        alertBox.classList.remove("show");
        
        setTimeout(() => {
        alertBox.classList.add("hidden");
        }, 400);
    }, 3000);
}
