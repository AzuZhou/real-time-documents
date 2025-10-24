import { showDocumentsSection } from "./utils/helpers";
import { parseCommaSeparated } from "./utils/parsers";
import { addDocument } from "./state/store";
import { Document, Contributor } from "./utils/types";

const parseContributors = (input: string): Contributor[] => {
  if (!input) return [];

  const parsed = parseCommaSeparated(input);

  return parsed.map((name) => ({
    id: crypto.randomUUID(),
    name,
  }));
};

const handleSubmit = (form: HTMLFormElement) => {
  const formData = new FormData(form);

  const newDocument: Document = {
    id: crypto.randomUUID(),
    title: formData.get("title") as string,
    version: formData.get("version") as string,
    contributors: parseContributors((formData.get("contributors") as string) || ""),
    attachments: parseCommaSeparated((formData.get("attachments") as string) || ""),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  addDocument(newDocument);
  form.reset();
  showDocumentsSection();
  window.dispatchEvent(new CustomEvent("documents-updated"));
};

const setUpCreateForm = () => {
  const form = document.getElementById("documents-form") as HTMLFormElement;
  const cancelButton = document.getElementById("documents-form-cancel");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmit(form);
  });

  cancelButton?.addEventListener("click", () => {
    form.reset();
    showDocumentsSection();
  });
};

export default setUpCreateForm;
