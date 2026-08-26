import type { GameOverAssets } from "../data/theme-assets.data";
import type { GameState } from "../types/game.types";
import { THEME_ASSETS } from "../data/theme-assets.data";
import { getWinner } from "../game/score";
import { createSettingsElement } from "./settings";
import { showView } from "./view";

const RESULT_DELAY = 5500;

export function createGameOverElement(gameState: GameState): HTMLElement {

  const themeAssets = THEME_ASSETS[gameState.settings.theme];
  const gameOverAssets = themeAssets.gameOver;

  const gameOverElement = document.createElement("section");

  gameOverElement.id = "game-over";
  gameOverElement.classList.add("game-over");
  gameOverElement.dataset.theme = gameState.settings.theme;

  const titleElement = document.createElement("h2");

  titleElement.classList.add("game-over__title");
  titleElement.textContent = "Game over";
const scoreWrapper = document.createElement("div");

scoreWrapper.classList.add("game-over__score-wrapper");

const scoreLabel = document.createElement("p");

scoreLabel.classList.add("game-over__score-label");
scoreLabel.textContent = "Final score";

const scoreElement = createScoreElement(gameState);

scoreWrapper.append(scoreLabel, scoreElement);

  const resultElement = document.createElement("div");

  resultElement.classList.add("game-over__result");

  const newGameButton = createNewGameButton(gameOverAssets);

gameOverElement.append(
  titleElement,
  scoreWrapper,
  resultElement,
  newGameButton,
);

  window.setTimeout(() => {
    gameOverElement.classList.add("is-result");

    showResult(
      resultElement,
      gameState,
      gameOverAssets,
    );
  }, RESULT_DELAY);

  return gameOverElement;
}

function showResult(
  resultContainer: HTMLElement,
  gameState: GameState,
  gameOverAssets: GameOverAssets,
): void {
  const winner = getWinner(gameState.scores);

  resultContainer.replaceChildren();

  if (winner === null) {
    createDrawResult(resultContainer, gameOverAssets.draw);
    return;
  }

  createWinnerResult(resultContainer, winner, gameOverAssets);
}

function createWinnerResult(
  resultContainer: HTMLElement,
  winner: 1 | 2,
  gameOverAssets: GameOverAssets,
): void {
  const resultTitle = document.createElement("p");

  resultTitle.classList.add("game-over__result-title");
  resultTitle.textContent = "The winner is";

  const winnerName = document.createElement("p");

winnerName.classList.add(
  "game-over__winner-name",
  winner === 1
    ? "game-over__winner-name--blue"
    : "game-over__winner-name--orange",
);
  winnerName.textContent = winner === 1 ? "Blue Player" : "Orange Player";

  const winnerImage = document.createElement("img");

  winnerImage.classList.add("game-over__winner-image");

  const winnerAsset =
    winner === 1 ? gameOverAssets.blueWinner : gameOverAssets.orangeWinner;

  winnerImage.src = winnerAsset ?? gameOverAssets.winner ?? "";
  winnerImage.alt = winner === 1 ? "Blue player" : "Orange player";

  resultContainer.append(resultTitle, winnerName, winnerImage);
}

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

function createNewGameButton(
  gameOverAssets: GameOverAssets,
): HTMLButtonElement {
  const newGameButton = document.createElement("button");

  newGameButton.type = "button";
  newGameButton.classList.add("game-over__new-game");
  newGameButton.setAttribute("aria-label", "Back to start");

  if (gameOverAssets.homeButton) {
    newGameButton.style.backgroundImage = `url("${gameOverAssets.homeButton}")`;
  }

  newGameButton.addEventListener("click", () => {
    showView(createSettingsElement());
  });

  return newGameButton;
}

function createScoreElement(gameState: GameState): HTMLDivElement {
  const scoreElement = document.createElement("div");

  scoreElement.classList.add("game__score");

  const playerOne = gameState.scores.find((score) => score.player === 1);
  const playerTwo = gameState.scores.find((score) => score.player === 2);

  const bluePlayer = document.createElement("span");

  bluePlayer.classList.add(
    "game__score-player",
    "game__score-player--blue",
  );
  bluePlayer.textContent = `Blue ${playerOne?.points ?? 0}`;

  const orangePlayer = document.createElement("span");

  orangePlayer.classList.add(
    "game__score-player",
    "game__score-player--orange",
  );
  orangePlayer.textContent = `Orange ${playerTwo?.points ?? 0}`;

  scoreElement.append(bluePlayer, orangePlayer);

  return scoreElement;
}
