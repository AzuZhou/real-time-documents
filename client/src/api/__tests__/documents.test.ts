import { describe, it, expect, vi, beforeEach } from "vitest";
import fetchDocuments from "../documents";

global.fetch = vi.fn();

describe("fetchDocuments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch the documents successully", async () => {
    const mockData = [
      {
        ID: "123",
        Title: "Test",
        Version: "1.0.0",
        CreatedAt: "2024-01-01T00:00:00Z",
        UpdatedAt: "2024-01-01T00:00:00Z",
        Contributors: [{ ID: "contributor1", Name: "Contributor 1" }],
        Attachments: ["attachment"],
      },
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchDocuments();
    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/documents");
    expect(result).toEqual(mockData);
  });

  it("should throw error when fetch fails", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchDocuments()).rejects.toThrow("Failed to fetch documents");
  });
});
