interface NotificationMessage {
  Timestamp: string;
  UserID: string;
  UserName: string;
  DocumentID: string;
  DocumentTitle: string;
}

interface HeartbeatMessage {
  type: "connected" | "ping";
}

type ServerMessage = NotificationMessage | HeartbeatMessage;

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

type SortField = "title" | "version" | "createdAt";
type SortOrder = "asc" | "desc";
type SortOption = `${SortField}-${SortOrder}`;

export type {
  HeartbeatMessage,
  NotificationMessage,
  ServerMessage,
  Document,
  Contributor,
  ApiDocument,
  ApiContributor,
  DocumentsSection,
  SortField,
  SortOrder,
  SortOption,
};
