import fetchDocuments from "./api/documents";
import { Document } from "../utils/types.ts";
import { handleDocuments } from "../utils/handlers.ts";

type AppState = "loading" | "loaded" | "error" | "empty";

const setContainerState = (state: AppState, container: HTMLElement) => {
  container.dataset.state = state;
};

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

const renderDocuments = async () => {
  const container = document.getElementById("documents");
  const list = document.getElementById("documents-list");
  if (!list || !container) return;

  try {
    const documents = await fetchDocuments();

    if (documents.length === 0) {
      setContainerState("empty", container);
      return;
    }

    setContainerState("loaded", container);
    const normalizedDocuments = handleDocuments(documents);
    normalizedDocuments.forEach((document) => {
      const card = createDocumentCard(document);
      list.appendChild(card);
    });
  } catch (error) {
    console.log(error);
    setContainerState("error", container);
  }
};

export default renderDocuments;
