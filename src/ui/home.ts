import { createSettingsElement } from "./settings";
import { showView } from "./view";
import { createLegalNoticeElement } from "./legal-notice";
import { createControllerElement } from "./controller";

/** Creates the complete home view. */
export function createHomeElement(): HTMLElement {
  const homeElement = createHomeContainer();
  const brandElement = createBrandElement();
  const contentElement = createHomeContent();
  const controllerElement = createControllerElement();
  const footerElement = createHomeFooter();
  homeElement.append(
    brandElement,
    contentElement,
    controllerElement,
    footerElement,
  );
  return homeElement;
}

/** Creates the root element for the home view. */
function createHomeContainer(): HTMLElement {
  const homeElement = document.createElement("section");
  homeElement.id = "home";
  homeElement.classList.add("home");
  return homeElement;
}

/** Creates the animated Memory brand element. */
function createBrandElement(): HTMLSpanElement {
  const brandElement = document.createElement("span");
  const brandText = "Memory";
  brandElement.classList.add("home__brand");
  [...brandText].forEach((letter, index) => {
    const letterElement = document.createElement("span");
    letterElement.textContent = letter;
    letterElement.style.animationDelay = `${index * 0.12}s`;
    brandElement.append(letterElement);
  });
  return brandElement;
}

/** Creates the home heading and play action. */
function createHomeContent(): HTMLDivElement {
  const contentElement = document.createElement("div");
  const headingElement = document.createElement("div");
  const subtitleElement = document.createElement("p");
  const titleElement = document.createElement("h1");
  contentElement.classList.add("home__content");
  headingElement.classList.add("home__heading");
  subtitleElement.classList.add("home__subtitle");
  subtitleElement.textContent = "It's play time.";
  titleElement.classList.add("home__title");
  titleElement.textContent = "Ready to play?";
  headingElement.append(subtitleElement, titleElement);
  contentElement.append(headingElement, createPlayButton());
  return contentElement;
}

/** Creates the home footer and legal notice action. */
function createHomeFooter(): HTMLElement {
  const footerElement = document.createElement("footer");
  const copyrightElement = document.createElement("span");
  const legalLink = document.createElement("button");
  footerElement.classList.add("home__footer");
  copyrightElement.textContent =
    "© All rights reserved 2026 Mohamed Brohani";
  legalLink.type = "button";
  legalLink.classList.add("home__legal-link");
  legalLink.textContent = "Legal Notice";
  legalLink.addEventListener("click", () => {
    showView(createLegalNoticeElement());
  });
  footerElement.append(copyrightElement, legalLink);
  return footerElement;
}

/** Creates the button that opens the settings view. */
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