import { DocumentsSection, Document, Sort } from "./types";

const navigateToSection = (section: DocumentsSection) => {
  const main = document.getElementById("documents");
  if (!main) return;

  if (document.startViewTransition) {
    document.startViewTransition(() => {
      main.dataset.activeSection = section;
    });
  } else {
    main.dataset.activeSection = section;
  }
};

const showDocumentsSection = () => {
  navigateToSection("documents-container");
};

const showCreateSection = () => {
  navigateToSection("documents-form-container");
};

const sortDocuments = (documents: Document[], sort: Sort = "desc") => {
  const sortedDocuments = [...documents];

  if (sort === "desc") {
    return documents.sort((prev, next) => {
      const datePrev = new Date(prev.createdAt).getTime();
      const dateNext = new Date(next.createdAt).getTime();

      return dateNext - datePrev;
    });
  }

  return sortedDocuments;
};

export { navigateToSection, showCreateSection, showDocumentsSection, sortDocuments };
