import { useFieldApi, useFormApi } from "@data-driven-forms/react-form-renderer";
import { x } from "@xstyled/emotion";
import { FC } from "react";

import RadioWithInfoField from "@src/components/fields/RadioInfo/RadioWithInfoField";
import { useFieldError } from "@src/hooks/useFieldError";
import { RadioInfoContainerType } from "@src/types";

const RadioInfoContainer: FC<RadioInfoContainerType> = ({ fields, ...props }) => {
  const { input, meta } = useFieldApi(props);
  const { isError, error } = useFieldError({ name: input.name, meta });

  const { change } = useFormApi();

  return (
    <x.fieldset w="100%" h="100%" p={0}>
      <x.div flexDirection="column" display="flex" borderRadius="1.25rem" gap="1.5rem">
        {fields.map((field, index) => {
          return (
            <RadioWithInfoField
              key={`${index.toString()}`}
              isChecked={input.value === field.name}
              onClick={() => change(input.name, field.name)}
              {...field}
            />
          );
        })}
      </x.div>

      {isError && (
        <x.p color="tercial.red1" mt="0.25rem" fontSize="0.875rem">
          {error}
        </x.p>
      )}
    </x.fieldset>
  );
};

export default RadioInfoContainer;
