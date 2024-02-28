import { UseFieldApiProps, useFieldApi, useFormApi } from "@data-driven-forms/react-form-renderer";
import { Input } from "anolis-ui";
import { FC, FormEvent } from "react";

import Field from "@src/components/fields/Field";
import { useFieldError } from "@src/hooks/useFieldError";
import { TextFieldType } from "@src/types";

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> &
  Pick<TextFieldType, "label" | "isRequired" | "helper" | "isDisabled" | "hideField">;

const TextField: FC<TextFieldType> = ({ helperCss, onBeforeChange, onChange, ...props }) => {
  const { label, input, isRequired, meta, helper, isDisabled, hideField, inputProps } = useFieldApi(
    props
  ) as UseFieldApiType;
  const { isError, error } = useFieldError({ name: input.name, meta });
  const formOptions = useFormApi();

  const fieldActive = meta.active || input.value || input.value === 0 || inputProps?.placeholder;

  const handleInputOnChange = (event: FormEvent<HTMLInputElement>) => {
    if (onBeforeChange) {
      // eslint-disable-next-line no-param-reassign
      event.currentTarget.value = onBeforeChange(event.currentTarget.value);
    }

    // Prevents input from exceeding maxLength for number inputs
    if (
      inputProps?._input?.type === "number" &&
      !!inputProps?._input?.maxLength &&
      event.currentTarget.value.length > inputProps._input.maxLength
    ) {
      return;
    }
    if (onChange) onChange(event.currentTarget.value, formOptions);
    input.onChange(event);
  };

  return (
    <Field
      fieldActive={fieldActive}
      isRequired={isRequired}
      isDisabled={isDisabled || meta.submitting}
      isError={isError}
      label={label}
      helper={helper}
      helperCss={helperCss}
      errorText={error}
      cursor="text"
      hideField={hideField}
      fieldName={input.name}
    >
      {props.textarea ? (
        <Input
          {...inputProps}
          disabled={isDisabled || meta.submitting}
          cursor="inherit"
          required={isRequired}
          multiline
          h="10rem"
          {...(isError && { borderColor: "tercial.red1" })}
          _textarea={{
            h: "7rem",
            ...input,
            disabled: isDisabled || meta.submitting,
            ...inputProps?._textarea,
            onFocus: input.onFocus,
            onBlur: input.onBlur,
            onChange: input.onChange,
            ...(isDisabled && { cursor: "not-allowed" })
          }}
        />
      ) : (
        <Input
          disabled={isDisabled || meta.submitting}
          opacity={isDisabled || meta.submitting ? 0.5 : 1}
          cursor="inherit"
          required={isRequired}
          {...(isError && { borderColor: "tercial.red1" })}
          {...inputProps}
          _input={{
            ...input,
            disabled: isDisabled || meta.submitting,
            ...inputProps?._input,
            onFocus: input.onFocus,
            onBlur: input.onBlur,
            onChange: handleInputOnChange
          }}
        />
      )}
    </Field>
  );
};

export default TextField;
