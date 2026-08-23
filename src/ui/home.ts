import { createSettingsElement } from './settings';
import { showView } from './view';

const CONTROLLER_ASSET =
    '/assets/components/home/controller.svg';

const PLAY_DEFAULT_ASSET =
    '/assets/components/home/play-default.svg';

const PLAY_HOVER_ASSET =
    '/assets/components/home/play-hover.svg';

export function createHomeElement(): HTMLElement {
    const homeElement = document.createElement('section');

    homeElement.id = 'home';
    homeElement.classList.add('home');

    const contentElement = document.createElement('div');

    contentElement.classList.add('home__content');

    const subtitleElement = document.createElement('p');

    subtitleElement.classList.add('home__subtitle');
    subtitleElement.textContent = "It's play time.";

    const titleElement = document.createElement('h1');

    titleElement.classList.add('home__title');
    titleElement.textContent = 'Ready to play?';

    const playButton = createPlayButton();

    contentElement.append(
        subtitleElement,
        titleElement,
        playButton,
    );

    const controllerElement = document.createElement('img');

    controllerElement.classList.add('home__controller');
    controllerElement.src = CONTROLLER_ASSET;
    controllerElement.alt = '';

    controllerElement.addEventListener('mouseenter', () => {
    homeElement.classList.add('controller-active');
});

controllerElement.addEventListener('mouseleave', () => {
    homeElement.classList.remove('controller-active');
});

    homeElement.append(
        contentElement,
        controllerElement,

    );

    return homeElement;
}

function createPlayButton(): HTMLButtonElement {
    const playButton = document.createElement('button');

    playButton.type = 'button';
    playButton.classList.add('home__play');
    playButton.setAttribute('aria-label', 'Play');

    playButton.addEventListener('mouseenter', () => {
        playButton.classList.add('is-hover');
    });

    playButton.addEventListener('mouseleave', () => {
        playButton.classList.remove('is-hover');
    });

    playButton.addEventListener('click', () => {
        showView(createSettingsElement());
    });

    return playButton;
}