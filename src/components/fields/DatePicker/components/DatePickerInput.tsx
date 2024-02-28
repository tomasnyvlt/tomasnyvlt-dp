import { x } from "@xstyled/emotion";
import { Input } from "anolis-ui";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, forwardRef, useContext } from "react";

import InputRightElement from "@src/components/fields/DatePicker/components/InputRightElement";
import { DatePickerContext } from "@src/components/fields/DatePicker/context/DatePickerContext";
import Field from "@src/components/fields/Field";
import { useFieldError } from "@src/hooks/useFieldError";

interface DatePickerInputProps {
  // Input props from react-datepicker
  value: string;
  onClick: () => void;
  // Custom props
  inputValue: string | undefined;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  calendarPortalId: string;
  handleInputOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const DatePickerInput = forwardRef<HTMLButtonElement, DatePickerInputProps>((props, buttonRef) => {
  const { value, inputValue, isOpen, setIsOpen, calendarPortalId, handleInputOnChange } = props;
  const { input, meta, label, helper, isRequired } = useContext(DatePickerContext);
  const { isError, error } = useFieldError({ name: input.name, meta });

  const { submitting, active } = meta;

  const hasValue: boolean = typeof inputValue === "undefined" ? !!value : !!(inputValue as string);

  const handleClickCalendarButton = (event: MouseEvent<HTMLButtonElement>): void => {
    // Stop propagation to prevent input from being focused when clicked on calendar icon
    event.stopPropagation();
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <Field
      fieldActive={active || hasValue}
      isRequired={isRequired}
      isDisabled={submitting}
      isError={isError}
      label={label}
      helper={helper}
      errorText={error}
      cursor="text"
      as="div"
      fieldName={input.name}
    >
      <x.div id={calendarPortalId} position="relative">
        <x.div data-group>
          <Input
            _input={{
              type: "text",
              required: isRequired,
              inputMode: "decimal"
            }}
            value={typeof inputValue === "undefined" ? value : (inputValue as string)}
            onChange={handleInputOnChange}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
            name={input.name}
            disabled={submitting}
            required={isRequired}
            rightElement={<InputRightElement buttonRef={buttonRef} onClick={handleClickCalendarButton} />}
            borderColor={{
              _: isError ? "tercial.red1" : isOpen ? "primary.greenDirect" : "grayscale.gray4",
              groupHover: isError ? "tercial.red1" : "primary.greenDirect"
            }}
            {...(active && { borderColor: isError ? "tercial.red1" : "primary.greenDirect" })}
          />
        </x.div>
      </x.div>
    </Field>
  );
});

DatePickerInput.displayName = "DatePickerInput";

export default DatePickerInput;
