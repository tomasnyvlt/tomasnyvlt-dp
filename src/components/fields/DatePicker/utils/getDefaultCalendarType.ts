import { ParsedDateRangeType } from "@src/components/fields/DatePicker/types";
import { DefaultCalendarType } from "@src/types";

const getDefaultCalendarType = (
  parsedDateRange: ParsedDateRangeType,
  defaultCalendarType: DefaultCalendarType = "day"
): DefaultCalendarType => {
  if (defaultCalendarType === "day") return "day";

  if (!parsedDateRange?.maxDate || !parsedDateRange?.minDate) return defaultCalendarType;

  const startYear = parsedDateRange?.minDate?.getFullYear();
  const endYear = parsedDateRange?.maxDate?.getFullYear();
  const hasMultipleYears = startYear !== endYear;

  const startMonth = parsedDateRange?.minDate?.getMonth();
  const endMonth = parsedDateRange?.maxDate?.getMonth();
  const hasMultipleMonths = hasMultipleYears || startMonth !== endMonth;

  if (!hasMultipleYears && !hasMultipleMonths) return "day";

  if (!hasMultipleYears && defaultCalendarType === "year") return "month";

  return defaultCalendarType;
};

export default getDefaultCalendarType;
