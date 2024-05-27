import { useFieldApi, useFormApi } from "@data-driven-forms/react-form-renderer";
import { FC } from 'react';
import { NumberFormatValues } from "react-number-format/types/types";

import Field from "@src/components/fields/Field";
import CustomPatternFormat from "@src/components/fields/MaskedPatternField/CustomPatterFormat";
import { useFieldError } from "@src/hooks/useFieldError";
import { MaskedPatternFieldType } from "@src/types";

const MaskedPatternField: FC<MaskedPatternFieldType> = ({
  helperCss,
  format,
  allowEmptyFormatting = false,
  patternType,
  ...props
}) => {
  const { label, input, isRequired, meta, helper, isDisabled, hideField } = useFieldApi(props);
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
      <CustomPatternFormat
        format={format}
        allowEmptyFormatting={allowEmptyFormatting}
        value={input.value}
        disabled={isDisabled || meta.submitting}
        opacity={isDisabled || meta.submitting ? 0.5 : 1}
        cursor="inherit"
        required={isRequired}
        onFocus={input.onFocus}
        onBlur={input.onBlur}
        {...(isError && { borderColor: "tercial.red1" })}
        onValueChange={(values: NumberFormatValues) => {
          if (patternType === "phone") {
            if (values.value?.length === 9 && !values.value.startsWith("42")) {
              change(input.name, `+420${values.formattedValue.replaceAll(" ", "")}`);
            } else {
              change(input.name, values.formattedValue.replaceAll(" ", ""));
            }
            return;
          }
          if (patternType === "personalIn") {
            change(input.name, values.value);
            return;
          }
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

export default MaskedPatternField;
