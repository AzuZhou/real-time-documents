import { DocumentsSection } from "./types";

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

export { navigateToSection, showCreateSection, showDocumentsSection };
