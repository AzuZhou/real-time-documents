interface ApiContributor {
  ID: string;
  Name: string;
}

interface ApiDocument {
  ID: string;
  Title: string;
  Version: string;
  CreatedAt: string;
  Contributors: ApiContributor[];
  UpdatedAt: string;
  Attachments: string[];
}

interface Contributor {
  id: string;
  name: string;
}

interface Document {
  id: string;
  title: string;
  version: string;
  createdAt: string;
  contributors: Contributor[];
  updatedAt: string;
  attachments: string[];
}

type DocumentsSection = "documents-container" | "documents-form-container";

export type { Document, Contributor, ApiDocument, ApiContributor, DocumentsSection };
