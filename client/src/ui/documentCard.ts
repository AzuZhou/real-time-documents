import { Document } from "../utils/types.ts";

const createDocumentCardElement = (type: string, text?: string) => {
  const el = document.createElement(type);

  if (text) {
    el.textContent = text;
  }

  return el;
};

const createDocumentCardColumn = (elements: HTMLElement[]) => {
  const column = document.createElement("div");
  column.className = "document-card-column";

  elements.forEach((el) => {
    column.appendChild(el);
  });

  return column;
};

const createDocumentCard = ({ id, title, version, contributors, attachments }: Document) => {
  const card = document.createElement("article");
  card.className = "document-card";
  card.dataset.id = id;

  const cardTitle = createDocumentCardElement("h2", title);
  const cardVersion = createDocumentCardElement("span", version);
  card.appendChild(createDocumentCardColumn([cardTitle, cardVersion]));

  const cardContributions = contributors.map((contributor) => {
    return createDocumentCardElement("p", contributor.name);
  });
  card.appendChild(createDocumentCardColumn(cardContributions));

  const cardAttachments = attachments.map((attachment) => {
    return createDocumentCardElement("p", attachment);
  });
  card.appendChild(createDocumentCardColumn(cardAttachments));

  return card;
};

export { createDocumentCard };
