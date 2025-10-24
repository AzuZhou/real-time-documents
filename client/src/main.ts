import renderDocuments from "./documents";
import { loadDocuments } from "./state/store";
import setUpDocumentsControls from "./documentsControls";
import setUpCreateForm from "./createDocument";
import { connectNotifications, disconnectNotifications } from "./ws/notifications";

async function renderApp() {
  await loadDocuments();

  renderDocuments();

  setUpDocumentsControls();
  setUpCreateForm();

  connectNotifications();

  window.addEventListener("documents-updated", () => {
    renderDocuments();
  });

  window.addEventListener("beforeunload", () => {
    disconnectNotifications();
  });
}

renderApp();
