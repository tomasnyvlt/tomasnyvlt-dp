import { useFieldApi, useFormApi } from "@data-driven-forms/react-form-renderer";
import { FC, useEffect, useRef, useState } from "react";

import { ShadowCopyFieldType } from "@src/types";
import { getValueByString } from "@src/utils/getValueByString";

interface CopiedFieldsType {
  fieldName: string;
  value: any;
}

const ShadowCopyField: FC<ShadowCopyFieldType> = ({ copyFields, activeWhen, ...props }) => {
  const { input } = useFieldApi(props);
  const { change, getState } = useFormApi();
  const { values } = getState();

  const [isActive, setIsActive] = useState(false);
  // Helper ref for setTimeout in useEffect
  const isActiveRef = useRef(isActive);

  // JSON.stringify is used to prevent loop due to object reference change in useEffect
  const activeWhenDependency: string = JSON.stringify(
    activeWhen?.map((field) => getValueByString(field.fieldName, values))
  );
  const copyDependency: string = JSON.stringify(copyFields?.map((fieldName) => getValueByString(fieldName, values)));

  /**
   * Copy fields to the current field value
   */
  const handleCopyFields = () => {
    const copiedFields: CopiedFieldsType[] = copyFields?.map((fieldName) => {
      const value = getValueByString(fieldName, values);

      return {
        fieldName,
        value
      };
    });

    change(input.name, copiedFields);
  };

  /**
   * Check if the field should copy values from "copyFileds" prop
   */
  useEffect(() => {
    const active = activeWhen?.every((field) => {
      const gettedValue = getValueByString(field.fieldName, values);
      // Select or other field with value property
      const value = gettedValue?.value ?? gettedValue;

      return value === field.value;
    });

    isActiveRef.current = active;
    setIsActive(active);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWhenDependency]);

  useEffect(() => {
    // Timeout to prevent copying before isActive is decided
    const timeoutId = window.setTimeout(() => {
      if (!isActiveRef.current) return;

      handleCopyFields();
    }, 100);

    return () => {
      window.clearTimeout(timeoutId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copyDependency]);

  return null;
};

export default ShadowCopyField;
