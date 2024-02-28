import { describe, expect, it, jest } from '@jest/globals';

import { personalCzId } from '@src/utils/validations/personalCzId';

describe('personalCzId validation function', () => {
  it('knows that value 12345 is not a valid personal id', () => {
    const value = '12345';

    expect(personalCzId(value).isValid).toEqual(false);
  });

  it('knows that value 6912154249 is a valid personal id', () => {
    const value = '6912154249';

    expect(personalCzId(value).isValid).toEqual(true);
  });

  it('knows that value 98732 is not a valid personal id', () => {
    const value = '98732';

    expect(personalCzId(value).isValid).toEqual(false);
  });

  it('knows that value 6912154249 is a valid personal id', () => {
    const value = '6912154249';

    expect(personalCzId(value).isValid).toEqual(true);
  });

  it('knows that value 7801233540 is a valid personal id', () => {
    const value = '7801233540';

    expect(personalCzId(value).isValid).toEqual(true);
  });

  it('knows that value 360112298 is a valid personal id', () => {
    const value = '360112298';

    expect(personalCzId(value).isValid).toEqual(true);
  });

  it('knows that value 540112299 is not a valid personal id', () => {
    const value = '540112299';

    expect(personalCzId(value).isValid).toEqual(false);
  });

  it('knows that value 5301132992 is not a valid personal id', () => {
    const value = '531313299';

    expect(personalCzId(value).isValid).toEqual(false);
  });

  it('knows that value 540113299 is not valid - personal id after 1954 must be 10 numbers long', () => {
    const value = '540113299';

    expect(personalCzId(value).isValid).toEqual(false);
  });

  it('knows that value 5301132990 is not valid - personal id until 31.12.1953 must be 9 numbers long', () => {
    const value = '5301132990';

    expect(personalCzId(value).isValid).toEqual(false);
  });

  it('knows that value 6202292994 is not valid', () => {
    const value = '6202292994';

    expect(personalCzId(value).isValid).toEqual(false);
  });

  it('knows that value 0002292994 is a valid personal id', () => {
    const value = '0002292994';

    expect(personalCzId(value).isValid).toEqual(true);
  });

  it('knows that value 0102292993 is not valid - not a valid day (leap year)', () => {
    const value = '0102292993';

    expect(personalCzId(value).isValid).toEqual(false);
  });

  it('knows that value 2110222994 is a valid personal id', () => {
    const value = '2110222994';

    expect(personalCzId(value).isValid).toEqual(true);
  });

  it('knows that value 5010222998 is not valid - provided future date of birth', () => {
    const value = '5010222998';

    expect(personalCzId(value).isValid).toEqual(false);
  });

  it('knows that value 0372102995 is not valid - +70 year is possible from 2004', () => {
    const value = '0372102995';

    expect(personalCzId(value).isValid).toEqual(false);
  });

  it('knows that value 0472102994 is a valid personal id', () => {
    const value = '0472102994';

    expect(personalCzId(value).isValid).toEqual(true);
  });

  it('knows that value 0452102992 is a valid personal id', () => {
    const value = '0452102992';

    expect(personalCzId(value).isValid).toEqual(true);
  });

  it('knows that value 6252282993 is a valid personal id', () => {
    const value = '6252282993';

    expect(personalCzId(value).isValid).toEqual(true);
  });

  it('knows that value 0422102912 is a valid personal id', () => {
    const value = '0422102912';

    expect(personalCzId(value).isValid).toEqual(true);
  });

  it('knows that value 0403216363 is a valid personal and returns age 19 (mocked actual date)', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2023, 3, 26)); // 26. 4. 2023

    const value = '0403216363';
    const expectedResult: ReturnType<typeof personalCzId> = {
      isValid: true,
      age: 19,
    };

    expect(personalCzId(value)).toStrictEqual(expectedResult);
  });

  it('knows that value 0372102995 is not a valid personal id and returns no age', () => {
    const value = '0372102995';
    const expectedResult: ReturnType<typeof personalCzId> = {
      isValid: false,
    };

    expect(personalCzId(value)).toStrictEqual(expectedResult);
  });
});
