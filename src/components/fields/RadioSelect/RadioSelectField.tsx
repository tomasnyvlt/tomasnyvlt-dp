import { x } from "@xstyled/emotion";
import { FC, InputHTMLAttributes, useId } from "react";

import { RadioSelectFieldOptionType } from "@src/types/formFields";

interface RadioSelectFieldProps
  extends Required<Pick<InputHTMLAttributes<HTMLInputElement>, "onChange" | "onFocus" | "onBlur">> {
  name: string;
  option: RadioSelectFieldOptionType;
  isChecked: boolean;
}

const RadioSelectField: FC<RadioSelectFieldProps> = ({ option, onBlur, onChange, onFocus, isChecked, name }) => {
  // TODO: Najit zpusob jak napojit na asistenci, otvirani/zavirani

  const { price, label, value } = option;
  const id = useId();

  return (
    <x.label
      px="0"
      display="flex"
      borderBottom={{ "&:not(:last-child)": "1px solid" }}
      borderBottomColor={{ "&:not(:last-child)": "grayscale.gray4" }}
      justifyContent="space-between"
      alignItems="center"
      cursor="pointer"
      gap="0.5rem"
    >
      <x.input
        display="none"
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
      />
      <x.div display="flex" alignItems="center" justifyContent="center">
        <x.span
          display="flex"
          alignItems="center"
          justifyContent="center"
          mr="0.875rem"
          my="1rem"
          minWidth="1.5rem"
          minH="1.5rem"
          border="1px solid"
          borderColor="primary.greenDirect"
          bg="primary.greenDirect10"
          borderRadius="50%"
          flex="0 0 auto"
          cursor="pointer"
        >
          <x.span
            w="1rem"
            h="1rem"
            backgroundColor={isChecked ? "primary.greenDirect" : "transparent"}
            borderRadius="50%"
            transition="background-color 300ms"
          />
        </x.span>
        <x.span fontSize="0.875rem" lineHeight="1.125rem" color="primary.black" fontWeight="500">
          Limit {label} Kč
        </x.span>
      </x.div>

      <x.span fontSize="0.875rem" lineHeight="1.125rem" color="grayscale.gray2" fontWeight="500">
        {price}
      </x.span>
    </x.label>
  );
};

export default RadioSelectField;
