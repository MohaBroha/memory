import type { Card } from "../types/card.types";
import type { CardAsset } from "../data/cards.data";
import type { BoardSize, Theme } from "../types/settings.types";
import { CARD_ASSETS } from "../data/cards.data";
import type { Player } from "../types/game.types";

/** Returns the number of card pairs required for a board size. */
function getPairCount(boardSize: BoardSize): number {
  const pairCounts: Record<BoardSize, number> = {
    "4x4": 8,
    "4x6": 12,
    "6x6": 18,
  };
  return pairCounts[boardSize];
}

/** Returns a shuffled copy of the supplied cards. */
function shuffleCards(cards: Card[]): Card[] {
  const shuffledCards = [...cards];
  for (let index = shuffledCards.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledCards[index], shuffledCards[randomIndex]] = [
      shuffledCards[randomIndex],
      shuffledCards[index],
    ];
  }
  return shuffledCards;
}

/** Creates a shuffled board for the selected size and theme. */
export function createBoard(boardSize: BoardSize, theme: Theme): Card[] {
  const pairCount = getPairCount(boardSize);
  const availableAssets = CARD_ASSETS[theme];

  if (availableAssets.length < pairCount) {
    throw new Error(
      `Theme "${theme}" does not provide enough card assets for ${boardSize}.`,
    );
  }

  const selectedAssets = availableAssets.slice(0, pairCount);
  const cards = createCards(selectedAssets);

  return shuffleCards(cards);
}

/** Creates two card instances for each supplied card asset. */
function createCards(assets: CardAsset[]): Card[] {
  return assets.flatMap((asset, index) => [
    createCard(asset, index, "a"),
    createCard(asset, index, "b"),
  ]);
}

/** Creates one card instance for a card asset and pair position. */
function createCard(
  asset: CardAsset,
  index: number,
  suffix: "a" | "b",
): Card {
  return {
    id: `${asset.pairId}-${index}-${suffix}`,
    pairId: asset.pairId,
    asset: asset.asset,
    isFlipped: false,
    isMatched: false,
  };
}

/** Returns a copy of a card marked as flipped. */
export function flipCard(card: Card): Card {
  return {
    ...card,
    isFlipped: true,
  };
}

/** Returns copies of all cards with their flipped state cleared. */
export function unflipCards(cards: Card[]): Card[] {
  return cards.map((card) => ({
    ...card,
    isFlipped: false,
  }));
}

/** Checks whether two cards belong to the same pair. */
export function areCardsMatching(firstCard: Card, secondCard: Card): boolean {
  return firstCard.pairId === secondCard.pairId;
}

/** Returns copies of cards marked as matched. */
export function markCardsAsMatched(cards: Card[]): Card[] {
  return cards.map((card) => ({
    ...card,
    isMatched: true,
  }));
}

/** Flips the requested card when it is selectable. */
export function selectCard(cards: Card[], cardId: string): Card[] {
  return cards.map((card) => {
    if (card.id !== cardId || card.isFlipped || card.isMatched) {
      return card;
    }
    return flipCard(card);
  });
}

/** Returns all currently flipped and unmatched cards. */
export function getFlippedCards(cards: Card[]): Card[] {
  return cards.filter((card) => card.isFlipped && !card.isMatched);
}

/** Resolves the current pair by matching it or unflipping it. */
export function resolveFlippedCards(cards: Card[]): Card[] {
  const flippedCards = getFlippedCards(cards);
  if (flippedCards.length !== 2) {
    return cards;
  }
  const [firstCard, secondCard] = flippedCards;
  if (areCardsMatching(firstCard, secondCard)) {
    return cards.map((card) => {
      if (card.id === firstCard.id || card.id === secondCard.id) {
        return {
          ...card,
          isMatched: true,
        };
      }
      return card;
    });
  }
  return unflipCards(cards);
}

/** Checks whether every card on a non-empty board is matched. */
export function areAllCardsMatched(cards: Card[]): boolean {
  return cards.length > 0 && cards.every((card) => card.isMatched);
}

/** Returns the other player identifier. */
export function switchPlayer(player: Player): Player {
  return player === 1 ? 2 : 1;
}
