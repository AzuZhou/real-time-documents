import { ApiDocument, ApiContributor } from "./types";

const handleContributors = (contributors: ApiContributor[]) => {
  return contributors.map((contributor) => {
    const { ID, Name } = contributor;

    return { id: ID, name: Name };
  });
};

const handleDocuments = (documents: ApiDocument[]) => {
  return documents.map((document) => {
    const { Attachments, Contributors, CreatedAt, ID, Title, UpdatedAt, Version } = document;

    return {
      attachments: Attachments,
      contributors: handleContributors(Contributors),
      createdAt: CreatedAt,
      id: ID,
      title: Title,
      updatedAt: UpdatedAt,
      version: Version,
    };
  });
};

export { handleDocuments };
