import type { Card } from "./card.types";
import type { GameSettings } from "./settings.types";

/** Identifies one of the two players. */
export type Player = 1 | 2;
/** Describes the current lifecycle state of a game. */
export type GameStatus = "idle" | "playing" | "finished";
/** Stores the points earned by one player. */
export interface PlayerScore {
  player: Player;
  points: number;
}

/** Represents the complete state of a memory game. */
export interface GameState {
  settings: GameSettings;
  cards: Card[];
  currentPlayer: Player;
  scores: PlayerScore[];
  flippedCards: Card[];
  status: GameStatus;
}
