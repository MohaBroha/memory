import type { Theme } from "../types/settings.types";

export interface ThemeConfig {
  id: Theme;
  name: string;
}

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
