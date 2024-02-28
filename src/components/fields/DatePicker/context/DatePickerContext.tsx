import { UseFieldApiProps, useFieldApi } from "@data-driven-forms/react-form-renderer";
import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useId, useMemo, useState } from "react";

import { ParsedDateRangeType } from "@src/components/fields/DatePicker/types";
import getDefaultCalendarType from "@src/components/fields/DatePicker/utils/getDefaultCalendarType";
import getParsedDate from "@src/components/fields/DatePicker/utils/getParsedDate";
import { DatePickerType, DefaultCalendarType } from "@src/types";

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> & DatePickerType;

interface DatePickerContextProps {
  datePickerProps: DatePickerType;
}

interface DatePickerContextType extends UseFieldApiType {
  calendarType: DefaultCalendarType;
  setCalendarType: Dispatch<SetStateAction<DefaultCalendarType>>;
  calendarButtonId: string;
  parsedDateRange: ParsedDateRangeType;
}

export const DatePickerContext = createContext<DatePickerContextType>({} as DatePickerContextType);

const DatePickerContextProvider: FC<PropsWithChildren<DatePickerContextProps>> = ({ children, datePickerProps }) => {
  const fieldData = useFieldApi(datePickerProps) as UseFieldApiType;
  const { defaultCalendarType, maxDate, minDate } = fieldData;

  // Validate and parse ISO date to Date object
  const parsedDateRange: ParsedDateRangeType = useMemo(
    () => ({
      minDate: getParsedDate(minDate),
      maxDate: getParsedDate(maxDate)
    }),
    [minDate, maxDate]
  );

  const [calendarType, setCalendarType] = useState<DefaultCalendarType>(
    getDefaultCalendarType(parsedDateRange, defaultCalendarType)
  );

  const calendarButtonId = useId();

  const datePickerContextValue: DatePickerContextType = useMemo(() => {
    return {
      ...fieldData,
      calendarType,
      setCalendarType,
      calendarButtonId,
      parsedDateRange
    };
  }, [fieldData, calendarType, calendarButtonId, parsedDateRange]);

  return <DatePickerContext.Provider value={datePickerContextValue}>{children}</DatePickerContext.Provider>;
};

export default DatePickerContextProvider;
