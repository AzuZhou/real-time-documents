import { createDocumentCard } from "./ui/documentCard.ts";
import { getDocuments } from "./state/store.ts";

type AppState = "loading" | "loaded" | "error" | "empty";

const setContainerState = (state: AppState, container: HTMLElement) => {
  container.dataset.state = state;
};

const renderDocuments = () => {
  const container = document.getElementById("documents");
  const list = document.getElementById("documents-list");
  if (!list || !container) return;

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
  } catch (error) {
    console.log(error);
    setContainerState("error", container);
  }
};

export default renderDocuments;
