import { appElement } from "../dom/elements";

/** Replaces the application container contents with a view. */
export function showView(view: HTMLElement): void {
  if (!appElement) {
    throw new Error("App element not found.");
  }
  appElement.replaceChildren(view);
}

/** Loads and displays the home view. */
export async function showHomeView(): Promise<void> {
  const { createHomeElement } = await import("./home");
  showView(createHomeElement());
}
