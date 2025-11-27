export function isStorm(card: string): boolean {
  return card === "storm.svg";
}

export function isEarthquake(card: string): boolean {
  return card === "earthquake.svg";
}

export function handleEarthquake(
  who: "player" | "machine",
  showAlert: (message: string) => void
) {
  if (who === "player") {
    showAlert("🌍 Terremoto: pulsa 'Robar carta' para robar la carta extra.");
  } else {
    showAlert("🌍 Terremoto del rival: pulsa 'Robar carta' para que la máquina robe la carta extra.");
  }
}