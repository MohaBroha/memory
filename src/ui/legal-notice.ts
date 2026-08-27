import { showHomeView } from "./view";

/** Creates the legal notice view. */
export function createLegalNoticeElement(): HTMLElement {
  const legalNoticeElement = createLegalNoticeContainer();
  const titleElement = createTitleElement();
  const contentElement = createLegalNoticeContent();
  legalNoticeElement.append(titleElement, contentElement);
  return legalNoticeElement;
}

/** Creates the root element for the legal notice view. */
function createLegalNoticeContainer(): HTMLElement {
  const legalNoticeElement = document.createElement("section");
  legalNoticeElement.id = "legal-notice";
  legalNoticeElement.classList.add("legal-notice");
  return legalNoticeElement;
}

/** Creates the legal notice title. */
function createTitleElement(): HTMLHeadingElement {
  const titleElement = document.createElement("h1");
  titleElement.textContent = "Legal Notice";
  return titleElement;
}

/** Creates the legal notice content and navigation controls. */
function createLegalNoticeContent(): HTMLDivElement {
  const contentElement = document.createElement("div");
  contentElement.classList.add("legal-notice__content");
  contentElement.append(
    createParagraph(
      "Information pursuant to applicable law",
    ),
    createHeading("Responsible for this website"),
    createParagraph("Mohamed Brohani - Email: mohabroha@mail.de"),
    createParagraph(
      "This website is a personal software development project created for educational and portfolio purposes.",
    ),
    createHeading("Liability for Content"),
    createParagraph(
      "The contents of this website have been created with care. However, no guarantee can be given for the completeness, accuracy, or currentness of the information provided.",
    ),
    createHeading("Liability for Links"),
    createParagraph(
      "This website may contain links to external websites. I have no influence over the content of external websites and therefore assume no responsibility for their content.",
    ),
    createHeading("Copyright"),
    createParagraph(
      "All original content, designs, and source code created for this project are protected by applicable copyright law. Reproduction, modification, or distribution without permission is not permitted unless otherwise stated.",
    ),
    createHeading("Contact"),
    createParagraph(
      "For questions regarding this website or its content, please contact the responsible person listed above.",
    ),
    createBackButton(),
    createFooterElement(),
  );
  return contentElement;
}

/** Creates a paragraph containing the supplied text. */
function createParagraph(text: string): HTMLParagraphElement {
  const paragraphElement = document.createElement("p");
  paragraphElement.textContent = text;
  return paragraphElement;
}

/** Creates a level-two heading containing the supplied text. */
function createHeading(text: string): HTMLHeadingElement {
  const headingElement = document.createElement("h2");
  headingElement.textContent = text;
  return headingElement;
}

/** Creates the button that returns to the home view. */
function createBackButton(): HTMLButtonElement {
  const backButton = document.createElement("button");
  backButton.type = "button";
  backButton.classList.add("legal-notice__back");
  backButton.textContent = "← Back to Home";
  backButton.addEventListener("click", () => {
    showHomeView();
  });
  return backButton;
}

/** Creates the legal notice footer. */
function createFooterElement(): HTMLElement {
  const footerElement = document.createElement("footer");
  footerElement.classList.add("legal-notice__footer");
  footerElement.textContent =
    "© All rights reserved 2026 Mohamed Brohani";
  return footerElement;
}