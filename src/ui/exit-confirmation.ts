import type { Theme } from "../types/settings.types";
import { THEME_ASSETS } from "../data/theme-assets.data";

/** Creates the themed confirmation overlay shown when leaving a game. */
export function createExitConfirmationElement(
  onBack: () => void,
  onExit: () => void,
  theme: Theme,
): HTMLElement {
  const themeAssets = THEME_ASSETS[theme];
  const overlayElement = createOverlay(theme);
  const dialogElement = createDialog(theme, themeAssets, onBack, onExit);
  overlayElement.appendChild(dialogElement);
  addOverlayClickHandler(overlayElement, onBack);
  return overlayElement;
}

/** Creates the confirmation overlay container. */
function createOverlay(theme: Theme): HTMLDivElement {
  const overlayElement = document.createElement("div");
  overlayElement.classList.add("exit-confirmation");
  overlayElement.dataset.theme = theme;
  if (theme === "coding-vibes") {
    overlayElement.classList.add("exit-confirmation--coding-vibes");
  }
  return overlayElement;
}

/** Creates the confirmation dialog and its actions. */
function createDialog(
  theme: Theme,
  themeAssets: (typeof THEME_ASSETS)[Theme],
  onBack: () => void,
  onExit: () => void,
): HTMLDivElement {
  const dialogElement = document.createElement("div");
  const titleElement = createDialogTitle();
  const actionsElement = createDialogActions(
    theme,
    themeAssets,
    onBack,
    onExit,
  );
  dialogElement.classList.add("exit-confirmation__dialog");
  dialogElement.append(titleElement, actionsElement);
  return dialogElement;
}

/** Creates the confirmation dialog title. */
function createDialogTitle(): HTMLHeadingElement {
  const titleElement = document.createElement("h2");
  titleElement.classList.add("exit-confirmation__title");
  titleElement.textContent = "Are you sure you want to quit the game?";
  return titleElement;
}

/** Creates the dialog action buttons. */
function createDialogActions(
  theme: Theme,
  themeAssets: (typeof THEME_ASSETS)[Theme],
  onBack: () => void,
  onExit: () => void,
): HTMLDivElement {
  const actionsElement = document.createElement("div");
  const backButton = createBackButton(theme, themeAssets, onBack);
  const exitButton = createExitButton(theme, themeAssets, onExit);
  actionsElement.classList.add("exit-confirmation__actions");
  actionsElement.append(backButton, exitButton);
  return actionsElement;
}

/** Creates the button that dismisses the confirmation dialog. */
const BACK_BUTTON_LABELS = {
  "coding-vibes": "Back to game",
  games: "No, back to game",
  "da-project": "Back to game",
  food: "NO, BACK TO GAME",
} as const;

/** Creates the button that dismisses the confirmation dialog. */
function createBackButton(
  theme: Theme,
  themeAssets: (typeof THEME_ASSETS)[Theme],
  onBack: () => void,
): HTMLButtonElement {
  const backButton = document.createElement("button");
  backButton.type = "button";
  backButton.classList.add("exit-confirmation__back");
  backButton.setAttribute("aria-label", "Back to game");
  if (theme in BACK_BUTTON_LABELS) {
    backButton.textContent =
      BACK_BUTTON_LABELS[theme as keyof typeof BACK_BUTTON_LABELS];
  } else {
    setBackButtonAssets(backButton, themeAssets);
  }
  backButton.addEventListener("click", onBack);
  return backButton;
}

/** Sets the default and hover assets for themed back buttons. */
function setBackButtonAssets(
  button: HTMLButtonElement,
  themeAssets: (typeof THEME_ASSETS)[Theme],
): void {
  button.style.setProperty(
    "--popup-back-default",
    `url("${themeAssets.popupButton.backDefault}")`,
  );
  button.style.setProperty(
    "--popup-back-hover",
    `url("${themeAssets.popupButton.backHover}")`,
  );
}

/** Creates the button that exits the game. */
const EXIT_BUTTON_LABELS = {
  "coding-vibes": "Exit game",
  games: "Yes, quit game",
  "da-project": "Exit game",
  food: "EXIT GAME",
} as const;

/** Creates the button that exits the game. */
function createExitButton(
  theme: Theme,
  themeAssets: (typeof THEME_ASSETS)[Theme],
  onExit: () => void,
): HTMLButtonElement {
  const exitButton = document.createElement("button");
  exitButton.type = "button";
  exitButton.classList.add("exit-confirmation__exit");
  exitButton.setAttribute("aria-label", "Exit game");
  if (theme in EXIT_BUTTON_LABELS) {
    exitButton.textContent =
      EXIT_BUTTON_LABELS[theme as keyof typeof EXIT_BUTTON_LABELS];
  } else {
    setExitButtonAssets(exitButton, themeAssets);
  }
  exitButton.addEventListener("click", onExit);
  return exitButton;
}

/** Sets the default and hover assets for themed exit buttons. */
function setExitButtonAssets(
  button: HTMLButtonElement,
  themeAssets: (typeof THEME_ASSETS)[Theme],
): void {
  button.style.setProperty(
    "--popup-exit-default",
    `url("${themeAssets.popupButton.exitDefault}")`,
  );
  if (themeAssets.popupButton.exitHover) {
    button.style.setProperty(
      "--popup-exit-hover",
      `url("${themeAssets.popupButton.exitHover}")`,
    );
  }
}

/** Closes the overlay when its backdrop is clicked. */
function addOverlayClickHandler(
  overlayElement: HTMLElement,
  onBack: () => void,
): void {
  overlayElement.addEventListener("click", (event) => {
    if (event.target === overlayElement) {
      onBack();
    }
  });
}
