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

const THEME_PREVIEW_PATH =
  "/assets/components/settings/theme-visual/";
const DEFAULT_SEPARATOR =
  "/assets/components/settings/separator-default.svg";
const OPEN_SEPARATOR =
  "/assets/components/settings/separator-final.svg";

/** Creates the settings view and wires its controls. */
export function createSettingsElement(): HTMLElement {
  const settingsElement = createSettingsContainer();
  const state = createSettingsState();
  const titleElement = createSettingsTitle();
  const themeGroup = createThemeGroup();
  const themePreview = createThemePreview();
  const playerGroup = createPlayerGroup();
  const boardSizeGroup = createBoardSizeGroup();
  const summaryElement = createSummary(state);
  settingsElement.append(
    titleElement,
    themeGroup,
    themePreview,
    playerGroup,
    boardSizeGroup,
    summaryElement,
  );
  setupThemePreview(themeGroup, themePreview, state);
  setupRadioInputs(settingsElement, state, themePreview, summaryElement);
  setupSettingsStart(summaryElement, state);
  return settingsElement;
}

/** Connects the settings start button to game creation. */
function setupSettingsStart(
  summaryElement: HTMLElement,
  state: ReturnType<typeof createSettingsState>,
): void {
  const startButton = summaryElement.querySelector<HTMLButtonElement>(
    ".settings__start",
  );
  if (startButton) {
    setupStartButton(startButton, state);
  }
}

/** Creates the root settings section. */
function createSettingsContainer(): HTMLElement {
  const settingsElement = document.createElement("section");
  settingsElement.id = "settings";
  settingsElement.classList.add("settings");
  return settingsElement;
}

/** Creates the mutable selection state for the settings view. */
function createSettingsState(): {
  selectedTheme: Theme | null;
  selectedPlayer: PlayerColor | null;
  selectedBoardSize: BoardSize | null;
} {
  return {
    selectedTheme: null,
    selectedPlayer: null,
    selectedBoardSize: null,
  };
}

/** Creates the settings heading. */
function createSettingsTitle(): HTMLHeadingElement {
  const titleElement = document.createElement("h1");
  titleElement.classList.add("settings__title");
  titleElement.textContent = "Settings";
  return titleElement;
}

/** Creates the theme preview image. */
function createThemePreview(): HTMLImageElement {
  const themePreview = document.createElement("img");
  themePreview.classList.add("settings__theme-preview");
  themePreview.src = `${THEME_PREVIEW_PATH}coding-vibes.svg`;
  themePreview.alt = "Code vibes theme preview";
  return themePreview;
}

/** Connects theme option hover behavior to the preview image. */
function setupThemePreview(
  themeGroup: HTMLElement,
  themePreview: HTMLImageElement,
  state: ReturnType<typeof createSettingsState>,
): void {
  const themeOptions =
    themeGroup.querySelectorAll<HTMLLabelElement>(".settings__option");
  themeOptions.forEach((option) => {
    const input = option.querySelector<HTMLInputElement>(
      'input[name="theme"]',
    );
    if (!input) {
      return;
    }
    setupThemeOptionHover(option, input, themeGroup, themePreview, state);
  });
}

/** Adds hover behavior for one theme option. */
function setupThemeOptionHover(
  option: HTMLLabelElement,
  input: HTMLInputElement,
  themeGroup: HTMLElement,
  themePreview: HTMLImageElement,
  state: ReturnType<typeof createSettingsState>,
): void {
  option.addEventListener("mouseenter", () => {
    themeGroup.classList.add("is-hovering");
    updateThemePreview(themePreview, input.value as Theme);
  });
  option.addEventListener("mouseleave", () => {
    themeGroup.classList.remove("is-hovering");

    if (state.selectedTheme === null) {
      return;
    }
    updateThemePreview(themePreview, state.selectedTheme);
  });
}

/** Creates the settings summary and start button. */
function createSummary(
  state: ReturnType<typeof createSettingsState>,
): HTMLDivElement {
  const summaryElement = document.createElement("div");
  const themeSummary = createSummaryItem("Game theme");
  const themeSeparator = createSeparator();
  const playerSummary = createSummaryItem("Player");
  const playerSeparator = createSeparator();
  const boardSizeSummary = createSummaryItem("Board size");
  const startButton = createStartButton();
  summaryElement.classList.add("settings__summary");
  summaryElement.append(
    themeSummary,
    themeSeparator,
    playerSummary,
    playerSeparator,
    boardSizeSummary,
    startButton,
  );
  setupSummaryToggle(
    summaryElement,
    themeSeparator,
    playerSeparator,
    state,
  );
  return summaryElement;
}

