import type { GameState } from "../types/game.types";
import { createGameController } from "../game/game";
import { createCardElement } from "./card";
import { createExitConfirmationElement } from "./exit-confirmation";
import { createHomeElement } from "./home";
import { showView } from "./view";
import { THEME_ASSETS } from "../data/theme-assets.data";
import { createGameOverElement } from "./game-over";
import type { Theme } from "../types/settings.types";
import { createControllerElement } from "./controller";

/** Creates the game board view for a game controller. */
export function createBoardElement(
  gameController: ReturnType<typeof createGameController>,
): HTMLElement {
  const gameElement = document.createElement("section");
  gameElement.id = "game";
  gameElement.classList.add("game");
  renderGame(gameElement, gameController.getState(), gameController);
  return gameElement;
}

/** Rebuilds the game view from the current game state. */
function renderGame(
  gameElement: HTMLElement,
  gameState: GameState,
  gameController: ReturnType<typeof createGameController>,
): void {
  gameElement.replaceChildren();
  gameElement.dataset.theme = gameState.settings.theme;
  const controllerElement = createControllerElement();
  controllerElement.classList.add("board__controller");
  const headerElement = createGameHeader(gameState, gameElement);
  const fieldElement = document.createElement("div");
  fieldElement.id = "field";
  fieldElement.classList.add("field");
  fieldElement.dataset.cardCount = String(gameState.cards.length);
  renderBoard(gameElement, fieldElement, gameState, gameController);
  gameElement.append(headerElement, fieldElement, controllerElement);
}

/** Creates the game header with scores, current player, and exit action. */
function createGameHeader(
  gameState: GameState,
  gameElement: HTMLElement,
): HTMLElement {
  const themeAssets = THEME_ASSETS[gameState.settings.theme];
  const headerElement = document.createElement("header");
  headerElement.classList.add("game__header");
  const scoreElement = createScoreElement(gameState, themeAssets);
  const currentPlayerElement = createCurrentPlayerElement(
    gameState,
    themeAssets,
  );
  const exitButton = createExitButton(gameState, gameElement, themeAssets);
  headerElement.append(scoreElement, currentPlayerElement, exitButton);
  return headerElement;
}

/** Creates the score display for both players. */
function createScoreElement(
  gameState: GameState,
  themeAssets: typeof THEME_ASSETS[Theme],
): HTMLElement {
  const scoreElement = document.createElement("div");
  scoreElement.classList.add("game__score");
  const playerOneScore = gameState.scores.find((score) => score.player === 1);
  const playerTwoScore = gameState.scores.find((score) => score.player === 2);
  const playerOneElement = createPlayerScore(
    playerOneScore?.points ?? 0,
    "blue",
    themeAssets.calculator.blue,
    gameState.settings.theme === "coding-vibes",
  );
  const playerTwoElement = createPlayerScore(
    playerTwoScore?.points ?? 0,
    "orange",
    themeAssets.calculator.orange,
    gameState.settings.theme === "coding-vibes",
  );
  scoreElement.append(playerOneElement, playerTwoElement);
  return scoreElement;
}

/** Creates one player's score element. */
function createPlayerScore(
  points: number,
  player: "blue" | "orange",
  iconSrc: string,
  showName: boolean,
): HTMLSpanElement {
  const playerElement = document.createElement("span");
  const playerIcon = document.createElement("img");
  const playerPoints = document.createElement("span");
  playerElement.classList.add(
    "game__score-player",
    `game__score-player--${player}`,
  );
  playerIcon.src = iconSrc;
  playerIcon.alt = "";
  playerIcon.classList.add("game__score-icon");
  playerPoints.classList.add("game__score-points");
  playerPoints.textContent = showName
    ? `${player === "blue" ? "Blue" : "Orange"} ${points}`
    : String(points);
  playerElement.append(playerIcon, playerPoints);
  return playerElement;
}

/** Creates the current-player indicator. */
function createCurrentPlayerElement(
  gameState: GameState,
  themeAssets: typeof THEME_ASSETS[Theme],
): HTMLElement {
  const currentPlayerElement = document.createElement("span");
  currentPlayerElement.classList.add("game__current-player");
  currentPlayerElement.textContent = "Current player:";
  const currentPlayerIcon = document.createElement("img");
  currentPlayerIcon.src =
    gameState.currentPlayer === 1
      ? themeAssets.calculator.blue
      : themeAssets.calculator.orange;
  currentPlayerIcon.alt = "";
  currentPlayerIcon.classList.add("game__current-player-icon");
  currentPlayerElement.appendChild(currentPlayerIcon);
  return currentPlayerElement;
}

