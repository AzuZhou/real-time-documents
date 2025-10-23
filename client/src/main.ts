import renderDocuments from "./documents";
import { loadDocuments } from "./state/store";
import setUpDocumentsControls from "./documentsControls";
import setUpCreateForm from "./createDocument";

async function renderApp() {
  await loadDocuments();

  renderDocuments();
  setUpDocumentsControls();
  setUpCreateForm();

  window.addEventListener("documents-updated", () => {
    renderDocuments();
  });
}

renderApp();