/** Creates one summary navigation button. */
function createSummaryItem(text: string): HTMLButtonElement {
  const summaryItem = document.createElement("button");
  summaryItem.type = "button";
  summaryItem.classList.add("settings__summary-item");
  summaryItem.textContent = text;
  return summaryItem;
}

/** Creates a summary separator image. */
function createSeparator(): HTMLImageElement {
  const separator = document.createElement("img");
  separator.classList.add("settings__summary-separator");
  separator.src = DEFAULT_SEPARATOR;
  separator.alt = "";
  return separator;
}

/** Creates the disabled settings start button. */
function createStartButton(): HTMLButtonElement {
  const startButton = document.createElement("button");
  startButton.type = "button";
  startButton.classList.add("settings__start");
  startButton.textContent = "Start";
  startButton.disabled = true;
  return startButton;
}

/** Adds the summary expansion toggle behavior. */
function setupSummaryToggle(summaryElement: HTMLElement, themeSeparator: HTMLImageElement, 
    playerSeparator: HTMLImageElement, state: ReturnType<typeof createSettingsState>): 
    void {
    summaryElement.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".settings__summary-item")) return;
    summaryElement.classList.toggle("is-open");
    const allSelected = state.selectedTheme !== null &&
      state.selectedPlayer !== null && state.selectedBoardSize !== null;
    const separatorSource = allSelected ? OPEN_SEPARATOR : DEFAULT_SEPARATOR;
    themeSeparator.src = separatorSource;
    playerSeparator.src = separatorSource;
  });
}

/** Connects all settings radio inputs to state updates. */
function setupRadioInputs(
  settingsElement: HTMLElement,
  state: ReturnType<typeof createSettingsState>,
  themePreview: HTMLImageElement,
  summaryElement: HTMLElement,
): void {
  const radioInputs = settingsElement.querySelectorAll<HTMLInputElement>(
    'input[type="radio"]',
  );
  radioInputs.forEach((input) => {
input.addEventListener("change", () => {
  updateSelectedSetting(input, state, themePreview);
  updateSummary(summaryElement, state);
  updateStartButton(summaryElement, state);
  updateSummarySeparators(summaryElement, state);
});
  });
}

/** Updates the summary separators based on the current selection state. */
function updateSummarySeparators(summaryElement: HTMLElement, state: ReturnType<typeof createSettingsState>): void {
  const source = state.selectedTheme && state.selectedPlayer && state.selectedBoardSize
    ? OPEN_SEPARATOR : DEFAULT_SEPARATOR;
  summaryElement.querySelectorAll<HTMLImageElement>(".settings__summary-separator").forEach((separator) => separator.src = source);
}

/** Updates one selected setting from a radio input. */
function updateSelectedSetting(
  input: HTMLInputElement,
  state: ReturnType<typeof createSettingsState>,
  themePreview: HTMLImageElement,
): void {
  if (input.name === "theme") {
    state.selectedTheme = input.value as Theme;
    updateThemePreview(themePreview, state.selectedTheme);
  }
  if (input.name === "player") {
    state.selectedPlayer = input.value as PlayerColor;
  }
  if (input.name === "board-size") {
    state.selectedBoardSize = input.value as BoardSize;
  }
}

function updateSummary(
  summaryElement: HTMLElement,
  state: ReturnType<typeof createSettingsState>,
): void {
  const summaryItems =
    summaryElement.querySelectorAll<HTMLButtonElement>(
      ".settings__summary-item",
    );
  if (summaryItems.length !== 3) {
    return;
  }
  summaryItems[0].textContent = state.selectedTheme
    ? getThemeLabel(state.selectedTheme).replace(" theme", "")
    : "Game theme";
  summaryItems[1].textContent = state.selectedPlayer
    ? getPlayerLabel(state.selectedPlayer)
    : "Player";
  summaryItems[2].textContent = state.selectedBoardSize
    ? getBoardSizeLabel(state.selectedBoardSize)
    : "Board size";
}

/** Updates the theme preview image and alternative text. */
function updateThemePreview(
  themePreview: HTMLImageElement,
  theme: Theme,
): void {
  themePreview.src = `${THEME_PREVIEW_PATH}${theme}.svg`;
  themePreview.alt = `${getThemeLabel(theme)} preview`;
}

/** Updates whether the start button is enabled. */
function updateStartButton(
  summaryElement: HTMLElement,
  state: ReturnType<typeof createSettingsState>,
): void {
  const startButton = summaryElement.querySelector<HTMLButtonElement>(
    ".settings__start",
  );
  if (startButton) {
    startButton.disabled = !hasCompleteSettings(state);
  }
}

/** Checks whether all required settings have been selected. */
function hasCompleteSettings(
  state: ReturnType<typeof createSettingsState>,
): boolean {
  return (
    state.selectedTheme !== null &&
    state.selectedPlayer !== null &&
    state.selectedBoardSize !== null
  );
}

