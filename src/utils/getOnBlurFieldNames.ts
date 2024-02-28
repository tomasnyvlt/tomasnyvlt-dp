import { SMARTFORM_WHOLE_ADDRESS_SUFFIX } from "@src/constants/fields";
import { FormFieldsType, OnBlurConfigType } from "@src/types";

const getOnBlurFieldNames = (flattenFields: Record<string, any>[], onBlurConfig?: OnBlurConfigType): string[] => {
  const { componentNames, fieldNames } = onBlurConfig ?? {};

  let array: string[] = [...(fieldNames ?? [])];

  if (componentNames?.length) {
    const filteredArr = flattenFields.filter(({ component }) => componentNames?.includes(component)).filter(Boolean);

    const componentFieldNames = filteredArr.map(({ component, name }) => {
      if ((component as FormFieldsType["component"]) === "smartform-field") {
        return `${name}.${SMARTFORM_WHOLE_ADDRESS_SUFFIX}`;
      }

      return name;
    }) as string[];

    array = [...array, ...componentFieldNames];
  }

  const blurFieldNames = Array.from(new Set(array));

  return blurFieldNames;
};

export default getOnBlurFieldNames;
