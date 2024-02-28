import { x } from '@xstyled/emotion';
import { Icon } from 'anolis-ui';
import { FC, FocusEvent, ForwardedRef, MouseEvent, useContext } from 'react';

import { DatePickerContext } from '@src/components/fields/DatePicker/context/DatePickerContext';
import CalendarIcon from '@src/components/other/icons/24/calendar.svg?react';

interface InputRightElementProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  buttonRef: ForwardedRef<HTMLButtonElement>;
}

const InputRightElement: FC<InputRightElementProps> = ({
  buttonRef,
  onClick,
}) => {
  const { calendarButtonId } = useContext(DatePickerContext);

  /**
   * Stop event propagation to input to prevent input.onFocus or input.onBlur
   * functions from being called when clicking on calendar icon (we want this to call only on input).
   *
   * Without this we have two problems:
   * 1. Input is focused when clicking on calendar icon and we have to click inside datepicker container
   *    to fire onBlur and to be able to click on something in container (without this we need 2 clicks)
   * 2. When we call input.onBlur on datepicker open - now fieldApi thinks that field was active and
   *    fires validation which will show error message even if we didn't touch the field (input)
   */
  const handleFocusEvent = (
    event: FocusEvent<HTMLButtonElement, Element>
  ): void => {
    event.stopPropagation();
  };

  return (
    <x.button
      ref={buttonRef}
      onClick={onClick}
      onFocus={handleFocusEvent}
      onBlur={handleFocusEvent}
      id={calendarButtonId}
      type="button"
      m="0"
      mt="-0.9375rem"
      p="0"
      backgroundColor="transparent"
      borderRadius="50%"
      outlineColor={{ '&:focus-visible': 'primary.greenDirect' }}
      outlineWidth={{
        '&:focus': '0',
        '&:focus-visible': '2px',
      }}
      outlineOffset="0.25rem"
    >
      <Icon svg={<CalendarIcon />} fill="primary.black" />
      <span data-sr-only>Vybrat datum</span>
    </x.button>
  );
};

export default InputRightElement;
