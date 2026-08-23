import { appElement } from "../dom/elements";

export function showView(view: HTMLElement): void {
    if (!appElement) {
        throw new Error("App element not found.");
    }

    appElement.replaceChildren(view);
}

export async function showHomeView(): Promise<void> {
    const { createHomeElement } = await import('./home');

    showView(createHomeElement());
}