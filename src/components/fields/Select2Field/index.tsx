import { UseFieldApiProps, useFieldApi, useFormApi } from "@data-driven-forms/react-form-renderer";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Select, {
  ActionMeta,
  MultiValue as MultiValueType,
  SelectInstance,
  SingleValue as SingleValueType
} from "react-select";

import Field from "@src/components/fields/Field";
import ClearIndicator from "@src/components/fields/Select2Field/components/ClearIndicator";
import DropdownIndicator from "@src/components/fields/Select2Field/components/DropdownIndicator";
import Input from "@src/components/fields/Select2Field/components/Input";
import MultiValue from "@src/components/fields/Select2Field/components/MultiValue";
import MultiValueLabel from "@src/components/fields/Select2Field/components/MultiValueLabel";
import Option from "@src/components/fields/Select2Field/components/Option";
import SingleValue from "@src/components/fields/Select2Field/components/SingleValue";
import { getStyles } from "@src/components/fields/Select2Field/utils/getStyles";
import { useFieldError } from "@src/hooks/useFieldError";
import { OptionType, SelectFieldType } from "@src/types";
import { fixReactSelectFocus } from "@src/utils/fixReactSelectFocus";

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> &
  Pick<
    SelectFieldType,
    | "label"
    | "isRequired"
    | "helper"
    | "options"
    | "isDisabled"
    | "hideField"
    | "isSearchable"
    | "isMulti"
    | "fallbackValue"
    | "updateLabelOnOptionChange"
  >;

const Select2Field: FC<SelectFieldType> = ({ helperCss, ...props }) => {
  const {
    label,
    input,
    isRequired,
    meta,
    helper,
    options,
    isDisabled,
    hideField,
    isSearchable = true,
    isMulti = false,
    fallbackValue,
    updateLabelOnOptionChange
  } = useFieldApi(props) as UseFieldApiType;

  const fieldActive = meta.active || (isMulti ? !!input.value?.length : input.value);
  const { change } = useFormApi();
  const { isError, error } = useFieldError({ name: input.name, meta });

  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<SelectInstance<OptionType>>(null);

  /**
   * Memoize options to prevent re-rendering
   * when options reference changes due to resolveProps.
   */
  const memoizedOptions = useMemo(() => {
    return options;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options)]);

  const handleOnChange = useCallback(
    (newValue: MultiValueType<OptionType> | SingleValueType<OptionType>, actionMeta: ActionMeta<OptionType>): void => {
      /**
       * React-select disables only selection of disabled options,
       * but allow deselect which we don't want either.
       */
      if (actionMeta.option?.isDisabled) {
        return;
      }

      if (isMulti && fallbackValue) {
        if (actionMeta.action === "clear" || !(newValue as OptionType[])?.length) {
          input.onChange([fallbackValue]);
          return;
        }

        // Remove fallback value
        const newValueWithoutFallback = (newValue as OptionType[]).filter(
          (option) => option.value !== fallbackValue.value
        );

        input.onChange(newValueWithoutFallback);
        return;
      }

      input.onChange(newValue);

      /**
       * If `isMulti` is `true` then `closeMenuOnSelect` is `false`
       * so we don't need to close select programatically.
       */
      if (isMulti) return;

      /**
       * Send setOpen call to the end of the event loop to be sure
       * that onChange event is finished and select is closed.
       *
       * This changes nothing on desktop, because isOpen is already
       * false so there is no re-render.
       */
      window.setTimeout(() => {
        setIsOpen(false);
      }, 0);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fallbackValue, isMulti]
  );

  useEffect(() => {
    if (isMulti && Array.isArray(input.value) && typeof input.value[0] === "string") {
      const newValue = input.value.map((value) => {
        return memoizedOptions.find((option) => option.value === value);
      });

      if (newValue) {
        change(props.name, newValue);
      }
    }

    if (!isMulti && input.value && typeof input.value === "string") {
      const option = memoizedOptions?.find((o: OptionType) => o.value === input.value);

      if (option) {
        change(props.name, option);
      }
    }

    if (memoizedOptions?.length === 1 && input.value.value !== memoizedOptions[0].value) {
      const newValue = isMulti ? [memoizedOptions[0]] : memoizedOptions[0];

      change(props.name, newValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.value]);

  useEffect(() => {
    if (!memoizedOptions && !updateLabelOnOptionChange) {
      return;
    }

    const option = memoizedOptions?.find((o: OptionType) => o.value === input.value.value);

    if (option && option.label !== input.value.label) {
      change(props.name, option);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedOptions]);

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
      hideField={hideField}
      isSelectField
      fieldName={input.name}
    >
      <Select<OptionType, boolean>
        ref={selectRef}
        menuIsOpen={isOpen}
        onMenuOpen={() => {
          setIsOpen(true);
          fixReactSelectFocus({ selectRef, options: memoizedOptions });
        }}
        onMenuClose={() => setIsOpen(false)}
        options={memoizedOptions}
        isOptionDisabled={(option) => !!option.isDisabled}
        menuShouldScrollIntoView
        openMenuOnFocus
        /**
         * Do not use `closeMenuOnSelect` when `isMulti` is `false` because it causes problems on
         * mobile devices. `onFocus` event is triggered directly after select
         * and re-opens menu, so it looks like select was never closed.
         */
        closeMenuOnSelect={isMulti ? false : undefined}
        onChange={handleOnChange}
        onFocus={input.onFocus}
        onBlur={input.onBlur}
        value={input.value}
        name={props.name}
        isDisabled={isDisabled || meta.submitting}
        defaultValue={props.initialValue}
        noOptionsMessage={() => "Žádné výsledky."}
        isSearchable={isSearchable}
        hideSelectedOptions={false}
        isMulti={isMulti}
        tabSelectsValue={!isMulti}
        isClearable={isMulti && ((input.value || []) as OptionType[])?.some((option) => !option?.isDisabled)}
        styles={getStyles({ isError })}
        // https://react-select.com/components#defining-components
        components={{
          DropdownIndicator,
          ClearIndicator,
          SingleValue,
          MultiValue,
          MultiValueLabel,
          Option,
          Input
        }}
      />
    </Field>
  );
};

export default Select2Field;
