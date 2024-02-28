import { describe, expect, it } from '@jest/globals';

import { SMARTFORM_WHOLE_ADDRESS_SUFFIX } from '@src/constants/fields';
import getFilteredFields from '@src/schema/components/RestCalculation/utils/getFilteredFields';

describe('getFilteredFields function', () => {
  it('returns array without changes', () => {
    const arr: string[] = ['one', 'two', 'mock'];
    const expectedResult: string[] = [...arr];

    expect(getFilteredFields(arr)).toStrictEqual(expectedResult);
  });

  it('unifies select keys', () => {
    const arr: string[] = [
      'selectField.label',
      'selectField.value',
      'one',
      'two',
      'mock',
      'nextSelectField.label',
      'nextSelectField.value',
      'another.nested',
    ];
    const expectedResult: string[] = [
      'selectField',
      'one',
      'two',
      'mock',
      'nextSelectField',
      'another.nested',
    ];

    expect(getFilteredFields(arr)).toStrictEqual(expectedResult);
  });

  it('should filter out smartform-field suffix and return it without it', () => {
    const arr: string[] = [
      'selectField.label',
      'selectField.value',
      'one',
      'two',
      'mock',
      `partner.address.${SMARTFORM_WHOLE_ADDRESS_SUFFIX}`,
    ];
    const expectedResult: string[] = [
      'selectField',
      'one',
      'two',
      'mock',
      'partner.address',
    ];

    expect(getFilteredFields(arr)).toStrictEqual(expectedResult);
  });

  it('returns empty array', () => {
    expect(getFilteredFields([])).toStrictEqual([]);
  });
});
