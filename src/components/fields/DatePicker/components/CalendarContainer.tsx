import { x } from "@xstyled/emotion";
import { FC } from "react";
import { CalendarContainerProps } from "react-datepicker";

const CalendarContainer: FC<CalendarContainerProps> = ({ children }) => {
  return (
    <x.div maxW="21.75rem" mx="auto">
      {children}
    </x.div>
  );
};

export default CalendarContainer;
