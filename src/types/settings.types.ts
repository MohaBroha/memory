export type BoardSize = "4x4" | "4x6" | "6x6";

export type PlayerColor = "blue" | "red";

export type Theme = "coding-vibes" | "games" | "da-project" | "food";

export interface GameSettings {
  boardSize: BoardSize;
  playerColor: PlayerColor;
  theme: Theme;
}
