import { UseFieldApiProps, useFieldApi, useFormApi } from "@data-driven-forms/react-form-renderer";
import { FC } from "react";
import { NumberFormatValues } from "react-number-format/types/types";

import Field from "@src/components/fields/Field";
import CustomNumericFormat from "@src/components/fields/MaskedNumberField/CustomNumericFormat";
import { useFieldError } from "@src/hooks/useFieldError";
import { MaskedNumberFieldType } from "@src/types";

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> &
  Pick<MaskedNumberFieldType, "label" | "isRequired" | "helper" | "isDisabled" | "hideField">;

const MaskedNumberField: FC<MaskedNumberFieldType> = ({
  helperCss,
  suffix,
  prefix,
  allowNegative = false,
  decimalScale = 0,
  maxValue = undefined,
  ...props
}) => {
  const { label, input, isRequired, meta, helper, isDisabled, hideField } = useFieldApi(props) as UseFieldApiType;
  const { change } = useFormApi();
  const { isError, error } = useFieldError({ name: input.name, meta });

  const fieldActive = meta.active || input.value || input.value === 0;

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
      <CustomNumericFormat
        prefix={prefix}
        suffix={suffix}
        allowNegative={allowNegative}
        decimalScale={decimalScale}
        isAllowed={(values) => {
          if (!values.floatValue || maxValue === undefined) return true;
          const { floatValue } = values;
          return floatValue < maxValue;
        }}
        value={input.value}
        disabled={isDisabled || meta.submitting}
        opacity={isDisabled || meta.submitting ? 0.5 : 1}
        cursor="inherit"
        required={isRequired}
        onFocus={input.onFocus}
        onBlur={input.onBlur}
        {...(isError && { borderColor: "tercial.red1" })}
        onValueChange={(values: NumberFormatValues) => {
          change(input.name, values.floatValue);
        }}
        {...props.inputProps}
        _input={{
          ...input,
          disabled: isDisabled || meta.submitting,
          ...props.inputProps?._input,
          onFocus: input.onFocus,
          onBlur: input.onBlur
        }}
      />
    </Field>
  );
};

export default MaskedNumberField;
