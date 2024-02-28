import { describe, expect, it } from "@jest/globals";

import { ParsedDateRangeType } from "@src/components/fields/DatePicker/types";
import getDefaultCalendarType from "@src/components/fields/DatePicker/utils/getDefaultCalendarType";
import { DefaultCalendarType } from "@src/types";

describe("getDefaultCalendarType.test function", () => {
  it("should return 'year' (2 years range)", () => {
    const minDate = new Date("2021-01-01T00:00:00.000Z");
    const maxDate = new Date("2022-10-01T00:00:00.000Z");
    const defaultCalendarType: DefaultCalendarType = "year";
    const expectedDefaultCalendarType: DefaultCalendarType = defaultCalendarType;

    const parsedDateRange: ParsedDateRangeType = {
      minDate,
      maxDate
    };

    expect(getDefaultCalendarType(parsedDateRange, defaultCalendarType)).toEqual(expectedDefaultCalendarType);
  });

  it("should return 'year' (no maxDate provided)", () => {
    const minDate = new Date("2021-01-01T00:00:00.000Z");
    const defaultCalendarType: DefaultCalendarType = "year";
    const expectedDefaultCalendarType: DefaultCalendarType = defaultCalendarType;

    const parsedDateRange: ParsedDateRangeType = {
      minDate,
      maxDate: undefined
    };

    expect(getDefaultCalendarType(parsedDateRange, defaultCalendarType)).toEqual(expectedDefaultCalendarType);
  });

  it("should return 'year' (no minDate provided)", () => {
    const maxDate = new Date("2021-01-01T00:00:00.000Z");
    const defaultCalendarType: DefaultCalendarType = "year";
    const expectedDefaultCalendarType: DefaultCalendarType = defaultCalendarType;

    const parsedDateRange: ParsedDateRangeType = {
      minDate: undefined,
      maxDate
    };

    expect(getDefaultCalendarType(parsedDateRange, defaultCalendarType)).toEqual(expectedDefaultCalendarType);
  });

  it("should return 'year' (no range provided)", () => {
    const defaultCalendarType: DefaultCalendarType = "year";
    const expectedDefaultCalendarType: DefaultCalendarType = defaultCalendarType;

    const parsedDateRange: ParsedDateRangeType = {
      minDate: undefined,
      maxDate: undefined
    };

    expect(getDefaultCalendarType(parsedDateRange, defaultCalendarType)).toEqual(expectedDefaultCalendarType);
  });

  it("should return 'month' (only 1 year range)", () => {
    const minDate = new Date("2021-01-01T00:00:00.000Z");
    const maxDate = new Date("2021-10-01T00:00:00.000Z");
    const defaultCalendarType: DefaultCalendarType = "year";
    const expectedDefaultCalendarType: DefaultCalendarType = "month";

    const parsedDateRange: ParsedDateRangeType = {
      minDate,
      maxDate
    };

    expect(getDefaultCalendarType(parsedDateRange, defaultCalendarType)).toEqual(expectedDefaultCalendarType);
  });

  it("should return 'month' (5 months range)", () => {
    const minDate = new Date("2021-05-01T00:00:00.000Z");
    const maxDate = new Date("2021-10-01T00:00:00.000Z");
    const defaultCalendarType: DefaultCalendarType = "month";
    const expectedDefaultCalendarType: DefaultCalendarType = defaultCalendarType;

    const parsedDateRange: ParsedDateRangeType = {
      minDate,
      maxDate
    };

    expect(getDefaultCalendarType(parsedDateRange, defaultCalendarType)).toEqual(expectedDefaultCalendarType);
  });

  it("should return 'year' (same month in different year provided)", () => {
    const minDate = new Date("2021-10-01T00:00:00.000Z");
    const maxDate = new Date("2022-10-01T00:00:00.000Z");
    const defaultCalendarType: DefaultCalendarType = "month";
    const expectedDefaultCalendarType: DefaultCalendarType = defaultCalendarType;

    const parsedDateRange: ParsedDateRangeType = {
      minDate,
      maxDate
    };

    expect(getDefaultCalendarType(parsedDateRange, defaultCalendarType)).toEqual(expectedDefaultCalendarType);
  });

  it("should return 'day' (same month in same year provided)", () => {
    const minDate = new Date("2021-10-01T00:00:00.000Z");
    const maxDate = new Date("2021-10-20T00:00:00.000Z");
    const defaultCalendarType: DefaultCalendarType = "month";
    const expectedDefaultCalendarType: DefaultCalendarType = "day";

    const parsedDateRange: ParsedDateRangeType = {
      minDate,
      maxDate
    };

    expect(getDefaultCalendarType(parsedDateRange, defaultCalendarType)).toEqual(expectedDefaultCalendarType);
  });

  it("should return 'day' (no default type provided)", () => {
    const minDate = new Date("2015-10-01T00:00:00.000Z");
    const maxDate = new Date("2021-05-20T00:00:00.000Z");
    const expectedDefaultCalendarType: DefaultCalendarType = "day";

    const parsedDateRange: ParsedDateRangeType = {
      minDate,
      maxDate
    };

    expect(getDefaultCalendarType(parsedDateRange)).toEqual(expectedDefaultCalendarType);
  });

  it("should return 'day' (no dates and no default type provided)", () => {
    const expectedDefaultCalendarType: DefaultCalendarType = "day";

    const parsedDateRange: ParsedDateRangeType = {
      minDate: undefined,
      maxDate: undefined
    };

    expect(getDefaultCalendarType(parsedDateRange)).toEqual(expectedDefaultCalendarType);
  });
});
