const regexPatterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  "only-number": /^[0-9]*$/,
  phone: /^(\+420|\+421) ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  "iso-date": /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/
};

type PatternType = keyof typeof regexPatterns;

export function isPatternValid(value: string, pattern: PatternType | RegExp): boolean {
  if (!value) return false;

  if (pattern instanceof RegExp) {
    return pattern.test(value);
  }

  return regexPatterns[pattern].test(value);
}
