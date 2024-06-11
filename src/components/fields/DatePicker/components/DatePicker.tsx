import { useFormApi } from "@data-driven-forms/react-form-renderer";
/* eslint-disable import/no-duplicates */
import { format, isBefore, lastDayOfMonth } from "date-fns";
import { cs } from "date-fns/locale";
import { ChangeEvent, FC, MouseEvent, useContext, useEffect, useId, useState } from "react";
import _ReactDatePicker from "react-datepicker";

import CalendarContainer from "@src/components/fields/DatePicker/components/CalendarContainer";
import CalendarHeader from "@src/components/fields/DatePicker/components/CalendarHeader";
import DatePickerInput from "@src/components/fields/DatePicker/components/DatePickerInput";
import StyledCalendarContainer from "@src/components/fields/DatePicker/components/StyledCalendarContainer";
import {
  DATE_FORMAT,
  VISIBLE_YEARS_ON_STEP
} from "@src/components/fields/DatePicker/constants";
import { DatePickerContext } from "@src/components/fields/DatePicker/context/DatePickerContext";
import getInputDateValue from "@src/components/fields/DatePicker/utils/getInputDateValue";
import getParsedDate from "@src/components/fields/DatePicker/utils/getParsedDate";

import "react-datepicker/dist/react-datepicker.css";

const ReactDatePicker: typeof _ReactDatePicker = (_ReactDatePicker as any).default;

const DatePicker: FC = () => {
  const { calendarType, setCalendarType, calendarButtonId, parsedDateRange, input, meta } =
    useContext(DatePickerContext);

  const calendarPortalId = useId();

  const { change } = useFormApi();

  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string | undefined>();

  const getDateInRange = (date: Date): Date => {
    const timelessNewDate = date.setHours(0, 0, 0, 0);
    const timelessMaxDate = parsedDateRange.maxDate?.setHours(0, 0, 0, 0)!;
    const timelessMinDate = parsedDateRange.minDate?.setHours(0, 0, 0, 0)!;

    // If new date is out of range, set it to the closest date
    if (parsedDateRange?.minDate && isBefore(timelessNewDate, timelessMinDate)) {
      return parsedDateRange.minDate;
    }

    if (parsedDateRange?.maxDate && isBefore(timelessMaxDate, timelessNewDate)) {
      return parsedDateRange.maxDate;
    }

    return date;
  };

  const getDatePartsFromString = (dateString: string): string[] => {
    const parts = dateString.split(".");
    const trimmedParts = parts.map((part) => part.trim());

    return trimmedParts;
  };

  const getNewDateFromCalendarPick = (date: Date): Date => {
    // When setting only year or month, we need to keep the day value and set only year or month based on calendar type
    const newDate = getParsedDate(calendarType === "day" ? date : getParsedDate(input.value) ?? date) as Date;

    if (calendarType === "year") {
      newDate.setFullYear(date.getFullYear());
    }

    if (calendarType === "month") {
      newDate.setMonth(date.getMonth());
    }

    const dateInRange = getDateInRange(newDate);

    return dateInRange;
  };

  const handleOnCalendarChange = (date: Date | null): void => {
    if (!date) return;

    const newDate = getNewDateFromCalendarPick(date);

    // ISO formated date for request
    const isoDate = newDate.toISOString();
    change(input.name, isoDate);

    // Datepicker value
    const parsedDate = getParsedDate(isoDate);

    if (!parsedDate) {
      setInputValue("");
      return;
    }

    setInputValue(format(parsedDate, DATE_FORMAT));
  };

  const handleOnCalendarSelect = (): void => {
    if (calendarType === "day") {
      setIsOpen(false);
      return;
    }

    if (calendarType === "year") {
      setCalendarType("month");
      return;
    }

    setCalendarType("day");
  };

  // Prevent closing functionality when clicking on calendar icon
  const handleClickOutside = (event: MouseEvent): void => {
    // Get calendar button element with id because ref is used by react-datepicker
    const calendarButtonEl = document.getElementById(calendarButtonId);

    // If calendar button element is clicked do not close calendar (let button onClick handler do it)
    if (calendarButtonEl && calendarButtonEl.contains(event.target as Node)) return;

    setIsOpen(false);
  };

  const handleInputOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value: newValue, selectionStart } = event.target;
    const oldValue = inputValue;

    // Allow user to write only when caret is at the end of input to prevent buggy formatting
    if (selectionStart !== newValue.length) return;

    const isDeleting = newValue.length < (oldValue?.length ?? 0);

    const newInputValue = getInputDateValue({ newValue, oldValue, isDeleting });
    setInputValue(newInputValue);

    // Get parts of date
    const [day, month, year] = getDatePartsFromString(newInputValue);

    // Set input value to formatted date - can be invalid date
    // -> Handle with validate type date (in schema)
    change(input.name, newInputValue);

    if ((year ?? "").length < 4) {
      return;
    }

    // Check last day of month
    const lastDayOfProvidedMonth = lastDayOfMonth(new Date(Number(year), Number(month) - 1)).getDate();
    const validLastDayOfMonth = lastDayOfProvidedMonth < Number(day) ? lastDayOfProvidedMonth : Number(day);

    const date = new Date(Number(year), Number(month) - 1, Number(validLastDayOfMonth));

    if (!date) {
      return;
    }

    const dateInRange = getDateInRange(date);

    const formattedDateInRange = format(dateInRange, DATE_FORMAT);
    setInputValue(formattedDateInRange);

    const isoDate = dateInRange.toISOString();
    change(input.name, isoDate);
  };

  // Close calendar on ESC
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isOpen || event.key !== "Escape") return;

    setIsOpen(false);
  };

  useEffect(() => {
    // Fire input.onBlur() when calendar is closed to trigger validation
    if (isOpen === false) {
      input.onBlur();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Clear input value state when input has no value (mainly because of cleared with spyField)
  useEffect(() => {
    if (input.value) return;

    setInputValue(undefined);
  }, [input.value]);

  return (
    <StyledCalendarContainer>
      <ReactDatePicker
        disabled={meta.submitting}
        locale={cs}
        dateFormat={DATE_FORMAT}
        open={isOpen}
        selected={getParsedDate(input.value)}
        minDate={parsedDateRange.minDate}
        maxDate={parsedDateRange.maxDate}
        selectsStart
        renderCustomHeader={(headerProps) => (
          <CalendarHeader
            {...headerProps}
            monthValue={getParsedDate(input.value)?.getMonth()}
            yearValue={getParsedDate(input.value)?.getFullYear()}
          />
        )}
        calendarContainer={(containerProps) => <CalendarContainer {...containerProps} />}
        customInput={
          <DatePickerInput
            // Fix props type eslint error due to customInput props incomplete types
            {...({} as any)}
            inputValue={inputValue}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            calendarPortalId={calendarPortalId}
            handleInputOnChange={handleInputOnChange}
          />
        }
        // Month
        showMonthYearPicker={calendarType === "month"}
        showFullMonthYearPicker={calendarType === "month"}
        // Year
        showYearPicker={calendarType === "year"}
        yearItemNumber={VISIBLE_YEARS_ON_STEP}
        // Placement settings
        portalId={calendarPortalId}
        showPopperArrow={false}
        popperPlacement="bottom"
        popperModifiers={[
          {
            name: "flip",
            enabled: false
          },
          {
            name: "offset",
            enabled: false
          }
        ]}
        // Function handlers (call onChange before onSelect)
        onClickOutside={handleClickOutside}
        onChange={handleOnCalendarChange}
        onSelect={handleOnCalendarSelect}
      />
    </StyledCalendarContainer>
  );
};

export default DatePicker;
