import type { Card } from "../types/card.types";
import type { BoardSize, Theme } from "../types/settings.types";
import { CARD_ASSETS } from "../data/cards.data";
import type { Player } from "../types/game.types";

function getPairCount(boardSize: BoardSize): number {
  const pairCounts: Record<BoardSize, number> = {
    "4x4": 8,
    "4x6": 12,
    "6x6": 18,
  };

  return pairCounts[boardSize];
}

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

export function createBoard(boardSize: BoardSize, theme: Theme): Card[] {
  const pairCount = getPairCount(boardSize);
  const availableAssets = CARD_ASSETS[theme];

  if (availableAssets.length < pairCount) {
    throw new Error(
      `Theme "${theme}" does not provide enough card assets for ${boardSize}.`,
    );
  }

  const selectedAssets = availableAssets.slice(0, pairCount);

  const cards: Card[] = selectedAssets.flatMap((asset, index) => [
    {
      id: `${asset.pairId}-${index}-a`,
      pairId: asset.pairId,
      asset: asset.asset,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: `${asset.pairId}-${index}-b`,
      pairId: asset.pairId,
      asset: asset.asset,
      isFlipped: false,
      isMatched: false,
    },
  ]);

  return shuffleCards(cards);
}

export function flipCard(card: Card): Card {
  return {
    ...card,
    isFlipped: true,
  };
}

export function unflipCards(cards: Card[]): Card[] {
  return cards.map((card) => ({
    ...card,
    isFlipped: false,
  }));
}

export function areCardsMatching(firstCard: Card, secondCard: Card): boolean {
  return firstCard.pairId === secondCard.pairId;
}

export function markCardsAsMatched(cards: Card[]): Card[] {
  return cards.map((card) => ({
    ...card,
    isMatched: true,
  }));
}

export function selectCard(cards: Card[], cardId: string): Card[] {
  return cards.map((card) => {
    if (card.id !== cardId || card.isFlipped || card.isMatched) {
      return card;
    }

    return flipCard(card);
  });
}

export function getFlippedCards(cards: Card[]): Card[] {
  return cards.filter((card) => card.isFlipped && !card.isMatched);
}

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

export function areAllCardsMatched(cards: Card[]): boolean {
  return cards.length > 0 && cards.every((card) => card.isMatched);
}

export function switchPlayer(player: Player): Player {
  return player === 1 ? 2 : 1;
}
