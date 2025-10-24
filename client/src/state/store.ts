import fetchDocuments from "../api/documents";
import { Document, SortField, SortOrder, SortOption } from "../utils/types";
import { handleDocuments } from "../utils/handlers";
import { STORAGE_KEY } from "../utils/constants";

let documents: Document[] = [];
let currentSort: SortOption = "createdAt-desc";

const getLocalDocuments = (): Document[] => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.log(error);
    return [];
  }
};

const saveLocalDocument = (document: Document) => {
  const localDocuments = getLocalDocuments();
  localDocuments.push(document);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(localDocuments));
};

const sortDocuments = (sortBy: SortOption = "createdAt-desc") => {
  const [field, order] = sortBy.split("-") as [SortField, SortOrder];

  documents.sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (typeof aVal === "string" && typeof bVal === "string") {
      if (field === "version") {
        const comparison = aVal.localeCompare(bVal, undefined, {
          numeric: true,
          sensitivity: "base",
        });

        return order === "asc" ? comparison : -comparison;
      }

      if (field === "title") {
        const comparison = aVal.toLowerCase().localeCompare(bVal.toLowerCase());
        return order === "asc" ? comparison : -comparison;
      }
    }

    if (field === "createdAt") {
      const aTime = new Date(aVal as string).getTime();
      const bTime = new Date(bVal as string).getTime();
      return order === "asc" ? aTime - bTime : bTime - aTime;
    }

    return 0;
  });
};

const loadDocuments = async () => {
  const serverDocuments = await fetchDocuments();
  const normalizedServerDocuments = handleDocuments(serverDocuments);

  const localDocuments = getLocalDocuments();

  documents = [...localDocuments, ...normalizedServerDocuments];

  sortDocuments();
};

const getDocuments = () => documents;

const addDocument = (document: Document) => {
  documents = [document, ...documents];
  saveLocalDocument(document);
  sortDocuments(currentSort);
};

export { addDocument, loadDocuments, getDocuments, sortDocuments };
