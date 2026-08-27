import type { GameState } from "../types/game.types";
import type { GameSettings } from "../types/settings.types";
import { createInitialScores } from "./score";

const DEFAULT_SETTINGS: GameSettings = {
  boardSize: "4x4",
  playerColor: "blue",
  theme: "coding-vibes",
};

/** Creates an idle game state using the supplied or default settings. */
export function createInitialGameState(
  settings: GameSettings = DEFAULT_SETTINGS,
): GameState {
  return {
    settings,
    cards: [],
    currentPlayer: 1,
    scores: createInitialScores(),
    flippedCards: [],
    status: "idle",
  };
}
