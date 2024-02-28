import { x } from "@xstyled/emotion";
import { OptionProps, components } from "react-select";

import { OptionDecorDataType, OptionType } from "@src/types";

const Option = (props: OptionProps<OptionType>) => {
  const { children, isSelected, selectProps } = props;

  // TODO MS types
  // @ts-ignore
  const data = (selectProps?.optionsData as OptionDecorDataType[])?.find((option) => option.value === props?.value);

  return (
    <components.Option {...props}>
      <x.div display="flex" alignItems="center" gap="1rem" p="1rem" minH="4.375rem">
        {/* Bullet */}
        <x.div>
          <x.div
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="primary.greenDirect10"
            w="1.5rem"
            h="1.5rem"
            border="1px solid"
            borderColor="primary.greenDirect"
            borderRadius="50%"
          >
            <x.div
              w="1rem"
              h="1rem"
              bg={isSelected ? "primary.greenDirect" : "transparent"}
              borderRadius="50%"
              transition="background-color 300ms"
            />
          </x.div>
        </x.div>

        {/* Info */}
        <x.div style={{ wordBreak: "break-word" }} fontSize="0.875rem" lineHeight="1.125rem">
          <x.div
            color="primary.black"
            fontWeight={500}
            mb={{ "&:not(:last-of-type)": "0.125rem" }}
            whiteSpace={{
              _: "pre-line",
              sm: "normal"
            }}
          >
            {children}
          </x.div>

          {data?.info && <x.div color="grayscale.gray2">{data.info}</x.div>}
        </x.div>
      </x.div>
    </components.Option>
  );
};

export default Option;
