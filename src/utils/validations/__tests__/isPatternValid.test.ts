import { describe, expect, it } from "@jest/globals";

import { isPatternValid } from "@src/utils/validations/pattern-validations";

describe("isPatternValid function", () => {
  it("should return true for a valid email string", () => {
    const testString = "testovacimail@seznam.cz";
    expect(isPatternValid(testString, "email")).toEqual(true);
  });

  it("should return false for an invalid email string", () => {
    const testString = "testovacimailnasezna4m.c4z";
    expect(isPatternValid(testString, "email")).toEqual(false);
  });

  it("should return true for a string that contains a valid phone with cz/sk prefix", () => {
    const testString = "+420503444930";
    expect(isPatternValid(testString, "phone")).toEqual(true);
  });

  it("should return false for a string that contains an invalid phone without cz/sk prefix", () => {
    const testString = "+40503444930";
    expect(isPatternValid(testString, "phone")).toEqual(false);
  });

  it("should return true for a string that contains only numbers", () => {
    const testString = "45424235436356";
    expect(isPatternValid(testString, "only-number")).toEqual(true);
  });

  it("should return false for a string that contains not only numbers", () => {
    const testString = "45s42423sfs5436356";
    expect(isPatternValid(testString, "only-number")).toEqual(false);
  });

  it("should return true for a string of length inside the range of 0-10", () => {
    const testString = "whocares";
    expect(isPatternValid(testString, /^[a-z]{0,10}$/)).toEqual(true);
  });

  it("should return false for a string of length outside the range of 0-10", () => {
    const testString = "idontcarelol";
    expect(isPatternValid(testString, /^[a-z]{0,10}$/)).toEqual(false);
  });
});
