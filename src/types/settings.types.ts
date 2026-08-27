/** Identifies a supported game board size. */
export type BoardSize = "4x4" | "4x6" | "6x6";
/** Identifies a selectable player color. */
export type PlayerColor = "blue" | "red";
/** Identifies a supported visual theme. */
export type Theme = "coding-vibes" | "games" | "da-project" | "food";
/** Stores the settings used to start a game. */
export interface GameSettings {
  boardSize: BoardSize;
  playerColor: PlayerColor;
  theme: Theme;
}
