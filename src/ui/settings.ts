import { createBoardElement } from "./board";
import { showView } from "./view";
import { createGameController } from "../game/game";

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
  titleElement.textContent = "Settings";

  const themeGroup = createThemeGroup();

  const themePreview = document.createElement("img");
  themePreview.classList.add("settings__theme-preview");
  themePreview.src =
    "/assets/components/settings/theme-visual/coding-vibes.svg";
  themePreview.alt = "Code vibes theme preview";

  const themeOptions =
    themeGroup.querySelectorAll<HTMLLabelElement>(".settings__option");

  themeOptions.forEach((option) => {
    const input = option.querySelector<HTMLInputElement>('input[name="theme"]');

    if (!input) {
      return;
    }

    option.addEventListener("mouseenter", () => {
      themeGroup.classList.add("is-hovering");

      const theme = input.value as Theme;

      themePreview.src = `/assets/components/settings/theme-visual/${theme}.svg`;

      themePreview.alt = `${getThemeLabel(theme)} preview`;
    });

    option.addEventListener("mouseleave", () => {
      themeGroup.classList.remove("is-hovering");

      if (selectedTheme === null) {
        return;
      }

      themePreview.src = `/assets/components/settings/theme-visual/${selectedTheme}.svg`;

      themePreview.alt = `${getThemeLabel(selectedTheme)} preview`;
    });
  });
  const playerGroup = createPlayerGroup();

  const boardSizeGroup = createBoardSizeGroup();

  const startButton = document.createElement("button");

  startButton.type = "button";
  startButton.classList.add("settings__start");

  startButton.textContent = "Start";

  startButton.disabled = true;

  const summaryElement = document.createElement("div");

  summaryElement.classList.add("settings__summary");

  const themeSummary = document.createElement("button");

  themeSummary.type = "button";
  themeSummary.classList.add("settings__summary-item");

  themeSummary.textContent = "Game theme";

  const themeSeparator = document.createElement("img");

  themeSeparator.classList.add("settings__summary-separator");

  themeSeparator.src = "/assets/components/settings/separator-default.svg";

  themeSeparator.alt = "";

  const playerSummary = document.createElement("button");

  playerSummary.type = "button";

  playerSummary.classList.add("settings__summary-item");

  playerSummary.textContent = "Player";

  const playerSeparator = document.createElement("img");

  playerSeparator.classList.add("settings__summary-separator");

  playerSeparator.src = "/assets/components/settings/separator-default.svg";

  playerSeparator.alt = "";

  const boardSizeSummary = document.createElement("button");

  boardSizeSummary.type = "button";

  boardSizeSummary.classList.add("settings__summary-item");

  boardSizeSummary.textContent = "Board size";

  summaryElement.append(
    themeSummary,
    themeSeparator,
    playerSummary,
    playerSeparator,
    boardSizeSummary,
    startButton,
  );

  summaryElement.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    const summaryItem = target.closest(".settings__summary-item");

    if (!summaryItem) {
      return;
    }

    const isOpen = summaryElement.classList.toggle("is-open");

    const separatorSource = isOpen
      ? "/assets/components/settings/separator-final.svg"
      : "/assets/components/settings/separator-default.svg";

    themeSeparator.src = separatorSource;
    playerSeparator.src = separatorSource;
  });

  settingsElement.append(
    titleElement,
    themeGroup,
    themePreview,
    playerGroup,
    boardSizeGroup,
    summaryElement,
  );

  const radioInputs = settingsElement.querySelectorAll<HTMLInputElement>(
    'input[type="radio"]',
  );

  radioInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.name === "theme") {
        selectedTheme = input.value as Theme;

        themePreview.src = `/assets/components/settings/theme-visual/${selectedTheme}.svg`;

        themePreview.alt = `${getThemeLabel(selectedTheme)} preview`;
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

  startButton.addEventListener("click", () => {
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

  const icon = document.createElement("img");
  icon.src = "/assets/icons/game-themes.svg";
  icon.alt = "";

  const text = document.createElement("span");
  text.textContent = "Game themes";

  legend.append(icon, text);

  group.appendChild(legend);

  THEMES.forEach((theme) => {
    group.appendChild(createThemeOption(theme));
  });

  return group;
}

function createThemeOption(theme: Theme): HTMLElement {
  const label = document.createElement("label");
  label.classList.add("settings__option");

  const input = document.createElement("input");
  input.type = "radio";
  input.name = "theme";
  input.value = theme;

  const text = document.createElement("span");
  text.textContent = getThemeLabel(theme);

  const indicator = document.createElement("img");
  indicator.classList.add("settings__indicator");
  indicator.src =
    "/assets/components/settings/radial-buttons/selected-indicator.svg";
  indicator.alt = "";
  label.classList.add("settings__option", "settings__theme-option");
  label.append(input, text, indicator);

  return label;
}

function createPlayerGroup(): HTMLElement {
  const group = document.createElement("fieldset");
  group.classList.add("settings__group");

  const legend = document.createElement("legend");

  const icon = document.createElement("img");
  icon.src = "/assets/icons/choose-player.svg";
  icon.alt = "";

  const text = document.createElement("span");
  text.textContent = "Choose player";

  legend.append(icon, text);

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

  const icon = document.createElement("img");
  icon.src = "/assets/icons/board-size.svg";
  icon.alt = "";

  const text = document.createElement("span");
  text.textContent = "Board size";

  legend.append(icon, text);

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

  const indicator = document.createElement("img");
  indicator.classList.add("settings__indicator");
  indicator.src =
    "/assets/components/settings/radial-buttons/selected-indicator.svg";
  indicator.alt = "";

  label.append(input, text, indicator);

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
