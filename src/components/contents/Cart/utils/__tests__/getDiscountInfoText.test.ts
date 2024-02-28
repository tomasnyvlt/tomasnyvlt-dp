import { describe, expect, it } from "@jest/globals";

import { nonBreakingSpace } from "@src/components/contents/Cart/constants";
import { CartDataType } from "@src/components/contents/Cart/types";
import getDiscountInfoText from "@src/components/contents/Cart/utils/getDiscountInfoText";

describe("getDiscountInfoText function", () => {
  it("should return null", () => {
    const data = {} as CartDataType;
    const expectedResult = null;

    expect(getDiscountInfoText(data)).toEqual(expectedResult);
  });

  it("should return text with one discount", () => {
    const discount = `10${nonBreakingSpace}%`;
    const data: CartDataType = {
      discountArr: [discount],
      finalPrice: 100,
      items: [],
      bonusPercentage: null
    };
    const expectedResult = `Cena včetně slevy ${discount}`;

    expect(getDiscountInfoText(data)).toEqual(expectedResult);
  });

  it("should return text with two discounts", () => {
    const discount1 = `10${nonBreakingSpace}%`;
    const discount2 = `25${nonBreakingSpace}%`;

    const data: CartDataType = {
      discountArr: [discount1, discount2],
      finalPrice: 100,
      items: [],
      bonusPercentage: null
    };
    const expectedResult = `Cena včetně slevy ${discount1} a ${discount2}`;

    expect(getDiscountInfoText(data)).toEqual(expectedResult);
  });

  it("should return text with bonus", () => {
    const bonusPercentage = `35${nonBreakingSpace}%`;

    const data: CartDataType = {
      discountArr: [],
      finalPrice: 100,
      items: [],
      bonusPercentage
    };
    const expectedResult = `Cena včetně bonusu ${bonusPercentage}`;

    expect(getDiscountInfoText(data)).toEqual(expectedResult);
  });

  it("should return text with two discounts and bonus", () => {
    const discount1 = `10${nonBreakingSpace}%`;
    const discount2 = `25${nonBreakingSpace}%`;
    const bonusPercentage = `35${nonBreakingSpace}%`;

    const data: CartDataType = {
      discountArr: [discount1, discount2],
      finalPrice: 100,
      items: [],
      bonusPercentage
    };
    const expectedResult = `Cena včetně slevy ${discount1} a ${discount2} a bonusu ${bonusPercentage}`;

    expect(getDiscountInfoText(data)).toEqual(expectedResult);
  });
});
