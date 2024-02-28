import { useFieldApi, useFormApi } from "@data-driven-forms/react-form-renderer";
import { x } from "@xstyled/emotion";
import { Input } from "anolis-ui";
import { ChangeEvent, FC, useEffect, useState } from "react";

import Field from "@src/components/fields/Field";
import { SMARTFORM_WHOLE_ADDRESS_SUFFIX } from "@src/constants/fields";
import { useFieldError } from "@src/hooks/useFieldError";
import { SmartFormFieldType } from "@src/types/formFields";

type SmartformNameType =
  | "smartform-address-street"
  | "smartform-address-number"
  | "smartform-address-city"
  | "smartform-address-zip"
  | "smartform-address-whole-address";

const fields: Array<{
  smartformName: Omit<SmartformNameType, "smartform-address-whole-address">;
  inputName: string;
  labelName: string;
  maxLength: number;
}> = [
  { smartformName: "smartform-address-street", inputName: "street", labelName: "Ulice", maxLength: 48 },
  { smartformName: "smartform-address-number", inputName: "houseNumber", labelName: "Číslo domu", maxLength: 20 },
  { smartformName: "smartform-address-city", inputName: "city", labelName: "Město", maxLength: 60 },
  { smartformName: "smartform-address-zip", inputName: "zip", labelName: "PSČ", maxLength: 5 }
];

const SmartFormField: FC<SmartFormFieldType> = ({ instance, css, ...props }) => {
  const { label, input, isRequired, meta, helper, isDisabled, hideField, inputProps } = useFieldApi(props);
  const { change } = useFormApi();
  const { isError, error } = useFieldError({ name: input.name, meta });

  const [instanceName, setInstanceName] = useState<string>("");
  const [displayAddress, setDisplayAddress] = useState<boolean>(false);

  const fieldActive = meta.active || input.value.address || inputProps?.placeholder;
  const fieldActiveWhole = meta.active || input.value[SMARTFORM_WHOLE_ADDRESS_SUFFIX] || inputProps?.placeholder;

  let latestRebinded = "";

  const selectionCallback = (_element: any, value: string, fieldType: SmartformNameType) => {
    if (fieldType === "smartform-address-whole-address") {
      change(`${input.name}.${SMARTFORM_WHOLE_ADDRESS_SUFFIX}`, value);
      return;
    }

    fields.forEach(({ smartformName, inputName }) => {
      if (fieldType === smartformName) {
        change(`${input.name}.${inputName}`, value);
      }
    });
  };

  const announceCallback = (validationType: any) => {
    if (validationType.result?.addressArray?.length < 1) return;
    const { addressArray } = validationType.result;
    if (validationType.result.type === "HIT") {
      const [address] = addressArray;

      if (!address) return;

      change(`${input.name}.city`, address.CITY);
      change(`${input.name}.zip`, address.ZIP);
      change(`${input.name}.houseNumber`, address.WHOLE_NUMBER);
      // If street is not defined, use 'part' as street. Fix for villages without streets.
      change(`${input.name}.street`, address.STREET || address.PART);
      if (address.COUNTRY_CODE === "CZE") {
        change(`${input.name}.countryCode`, "CZ");
        return;
      }

      change(`${input.name}.countryCode`, "SK");
    }
  };

  const doRebind = () => {
    if (latestRebinded === instanceName) {
      return;
    }

    latestRebinded = instanceName;

    (window as any).smartform.rebindAllForms(() => {
      const sfInstance = (window as any).smartform?.getInstance(instanceName);
      if (!sfInstance) setDisplayAddress(true);
      sfInstance.addressControl.setAllSuggestionsEnabled(true);
      sfInstance.addressControl.setSelectionCallback(selectionCallback);
      sfInstance.addressControl.addValidationCallback(announceCallback);

      // if you want more slovakia addresses, add number of instance, f.e. smartform-instance-slo-1
      if (instanceName.includes("smartform-instance-slo")) {
        (window as any).smartform?.getInstance(instanceName).addressControl.setCountry("SK");
        return;
      }
      sfInstance.addressControl.setCountry("CZ");
    });
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    change(input.name, null);
    if (!value) {
      return;
    }
    change(`${input.name}.${SMARTFORM_WHOLE_ADDRESS_SUFFIX}`, value);
  };

  const handleOnChangeSubForm = (event: ChangeEvent<HTMLInputElement>, inputName: string): void => {
    const { value } = event.currentTarget;
    change(input.name, null);
    if (!value) {
      return;
    }
    change(`${input.name}.${inputName}`, value);
  };

  useEffect(() => {
    setInstanceName(`smartform-instance-${instance}`);
  }, [instance]);

  return (
    <x.div display="flex" flexDirection="column" {...css}>
      {displayAddress ? (
        <x.div display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="1.5rem" mb="2rem">
          {fields.map(({ smartformName, inputName, labelName, maxLength }) => (
            <Field
              key={inputName}
              fieldActive={fieldActive}
              isRequired={isRequired}
              isDisabled={isDisabled || meta.submitting}
              isError={isError}
              label={labelName}
              helper={helper}
              errorText={error}
              cursor="text"
              hideField={hideField}
              fieldName={input.name}
            >
              <Input
                {...props.inputProps}
                name={`${input.name}.${inputName}`}
                disabled={isDisabled || meta.submitting}
                opacity={isDisabled || meta.submitting ? 0.5 : 1}
                bg={isDisabled ? "grayscale.gray4" : "transparent"}
                cursor="inherit"
                required={isRequired}
                {...(isError && { borderColor: "tercial.red1" })}
                _input={{
                  ...input,
                  disabled: isDisabled || meta.submitting,
                  ...props.inputProps?._input,
                  onFocus: input.onFocus,
                  onBlur: input.onBlur,
                  id: `${instanceName} ${smartformName}`,
                  onChange: (event) => handleOnChangeSubForm(event, inputName),
                  name: `${input.name}.${inputName}`,
                  className: `${instanceName} ${smartformName}`,
                  onClick: () => doRebind(),
                  maxLength,
                  autoComplete: "off",
                  value: input.value[SMARTFORM_WHOLE_ADDRESS_SUFFIX] ?? ""
                }}
              />
            </Field>
          ))}
        </x.div>
      ) : (
        <Field
          fieldActive={fieldActiveWhole}
          isRequired={isRequired}
          isDisabled={isDisabled || meta.submitting}
          isError={isError}
          label={label}
          helper={helper}
          errorText={error}
          cursor="text"
          hideField={hideField}
          fieldName={input.name}
        >
          <Input
            name={`${input.name}.${SMARTFORM_WHOLE_ADDRESS_SUFFIX}`}
            disabled={isDisabled || meta.submitting}
            bg={isDisabled ? "grayscale.gray4" : "transparent"}
            opacity={isDisabled || meta.submitting ? 0.5 : 1}
            cursor="inherit"
            required={isRequired}
            {...(isError && { borderColor: "tercial.red1" })}
            {...inputProps}
            _input={{
              ...input,
              disabled: isDisabled || meta.submitting,
              ...props.inputProps?._input,
              onFocus: input.onFocus,
              onBlur: input.onBlur,
              onChange: handleOnChange,
              name: `${input.name}.${SMARTFORM_WHOLE_ADDRESS_SUFFIX}`,
              className: `${instanceName} smartform-address-whole-address`,
              onClick: () => doRebind(),
              maxLength: 60,
              autoComplete: "off",
              value: input.value[SMARTFORM_WHOLE_ADDRESS_SUFFIX] ?? ""
            }}
          />
        </Field>
      )}
    </x.div>
  );
};

export default SmartFormField;
