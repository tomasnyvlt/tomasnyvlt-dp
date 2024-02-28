import { UseFieldApiProps, useFieldApi, useFormApi } from "@data-driven-forms/react-form-renderer";
import { x } from "@xstyled/emotion";
import { FC } from "react";

import { SwitchFieldType } from "@src/types/formFields";

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> & SwitchFieldType;

const SwitchField: FC<SwitchFieldType> = ({ ...props }) => {
  const { input, hideField, options, css } = useFieldApi(props) as UseFieldApiType;
  const { change } = useFormApi();

  return (
    <x.div
      w="100%"
      background="linear-gradient(90deg, #EAF3AA 0%, #F0F6C3 100%)"
      borderRadius={{ _: "2.8125rem", sm: "7.5rem" }}
      display={hideField ? "none" : "initial"}
      {...css}
    >
      <x.fieldset
        display="flex"
        flexDirection={{ _: "column", sm: "row" }}
        gap={{ _: "0.5rem", sm: "1.25rem" }}
        alignItems="center"
        p="1rem"
      >
        {options?.map((option) => {
          const isChecked = input.value === option.value;

          return (
            <x.label
              h={{ _: "4.375rem", sm: "100%" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              key={option.value}
              w="100%"
              borderRadius={120}
              background={isChecked ? "#fff" : "transparent"}
              border="1px solid"
              borderColor={isChecked ? "grayscale.gray4" : "transparent"}
              boxShadow={isChecked ? "formBox" : "none"}
              transition="background 300ms, border 300ms"
              py="2rem"
              cursor="pointer"
            >
              <x.span
                display="flex"
                alignItems="center"
                flexDirection={{ _: "row", sm: "column" }}
                gap={{ sm: "0.5rem" }}
              >
                <x.input
                  visibility="hidden"
                  display="none"
                  type="radio"
                  value={option.value}
                  checked={isChecked}
                  onChange={() => change(input.name, option.value)}
                />

                <x.span
                  fontSize={options.length > 2 ? "1rem" : "1.25rem"}
                  w="100%"
                  lineHeight="1.5rem"
                  color="primary.blackText"
                  fontFamily="text-sans"
                  textAlign="center"
                  fontWeight={400}
                  whiteSpace="pre-line"
                >
                  {option.label}
                </x.span>
              </x.span>
            </x.label>
          );
        })}
      </x.fieldset>
    </x.div>
  );
};

export default SwitchField;
