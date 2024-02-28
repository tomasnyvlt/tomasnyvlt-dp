import { isValid, parseISO } from "date-fns";

// Validate and return date object from iso string
const getParsedDate = (date: string | Date | undefined | null): Date | undefined => {
  if (!date) return undefined;

  if (typeof date === "string") {
    const parsedDate = parseISO(date);
    return isValid(parsedDate) ? parsedDate : undefined;
  }

  return isValid(date) ? date : undefined;
};

export default getParsedDate;
