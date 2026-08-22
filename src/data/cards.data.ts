import type { Theme } from "../types/settings.types";

export interface CardAsset {
  pairId: string;
  asset: string;
}

export const CARD_ASSETS: Record<Theme, CardAsset[]> = {
  "coding-vibes": [
    {
      pairId: "angular",
      asset: "/assets/components/coding-vibes/cards/angular.svg",
    },
    {
      pairId: "bootstrap",
      asset: "/assets/components/coding-vibes/cards/bootstrap.svg",
    },
    {
      pairId: "css",
      asset: "/assets/components/coding-vibes/cards/css.svg",
    },
    {
      pairId: "database",
      asset: "/assets/components/coding-vibes/cards/database.svg",
    },
    {
      pairId: "django",
      asset: "/assets/components/coding-vibes/cards/django.svg",
    },
    {
      pairId: "firebase",
      asset: "/assets/components/coding-vibes/cards/firebase.svg",
    },
    {
      pairId: "git",
      asset: "/assets/components/coding-vibes/cards/git.svg",
    },
    {
      pairId: "github",
      asset: "/assets/components/coding-vibes/cards/github.svg",
    },
    {
      pairId: "html",
      asset: "/assets/components/coding-vibes/cards/html.svg",
    },
    {
      pairId: "javascript",
      asset: "/assets/components/coding-vibes/cards/javascript.svg",
    },
    {
      pairId: "node",
      asset: "/assets/components/coding-vibes/cards/node.svg",
    },
    {
      pairId: "python",
      asset: "/assets/components/coding-vibes/cards/python.svg",
    },
    {
      pairId: "react",
      asset: "/assets/components/coding-vibes/cards/react.svg",
    },
    {
      pairId: "sass",
      asset: "/assets/components/coding-vibes/cards/sass.svg",
    },
    {
      pairId: "terminal",
      asset: "/assets/components/coding-vibes/cards/terminal.svg",
    },
    {
      pairId: "typescript",
      asset: "/assets/components/coding-vibes/cards/typescript.svg",
    },
    {
      pairId: "vscode",
      asset: "/assets/components/coding-vibes/cards/vscode.svg",
    },
    {
      pairId: "vue",
      asset: "/assets/components/coding-vibes/cards/vue.svg",
    },
  ],

  games: [],

  "da-project": [],

  food: [],
};
