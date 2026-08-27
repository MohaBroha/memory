import type { Theme } from "../types/settings.types";

/** Defines the identifier and display name for a game theme. */
export interface ThemeConfig {
  id: Theme;
  name: string;
}

/** Provides the display configuration for all supported themes. */
export const THEMES_CONFIG: ThemeConfig[] = [
  {
    id: "coding-vibes",
    name: "Coding Vibes",
  },
  {
    id: "games",
    name: "Games",
  },
  {
    id: "da-project",
    name: "DA Project",
  },
  {
    id: "food",
    name: "Food",
  },
];
