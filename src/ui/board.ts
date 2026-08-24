import type { GameState } from '../types/game.types';
import { createGameController } from '../game/game';
import { createCardElement } from './card';
import { createHomeElement } from './home';
import { showView } from './view';
import { createGameOverElement } from './game-over';

export function createBoardElement(
    gameController: ReturnType<typeof createGameController>,
): HTMLElement {
    const gameElement = document.createElement('section');

    gameElement.id = 'game';
    gameElement.classList.add('game');

    renderGame(
        gameElement,
        gameController.getState(),
        gameController,
    );

    return gameElement;
}

function renderGame(
    gameElement: HTMLElement,
    gameState: GameState,
    gameController: ReturnType<typeof createGameController>,
): void {
    gameElement.replaceChildren();

    const headerElement = createGameHeader(gameState);

    const fieldElement = document.createElement('div');

    fieldElement.id = 'field';
    fieldElement.classList.add('field');

    renderBoard(
        gameElement,
        fieldElement,
        gameState,
        gameController,
    );

    gameElement.append(
        headerElement,
        fieldElement,
    );
}

function createGameHeader(
    gameState: GameState,
): HTMLElement {
    const headerElement = document.createElement('header');

    headerElement.classList.add('game__header');

    const scoreElement = document.createElement('div');

    scoreElement.classList.add('game__score');

    const playerOneScore = gameState.scores.find(
        (score) => score.player === 1,
    );

    const playerTwoScore = gameState.scores.find(
        (score) => score.player === 2,
    );

    const playerOneScoreElement =
        document.createElement('span');

    playerOneScoreElement.classList.add(
        'game__score-player-one',
    );

    playerOneScoreElement.textContent =
        `Blue: ${playerOneScore?.points ?? 0}`;

    const playerTwoScoreElement =
        document.createElement('span');

    playerTwoScoreElement.classList.add(
        'game__score-player-two',
    );

    playerTwoScoreElement.textContent =
        `Orange: ${playerTwoScore?.points ?? 0}`;

    scoreElement.append(
        playerOneScoreElement,
        playerTwoScoreElement,
    );

    const currentPlayerElement =
        document.createElement('span');

    currentPlayerElement.classList.add(
        'game__current-player',
    );

    const currentPlayerLabel =
    gameState.currentPlayer === 1
        ? 'Blue'
        : 'Orange';

currentPlayerElement.textContent =
    `Current player: ${currentPlayerLabel}`;

    const exitButton = document.createElement('button');

    exitButton.type = 'button';
    exitButton.classList.add('game__exit');
    exitButton.textContent = 'Exit game';

    exitButton.addEventListener('click', () => {
        showView(createHomeElement());
    });

    headerElement.append(
        scoreElement,
        currentPlayerElement,
        exitButton,
    );

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

        cardElement.addEventListener('click', () => {
            const currentState = gameController.getState();

            if (currentState.flippedCards.length >= 2) {
                return;
            }

            gameController.selectCard(card.id);

            const updatedState = gameController.getState();

            renderGame(
                gameElement,
                updatedState,
                gameController,
            );

            if (updatedState.flippedCards.length === 2) {
                setTimeout(() => {
    const resolvedState = gameController.resolveTurn();

    if (resolvedState.status === 'finished') {
        showView(
            createGameOverElement(resolvedState),
        );

        return;
    }

                    renderGame(
                        gameElement,
                        gameController.getState(),
                        gameController,
                    );
                }, 800);
            }
        });

        fieldElement.appendChild(cardElement);
    });
}