import { describe, expect, it } from "@jest/globals";

import getParsedDate from "@src/components/fields/DatePicker/utils/getParsedDate";

describe("getParsedDate function", () => {
  it("should return same date because it is valid Date type", () => {
    const date = new Date("2021-01-01T00:00:00.000Z");

    expect(getParsedDate(date)).toEqual(date);
  });

  it("should return valid Date from ISO", () => {
    const iso = "2021-01-01T00:00:00.000Z";
    const date = new Date(iso);

    expect(getParsedDate(iso)).toEqual(date);
  });

  it("should return undefined on invalid date", () => {
    const invalidDate = new Date("some_dirty_date");

    expect(getParsedDate(invalidDate)).toEqual(undefined);
  });

  it("should return undefined because string is invalid", () => {
    const invalidString = "some_dirty_date";

    expect(getParsedDate(invalidString)).toEqual(undefined);
  });

  it("should return undefined because date was not provided", () => {
    const date = null;

    expect(getParsedDate(date)).toEqual(undefined);
  });
});
