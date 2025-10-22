import renderDocuments from "./documents";
import { loadDocuments } from "./state/store";
import setUpCreateForm from "./createDocument";

async function renderApp() {
  await loadDocuments();

  renderDocuments();
  setUpCreateForm();

  window.addEventListener("documents-updated", () => {
    renderDocuments();
  });
}

renderApp();
