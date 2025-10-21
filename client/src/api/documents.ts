import { ApiDocument } from "../utils/types";

const fetchDocuments = async (): Promise<ApiDocument[]> => {
  const res = await fetch("http://localhost:8080/documents");

  if (!res.ok) throw new Error("Failed to fetch documents");

  return res.json();
};

export default fetchDocuments;
