import type { Card } from "./card.types";
import type { GameSettings } from "./settings.types";

export type Player = 1 | 2;

export type GameStatus = "idle" | "playing" | "finished";

export interface PlayerScore {
  player: Player;
  points: number;
}

export interface GameState {
  settings: GameSettings;
  cards: Card[];
  currentPlayer: Player;
  scores: PlayerScore[];
  flippedCards: Card[];
  status: GameStatus;
}
