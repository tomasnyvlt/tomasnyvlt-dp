import { describe, expect, it } from "@jest/globals";

import getFormattedDate from "@src/utils/getFormattedDate";

describe("getFormattedDate function", () => {
  it("should return formatted date 1.1.2008 as 2008-01-01", () => {
    const date = "1.1.2008";
    const expectedResult = "2008-01-01";
    expect(getFormattedDate(date)).toEqual(expectedResult);
  });

  it("should return iso date as 2023-08-01", () => {
    const date = "2023-08-01T09:22:16.842Z";
    const expectedResult = "2023-08-01";
    expect(getFormattedDate(date)).toEqual(expectedResult);
  });

  it("should return iso date as 01. 08. 2023", () => {
    const date = "2023-08-01T09:22:16.842Z";
    const expectedResult = "01. 08. 2023";
    expect(getFormattedDate(date, "DD.MM.YYYY")).toEqual(expectedResult);
  });
});
