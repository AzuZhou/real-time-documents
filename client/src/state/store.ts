import fetchDocuments from "../api/documents";
import { Document } from "../utils/types";
import { handleDocuments } from "../utils/handlers";
import { STORAGE_KEY } from "../utils/constants";

let documents: Document[] = [];

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

const loadDocuments = async () => {
  const serverDocuments = await fetchDocuments();
  const normalizedServerDocuments = handleDocuments(serverDocuments);

  const localDocuments = getLocalDocuments();

  documents = [...localDocuments, ...normalizedServerDocuments];
};

const getDocuments = () => documents;

export { loadDocuments, getDocuments };
