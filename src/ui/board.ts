import type { GameState } from "../types/game.types";
import { createGameController } from "../game/game";
import { createCardElement } from "./card";
import { createExitConfirmationElement } from "./exit-confirmation";
import { createHomeElement } from "./home";
import { showView } from "./view";
import { createGameOverElement } from "./game-over";

export function createBoardElement(
  gameController: ReturnType<typeof createGameController>,
): HTMLElement {
  const gameElement = document.createElement("section");

  gameElement.id = "game";
  gameElement.classList.add("game");

  renderGame(gameElement, gameController.getState(), gameController);

  return gameElement;
}

function renderGame(
  gameElement: HTMLElement,
  gameState: GameState,
  gameController: ReturnType<typeof createGameController>,
): void {
  gameElement.replaceChildren();

  const headerElement = createGameHeader(gameState, gameElement);

  const fieldElement = document.createElement("div");

  fieldElement.id = "field";
  fieldElement.classList.add("field");
  fieldElement.dataset.cardCount = String(gameState.cards.length);

  renderBoard(gameElement, fieldElement, gameState, gameController);

  gameElement.append(headerElement, fieldElement);
}

function createGameHeader(
  gameState: GameState,
  gameElement: HTMLElement,
): HTMLElement {
  const headerElement = document.createElement("header");

  headerElement.classList.add("game__header");

  const scoreElement = document.createElement("div");
  scoreElement.classList.add("game__score");
  const playerOneScore = gameState.scores.find((score) => score.player === 1);
  const playerTwoScore = gameState.scores.find((score) => score.player === 2);
  const playerOneElement = document.createElement("span");
  const playerOneIcon = document.createElement("img");
  playerOneElement.classList.add(
    "game__score-player",
    "game__score-player--blue",
  );
  playerOneIcon.src = "/assets/components/coding-vibes/calculator/blue.svg";
  playerOneIcon.alt = "";
  playerOneIcon.classList.add("game__score-icon");
  playerOneElement.append(
    playerOneIcon,
    document.createTextNode(`Blue ${playerOneScore?.points ?? 0}`),
  );
  const playerTwoElement = document.createElement("span");
  const playerTwoIcon = document.createElement("img");
  playerTwoElement.classList.add(
    "game__score-player",
    "game__score-player--orange",
  );
  playerTwoIcon.src = "/assets/components/coding-vibes/calculator/orange.svg";
  playerTwoIcon.alt = "";
  playerTwoIcon.classList.add("game__score-icon");
  playerTwoElement.append(
    playerTwoIcon,
    document.createTextNode(`Orange ${playerTwoScore?.points ?? 0}`),
  );
  scoreElement.append(playerOneElement, playerTwoElement);

  const currentPlayerElement = document.createElement("span");

  currentPlayerElement.classList.add("game__current-player");
  currentPlayerElement.textContent = "Current player:";

  const currentPlayerIcon = document.createElement("img");

  currentPlayerIcon.src =
    gameState.currentPlayer === 1
      ? "/assets/components/coding-vibes/calculator/blue.svg"
      : "/assets/components/coding-vibes/calculator/orange.svg";

  currentPlayerIcon.alt = "";
  currentPlayerIcon.classList.add("game__current-player-icon");

  currentPlayerElement.appendChild(currentPlayerIcon);

  const exitButton = document.createElement("button");

  exitButton.type = "button";
  exitButton.classList.add("game__exit");
  exitButton.addEventListener("click", () => {
    const confirmationElement = createExitConfirmationElement(
      () => {
        confirmationElement.remove();
      },
      () => {
        showView(createHomeElement());
      },
    );

    gameElement.appendChild(confirmationElement);
  });

  headerElement.append(scoreElement, currentPlayerElement, exitButton);

  return headerElement;
}

function renderBoard(
  gameElement: HTMLElement,
  fieldElement: HTMLElement,
  gameState: GameState,
  gameController: ReturnType<typeof createGameController>,
): void {
  fieldElement.replaceChildren();

  gameState.cards.forEach((card) => {
    const cardElement = createCardElement(card);

    cardElement.addEventListener("click", () => {
      const currentState = gameController.getState();

      if (currentState.flippedCards.length >= 2 || card.isMatched) {
        return;
      }

      gameController.selectCard(card.id);
      cardElement.classList.add("is-flipped");

      const updatedState = gameController.getState();

      if (updatedState.flippedCards.length !== 2) {
        return;
      }

      const currentTurnCardIds = updatedState.flippedCards.map(
        (flippedCard) => flippedCard.id,
      );

      const currentTurnElements = Array.from(
        fieldElement.querySelectorAll<HTMLButtonElement>(".card.is-flipped"),
      ).filter((element) =>
        currentTurnCardIds.includes(element.dataset.cardId ?? ""),
      );

      setTimeout(() => {
        const resolvedState = gameController.resolveTurn();

        if (resolvedState.status === "finished") {
          showView(createGameOverElement(resolvedState));
          return;
        }

        const matchedCards = currentTurnCardIds.every((cardId) => {
          const resolvedCard = resolvedState.cards.find(
            (gameCard) => gameCard.id === cardId,
          );

          return resolvedCard?.isMatched;
        });

        if (matchedCards) {
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

          return;
        }

        currentTurnElements.forEach((element) => {
          element.classList.remove("is-flipped");
        });

        setTimeout(() => {
          renderGame(gameElement, gameController.getState(), gameController);
        }, 400);
      }, 800);
    });

    fieldElement.appendChild(cardElement);
  });
}
