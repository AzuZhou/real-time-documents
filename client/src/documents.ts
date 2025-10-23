import { createDocumentCard } from "./ui/documentCard.ts";
import { getDocuments } from "./state/store.ts";
import { showCreateSection } from "./utils/helpers.ts";

type DocumentsState = "loading" | "loaded" | "error" | "empty";

const setContainerState = (state: DocumentsState, container: HTMLElement) => {
  container.dataset.state = state;
};

const createAddButton = () => {
  const button = document.createElement("button");
  button.className = "button add-document";
  button.textContent = "+ Add document";
  button.addEventListener("click", showCreateSection);

  return button;
};

const renderDocuments = () => {
  const container = document.getElementById("documents-container");
  const list = document.getElementById("documents-list");
  if (!list || !container) return;

  list.innerHTML = "";

  try {
    const documents = getDocuments();

    if (documents.length === 0) {
      setContainerState("empty", container);
      return;
    }

    setContainerState("loaded", container);

    documents.forEach((document) => {
      const card = createDocumentCard(document);
      list.appendChild(card);
    });

    const addDocumentButton = createAddButton();
    list.appendChild(addDocumentButton);
  } catch (error) {
    console.log(error);
    setContainerState("error", container);
  }
};

export default renderDocuments;
