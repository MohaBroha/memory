import { createSettingsElement } from "./settings";
import { showView } from "./view";
import { createLegalNoticeElement } from "./legal-notice";

const CONTROLLER_ASSET = "/assets/components/home/controller.svg";

const PLAY_DEFAULT_ASSET = "/assets/components/home/play-default.svg";

const PLAY_HOVER_ASSET = "/assets/components/home/play-hover.svg";

export function createHomeElement(): HTMLElement {
  const homeElement = document.createElement("section");

  homeElement.id = "home";
  homeElement.classList.add("home");

  const brandElement = document.createElement("span");
  brandElement.classList.add("home__brand");

  const brandText = "Memory";

  [...brandText].forEach((letter, index) => {
    const letterElement = document.createElement("span");

    letterElement.textContent = letter;
    letterElement.style.animationDelay = `${index * 0.12}s`;

    brandElement.append(letterElement);
  });

  const contentElement = document.createElement("div");

  contentElement.classList.add("home__content");

  const subtitleElement = document.createElement("p");

  subtitleElement.classList.add("home__subtitle");
  subtitleElement.textContent = "It's play time.";

  const titleElement = document.createElement("h1");

  titleElement.classList.add("home__title");
  titleElement.textContent = "Ready to play?";

  const playButton = createPlayButton();

  const footerElement = document.createElement("footer");

  footerElement.classList.add("home__footer");

  const copyrightElement = document.createElement("span");
  copyrightElement.textContent = "© All rights reserved 2026 Mohamed Brohani";

  const legalLink = document.createElement("button");

  legalLink.type = "button";
  legalLink.classList.add("home__legal-link");
  legalLink.textContent = "Legal Notice";

  legalLink.addEventListener("click", () => {
    showView(createLegalNoticeElement());
  });

  footerElement.append(copyrightElement, legalLink);

const headingElement = document.createElement("div");
headingElement.classList.add("home__heading");
headingElement.append(subtitleElement, titleElement);
contentElement.append(headingElement, playButton);

 const controllerElement = document.createElement("button");
controllerElement.type = "button";
controllerElement.classList.add("home__controller");
controllerElement.setAttribute("aria-label", "Open game settings");

const controllerImage = document.createElement("img");
controllerImage.src = CONTROLLER_ASSET;
controllerImage.alt = "";

controllerElement.append(controllerImage);

controllerElement.addEventListener("click", () => {
  showView(createSettingsElement());
});

  controllerElement.addEventListener("mouseenter", () => {
    homeElement.classList.add("controller-active");
  });

  controllerElement.addEventListener("mouseleave", () => {
    homeElement.classList.remove("controller-active");
  });

  homeElement.append(
    brandElement,
    contentElement,
    controllerElement,
    footerElement,
  );

  return homeElement;
}

function createPlayButton(): HTMLButtonElement {
  const playButton = document.createElement("button");

  playButton.type = "button";
  playButton.classList.add("home__play");
  playButton.setAttribute("aria-label", "Play");

  playButton.addEventListener("mouseenter", () => {
    playButton.classList.add("is-hover");
  });

  playButton.addEventListener("mouseleave", () => {
    playButton.classList.remove("is-hover");
  });

  playButton.addEventListener("click", () => {
    showView(createSettingsElement());
  });

  return playButton;
}
