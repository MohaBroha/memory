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
  const dialogElement = createDialog(themeAssets, onBack, onExit);
  overlayElement.appendChild(dialogElement);
  addOverlayClickHandler(overlayElement, onBack);
  return overlayElement;
}

/** Creates the confirmation overlay container. */
function createOverlay(theme: Theme): HTMLDivElement {
  const overlayElement = document.createElement("div");
  overlayElement.classList.add("exit-confirmation");
  overlayElement.dataset.theme = theme;
  return overlayElement;
}

/** Creates the confirmation dialog and its actions. */
function createDialog(
  themeAssets: typeof THEME_ASSETS[Theme],
  onBack: () => void,
  onExit: () => void,
): HTMLDivElement {
  const dialogElement = document.createElement("div");
  const titleElement = createDialogTitle();
  const actionsElement = createDialogActions(themeAssets, onBack, onExit);
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
  themeAssets: typeof THEME_ASSETS[Theme],
  onBack: () => void,
  onExit: () => void,
): HTMLDivElement {
  const actionsElement = document.createElement("div");
  const backButton = createBackButton(themeAssets, onBack);
  const exitButton = createExitButton(themeAssets, onExit);
  actionsElement.classList.add("exit-confirmation__actions");
  actionsElement.append(backButton, exitButton);
  return actionsElement;
}

/** Creates the button that dismisses the confirmation dialog. */
function createBackButton(
  themeAssets: typeof THEME_ASSETS[Theme],
  onBack: () => void,
): HTMLButtonElement {
  const backButton = document.createElement("button");
  backButton.type = "button";
  backButton.classList.add("exit-confirmation__back");
  backButton.setAttribute("aria-label", "Back to game");
  backButton.style.setProperty(
    "--popup-back-default",
    `url("${themeAssets.popupButton.backDefault}")`,
  );
  backButton.style.setProperty(
    "--popup-back-hover",
    `url("${themeAssets.popupButton.backHover}")`,
  );
  backButton.addEventListener("click", onBack);
  return backButton;
}

/** Creates the button that exits the game. */
function createExitButton(
  themeAssets: typeof THEME_ASSETS[Theme],
  onExit: () => void,
): HTMLButtonElement {
  const exitButton = document.createElement("button");
  exitButton.type = "button";
  exitButton.classList.add("exit-confirmation__exit");
  exitButton.setAttribute("aria-label", "Exit game");
  exitButton.style.setProperty(
    "--popup-exit-default",
    `url("${themeAssets.popupButton.exitDefault}")`,
  );
  if (themeAssets.popupButton.exitHover) {
    exitButton.style.setProperty(
      "--popup-exit-hover",
      `url("${themeAssets.popupButton.exitHover}")`,
    );
  }
  exitButton.addEventListener("click", onExit);
  return exitButton;
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