export interface Card {
    element: string;
    value?: number;
    special?: "storm" | "earthquake";
}

export const elements = ["air", "earth", "fire", "water"];

export function parseCard(cardName: string): Card {
    if (cardName === "storm.svg") return {
    special: "storm",
    element: ""
};
    if (cardName === "earthquake.svg") return {
    special: "earthquake",
    element: ""
};

    const [element, valueWithExt] = cardName.split("-");
    const value = parseInt(valueWithExt); 
    return { element, value };
}

export const elementBeats: Record<string, string> = {
    water: "fire",
    fire: "earth",
    earth: "air",
    air: "water" 
};

