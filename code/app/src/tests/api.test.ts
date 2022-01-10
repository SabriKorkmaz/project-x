import { ValidationMapper } from "../utils/validation.mapper";
import "@types/jest";

describe("Validation mapper", () => {
  test("empty object return true", () => {
    let result = ValidationMapper.keyValidation({});
    expect(result).toEqual(true);
  });
  test("valid object return true", () => {
    let result = ValidationMapper.keyValidation({ id: 0, name: "sabri" });
    expect(result).toEqual(true);
  });
  test("not valid object return false", () => {
    let result = ValidationMapper.keyValidation({ id: 0, name: "" });
    expect(result).toEqual(false);
  });
});

export // Use an empty export to please Babel's single file emit.
// https://github.com/Microsoft/TypeScript/issues/15230
 {};
