import { describe, expect, it } from '@jest/globals';

import { nonBreakingSpace } from '@src/components/contents/Cart/constants';
import { getFormattedPrice } from '@src/utils/getFormattedPrice';

describe('getFormattedPrice function', () => {
  it('should return formated number 85855 to CZK', () => {
    const price = 85855;
    const expectedResult = `85${nonBreakingSpace}855${nonBreakingSpace}Kč`;
    expect(getFormattedPrice({ price })).toEqual(expectedResult);
  });

  it('should return formated number 0 to CZK', () => {
    const price = 0;
    const expectedResult = `0${nonBreakingSpace}Kč`;
    expect(getFormattedPrice({ price })).toEqual(expectedResult);
  });

  it('should return formated price to CZK with year text', () => {
    const price = 50000;
    const expectedResult = `50${nonBreakingSpace}000${nonBreakingSpace}Kč/rok`;
    expect(getFormattedPrice({ price, withYear: true })).toEqual(
      expectedResult
    );
  });
});
