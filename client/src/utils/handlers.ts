import { ApiDocument, ApiContributor } from "./types";

const handleContributors = (contributors: ApiContributor[]) =>
  contributors.map((contributor) => {
    return { id: contributor.ID, name: contributor.Name };
  });

const handleDocuments = (documents: ApiDocument[]) =>
  documents.map((document) => {
    return {
      attachments: document.Attachments,
      contributors: handleContributors(document.Contributors),
      createdAt: document.CreatedAt,
      id: document.ID,
      title: document.Title,
      updatedAt: document.UpdatedAt,
      version: document.Version,
    };
  });

export { handleDocuments };
