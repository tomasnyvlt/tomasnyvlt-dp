import { describe, expect, it } from "@jest/globals";

import getInputDateValue from "@src/components/fields/DatePicker/utils/getInputDateValue";

describe("getInputDateValue function", () => {
  it("should return same date as newValue because its format is valid", () => {
    const newValue = "2. 2. 2022";
    const oldValue = "2. 2. 2022";

    const expectedResult = "2. 2. 2022";

    expect(
      getInputDateValue({
        newValue,
        oldValue,
        isDeleting: false
      })
    ).toEqual(expectedResult);
  });

  it("should return same date with 4 chars long year even when newValue has 5 chars long year", () => {
    const newValue = "2. 2. 20229";
    const oldValue = "2. 2. 2022";

    const expectedResult = "2. 2. 2022";

    expect(
      getInputDateValue({
        newValue,
        oldValue,
        isDeleting: false
      })
    ).toEqual(expectedResult);
  });

  it("should add dot and space after full day", () => {
    const newValue = "12";
    const oldValue = "1";

    const expectedResult = "12. ";

    expect(
      getInputDateValue({
        newValue,
        oldValue,
        isDeleting: false
      })
    ).toEqual(expectedResult);
  });

  it("should remove dot and space on delete", () => {
    const newValue = "12.";
    const oldValue = "12. ";

    const expectedResult = "12";

    expect(
      getInputDateValue({
        newValue,
        oldValue,
        isDeleting: true
      })
    ).toEqual(expectedResult);
  });

  it("should replace 99 with 31 (max day limit) and add dot and space", () => {
    const newValue = "99";
    const oldValue = "9";

    const expectedResult = "31. ";

    expect(
      getInputDateValue({
        newValue,
        oldValue,
        isDeleting: false
      })
    ).toEqual(expectedResult);
  });

  it("should replace 00 with 1 (min day limit) and add dot and space", () => {
    const newValue = "00";
    const oldValue = "0";

    const expectedResult = "1. ";

    expect(
      getInputDateValue({
        newValue,
        oldValue,
        isDeleting: false
      })
    ).toEqual(expectedResult);
  });

  it("should replace newValue without change because oldValue was in initial undefined state", () => {
    const newValue = "1";
    const oldValue = undefined;

    const expectedResult = "1";

    expect(
      getInputDateValue({
        newValue,
        oldValue,
        isDeleting: false
      })
    ).toEqual(expectedResult);
  });

  it("should return empty string because regex did not match anything", () => {
    const newValue = "";
    const oldValue = "1";

    const expectedResult = "";

    expect(
      getInputDateValue({
        newValue,
        oldValue,
        isDeleting: true
      })
    ).toEqual(expectedResult);
  });

  it("should return 99 month replaced with max month 12 and added dot and space", () => {
    const newValue = "11. 99";
    const oldValue = "11. 9";

    const expectedResult = "11. 12. ";

    expect(
      getInputDateValue({
        newValue,
        oldValue,
        isDeleting: false
      })
    ).toEqual(expectedResult);
  });

  it("should return 11. 12 when deleting from first year position (remove additional space and dot)", () => {
    const newValue = "11. 12.";
    const oldValue = "11. 12. ";

    const expectedResult = "11. 12";

    expect(
      getInputDateValue({
        newValue,
        oldValue,
        isDeleting: true
      })
    ).toEqual(expectedResult);
  });

  it("should ignore spaces in year part", () => {
    const newValue = "11. 12. 99 ";
    const oldValue = "11. 12. 9";

    const expectedResult = "11. 12. 99";

    expect(
      getInputDateValue({
        newValue,
        oldValue,
        isDeleting: false
      })
    ).toEqual(expectedResult);
  });

  it("should change 9999 year to max year value 2100", () => {
    const newValue = "11. 12. 9999";
    const oldValue = "11. 12. 999";

    const expectedResult = "11. 12. 2100";

    expect(
      getInputDateValue({
        newValue,
        oldValue,
        isDeleting: false
      })
    ).toEqual(expectedResult);
  });
});
