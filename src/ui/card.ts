import type { Card } from "../types/card.types";
import type { Theme } from "../types/settings.types";

const CARD_BACK_ASSETS: Record<Theme, string> = {
  "coding-vibes": "/assets/components/coding-vibes/cards/card-back.svg",
  games: "/assets/components/games/cards/card-back (2).svg",
  "da-project": "/assets/components/da-project/cards/card-back-3.svg",
  food: "/assets/components/food/cards/card-back-5.svg",
};

/** Creates the DOM element for a card and applies its current state classes. */
export function createCardElement(
  card: Card,
  theme: Theme,
): HTMLButtonElement {
  const cardElement = document.createElement("button");
  cardElement.type = "button";
  cardElement.classList.add("card");
  cardElement.classList.toggle("card--da-project", theme === "da-project");
  const cardInner = createCardInner(card, theme);
  cardElement.appendChild(cardInner);
  setCardState(cardElement, card);
  cardElement.dataset.cardId = card.id;
  return cardElement;
}

/** Creates the inner element containing both faces of a card. */
function createCardInner(card: Card, theme: Theme): HTMLDivElement {
  const cardInner = document.createElement("div");
  const cardFront = createCardFace("front", CARD_BACK_ASSETS[theme]);
  const cardBack = createCardFace("back", card.asset);
  cardInner.classList.add("card__inner");
  cardInner.append(cardFront, cardBack);
  return cardInner;
}

/** Creates one card face with its image. */
function createCardFace(
  face: "front" | "back",
  imageSrc: string,
): HTMLDivElement {
  const cardFace = document.createElement("div");
  const image = document.createElement("img");
  cardFace.classList.add("card__face", `card__face--${face}`);
  image.src = imageSrc;
  image.alt = "";
  image.classList.add("card__image");
  cardFace.appendChild(image);
  return cardFace;
}

/** Applies flipped and matched state classes to a card element. */
function setCardState(
  cardElement: HTMLButtonElement,
  card: Card,
): void {
  if (card.isFlipped || card.isMatched) {
    cardElement.classList.add("is-flipped");
  }
  if (card.isMatched) {
    cardElement.classList.add("is-matched");
  }
}
