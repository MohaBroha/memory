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
      pairId: "target",
      asset: "/assets/components/games/cards/target.svg",
    },
    {
      pairId: "square",
      asset: "/assets/components/games/cards/square.svg",
    },
    {
      pairId: "triangle",
      asset: "/assets/components/games/cards/triangle.svg",
    },
    {
      pairId: "maze",
      asset: "/assets/components/games/cards/maze.svg",
    },
    {
      pairId: "minecraft",
      asset: "/assets/components/games/cards/minecraft.svg",
    },
    {
      pairId: "mushroom",
      asset: "/assets/components/games/cards/mushroom.svg",
    },
    {
      pairId: "dice",
      asset: "/assets/components/games/cards/dice.svg",
    },
    {
      pairId: "banana",
      asset: "/assets/components/games/cards/banana.svg",
    },
    {
      pairId: "controller",
      asset: "/assets/components/games/cards/controller.svg",
    },
    {
      pairId: "ghosts",
      asset: "/assets/components/games/cards/ghosts.svg",
    },
    {
      pairId: "star",
      asset: "/assets/components/games/cards/star.svg",
    },
    {
      pairId: "terminal",
      asset: "/assets/components/games/cards/terminal.svg",
    },
    {
      pairId: "level-up",
      asset: "/assets/components/games/cards/level-up.svg",
    },
    {
      pairId: "pacman",
      asset: "/assets/components/games/cards/pacman.svg",
    },
    {
      pairId: "gameboy",
      asset: "/assets/components/games/cards/gameboy.svg",
    },
    {
      pairId: "puzzle",
      asset: "/assets/components/games/cards/puzzle.svg",
    },
    {
      pairId: "playing-card",
      asset: "/assets/components/games/cards/playing-card.svg",
    },
    {
      pairId: "play-button",
      asset: "/assets/components/games/cards/play-button.svg",
    },
  ],

  "da-project": [
    {
      pairId: "ramen",
      asset: "/assets/components/da-project/cards/ramen.svg",
    },
    {
      pairId: "noodles",
      asset: "/assets/components/da-project/cards/noodles.svg",
    },
    {
      pairId: "eggs",
      asset: "/assets/components/da-project/cards/eggs.svg",
    },
    {
      pairId: "sakura",
      asset: "/assets/components/da-project/cards/sakura.svg",
    },
    {
      pairId: "javascript",
      asset: "/assets/components/da-project/cards/javascript-1.svg",
    },
    {
      pairId: "chef",
      asset: "/assets/components/da-project/cards/chef.svg",
    },
    {
      pairId: "leaf",
      asset: "/assets/components/da-project/cards/leaf.svg",
    },
    {
      pairId: "basket",
      asset: "/assets/components/da-project/cards/basket.svg",
    },
    {
      pairId: "pokeball",
      asset: "/assets/components/da-project/cards/pokeball.svg",
    },
    {
      pairId: "calculator",
      asset: "/assets/components/da-project/cards/calculator.svg",
    },
    {
      pairId: "smile",
      asset: "/assets/components/da-project/cards/smile.svg",
    },
    {
      pairId: "arrow",
      asset: "/assets/components/da-project/cards/arrow.svg",
    },
    {
      pairId: "arcade",
      asset: "/assets/components/da-project/cards/arcade.svg",
    },
    {
      pairId: "crown",
      asset: "/assets/components/da-project/cards/crown.svg",
    },
    {
      pairId: "broccoli",
      asset: "/assets/components/da-project/cards/broccoli.svg",
    },
    {
      pairId: "bubbles",
      asset: "/assets/components/da-project/cards/bubbles.svg",
    },
    {
      pairId: "wave",
      asset: "/assets/components/da-project/cards/wave.svg",
    },
    {
      pairId: "coins",
      asset: "/assets/components/da-project/cards/coins.svg",
    },
  ],

  food: [
    {
      pairId: "fries",
      asset: "/assets/components/food/cards/fries.svg",
    },
    {
      pairId: "pizza",
      asset: "/assets/components/food/cards/pizza.svg",
    },
    {
      pairId: "burger",
      asset: "/assets/components/food/cards/burger.svg",
    },
    {
      pairId: "donut",
      asset: "/assets/components/food/cards/donut.svg",
    },
    {
      pairId: "sushi",
      asset: "/assets/components/food/cards/sushi.svg",
    },
    {
      pairId: "candy",
      asset: "/assets/components/food/cards/candy.svg",
    },
    {
      pairId: "hamburger",
      asset: "/assets/components/food/cards/hamburger.svg",
    },
    {
      pairId: "pretzel",
      asset: "/assets/components/food/cards/pretzel.svg",
    },
    {
      pairId: "cupcake",
      asset: "/assets/components/food/cards/cupcake.svg",
    },
    {
      pairId: "pudding",
      asset: "/assets/components/food/cards/pudding.svg",
    },
    {
      pairId: "flan",
      asset: "/assets/components/food/cards/flan.svg",
    },
    {
      pairId: "chocolate",
      asset: "/assets/components/food/cards/chocolate.svg",
    },
    {
      pairId: "popcorn",
      asset: "/assets/components/food/cards/popcorn.svg",
    },
    {
      pairId: "fries-box",
      asset: "/assets/components/food/cards/fries-box.svg",
    },
    {
      pairId: "taco",
      asset: "/assets/components/food/cards/taco.svg",
    },
    {
      pairId: "ice-cream",
      asset: "/assets/components/food/cards/ice-cream.svg",
    },
    {
      pairId: "salad",
      asset: "/assets/components/food/cards/salad.svg",
    },
    {
      pairId: "macarons",
      asset: "/assets/components/food/cards/macarons.svg",
    },
  ],
};
