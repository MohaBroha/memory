/** References the application container in the document. */
export const appElement = document.getElementById("app");

if (!appElement) {
  throw new Error("App element not found.");
}
