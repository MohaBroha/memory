import type { GameOverAssets } from "../data/theme-assets.data";
import type { GameState } from "../types/game.types";
import { THEME_ASSETS } from "../data/theme-assets.data";
import { getWinner } from "../game/score";
import { createSettingsElement } from "./settings";
import { showView } from "./view";
import type { Theme } from "../types/settings.types";

const RESULT_DELAY = 2500;
/** Creates the Game Over view for the completed game state. */
export function createGameOverElement(gameState: GameState): HTMLElement {
  const themeAssets = THEME_ASSETS[gameState.settings.theme];
  const gameOverElement = createGameOverContainer(gameState);
  const scoreWrapper = createScoreWrapper(gameState);
  const resultElement = createResultElement();
  gameOverElement.append(
    scoreWrapper,
    resultElement,
  );
  scheduleGameOverResult(
    gameOverElement,
    resultElement,
    gameState,
    themeAssets.gameOver,
  );
  return gameOverElement;
}

/** Creates the Game Over root element and title. */
function createGameOverContainer(gameState: GameState): HTMLElement {
  const gameOverElement = document.createElement("section");
  const titleElement = document.createElement("h2");
  gameOverElement.id = "game-over";
  gameOverElement.classList.add("game-over");
  gameOverElement.dataset.theme = gameState.settings.theme;
  titleElement.classList.add("game-over__title");
  titleElement.textContent = "Game over";
  gameOverElement.appendChild(titleElement);
  return gameOverElement;
}

/** Creates the final score section. */
function createScoreWrapper(gameState: GameState): HTMLDivElement {
  const scoreWrapper = document.createElement("div");
  const scoreLabel = document.createElement("p");
  scoreWrapper.classList.add("game-over__score-wrapper");
  scoreLabel.classList.add("game-over__score-label");
  scoreLabel.textContent = "Final score";
  scoreWrapper.append(scoreLabel, createScoreElement(gameState));
  return scoreWrapper;
}

/** Creates the empty result container. */
function createResultElement(): HTMLDivElement {
  const resultElement = document.createElement("div");
  resultElement.classList.add("game-over__result");
  return resultElement;
}

/** Schedules the result animation and result content. */
function scheduleGameOverResult(
  gameOverElement: HTMLElement,
  resultElement: HTMLElement,
  gameState: GameState,
  gameOverAssets: GameOverAssets,
): void {
  window.setTimeout(() => {
    const winner = getWinner(gameState.scores);
    if (winner !== null) {
      createConfetti(gameOverElement);
    }
    gameOverElement.classList.add("is-result");
    showResult(resultElement, gameState, gameOverAssets);
  }, RESULT_DELAY);
}

/** Displays either the winner or draw result. */
function showResult(
  resultContainer: HTMLElement,
  gameState: GameState,
  gameOverAssets: GameOverAssets,
): void {
  const winner = getWinner(gameState.scores);
  resultContainer.replaceChildren();
  if (winner === null) {
    createDrawResult(resultContainer, gameOverAssets.draw);
  } else {
    createWinnerResult(resultContainer, winner, gameOverAssets);
  }
  const newGameButton = createNewGameButton(
    gameOverAssets,
    gameState.settings.theme,
  );
  resultContainer.appendChild(newGameButton);
}

/** Adds the confetti effect to the Game Over view. */
function createConfetti(gameOverElement: HTMLElement): void {
  const confetti = document.createElement("div");
  confetti.classList.add("game-over__confetti");
  gameOverElement.append(confetti);
}

/** Creates the winner result content. */
function createWinnerResult(
  resultContainer: HTMLElement,
  winner: 1 | 2,
  gameOverAssets: GameOverAssets,
): void {
  const resultTitle = createResultTitle();
  const winnerName = createWinnerName(winner);
  const winnerImage = createWinnerImage(winner, gameOverAssets);
  resultContainer.append(resultTitle, winnerName, winnerImage);
}

/** Creates the title used above a winner name. */
function createResultTitle(): HTMLParagraphElement {
  const resultTitle = document.createElement("p");
  resultTitle.classList.add("game-over__result-title");
  resultTitle.textContent = "The winner is";
  return resultTitle;
}

