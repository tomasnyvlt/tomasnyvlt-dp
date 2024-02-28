import { describe, expect, it } from "@jest/globals";

import { FAKE_FIELD_NAME_PREFIX } from "@src/components/contents/ValidationInfo/constants";
import getFullErrorKeys from "@src/utils/getFullErrorKeys";

describe("getFullErrorKeys function (data-driven-forms util)", () => {
  it("should return string array of full error keys from provided object", () => {
    const errorsObject: Record<string, any> = {
      person: {
        name: {
          first: "First name is required",
          last: "Last name is required"
        }
      },
      address: {
        street: "Street is required",
        city: "City is required",
        zip: "Zip is required"
      }
    };

    const expectedResult: string[] = [
      "person.name.first",
      "person.name.last",
      "address.street",
      "address.city",
      "address.zip"
    ];

    expect(getFullErrorKeys({ errorsObject })).toStrictEqual(expectedResult);
  });

  it("should return string array of full error keys from provided object", () => {
    const errorsObject: Record<string, any> = {
      phone: "Phone is required",
      address: {
        street: "Street is required"
      }
    };

    const expectedResult: string[] = ["phone", "address.street"];

    expect(getFullErrorKeys({ errorsObject })).toStrictEqual(expectedResult);
  });

  it("should return '[person.name.last]' from provided object and parentKey", () => {
    const errorsObject: Record<string, any> = {
      last: "Last name is required"
    };
    const parentKey = "person.name";

    const expectedResult: string[] = ["person.name.last"];

    expect(getFullErrorKeys({ errorsObject, parentKey })).toStrictEqual(expectedResult);
  });

  it("should filter out keys that starts with `FAKE_FIELD_NAME_PREFIX`", () => {
    const errorsObject: Record<string, any> = {
      [`${FAKE_FIELD_NAME_PREFIX}-foo`]: "First name is required",
      [`${FAKE_FIELD_NAME_PREFIX}-bar`]: "First name is required",
      person: {
        address: "Address is required"
      }
    };

    const expectedResult: string[] = ["person.address"];

    expect(getFullErrorKeys({ errorsObject })).toStrictEqual(expectedResult);
  });

  it("should return empty array from empty object", () => {
    const errorsObject: Record<string, any> = {};

    expect(getFullErrorKeys({ errorsObject })).toStrictEqual([]);
  });

  it("should return empty array from null", () => {
    const errorsObject: Record<string, any> = null as any;

    expect(getFullErrorKeys({ errorsObject })).toStrictEqual([]);
  });
});
