import { useFieldApi } from "@data-driven-forms/react-form-renderer";
import { x } from "@xstyled/emotion";
import { FC } from 'react';

import Option from "@src/components/fields/RadioImage/components/Option";
import { useFieldError } from "@src/hooks/useFieldError";
import { RadioImageFieldType } from "@src/types";

const RadioImage: FC<RadioImageFieldType> = ({ css, ...props }) => {
  const { label, input, meta } = useFieldApi(props);
  const { isError, error } = useFieldError({ name: input.name, meta });

  const { options } = props;
  const { name, value, onBlur, onChange, onFocus } = input;

  return (
    <x.fieldset m={0} p={0} {...css}>
      <legend data-sr-only>{label}</legend>

      <x.div display="grid" gap="0.5rem" gridTemplateColumns={{ _: "repeat(3, 1fr)", sm: "repeat(6, 1fr)" }}>
        {options.map((option) => (
          <Option
            key={option.value}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            isChecked={option.value === value}
            {...option}
          />
        ))}
      </x.div>

      {isError && (
        <x.p color="tercial.red1" mt="0.25rem" fontSize="0.875rem">
          {error}
        </x.p>
      )}
    </x.fieldset>
  );
};

export default RadioImage;
