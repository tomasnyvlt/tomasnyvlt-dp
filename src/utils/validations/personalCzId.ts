import { differenceInYears, isBefore, isEqual, isLeapYear } from "date-fns";

interface Output {
  isValid: boolean;
  age?: number;
}

export function personalCzId(incomingValue: string | number): Output {
  /* Value is required */
  if (!incomingValue) return { isValid: false };

  const value = incomingValue.toString();

  const year = parseInt(value.substring(0, 2), 10);
  let month = parseInt(value.substring(2, 4), 10);
  const day = parseInt(value.substring(4, 6), 10);

  if (month < 1 || month > 82 || day < 1 || day > 31) {
    return { isValid: false };
  }

  let wholeYear = year;

  if (value.length === 9 || (value.length === 10 && year >= 54)) {
    wholeYear += 1900;
  } else {
    wholeYear += 2000;
  }

  // Personal id should be 10 numbers long from 1.1.1954.
  if (value.length === 9 && wholeYear >= 1954) {
    return { isValid: false };
  }

  // Personal id should be 9 numbers long until 31.12.1953.
  if (value.length === 10 && wholeYear < 1954) {
    return { isValid: false };
  }

  // Women usually have their personal id year composed as their year of birth + 50
  if (month >= 51 && month <= 62) {
    month -= 50;
  }

  // Men can have their personal id year composed as their year of birth + 20 (it's possible from year 2004)
  if (month >= 21 && month <= 32 && wholeYear >= 2004) {
    month -= 20;
  }

  // Women can also have their personal id year composed as their year of birth + 70 (it's possible from year 2004)
  if (month >= 71 && month <= 82 && wholeYear >= 2004) {
    month -= 70;
  }

  // Personal number is invalid if no conditions were met
  if (month > 12) {
    return { isValid: false };
  }

  // Month is 0-indexed
  const dateOfBirth = new Date(wholeYear, month - 1, day);

  // Get rid of time before comparing
  const timelessDateOfBirth = dateOfBirth.setHours(0, 0, 0, 0);
  const today = new Date(Date.now()).setHours(0, 0, 0, 0);

  // Check if provided date of birth is in future
  const isValidDateOfBirth = isBefore(timelessDateOfBirth, today) || isEqual(timelessDateOfBirth, today);

  if (!isValidDateOfBirth) {
    return { isValid: false };
  }

  // Because of bug in date-fns "isValid" function, check valid days of month in switch
  switch (month) {
    case 2: {
      const isLeap = isLeapYear(dateOfBirth);

      if (isLeap && day > 29) {
        return { isValid: false };
      }

      if (!isLeap && day > 28) {
        return { isValid: false };
      }

      break;
    }
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      if (day > 31) {
        return { isValid: false };
      }
      break;
    case 4:
    case 6:
    case 9:
    case 11:
    default:
      if (day > 30) {
        return { isValid: false };
      }
      break;
  }

  const age: number = differenceInYears(today, timelessDateOfBirth);

  // If length is 9, and before 54 year, then assume as correct personal id
  if (value.length === 9 && year < 54) {
    return { isValid: true, age };
  }

  // If personalId mod 11 === 0, then it's a valid personal id
  if (parseInt(value, 10) % 11 === 0) {
    return { isValid: true, age };
  }

  // It can happen, that valid personal id mod 11 is not a zero
  // then...
  // 1. Take mod 11 of first 9 numbers (eq. X)
  // 2. If the X is equal to 10, then the last number of value must be 0
  const lastNumber = parseInt(value[value.length - 1], 10);
  const firstNineNumbers = value.substring(0, 9);
  const rest = parseInt(firstNineNumbers, 10) % 11;

  // If rest === 10, the last number must be 0
  if (rest === 10) {
    const isValid = lastNumber === 0;

    return isValid ? { isValid, age } : { isValid };
  }

  return { isValid: false };
}
