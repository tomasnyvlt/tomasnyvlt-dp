import { describe, expect, it } from "@jest/globals";

import { FormFieldsType } from "@src/types";
import getSpyFields from "@src/utils/getSpyFields";

describe("getSpyFields function (data-driven-forms util)", () => {
  it("should return an empty object", () => {
    const flattenSchemaWithoutSpyFields: FormFieldsType[] = [
      {
        label: "Label 1",
        name: "name-2",
        component: "text-field"
      },
      {
        label: "Label 2",
        name: "name-2",
        component: "text-field"
      }
    ];

    expect(getSpyFields(flattenSchemaWithoutSpyFields)).toStrictEqual({});
  });

  it("should return object of formated spy fields", () => {
    const flattenSchema: FormFieldsType[] = [
      {
        label: "Label 1",
        name: "name-1",
        component: "text-field",
        spyField: {
          targetName: "name-2",
          action: "copy"
        },
        defaultValue: "default value"
      },
      {
        label: "Label 2",
        name: "name-2",
        component: "text-field"
      },
      {
        label: "Label 2",
        name: "name-2",
        component: "text-field"
      }
    ];

    expect(getSpyFields(flattenSchema)).toStrictEqual({
      "name-1": "default value"
    });
  });
});
