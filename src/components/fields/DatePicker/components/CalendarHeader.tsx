import { x } from "@xstyled/emotion";
/* eslint-disable import/no-duplicates */
import { format, getYear, isAfter } from "date-fns";
import { cs } from "date-fns/locale";
import { useContext, useEffect, useMemo } from "react";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";

import HeaderDateButton from "@src/components/fields/DatePicker/components/HeaderDateButton";
import NavigationButton from "@src/components/fields/DatePicker/components/NavigationButton";
import { VISIBLE_YEARS_ON_STEP } from "@src/components/fields/DatePicker/constants";
import { DatePickerContext } from "@src/components/fields/DatePicker/context/DatePickerContext";

interface CalendarHeaderProps extends ReactDatePickerCustomHeaderProps {
  monthValue: number | undefined;
  yearValue: number | undefined;
}

const CalendarHeader = ({
  // Custom
  monthValue,
  yearValue,
  // ReactDatePickerCustomHeaderProps
  date,
  // Month
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  decreaseMonth,
  increaseMonth,
  changeMonth,
  // Year
  prevYearButtonDisabled,
  nextYearButtonDisabled,
  decreaseYear,
  increaseYear,
  changeYear
}: CalendarHeaderProps) => {
  const { headerText, calendarType, setCalendarType, parsedDateRange } = useContext(DatePickerContext);

  const visibleYearRange: { start: number; end: number } = useMemo(() => {
    const selectedYear = date.getFullYear();
    const yearModulo = selectedYear % VISIBLE_YEARS_ON_STEP;

    let startYear: number;
    let endYear: number;

    // Is last from visible years
    if (yearModulo === 0) {
      startYear = selectedYear - (VISIBLE_YEARS_ON_STEP - 1);
      endYear = selectedYear;
    } else {
      startYear = selectedYear - yearModulo + 1;
      endYear = startYear + VISIBLE_YEARS_ON_STEP - 1;
    }

    return { start: startYear, end: endYear };
  }, [date]);

  // Bug fix
  // Year datepicker sometimes allow step to next/prev year, even if it is disabled
  const prevDecadeButtonDisabled = !parsedDateRange?.minDate
    ? false
    : isAfter(parsedDateRange.minDate, new Date(visibleYearRange.start, 0, 1));
  const nextDecadeButtonDisabled = !parsedDateRange?.maxDate
    ? false
    : isAfter(new Date(visibleYearRange.end, 0, 1), parsedDateRange.maxDate);

  // Bug fix
  // When month value changes, change month in calendar - default behaviour is sometines buggy due to min/max date
  // e.g. by default when minDate is 16.4.2023 and user selects maxDate 13.10.2023 and then changes month to 4, it will change the value, but calendar will stay in 10.month
  useEffect(() => {
    if (typeof monthValue === "undefined" || Number.isNaN(monthValue)) return;

    changeMonth(monthValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthValue]);

  // Bug fix
  // e.g. year: by default when I have minDate = 1.10.2023 and maxDate = 10.3.2024 and I choose 2024 year and select month that is out of range in year 2023 and then I
  // change year to 2023, it will change the value, but calendar will stay in 2024 year
  useEffect(() => {
    if (typeof yearValue === "undefined" || Number.isNaN(yearValue)) return;

    changeYear(yearValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearValue]);

  return (
    <x.div px="0.25rem">
      {headerText && (
        <x.div>
          <x.p fontWeight="500" fontSize="0.875rem" color="black">
            {headerText}
          </x.p>
        </x.div>
      )}

      <x.div display="flex" alignItems="center" justifyContent="space-between">
        <NavigationButton
          direction="left"
          isDisabled={
            calendarType === "day"
              ? prevMonthButtonDisabled
              : calendarType === "month"
              ? prevYearButtonDisabled
              : prevDecadeButtonDisabled
          }
          onClick={calendarType === "day" ? decreaseMonth : decreaseYear}
        />

        <x.div
          display="flex"
          fontWeight="500"
          color="primary.black"
          fontSize="0.875rem"
          lineHeight="1.125rem"
          data-group
        >
          {calendarType === "day" && (
            <HeaderDateButton
              onClick={() => {
                setCalendarType("month");
              }}
            >
              {format(date, "LLLL", { locale: cs })}
            </HeaderDateButton>
          )}

          <HeaderDateButton
            onClick={
              calendarType === "year"
                ? undefined
                : () => {
                    setCalendarType("year");
                  }
            }
          >
            {calendarType === "year" ? `${visibleYearRange.start} - ${visibleYearRange.end}` : getYear(date)}
          </HeaderDateButton>
        </x.div>

        <NavigationButton
          direction="right"
          isDisabled={
            calendarType === "day"
              ? nextMonthButtonDisabled
              : calendarType === "month"
              ? nextYearButtonDisabled
              : nextDecadeButtonDisabled
          }
          onClick={calendarType === "day" ? increaseMonth : increaseYear}
        />
      </x.div>
    </x.div>
  );
};

export default CalendarHeader;
