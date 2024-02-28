interface GetInputDateValueProps {
  newValue: string;
  oldValue: string | undefined;
  isDeleting: boolean;
}

interface GetValidPartProps {
  value: string; // Date part string value
  minValue: number; // Minimum value for date part
  maxValue: number; // Maximum value for date part
  withoutSeparator: boolean; // If true, do not add separator
  requiredValueLength?: number; // Required number of characters for date part - if value is shorter, it is returned as is
}

// Add space with variable so that it is not forgotten and easier to spot
const EMPTY_SPACE = " ";

// MIN and MAX values from angular repo
// https://bitbucket.org/directpojistovna/direct-pojistovna-web-poc-ng/src/b6c70cc6862094aea8a76c4bbd66f83f2ef3b8e2/libs/formly/src/lib/components/date-picker/src/lib/components/date-input/date-input.component.ts#lines-137
const MIN_DAY = 1;
const MAX_DAY = 31;

const MIN_MONTH = 1;
const MAX_MONTH = 12;

const MIN_YEAR = 1900;
const MAX_YEAR = 2100;

/**
 * Get valid date part string value
 */
const getValidPart = ({
  value,
  minValue,
  maxValue,
  withoutSeparator,
  requiredValueLength = 2
}: GetValidPartProps): string => {
  if (value.length < requiredValueLength) return value;

  const valueNumber = Number(value);
  let correctedValue = value;

  if (valueNumber < minValue) {
    correctedValue = `${minValue}`;
  }

  if (valueNumber > maxValue) {
    correctedValue = `${maxValue}`;
  }

  // Remove dot from value and replace it with new separator if required
  const validPart = Number(correctedValue);

  // Minimum number of characters for date part before separator is added
  const MIN_CHARS = 2;

  if (value.length < MIN_CHARS || withoutSeparator) {
    return `${validPart}`;
  }

  // Separator between date parts
  const SEPARATOR = `.${EMPTY_SPACE}`;

  return `${validPart}${SEPARATOR}`;
};

/**
 * Return formatted date for input value
 */
const getInputDateValue = ({ newValue, oldValue, isDeleting }: GetInputDateValueProps): string => {
  // Allow only numbers, dots, and spaces
  const preCleanedValue = newValue
    .replace(/[^0-9., ]/g, "")
    // Replace commas with dots
    .replace(/,/g, ".")
    // Remove leading dots
    .replace(/^\.+/, "")
    // Remove leading whitespace
    .replace(/^\s+/, "")
    // Replace multiple dots and spaces in a row with one dot and space
    .replace(/[.\s]+/g, ". ");

  // Split by dots with limit 3 to prevent adding more than 2 dots
  // Fix for text input - if user is editing year and hits enter, then it
  // will add dot and space to the end of the value which is breaking the regex
  const cleanedValue = preCleanedValue.split(".", 3).join(".");

  if (oldValue === undefined) {
    return cleanedValue;
  }

  // Matches one to three groups of digits separated by dots and/or spaces,
  // representing the day, month (optional), and year (optional).
  // The year can have up to four digits, but only the first four digits will be captured.
  const regex = /^(\d{1,2}\.?)\s*(\d{1,2}\.?)?\s*([\d\s]*)$/;

  const match = cleanedValue.match(regex);

  // No match - return empty string
  if (!match?.length) {
    return "";
  }

  const [_matchValue, day, month, year] = match;

  const validDay = getValidPart({
    value: day,
    minValue: MIN_DAY,
    maxValue: MAX_DAY,
    withoutSeparator: !month && isDeleting
  });
  const validMonth = month
    ? getValidPart({
        value: month,
        minValue: MIN_MONTH,
        maxValue: MAX_MONTH,
        withoutSeparator: !year && isDeleting
      })
    : "";
  const validYear = year
    ? getValidPart({
        value: year.slice(0, 4),
        minValue: MIN_YEAR,
        maxValue: MAX_YEAR,
        withoutSeparator: true,
        requiredValueLength: 4
      })
    : "";

  return `${validDay}${validMonth}${validYear}`;
};

export default getInputDateValue;
