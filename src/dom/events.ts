/** Adds a click event handler to an HTML element. */
export function addClickListener(
  element: HTMLElement,
  handler: EventListener,
): void {
  element.addEventListener("click", handler);
}
