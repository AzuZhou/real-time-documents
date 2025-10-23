import { sortDocuments } from "./state/store";
import { SortOption } from "./utils/types";

import renderDocuments from "./documents";

const setUpDocumentsControls = () => {
  const select = document.getElementById("sort-select") as HTMLSelectElement;

  select?.addEventListener("change", (e) => {
    const { value } = e.target as HTMLSelectElement;

    if (value) {
      sortDocuments(value as SortOption);
      renderDocuments();
    }
  });

  const listButton = document.getElementById("list-view-button");
  const gridButton = document.getElementById("grid-view-button");
  const documentsList = document.getElementById("documents-list");

  listButton?.addEventListener("click", () => {
    if (!documentsList) return;

    documentsList.dataset.view = "list";

    listButton.classList.add("active");
    gridButton?.classList.remove("active");
  });

  gridButton?.addEventListener("click", () => {
    if (!documentsList) return;

    documentsList.dataset.view = "grid";

    gridButton.classList.add("active");
    listButton?.classList.remove("active");
  });
};

export default setUpDocumentsControls;
