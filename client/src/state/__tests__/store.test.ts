import { describe, it, expect, beforeEach, vi } from "vitest";
import { addDocument, getDocuments, sortDocuments, loadDocuments } from "../store";
import { Document } from "../../utils/types";
import { STORAGE_KEY } from "../../utils/constants";

vi.mock("../../api/documents", () => ({
  default: vi.fn(() => Promise.resolve([])),
}));

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

global.localStorage = localStorageMock as any;

describe("Document Store", () => {
  beforeEach(async () => {
    localStorage.clear();
    vi.clearAllMocks();
    await loadDocuments();
  });

  it("should add document to store and localStorage", () => {
    const document: Document = {
      id: "test-123",
      title: "Test Document",
      version: "1.0.0",
      contributors: [],
      attachments: [],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };

    addDocument(document);

    const documents = getDocuments();
    expect(documents).toHaveLength(1);
    expect(documents[0].title).toBe("Test Document");

    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).toBeTruthy();

    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].id).toBe("test-123");
  });

  it("should maintain sort order after adding document", async () => {
    await loadDocuments();

    addDocument({
      id: "1",
      title: "Zebra",
      version: "1.0.0",
      contributors: [],
      attachments: [],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    });

    sortDocuments("title-asc");

    addDocument({
      id: "2",
      title: "Apple",
      version: "1.0.0",
      contributors: [],
      attachments: [],
      createdAt: "2024-01-02T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z",
    });

    const documents = getDocuments();
    expect(documents[0].title).toBe("Apple");
    expect(documents[1].title).toBe("Zebra");
  });

  it("should sort by creation date descending (newest first)", async () => {
    await loadDocuments();

    const oldDocument: Document = {
      id: "1",
      title: "Old Document",
      version: "1.0.0",
      contributors: [],
      attachments: [],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };

    const newDocument: Document = {
      id: "2",
      title: "New Document",
      version: "1.0.0",
      contributors: [],
      attachments: [],
      createdAt: "2024-01-10T00:00:00Z",
      updatedAt: "2024-01-10T00:00:00Z",
    };

    addDocument(oldDocument);
    addDocument(newDocument);

    sortDocuments("createdAt-desc");

    const docs = getDocuments();
    expect(docs[0].id).toBe("2");
    expect(docs[1].id).toBe("1");
  });

  it("should sort versions with natural ordering", async () => {
    await loadDocuments();

    addDocument({
      id: "1",
      title: "A",
      version: "1.10.0",
      contributors: [],
      attachments: [],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    });

    addDocument({
      id: "2",
      title: "B",
      version: "1.2.0",
      contributors: [],
      attachments: [],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    });

    addDocument({
      id: "3",
      title: "C",
      version: "1.9.0",
      contributors: [],
      attachments: [],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    });

    sortDocuments("version-asc");

    const docs = getDocuments();
    expect(docs[0].version).toBe("1.2.0");
    expect(docs[1].version).toBe("1.9.0");
    expect(docs[2].version).toBe("1.10.0");
  });
});
