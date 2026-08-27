import type { GameState } from "../types/game.types";
import type { GameSettings } from "../types/settings.types";
import {
  areAllCardsMatched,
  createBoard,
  getFlippedCards,
  resolveFlippedCards,
  selectCard,
  switchPlayer,
  unflipCards,
} from "./game-logic";
import { createInitialGameState } from "./game-state";
import { addPoint } from "./score";

/** Starts a new game with a generated board and playing status. */
export function startGame(settings: GameSettings): GameState {
  const gameState = createInitialGameState(settings);
  return {
    ...gameState,
    cards: createBoard(settings.boardSize, settings.theme),
    status: "playing",
  };
}

/** Selects a card when the current game state allows the selection. */
export function selectGameCard(
  gameState: GameState,
  cardId: string,
): GameState {
  if (gameState.status !== "playing") {
    return gameState;
  }
  const flippedCards = getFlippedCards(gameState.cards);
  if (flippedCards.length >= 2) {
    return gameState;
  }
  const cards = selectCard(gameState.cards, cardId);
  const selectedCards = getFlippedCards(cards);
  const updatedState: GameState = {
    ...gameState,
    cards,
    flippedCards: selectedCards,
  };
  return updatedState;
}

/** Resolves the two currently flipped cards and updates the game state. */
export function resolveTurn(gameState: GameState): GameState {
  const flippedCards = getFlippedCards(gameState.cards);
  if (flippedCards.length !== 2) {
    return gameState;
  }
  const [firstCard, secondCard] = flippedCards;
  if (firstCard.pairId === secondCard.pairId) {
    const matchedCards = resolveFlippedCards(gameState.cards);
    const updatedState: GameState = {
      ...gameState,
      cards: matchedCards,
      flippedCards: [],
      scores: addPoint(gameState.scores, gameState.currentPlayer),
    };
    if (areAllCardsMatched(matchedCards)) {
      return {
        ...updatedState,
        status: "finished",
      };
    }
    return updatedState;
  }
  return {
    ...gameState,
    cards: unflipCards(gameState.cards),
    flippedCards: [],
    currentPlayer: switchPlayer(gameState.currentPlayer),
  };
}

/** Creates a controller that manages the mutable state of one game. */
export function createGameController(settings: GameSettings): {
  getState: () => GameState;
  selectCard: (cardId: string) => GameState;
  resolveTurn: () => GameState;
} {
  let gameState = startGame(settings);
  return {
    getState: () => gameState,
    selectCard: (cardId: string): GameState => {
      gameState = selectGameCard(gameState, cardId);
      return gameState;
    },
    resolveTurn: (): GameState => {
      gameState = resolveTurn(gameState);
      return gameState;
    },
  };
}
