import { createBoardElement } from "./board";
import { showView } from "./view";
import { createGameController } from '../game/game';

import { BOARD_SIZES, PLAYER_COLORS, THEMES } from "../data/game-settings.data";
import type {
  BoardSize,
  PlayerColor,
  Theme,
  GameSettings,
} from "../types/settings.types";



export function createSettingsElement(): HTMLElement {
  const settingsElement = document.createElement("section");

  let selectedTheme: Theme | null = null;
  let selectedPlayer: PlayerColor | null = null;
  let selectedBoardSize: BoardSize | null = null;

  settingsElement.id = "settings";
  settingsElement.classList.add("settings");

  const titleElement = document.createElement("h1");
  titleElement.classList.add("settings__title");
  titleElement.textContent = "Game settings";

  const themeGroup = createThemeGroup();
  const playerGroup = createPlayerGroup();
  const boardSizeGroup = createBoardSizeGroup();

  const startButton = document.createElement("button");
  startButton.type = "button";
  startButton.classList.add("settings__start");
  startButton.textContent = "Start";
  startButton.disabled = true;

  settingsElement.append(
    titleElement,
    themeGroup,
    playerGroup,
    boardSizeGroup,
    startButton,
  );

  const radioInputs = settingsElement.querySelectorAll<HTMLInputElement>(
    'input[type="radio"]',
  );

  radioInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.name === "theme") {
        selectedTheme = input.value as Theme;
      }

      if (input.name === "player") {
        selectedPlayer = input.value as PlayerColor;
      }

      if (input.name === "board-size") {
        selectedBoardSize = input.value as BoardSize;
      }

      startButton.disabled = !hasCompleteSettings();
    });
  });

  function hasCompleteSettings(): boolean {
    return (
      selectedTheme !== null &&
      selectedPlayer !== null &&
      selectedBoardSize !== null
    );
  }

  function createGameSettings(): GameSettings | null {
    if (!hasCompleteSettings()) {
      return null;
    }

    return {
      theme: selectedTheme as Theme,
      playerColor: selectedPlayer as PlayerColor,
      boardSize: selectedBoardSize as BoardSize,
    };
  }

  startButton.addEventListener('click', () => {
    const settings = createGameSettings();

    if (!settings) {
        return;
    }

    const gameController = createGameController(settings);

    showView(createBoardElement(gameController));
});

  return settingsElement;
}

function createThemeGroup(): HTMLElement {
  const group = document.createElement("fieldset");
  group.classList.add("settings__group");

  const legend = document.createElement("legend");
  legend.textContent = "Game themes";

  group.appendChild(legend);

  THEMES.forEach((theme) => {
    group.appendChild(
      createRadioOption<Theme>("theme", theme, getThemeLabel(theme)),
    );
  });

  return group;
}

function createPlayerGroup(): HTMLElement {
  const group = document.createElement("fieldset");
  group.classList.add("settings__group");

  const legend = document.createElement("legend");
  legend.textContent = "Player";

  group.appendChild(legend);

  PLAYER_COLORS.forEach((playerColor) => {
    group.appendChild(
      createRadioOption<PlayerColor>(
        "player",
        playerColor,
        getPlayerLabel(playerColor),
      ),
    );
  });

  return group;
}

function createBoardSizeGroup(): HTMLElement {
  const group = document.createElement("fieldset");
  group.classList.add("settings__group");

  const legend = document.createElement("legend");
  legend.textContent = "Board size";

  group.appendChild(legend);

  BOARD_SIZES.forEach((boardSize) => {
    group.appendChild(
      createRadioOption<BoardSize>(
        "board-size",
        boardSize,
        getBoardSizeLabel(boardSize),
      ),
    );
  });

  return group;
}

function createRadioOption<T extends string>(
  name: string,
  value: T,
  labelText: string,
): HTMLElement {
  const label = document.createElement("label");
  label.classList.add("settings__option");

  const input = document.createElement("input");

  input.type = "radio";
  input.name = name;
  input.value = value;

  const text = document.createElement("span");
  text.textContent = labelText;

  label.append(input, text);

  return label;
}

function getThemeLabel(theme: Theme): string {
  const labels: Record<Theme, string> = {
    "coding-vibes": "Code vibes theme",
    games: "Gaming theme",
    "da-project": "DA Projects theme",
    food: "Foods theme",
  };

  return labels[theme];
}

function getPlayerLabel(playerColor: PlayerColor): string {
  const labels: Record<PlayerColor, string> = {
    blue: "Blue player",
    red: "Orange player",
  };

  return labels[playerColor];
}

function getBoardSizeLabel(boardSize: BoardSize): string {
  const labels: Record<BoardSize, string> = {
    "4x4": "16 Cards",
    "4x6": "24 Cards",
    "6x6": "36 Cards",
  };

  return labels[boardSize];
}
