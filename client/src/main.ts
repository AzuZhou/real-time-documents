import renderDocuments from "./documents";
import { loadDocuments } from "./state/store";

async function renderApp() {
  await loadDocuments();

  renderDocuments();
}

renderApp();
