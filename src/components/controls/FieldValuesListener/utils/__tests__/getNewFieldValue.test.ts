import { describe, expect, it } from "@jest/globals";

import getNewFieldValue, {
  GetNewFieldValueProps
} from "@src/components/controls/FieldValuesListener/utils/getNewFieldValue";
import { OptionType } from "@src/types";

describe("getNewFieldValue function (data-driven-forms util)", () => {
  it("should return new string value", () => {
    const expectedValue = "Mock";
    const attrs: GetNewFieldValueProps = {
      isSelectField: false,
      targetValue: expectedValue
    };

    expect(getNewFieldValue(attrs)).toBe(expectedValue);
  });

  it("should return string value from object target (select)", () => {
    const expectedValue = "Mock";

    const attrs: GetNewFieldValueProps = {
      isSelectField: false,
      targetValue: {
        label: "label",
        value: expectedValue
      } as OptionType,
      nestedKeyValue: "value"
    };

    expect(getNewFieldValue(attrs)).toStrictEqual(expectedValue);
  });

  it("should return new object value for select", () => {
    const expectedValue: OptionType = { label: "Label 2", value: "Mock" };

    const attrs: GetNewFieldValueProps = {
      isSelectField: true,
      targetValue: "Mock",
      selectOptions: [
        {
          label: "Label 1",
          value: "value-1"
        },
        { ...expectedValue },
        {
          label: "Label 3",
          value: "value-3"
        }
      ]
    };

    expect(getNewFieldValue(attrs)).toStrictEqual(expectedValue);
  });
});
