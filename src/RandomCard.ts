export const CARDS_PATH = "assets/cards/";

const elements = ["air", "earth", "fire", "water"];

function createDeck(): string[] {
  const deck: string[] = [];
  for (const el of elements) {
    for (let i = 1; i <= 10; i++) {
      deck.push(`${el}-${i}.svg`);
    }
  }

  deck.push("storm.svg");
  deck.push("earthquake.svg");

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

let deck = createDeck();

export function resetDeck(): void {
  deck = createDeck();
}

export function getRandomCard(): string {
  if (deck.length === 0) deck = createDeck();
  return deck.pop() as string;
}