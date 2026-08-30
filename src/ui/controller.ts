import { createSettingsElement } from "./settings";
import { showView } from "./view";

const CONTROLLER_ASSET = "/assets/components/home/controller.svg";

/** Creates the home screen controller button. */
export function createControllerElement(): HTMLButtonElement {
  const controllerElement = document.createElement("button");
  const controllerImage = document.createElement("img");
  controllerElement.type = "button";
  controllerElement.classList.add("home__controller");
  controllerElement.setAttribute("aria-label", "Open game settings");
  controllerImage.src = CONTROLLER_ASSET;
  controllerImage.alt = "";
  controllerElement.append(controllerImage);
  controllerElement.addEventListener("click", () => {
    showView(createSettingsElement());
  });
  return controllerElement;
}