/** Creates the winner name element. */
function createWinnerName(winner: 1 | 2): HTMLParagraphElement {
  const winnerName = document.createElement("p");
  winnerName.classList.add(
    "game-over__winner-name",
    winner === 1
      ? "game-over__winner-name--blue"
      : "game-over__winner-name--orange",
  );
  winnerName.textContent = winner === 1 ? "Blue Player" : "Orange Player";
  return winnerName;
}

/** Creates the image associated with the winning player. */
function createWinnerImage(
  winner: 1 | 2,
  gameOverAssets: GameOverAssets,
): HTMLImageElement {
  const winnerImage = document.createElement("img");
  const winnerAsset =
    winner === 1 ? gameOverAssets.blueWinner : gameOverAssets.orangeWinner;
  winnerImage.classList.add("game-over__winner-image");
  winnerImage.src = winnerAsset ?? gameOverAssets.winner ?? "";
  winnerImage.alt = winner === 1 ? "Blue player" : "Orange player";
  return winnerImage;
}

/** Creates the draw result content. */
function createDrawResult(
  resultContainer: HTMLElement,
  drawAsset: string,
): void {
  const resultTitle = document.createElement("p");
  resultTitle.classList.add("game-over__result-title");
  resultTitle.textContent = "It's a";
  const drawName = document.createElement("p");
  drawName.classList.add("game-over__draw-name");
  drawName.textContent = "DRAW";
  const drawImage = document.createElement("img");
  drawImage.classList.add("game-over__draw-image");
  drawImage.src = drawAsset;
  drawImage.alt = "Draw";
  resultContainer.append(resultTitle, drawName, drawImage);
}

/** Creates the button that starts a new game. */
function createNewGameButton(
  gameOverAssets: GameOverAssets,
  theme: Theme,
): HTMLButtonElement {
  const newGameButton = document.createElement("button");
  newGameButton.type = "button";
  newGameButton.classList.add("game-over__new-game");
  newGameButton.setAttribute("aria-label", "Back to start");
 if (theme === "coding-vibes") {
  newGameButton.textContent = "Back to start";
} else if (theme === "games" || theme === "da-project") {
  newGameButton.textContent = "Home";
} else if (gameOverAssets.homeButton) {
  newGameButton.style.backgroundImage = `url("${gameOverAssets.homeButton}")`;
}
  newGameButton.addEventListener("click", () => {
    showView(createSettingsElement());
  });
  return newGameButton;
}

/** Creates the final score display using theme assets. */
function createScoreElement(gameState: GameState): HTMLDivElement {
  const scoreElement = document.createElement("div");
  const themeAssets = THEME_ASSETS[gameState.settings.theme];
  scoreElement.classList.add("game__score");
  const playerOne = gameState.scores.find((score) => score.player === 1);
  const playerTwo = gameState.scores.find((score) => score.player === 2);
  const bluePlayer = createPlayerScore(
    "blue",
    playerOne?.points ?? 0,
    themeAssets.calculator.blue,
    gameState.settings.theme === "coding-vibes",
  );
  const orangePlayer = createPlayerScore(
    "orange",
    playerTwo?.points ?? 0,
    themeAssets.calculator.orange,
    gameState.settings.theme === "coding-vibes",
  );
  scoreElement.append(bluePlayer, orangePlayer);
  return scoreElement;
}

/** Creates one player's score element for the Game Over view. */
function createPlayerScore(
  player: "blue" | "orange",
  points: number,
  iconSrc: string,
  showName: boolean,
): HTMLSpanElement {
  const playerElement = document.createElement("span");
  const playerIcon = document.createElement("img");
  playerElement.classList.add(
    "game__score-player",
    `game__score-player--${player}`,
  );
  playerIcon.classList.add("game__score-icon");
  playerIcon.src = iconSrc;
  playerIcon.alt = "";
  const playerName = player === "blue" ? "Blue" : "Orange";
  const scoreText = showName ? `${playerName} ${points}` : `${points}`;
  playerElement.append(
    playerIcon,
    document.createTextNode(scoreText),
  );
  return playerElement;
}
