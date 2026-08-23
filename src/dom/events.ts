export function addClickListener(
  element: HTMLElement,
  handler: EventListener,
): void {
  element.addEventListener("click", handler);
}
