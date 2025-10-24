const parseCommaSeparated = (input: string): string[] => {
  if (!input) return [];

  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

export { parseCommaSeparated };
