import type { Card } from "../types/card.types";

const CARD_BACK_ASSET = "/assets/components/coding-vibes/cards/card-back.svg";

export function createCardElement(card: Card): HTMLButtonElement {
  const cardElement = document.createElement("button");
  const cardInner = document.createElement("div");
  const cardFront = document.createElement("div");
  const cardBack = document.createElement("div");

  const frontImage = document.createElement("img");
  const backImage = document.createElement("img");

  cardElement.type = "button";

  cardElement.classList.add("card");
  cardInner.classList.add("card__inner");

  cardFront.classList.add("card__face", "card__face--front");

  cardBack.classList.add("card__face", "card__face--back");

  frontImage.src = CARD_BACK_ASSET;
  frontImage.alt = "";
  frontImage.classList.add("card__image");

  backImage.src = card.asset;
  backImage.alt = "";
  backImage.classList.add("card__image");

  cardFront.appendChild(frontImage);
  cardBack.appendChild(backImage);

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);

  cardElement.appendChild(cardInner);

  if (card.isFlipped || card.isMatched) {
    cardElement.classList.add("is-flipped");
  }

  if (card.isMatched) {
    cardElement.classList.add("is-matched");
  }

  cardElement.dataset.cardId = card.id;

  return cardElement;
}
