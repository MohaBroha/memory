export function createExitConfirmationElement(
  onBack: () => void,
  onExit: () => void,
): HTMLElement {
  const overlayElement = document.createElement("div");
  overlayElement.classList.add("exit-confirmation");

  const dialogElement = document.createElement("div");
  dialogElement.classList.add("exit-confirmation__dialog");

  const titleElement = document.createElement("h2");
  titleElement.classList.add("exit-confirmation__title");
  titleElement.textContent = "Are you sure you want to quit the game?";

  const actionsElement = document.createElement("div");
  actionsElement.classList.add("exit-confirmation__actions");

  const backButton = document.createElement("button");
  backButton.type = "button";
  backButton.classList.add("exit-confirmation__back");
  backButton.setAttribute("aria-label", "Back to game");

  const exitButton = document.createElement("button");
  exitButton.type = "button";
  exitButton.classList.add("exit-confirmation__exit");
  exitButton.setAttribute("aria-label", "Exit game");

  backButton.addEventListener("click", onBack);
  exitButton.addEventListener("click", onExit);

  actionsElement.append(backButton, exitButton);

  dialogElement.append(titleElement, actionsElement);
  overlayElement.appendChild(dialogElement);

  return overlayElement;
}
