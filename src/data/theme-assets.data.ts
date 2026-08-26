import type { Theme } from "../types/settings.types";

export interface GameOverAssets {
  blueWinner?: string;
  orangeWinner?: string;
  winner?: string;
  draw: string;
  homeButton?: string;
}

export interface ThemeAssets {
  calculator: {
    blue: string;
    orange: string;
  };

  exitButton: {
    default: string;
    hover: string;
  };

  popupButton: {
    backDefault: string;
    backHover: string;
    exitDefault: string;
    exitHover?: string;
    border?: string;
  };

  gameOver: GameOverAssets;
}

export const THEME_ASSETS: Record<Theme, ThemeAssets> = {
  "coding-vibes": {
    calculator: {
      blue: "/assets/components/coding-vibes/calculator/blue.svg",
      orange: "/assets/components/coding-vibes/calculator/orange.svg",
    },

    exitButton: {
      default:
        "/assets/components/coding-vibes/buttons/exit-button/default.exit.svg",
      hover:
        "/assets/components/coding-vibes/buttons/exit-button/hover.exit.svg",
    },

    popupButton: {
      backDefault:
        "/assets/components/coding-vibes/buttons/pop-up-button/hover.default.svg",
      backHover:
        "/assets/components/coding-vibes/buttons/pop-up-button/hover.back.svg",
      exitDefault:
        "/assets/components/coding-vibes/buttons/pop-up-button/default.back (2).svg",
    },

    gameOver: {
      blueWinner: "/assets/components/coding-vibes/blue.winner.svg",
      orangeWinner: "/assets/components/coding-vibes/orange.winner.svg",
      draw: "/assets/components/coding-vibes/draw.icons.svg",
      homeButton: "/assets/components/coding-vibes/back-btn.svg",
    },
  },

  games: {
    calculator: {
      blue: "/assets/components/games/calculator/blue-1.svg",
      orange: "/assets/components/games/calculator/orange-1.svg",
    },

    exitButton: {
      default: "/assets/components/games/buttons/exit-button/default.svg",
      hover: "/assets/components/games/buttons/exit-button/hover.svg",
    },

    popupButton: {
      backDefault:
        "/assets/components/games/buttons/pop-up-button/default-1.svg",
      backHover: "/assets/components/games/buttons/pop-up-button/hover-1.svg",
      exitDefault:
        "/assets/components/games/buttons/pop-up-button/exit-game.svg",
      exitHover: "/assets/components/games/buttons/pop-up-button/hover-1.svg",
    },

    gameOver: {
      winner: "/assets/components/games/cup-winner.svg",
      draw: "/assets/components/games/draw.icons-1.svg",
      homeButton: "/assets/components/games/home-btn.svg",
    },
  },

  "da-project": {
    calculator: {
      blue: "/assets/components/da-project/calculator/blue-1.svg",
      orange: "/assets/components/da-project/calculator/orange-1.svg",
    },

    popupButton: {
      backDefault:
        "/assets/components/da-project/buttons/pop-up-button/default-4.svg",
      backHover:
        "/assets/components/da-project/buttons/pop-up-button/hover-4.svg",
      exitDefault:
        "/assets/components/da-project/buttons/pop-up-button/back.default.svg",
      exitHover:
        "/assets/components/da-project/buttons/pop-up-button/back.hover.svg",
    },

    exitButton: {
      default:
        "/assets/components/da-project/buttons/exit-button/default-3.svg",
      hover: "/assets/components/da-project/buttons/exit-button/hover-3.svg",
    },

    gameOver: {
      blueWinner: "/assets/components/da-project/blue-winner.svg",
      orangeWinner: "/assets/components/da-project/orange-winner.svg",
      draw: "/assets/components/da-project/draw.icons-2.svg",
      homeButton: "/assets/components/da-project/home-btn-1.svg",
    },
  },

  food: {
    calculator: {
      blue: "/assets/components/food/calculator/blue-1.svg",
      orange: "/assets/components/food/calculator/orange-1.svg",
    },

    exitButton: {
      default: "/assets/components/food/buttons/exit-button/default-5.svg",
      hover: "/assets/components/food/buttons/exit-button/hover-5.svg",
    },

    popupButton: {
      backDefault:
        "/assets/components/food/buttons/pop-up-button/default-6.svg",
      backHover: "/assets/components/food/buttons/pop-up-button/hover-6.svg",
      exitDefault:
        "/assets/components/food/buttons/pop-up-button/exit.food.svg",
      exitHover: "/assets/components/food/buttons/pop-up-button/hover-6.svg",
      border: "/assets/components/food/buttons/pop-up-button/border.svg",
    },

    gameOver: {
      blueWinner: "/assets/components/food/blue-winner-1.svg",
      orangeWinner: "/assets/components/food/orange-winner-1.svg",
      draw: "/assets/components/food/draw-icons-3.svg",
      homeButton: "/assets/components/food/button Pop up_04.svg",
    },
  },
};
