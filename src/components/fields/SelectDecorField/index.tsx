import { UseFieldApiProps, useFieldApi, useFormApi } from "@data-driven-forms/react-form-renderer";
import { useGTMDispatch } from "@elgorditosalsero/react-gtm-hook";
import { x } from "@xstyled/emotion";
import { FC, useMemo, useRef, useState } from "react";
import Select, { SelectInstance, SingleValue as SingleValueType } from "react-select";

import DropdownIndicator from "@src/components/fields/SelectDecorField/components/DropdownIndicator";
import Option from "@src/components/fields/SelectDecorField/components/Option";
import SingleValue from "@src/components/fields/SelectDecorField/components/SingleValue";
import { SM_MEDIA_QUERY_PROP } from "@src/components/fields/SelectDecorField/constants";
import { useFieldError } from "@src/hooks/useFieldError";
import { useFormStoreContext } from "@src/hooks/useFormStoreContext";
import { OptionDecorDataType, SelectDecorFieldType } from "@src/types";
import { fixReactSelectFocus } from "@src/utils/fixReactSelectFocus";

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> & Pick<SelectDecorFieldType, "options" | "optionsData">;

const SelectDecorField: FC<SelectDecorFieldType> = (props) => {
  const { input, meta, options, optionsData } = useFieldApi(props) as UseFieldApiType;
  const { change } = useFormApi();
  const { isError } = useFieldError({ name: input.name, meta });
  const sendDataToGTM = useGTMDispatch();
  const useStore = useFormStoreContext();
  const { pageMainCategory } = useStore((state) => state.dataLayer) || {};

  const { label } = props;

  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<SelectInstance<OptionDecorDataType>>(null);

  /**
   * Memoize options to prevent re-rendering
   * when options reference changes due to resolveProps.
   */
  const memoizedOptions = useMemo(() => {
    return options;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options)]);

  const handleOnChange = (newValue: SingleValueType<OptionDecorDataType>) => {
    input.onChange(newValue);

    sendDataToGTM({
      event: `${pageMainCategory ?? ""}_sjednavac_${input.name}`,
      typ_pojisteni: newValue?.label.replace(/\n/g, " ")
    });

    const data = optionsData?.find((option) => option.value === newValue?.value);
    if (!data?.onClickChangeFields?.length) return;

    data.onClickChangeFields.forEach((option) => {
      const { fieldName, value } = option || {};
      // Value can be null
      if (!fieldName) return;

      change(fieldName, value);
    });
  };

  return (
    <x.div position="relative">
      {/* Placeholder */}
      <x.div
        aria-hidden
        lineHeight={{
          _: "1.5rem",
          sm: "1.75rem"
        }}
        py="1.5rem"
        px={{
          _: "1.5rem",
          sm: "2rem"
        }}
        border="1px solid transparent"
        position="relative"
        zIndex={-1}
      >
        &nbsp;
      </x.div>

      <x.div position="absolute" top="0" right="0" bottom="0" left="0">
        <x.div position="relative">
          <Select<OptionDecorDataType>
            ref={selectRef}
            menuIsOpen={isOpen}
            isSearchable={false}
            menuShouldScrollIntoView
            onMenuOpen={() => {
              setIsOpen(true);
              fixReactSelectFocus({ selectRef, options: memoizedOptions });
            }}
            onMenuClose={() => setIsOpen(false)}
            openMenuOnFocus
            options={memoizedOptions}
            // TODO MS types
            // @ts-ignore
            optionsData={optionsData}
            onChange={handleOnChange}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
            value={input.value}
            name={props.name}
            placeholder={label}
            defaultValue={props.initialValue}
            styles={{
              container: (base) => ({
                ...base,
                cursor: "pointer",
                backgroundColor: "#fff",
                border: "1px solid",
                borderColor: isError ? "#f01C19" : "#becd00",
                borderRadius: isOpen ? "2.1875rem" : "6.25rem",
                boxShadow: isOpen ? "0px 0.3125rem 2.0625rem rgba(0, 0, 0, 0.075)" : "none",
                ":hover": {
                  boxShadow: "0px 0.3125rem 2.0625rem rgba(0, 0, 0, 0.075)"
                },
                overflow: "hidden",
                zIndex: 1000,
                transition: "box-shadow 300ms"
              }),
              control: (base) => ({
                ...base,
                cursor: "inherit",
                border: "none",
                boxShadow: "none",
                paddingBlock: "1.5rem",
                paddingInline: "1.5rem",
                [SM_MEDIA_QUERY_PROP]: {
                  paddingInline: "2rem"
                }
              }),
              singleValue: (base) => ({
                ...base,
                color: "#000000",
                fontWeight: "500",
                fontSize: "0.875rem",
                lineHeight: "1.125rem",
                marginInline: 0,
                [SM_MEDIA_QUERY_PROP]: {
                  fontSize: "1rem",
                  lineHeight: "1.75rem"
                }
              }),
              valueContainer: (base) => ({
                ...base,
                maxWidth: "100%",
                padding: 0
              }),
              placeholder: (base) => ({
                ...base,
                color: "#000000",
                fontWeight: "500",
                fontSize: "0.875rem",
                lineHeight: "1.125rem",
                marginInline: 0,
                [SM_MEDIA_QUERY_PROP]: {
                  fontSize: "1rem",
                  lineHeight: "1.75rem"
                }
              }),
              menu: () => ({
                position: "relative",
                paddingBottom: "1.5rem",
                cursor: "default",
                [SM_MEDIA_QUERY_PROP]: {
                  paddingBottom: "2rem"
                }
              }),
              menuList: () => ({
                paddingInline: "1.5rem",
                cursor: "default",
                [SM_MEDIA_QUERY_PROP]: {
                  paddingInline: "2rem"
                }
              }),
              option: (_base, { isFocused }) => ({
                border: "1px solid #e1e4eb",
                borderRadius: "0.75rem",
                ":not(:last-child)": {
                  marginBottom: "1rem"
                },
                cursor: "pointer",
                backgroundColor: isFocused ? "#f2f5cc" : "transparent",
                ":hover": {
                  backgroundColor: "#f2f5cc"
                },
                transition: "background-color 300ms"
              }),
              indicatorsContainer: (base) => ({
                ...base,
                marginLeft: "0.5rem",
                [SM_MEDIA_QUERY_PROP]: {
                  marginLeft: "1.5rem"
                }
              }),
              dropdownIndicator: (base) => ({
                ...base,
                padding: 0,
                pointerEvents: "none",
                transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                transition: "transform 300ms"
              }),
              indicatorSeparator: () => ({
                display: "none"
              })
            }}
            components={{
              DropdownIndicator,
              SingleValue,
              Option
            }}
          />
        </x.div>
      </x.div>
    </x.div>
  );
};

export default SelectDecorField;
