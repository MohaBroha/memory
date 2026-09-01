import { createSettingsElement } from "./settings";
import { showView } from "./view";
import { createLegalNoticeElement } from "./legal-notice";
import { createControllerElement } from "./controller";

/** Creates the complete home view. */
export function createHomeElement(): HTMLElement {
  const homeElement = createHomeContainer();
  const contentElement = createHomeContent();
  const controllerElement = createControllerElement();
  const footerElement = createHomeFooter();
  homeElement.append(contentElement, controllerElement, footerElement);
  return homeElement;
}

/** Creates the root element for the home view. */
function createHomeContainer(): HTMLElement {
  const homeElement = document.createElement("section");
  homeElement.id = "home";
  homeElement.classList.add("home");
  return homeElement;
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
  copyrightElement.textContent = "© All rights reserved 2026 Mohamed Brohani";
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
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("home__play");
  button.setAttribute("aria-label", "Play");
button.append(
  createPlayControllerIcon(),
  createPlayLabel(),
  createPlayArrowIcons(),
);
  button.addEventListener("click", () => showView(createSettingsElement()));
  return button;
}

/** Creates the play button controller icon. */
function createPlayControllerIcon(): HTMLElement {
  const container = document.createElement("span");
  container.classList.add("home__play-controller-wrapper");
  container.appendChild(
    createPlayIcon(
      "/assets/components/home/icons/stadia_controller-default.svg",
      "home__play-controller",
    ),
  );
  return container;
}

/** Creates the default and hover arrow icons. */
function createPlayArrowIcons(): HTMLElement {
  const container = document.createElement("span");
  container.classList.add("home__play-arrow-wrapper");
  container.append(
    createPlayIcon(
      "/assets/components/home/icons/Arrow 1-default.svg",
      "home__play-arrow is-default",
    ),
    createPlayIcon(
      "/assets/components/home/icons/Arrow 1 (1).svg",
      "home__play-arrow is-hover",
    ),
  );
  return container;
}

/** Creates a play button icon. */
function createPlayIcon(src: string, className: string): HTMLImageElement {
  const icon = document.createElement("img");
  icon.src = src;
  icon.alt = "";
  icon.className = className;
  return icon;
}

/** Creates the play button label. */
function createPlayLabel(): HTMLSpanElement {
  const label = document.createElement("span");
  label.classList.add("home__play-label");
  label.textContent = "Play";
  return label;
}
