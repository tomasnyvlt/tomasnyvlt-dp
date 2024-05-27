import { SystemProps, x } from "@xstyled/emotion";
import { FC, InputHTMLAttributes, useId } from 'react';

import Tag from "@src/components/contents/Tag";
import { RadioFrequencyButtonOptionFieldType } from "@src/types/formFields";

interface RadioFrequencyButtonProps
  extends Required<Pick<InputHTMLAttributes<HTMLInputElement>, "onChange" | "onFocus" | "onBlur">> {
  name: string;
  option: RadioFrequencyButtonOptionFieldType;
  isChecked: boolean;
  buttonCss: SystemProps;
}

const RadioFrequencyButton: FC<RadioFrequencyButtonProps> = ({
  onChange,
  onBlur,
  onFocus,
  name,
  isChecked,
  option,
  buttonCss
}) => {
  const id = useId();
  const { frequency, value, label, price, size } = option;

  return (
    <x.div
      minH="6rem"
      display="flex"
      justifyContent="flex-start"
      flexDirection="column"
      alignItems="center"
      {...buttonCss}
    >
      <x.label
        htmlFor={id}
        color="primary.black"
        fontSize="0.75rem"
        fontWeight="500"
        fontFamily="poppins"
        textAlign="center"
        cursor="pointer"
      >
        <x.span display="block" pb="0.5rem">
          {label}
        </x.span>

        <x.span position="relative" display="flex">
          {frequency === 1 && <Tag>Sleva 6&nbsp;%</Tag>}

          <x.span
            py="1.125rem"
            h="3.5rem"
            minWidth={size === "sm" ? { _: "16.25rem", sm: "11.8125rem" } : "16.125rem"}
            maxW="100%"
            borderRadius="1.75rem"
            background="linear-gradient(90deg, #EAF3AA 0%, #F0F6C3 100%);"
            display="flex"
            alignItems="center"
          >
            <x.input
              display="none"
              type="radio"
              id={id}
              name={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              onFocus={onFocus}
            />

            <x.span
              ml="1rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
              minWidth="1.5rem"
              minH="1.5rem"
              border="1px solid"
              borderColor="primary.greenDirect"
              bg="primary.white"
              borderRadius="50%"
              flex="0 0 auto"
              cursor="pointer"
            >
              <x.span
                minWidth="1rem"
                minH="1rem"
                bg={isChecked ? "primary.greenDirect" : "primary.white"}
                borderRadius="50%"
                transition="bg 300ms"
              />
            </x.span>
          </x.span>

          <x.span
            minWidth={size === "sm" ? { _: "12.875rem", sm: "8.625rem" } : "12.75rem"}
            minH="100%"
            boxShadow="radiofield"
            backgroundColor="primary.white"
            border="1px solid"
            borderColor={isChecked ? "primary.greenDirect" : "transparent"}
            position="absolute"
            transition="border-color 300ms"
            borderRadius="1.75rem"
            top="0"
            right="0"
            zIndex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <x.span
              style={{ wordBreak: "break-word" }}
              fontWeight="500"
              color="primary.black"
              fontSize={size === "sm" ? "0.875rem" : "1.125rem"}
            >
              <x.span>{frequency} x </x.span>
              {price?.toLocaleString("cs-CZ")} Kč
            </x.span>
          </x.span>
          <x.span data-sr-only>{label}</x.span>
        </x.span>
      </x.label>
    </x.div>
  );
};

export default RadioFrequencyButton;
