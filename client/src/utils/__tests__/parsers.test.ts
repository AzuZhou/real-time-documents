import { describe, it, expect } from "vitest";
import { parseCommaSeparated } from "../parsers";

describe("parseCommaSeparated", () => {
  it("should parse comma-separated values", () => {
    expect(parseCommaSeparated("a, b, c")).toEqual(["a", "b", "c"]);
  });

  it("should handle empty input", () => {
    expect(parseCommaSeparated("")).toEqual([]);
  });

  it("should trim whitespace", () => {
    expect(parseCommaSeparated("  a  ,  b  ,  c  ")).toEqual(["a", "b", "c"]);
  });

  it("should filter out empty values", () => {
    expect(parseCommaSeparated("a, , b,  , c")).toEqual(["a", "b", "c"]);
  });

  it("should handle single value", () => {
    expect(parseCommaSeparated("just me")).toEqual(["just me"]);
  });
});
