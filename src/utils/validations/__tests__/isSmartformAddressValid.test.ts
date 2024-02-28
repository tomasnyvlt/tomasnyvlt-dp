import { describe, expect, it } from '@jest/globals';

import { addressSmartformValidation } from '@src/utils/validations/addressSmartformValidation';

describe('isSmartformAddressValid function', () => {
  it('knows that value is valid address', () => {
    const value = {
      street: 'Družstevní',
      zip: '66902',
      city: 'Znojmo',
      houseNumber: '662/20',
      addressWhole: 'Družstevní 662/20, Znojmo, 66902',
    };
    expect(addressSmartformValidation(value)).toEqual(true);
  });
});

describe('isSmartformAddressValid function', () => {
  it('knows that value without city is not valid address', () => {
    const value = {
      street: 'Družstevní',
      zip: '66902',
      houseNumber: '662/20',
      addressWhole: 'Družstevní 662/20, Znojmo, 66902',
    };
    expect(addressSmartformValidation(value)).toEqual(false);
  });
});

describe('isSmartformAddressValid function', () => {
  it('knows that value without zip is not valid address', () => {
    const value = {
      street: 'Družstevní',
      houseNumber: '662/20',
      city: 'Znojmo',
      addressWhole: 'Družstevní 662/20, Znojmo, 66902',
    };
    expect(addressSmartformValidation(value)).toEqual(false);
  });
});

describe('isSmartformAddressValid function', () => {
  it('knows that value without street is not valid address', () => {
    const value = {
      zip: '66902',
      city: 'Znojmo',
      houseNumber: '662/20',
      addressWhole: 'Družstevní 662/20, Znojmo, 66902',
    };
    expect(addressSmartformValidation(value)).toEqual(false);
  });
});

describe('isSmartformAddressValid function', () => {
  it('knows that value without houseNumber is not valid address', () => {
    const value = {
      street: 'Družstevní',
      zip: '66902',
      city: 'Znojmo',
      addressWhole: 'Družstevní 662/20, Znojmo, 66902',
    };
    expect(addressSmartformValidation(value)).toEqual(false);
  });
});

describe('isSmartformAddressValid function', () => {
  it('knows that value without addressWhole is not valid address', () => {
    const value = {
      street: 'Družstevní',
      zip: '66902',
      city: 'Znojmo',
      houseNumber: '662/20',
    };
    expect(addressSmartformValidation(value)).toEqual(false);
  });
});