/** Creates the button used to leave the current game. */
function createExitButton(
  gameState: GameState,
  gameElement: HTMLElement,
  themeAssets: typeof THEME_ASSETS[Theme],
): HTMLButtonElement {
  const exitButton = document.createElement("button");
  exitButton.type = "button";
  exitButton.classList.add("game__exit");
  if (gameState.settings.theme === "coding-vibes") {
    const exitIcon = document.createElement("img");
    const exitLabel = document.createElement("span");
    exitIcon.src = "/assets/components/coding-vibes/icons/move_item.svg";
    exitIcon.alt = "";
    exitIcon.classList.add("game__exit-icon");
    exitLabel.classList.add("game__exit-label");
    exitLabel.textContent = "Exit game";
    exitButton.append(exitIcon, exitLabel);
    exitButton.classList.add("game__exit--coding-vibes");
  } else if (gameState.settings.theme === "games") {
    const defaultIcon = document.createElement("img");
    const hoverIcon = document.createElement("img");
    const exitLabel = document.createElement("span");
    defaultIcon.src = "/assets/components/games/icons/move_item (1)-default.svg";
    defaultIcon.alt = "";
    defaultIcon.classList.add("game__exit-icon", "is-default");
    hoverIcon.src = "/assets/components/games/icons/move_item-hover.svg";
    hoverIcon.alt = "";
    hoverIcon.classList.add("game__exit-icon", "is-hover");
    exitLabel.classList.add("game__exit-label");
    exitLabel.textContent = "Exit game";
    exitButton.append(defaultIcon, hoverIcon, exitLabel);
    exitButton.classList.add("game__exit--games");
  } else if (gameState.settings.theme === "da-project") {
    const defaultIcon = document.createElement("img");
    const hoverIcon = document.createElement("img");
    const exitLabel = document.createElement("span");
    defaultIcon.src = "/assets/components/da-project/icons/move_item (1)-default.svg";
    defaultIcon.alt = "";
    defaultIcon.classList.add("game__exit-icon", "is-default");
    hoverIcon.src = "/assets/components/da-project/icons/move_item (2)-hover.svg";
    hoverIcon.alt = "";
    hoverIcon.classList.add("game__exit-icon", "is-hover");
    exitLabel.classList.add("game__exit-label");
    exitLabel.textContent = "Exit game";
    exitButton.append(defaultIcon, hoverIcon, exitLabel);
    exitButton.classList.add("game__exit--da-project");
  } else {
    exitButton.style.setProperty(
      "--exit-button-default",
      `url("${themeAssets.exitButton.default}")`,
    );
    exitButton.style.setProperty(
      "--exit-button-hover",
      `url("${themeAssets.exitButton.hover}")`,
    );
  }
  exitButton.addEventListener("click", () => {
    handleExitClick(gameState, gameElement);
  });
  return exitButton;
}

/** Shows the exit confirmation dialog for the current game. */
function handleExitClick(
  gameState: GameState,
  gameElement: HTMLElement,
): void {
  const confirmationElement = createExitConfirmationElement(
    () => {
      confirmationElement.remove();
    },
    () => {
      showView(createHomeElement());
    },
    gameState.settings.theme,
  );
  gameElement.appendChild(confirmationElement);
}

/** Renders all cards and attaches their click handlers. */
function renderBoard(
  gameElement: HTMLElement,
  fieldElement: HTMLElement,
  gameState: GameState,
  gameController: ReturnType<typeof createGameController>,
): void {
  fieldElement.replaceChildren();
  gameState.cards.forEach((card) => {
    const cardElement = createCardElement(card, gameState.settings.theme);
    cardElement.addEventListener("click", () => {
      handleCardClick(
        card,
        cardElement,
        gameElement,
        fieldElement,
        gameController,
      );
    });
    fieldElement.appendChild(cardElement);
  });
}