/** Builds game settings when all selections are complete. */
function createGameSettings(
  state: ReturnType<typeof createSettingsState>,
): GameSettings | null {
  if (!hasCompleteSettings(state)) {
    return null;
  }
  return {
    theme: state.selectedTheme as Theme,
    playerColor: state.selectedPlayer as PlayerColor,
    boardSize: state.selectedBoardSize as BoardSize,
  };
}

/** Connects the start button to the selected game settings. */
function setupStartButton(
  startButton: HTMLButtonElement,
  state: ReturnType<typeof createSettingsState>,
): void {
  startButton.addEventListener("click", () => {
    const settings = createGameSettings(state);
    if (!settings) {
      return;
    }
    const gameController = createGameController(settings);
    showView(createBoardElement(gameController));
  });
}

/** Creates the theme selection group. */
function createThemeGroup(): HTMLElement {
  const group = document.createElement("fieldset");
  group.classList.add("settings__group");
  const legend = createGroupLegend(
    "/assets/icons/game-themes.svg",
    "Game themes",
  );
  group.appendChild(legend);
  THEMES.forEach((theme) => {
    group.appendChild(createThemeOption(theme));
  });
  return group;
}

/** Creates one theme radio option. */
function createThemeOption(theme: Theme): HTMLElement {
  const label = document.createElement("label");
  const input = document.createElement("input");
  const text = document.createElement("span");
  const indicator = createRadioIndicator();
  label.classList.add(
    "settings__option",
    "settings__theme-option",
  );
  input.type = "radio";
  input.name = "theme";
  input.value = theme;
  text.textContent = getThemeLabel(theme);
  label.append(input, text, indicator);
  return label;
}

/** Creates the player color selection group. */
function createPlayerGroup(): HTMLElement {
  return createOptionGroup(
    "/assets/icons/choose-player.svg",
    "Choose player",
    PLAYER_COLORS.map((playerColor) =>
      createRadioOption<PlayerColor>(
        "player",
        playerColor,
        getPlayerLabel(playerColor),
      ),
    ),
  );
}

/** Creates the board size selection group. */
function createBoardSizeGroup(): HTMLElement {
  return createOptionGroup(
    "/assets/icons/board-size.svg",
    "Board size",
    BOARD_SIZES.map((boardSize) =>
      createRadioOption<BoardSize>(
        "board-size",
        boardSize,
        getBoardSizeLabel(boardSize),
      ),
    ),
  );
}

/** Creates a labeled group of radio options. */
function createOptionGroup(
  iconSrc: string,
  title: string,
  options: HTMLElement[],
): HTMLElement {
  const group = document.createElement("fieldset");
  const legend = createGroupLegend(iconSrc, title);
  group.classList.add("settings__group");
  group.append(legend, ...options);
  return group;
}

/** Creates a fieldset legend with an icon and title. */
function createGroupLegend(
  iconSrc: string,
  title: string,
): HTMLLegendElement {
  const legend = document.createElement("legend");
  const icon = document.createElement("img");
  const text = document.createElement("span");
  icon.src = iconSrc;
  icon.alt = "";
  text.textContent = title;
  legend.append(icon, text);
  return legend;
}

/** Creates a generic radio option. */
function createRadioOption<T extends string>(
  name: string,
  value: T,
  labelText: string,
): HTMLElement {
  const label = document.createElement("label");
  const input = document.createElement("input");
  const text = document.createElement("span");
  const indicator = createRadioIndicator();
  label.classList.add("settings__option");
  input.type = "radio";
  input.name = name;
  input.value = value;
  text.textContent = labelText;
  label.append(input, text, indicator);
  return label;
}

/** Creates the selection indicator image. */
function createRadioIndicator(): HTMLImageElement {
  const indicator = document.createElement("img");
  indicator.classList.add("settings__indicator");
  indicator.src =
    "/assets/components/settings/radial-buttons/selected-indicator.svg";
  indicator.alt = "";
  return indicator;
}

/** Returns the display label for a theme. */
function getThemeLabel(theme: Theme): string {
  const labels: Record<Theme, string> = {
    "coding-vibes": "Code vibes theme",
    games: "Gaming theme",
    "da-project": "DA Projects theme",
    food: "Foods theme",
  };
  return labels[theme];
}

/** Returns the display label for a player color. */
function getPlayerLabel(playerColor: PlayerColor): string {
  const labels: Record<PlayerColor, string> = {
    blue: "Blue player",
    red: "Orange player",
  };
  return labels[playerColor];
}

/** Returns the display label for a board size. */
function getBoardSizeLabel(boardSize: BoardSize): string {
  const labels: Record<BoardSize, string> = {
    "4x4": "16 Cards",
    "4x6": "24 Cards",
    "6x6": "36 Cards",
  };
  return labels[boardSize];
}