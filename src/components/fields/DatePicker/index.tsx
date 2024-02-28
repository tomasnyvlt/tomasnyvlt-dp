import { x } from "@xstyled/emotion";
import { FC } from "react";

import StyledDatePicker from "@src/components/fields/DatePicker/components/DatePicker";
import DatePickerContextProvider from "@src/components/fields/DatePicker/context/DatePickerContext";
import { DatePickerType } from "@src/types";

const DatePicker: FC<DatePickerType> = (props) => {
  return (
    <x.div position="relative">
      <DatePickerContextProvider datePickerProps={props}>
        <StyledDatePicker />
      </DatePickerContextProvider>
    </x.div>
  );
};

export default DatePicker;