/** Handles selection of one card and schedules turn resolution when needed. */
function handleCardClick(
  card: GameState["cards"][number],
  cardElement: HTMLButtonElement,
  gameElement: HTMLElement,
  fieldElement: HTMLElement,
  gameController: ReturnType<typeof createGameController>,
): void {
  if (isCardSelectionBlocked(gameController.getState(), card)) {
    return;
  }
  gameController.selectCard(card.id);
  cardElement.classList.add("is-flipped");
  const updatedState = gameController.getState();
  if (updatedState.flippedCards.length !== 2) {
    return;
  }
  const currentTurnCardIds = getCurrentTurnCardIds(updatedState);
  const currentTurnElements = getCurrentTurnElements(
    fieldElement,
    currentTurnCardIds,
  );
  scheduleTurnResolution(
    gameElement,
    fieldElement,
    gameController,
    currentTurnCardIds,
    currentTurnElements,
  );
}

/** Determines whether a card selection should be ignored. */
function isCardSelectionBlocked(
  gameState: GameState,
  card: GameState["cards"][number],
): boolean {
  return gameState.flippedCards.length >= 2 || card.isMatched;
}

/** Returns the identifiers of the cards selected in the current turn. */
function getCurrentTurnCardIds(gameState: GameState): string[] {
  return gameState.flippedCards.map((card) => card.id);
}

/** Schedules resolution of the current turn. */
function scheduleTurnResolution(
  gameElement: HTMLElement,
  fieldElement: HTMLElement,
  gameController: ReturnType<typeof createGameController>,
  currentTurnCardIds: string[],
  currentTurnElements: HTMLButtonElement[],
): void {
  setTimeout(() => {
    resolveCurrentTurn(
      gameElement,
      fieldElement,
      gameController,
      currentTurnCardIds,
      currentTurnElements,
    );
  }, 800);
}

/** Finds the rendered elements for the current turn's cards. */
function getCurrentTurnElements(
  fieldElement: HTMLElement,
  currentTurnCardIds: string[],
): HTMLButtonElement[] {
  return Array.from(
    fieldElement.querySelectorAll<HTMLButtonElement>(".card.is-flipped"),
  ).filter((element) =>
    currentTurnCardIds.includes(element.dataset.cardId ?? ""),
  );
}

/** Resolves the current turn and updates the appropriate view state. */
function resolveCurrentTurn(
  gameElement: HTMLElement,
  fieldElement: HTMLElement,
  gameController: ReturnType<typeof createGameController>,
  currentTurnCardIds: string[],
  currentTurnElements: HTMLButtonElement[],
): void {
  const resolvedState = gameController.resolveTurn();
  if (resolvedState.status === "finished") {
    showMatchedCards(
      gameElement,
      resolvedState,
      gameController,
      currentTurnCardIds,
    );
    showGameOver(resolvedState);
    return;
  }
  if (areCurrentCardsMatched(resolvedState, currentTurnCardIds)) {
    showMatchedCards(
      gameElement,
      resolvedState,
      gameController,
      currentTurnCardIds,
    );
    return;
  }
  unflipCurrentTurn(
    gameElement,
    fieldElement,
    gameController,
    currentTurnElements,
  );
}

/** Checks whether all cards selected in the current turn were matched. */
function areCurrentCardsMatched(
  gameState: GameState,
  cardIds: string[],
): boolean {
  return cardIds.every((cardId) => {
    const card = gameState.cards.find(
      (gameCard) => gameCard.id === cardId,
    );
    return card?.isMatched;
  });
}

/** Shows the Game Over view after the game completion delay. */
function showGameOver(gameState: GameState): void {
  setTimeout(() => {
    showView(createGameOverElement(gameState));
  }, 1500);
}

/** Renders matched cards and starts their match animation. */
function showMatchedCards(
  gameElement: HTMLElement,
  resolvedState: GameState,
  gameController: ReturnType<typeof createGameController>,
  currentTurnCardIds: string[],
): void {
  renderGame(gameElement, resolvedState, gameController);
  currentTurnCardIds.forEach((cardId) => {
    const matchedElement = gameElement.querySelector(
      `.card[data-card-id="${cardId}"]`,
    );
    if (!matchedElement) {
      return;
    }
    matchedElement.classList.add("match-effect");
    matchedElement.addEventListener(
      "animationend",
      () => {
        matchedElement.classList.remove("match-effect");
      },
      { once: true },
    );
  });
}

/** Clears the current turn's flip state and re-renders the board. */
function unflipCurrentTurn(
  gameElement: HTMLElement,
  fieldElement: HTMLElement,
  gameController: ReturnType<typeof createGameController>,
  currentTurnElements: HTMLButtonElement[],
): void {
  currentTurnElements.forEach((element) => {
    element.classList.remove("is-flipped");
  });
  setTimeout(() => {
    renderGame(gameElement, gameController.getState(), gameController);
  }, 400);
}