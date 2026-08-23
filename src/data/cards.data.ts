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

  games: [
    {
        pairId: 'target',
        asset: '/assets/components/games/cards/target.svg',
    },
    {
        pairId: 'square',
        asset: '/assets/components/games/cards/square.svg',
    },
    {
        pairId: 'triangle',
        asset: '/assets/components/games/cards/triangle.svg',
    },
    {
        pairId: 'maze',
        asset: '/assets/components/games/cards/maze.svg',
    },
    {
        pairId: 'minecraft',
        asset: '/assets/components/games/cards/minecraft.svg',
    },
    {
        pairId: 'mushroom',
        asset: '/assets/components/games/cards/mushroom.svg',
    },
    {
        pairId: 'dice',
        asset: '/assets/components/games/cards/dice.svg',
    },
    {
        pairId: 'banana',
        asset: '/assets/components/games/cards/banana.svg',
    },
    {
        pairId: 'controller',
        asset: '/assets/components/games/cards/controller.svg',
    },
    {
        pairId: 'ghosts',
        asset: '/assets/components/games/cards/ghosts.svg',
    },
    {
        pairId: 'star',
        asset: '/assets/components/games/cards/star.svg',
    },
    {
        pairId: 'terminal',
        asset: '/assets/components/games/cards/terminal.svg',
    },
    {
        pairId: 'level-up',
        asset: '/assets/components/games/cards/level-up.svg',
    },
    {
        pairId: 'pacman',
        asset: '/assets/components/games/cards/pacman.svg',
    },
    {
        pairId: 'gameboy',
        asset: '/assets/components/games/cards/gameboy.svg',
    },
    {
        pairId: 'puzzle',
        asset: '/assets/components/games/cards/puzzle.svg',
    },
    {
        pairId: 'playing-card',
        asset: '/assets/components/games/cards/playing-card.svg',
    },
    {
        pairId: 'play-button',
        asset: '/assets/components/games/cards/play-button.svg',
    },
],

  "da-project": [],

  food: [],
};
