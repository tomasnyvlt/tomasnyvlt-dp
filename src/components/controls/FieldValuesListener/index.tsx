import { FormSpy, useFormApi } from "@data-driven-forms/react-form-renderer";
import { FC, PropsWithChildren, ReactElement, cloneElement, useEffect } from "react";

import getNewFieldValue from "@src/components/controls/FieldValuesListener/utils/getNewFieldValue";
import { useFormStoreContext } from "@src/hooks/useFormStoreContext";
import {
  FieldsBasicType,
  FormFieldsType,
  OptionType,
  SelectFieldType
} from "@src/types";
import { getValueByString } from "@src/utils/getValueByString";

interface FieldValuesListenerProps extends Required<Pick<FieldsBasicType, "spyField" | "name">> {
  selectOptions?: OptionType[];
}

/**
 * Listen to target field value and call a change callback
 * when its value change, while keeping an ability of normal field control.
 */
const FieldValuesListener: FC<FieldValuesListenerProps> = ({ name, spyField, selectOptions }) => {
  const useStore = useFormStoreContext();
  const { getSpyFieldRefValue, setSpyFieldRefValue } = useStore((state) => ({
    getSpyFieldRefValue: state.getSpyFieldRefValue,
    setSpyFieldRefValue: state.setSpyFieldRefValue
  }));

  const { getState, change } = useFormApi();
  const { visited } = getState();

  const { targetName, nestedKeyValue, action = "copy", isSelectField = false, whenVisitedKeys } = spyField;

  const dependency = getValueByString(targetName, getState().values);

  /**
   * getState().values changes on step change, so it's important to check if
   * change function (data-driven-forms) in useEffect should be called based on comparison of
   * "new" changed value with value stored in FormContext ref
   */
  const isNewValue = (changedValue: string | OptionType | undefined | null): boolean => {
    const spyFieldRefValue = getSpyFieldRefValue(name);

    if (!isSelectField) {
      return spyFieldRefValue !== changedValue;
    }

    return (spyFieldRefValue as OptionType)?.value !== (changedValue as OptionType)?.value;
  };

  useEffect(() => {
    const changedValue = getNewFieldValue({
      targetValue: dependency,
      nestedKeyValue,
      isSelectField,
      selectOptions
    });

    if (!isNewValue(changedValue)) return;

    setSpyFieldRefValue(name, changedValue);

    // If "whenVisitedKeys" is defined, check if at least one field was visited (was focused),
    // if not, do not change the value
    if (whenVisitedKeys?.length) {
      const wasVisited = whenVisitedKeys.some((fieldName) => visited?.[fieldName]);

      if (!wasVisited) return;
    }

    // Set new value based on action type
    const newValue = action === "clear" ? null : changedValue;

    change(name, newValue);
  }, [dependency]);

  return null;
};

const WrappedFieldValuesListener: FC<PropsWithChildren<FieldsBasicType>> = ({ spyField, children, ...props }) => {
  if (spyField || props?.resolveProps) {
    return (
      <FormSpy subscription={{ values: true }}>
        {() => (
          <>
            {spyField && (
              <FieldValuesListener
                name={props.name}
                spyField={spyField}
                selectOptions={(props as SelectFieldType)?.options}
              />
            )}
            {cloneElement(children as ReactElement<FormFieldsType>, { ...props })}
          </>
        )}
      </FormSpy>
    );
  }

  return cloneElement(children as ReactElement<FormFieldsType>, { ...props });
};

export default WrappedFieldValuesListener;
