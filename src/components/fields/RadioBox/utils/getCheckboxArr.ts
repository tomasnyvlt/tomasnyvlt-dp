import { CheckboxFieldType, RadioBoxInfoType, RadioBoxOptionType } from "@src/types";

/**
 * Get simple array of checkbox fields from options
 */
const getCheckboxArr = (options: RadioBoxOptionType[]): CheckboxFieldType[] | undefined => {
  const infoFlatArr: RadioBoxInfoType[] = options.flatMap((option) => option.info).flatMap((infoArr) => infoArr);
  const infoCheckboxArr: Array<CheckboxFieldType | null> = infoFlatArr.map((info) => {
    if (!info?.checkboxField) return null;

    return {
      ...info.checkboxField,
      labelCss: {
        maxW: "100%",
        ...info.checkboxField.labelCss
      }
    };
  });

  const checkboxArr = infoCheckboxArr.filter((checkbox) => checkbox) as CheckboxFieldType[] | undefined;

  return checkboxArr;
};

export default getCheckboxArr;
