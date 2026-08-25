import "./styles/style.scss";

import { createHomeElement } from "./ui/home";
import { showView } from "./ui/view";

const app = document.getElementById("app");

if (!app) {
  throw new Error("App container not found.");
}

showView(createHomeElement());
