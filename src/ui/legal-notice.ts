import { showHomeView } from "./view";

export function createLegalNoticeElement(): HTMLElement {
  const legalNoticeElement = document.createElement("section");

  legalNoticeElement.id = "legal-notice";
  legalNoticeElement.classList.add("legal-notice");

  const titleElement = document.createElement("h1");
  titleElement.textContent = "Legal Notice";

  const contentElement = document.createElement("div");
  contentElement.classList.add("legal-notice__content");

  const paragraphElement = document.createElement("p");

  const introElement = document.createElement("p");
  introElement.textContent = "Information pursuant to applicable law";

  const responsibleTitleElement = document.createElement("h2");
  responsibleTitleElement.textContent = "Responsible for this website";

  const responsibleElement = document.createElement("p");
  responsibleElement.textContent = "Mohamed Brohani - Email: mohabroha@mail.de";

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent =
    "This website is a personal software development project created for educational and portfolio purposes.";

  const contentTitleElement = document.createElement("h2");
  contentTitleElement.textContent = "Liability for Content";

  const contentTextElement = document.createElement("p");
  contentTextElement.textContent =
    "The contents of this website have been created with care. However, no guarantee can be given for the completeness, accuracy, or currentness of the information provided.";

  const linksTitleElement = document.createElement("h2");
  linksTitleElement.textContent = "Liability for Links";

  const linksTextElement = document.createElement("p");
  linksTextElement.textContent =
    "This website may contain links to external websites. I have no influence over the content of external websites and therefore assume no responsibility for their content.";

  const copyrightTitleElement = document.createElement("h2");
  copyrightTitleElement.textContent = "Copyright";

  const copyrightTextElement = document.createElement("p");
  copyrightTextElement.textContent =
    "All original content, designs, and source code created for this project are protected by applicable copyright law. Reproduction, modification, or distribution without permission is not permitted unless otherwise stated.";

  const contactTitleElement = document.createElement("h2");
  contactTitleElement.textContent = "Contact";

  const contactTextElement = document.createElement("p");
  contactTextElement.textContent =
    "For questions regarding this website or its content, please contact the responsible person listed above.";

  const backButton = document.createElement("button");

  backButton.type = "button";
  backButton.classList.add("legal-notice__back");
  backButton.textContent = "← Back to Home";

  backButton.addEventListener("click", () => {
    showHomeView();
  });

  const footerElement = document.createElement("footer");

  footerElement.classList.add("legal-notice__footer");
  footerElement.textContent = "© All rights reserved 2026 Mohamed Brohani";

  contentElement.append(
    introElement,
    responsibleTitleElement,
    responsibleElement,
    descriptionElement,
    contentTitleElement,
    contentTextElement,
    linksTitleElement,
    linksTextElement,
    copyrightTitleElement,
    copyrightTextElement,
    contactTitleElement,
    contactTextElement,
    backButton,
    footerElement,
  );

  legalNoticeElement.append(titleElement, contentElement);
  contentElement.append(paragraphElement);
  legalNoticeElement.append(titleElement, contentElement);

  return legalNoticeElement;
}
