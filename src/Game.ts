import { parseCard } from "./Card.js";

const elementBeats: Record<string, string> = {
  water: "fire",
  fire: "air",
  air: "earth",
  earth: "water"
};

export function determineWinner(
  playerCard: string,
  machineCard: string
): "player" | "machine" {

  const player = parseCard(playerCard);
  const machine = parseCard(machineCard);

  if (elementBeats[player.element] === machine.element) return "player";
  if (elementBeats[machine.element] === player.element) return "machine";

  return player.value >= machine.value ? "player" : "machine";
}
