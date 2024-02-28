import { OptionType, SpyFieldType } from "@src/types";

export interface GetNewFieldValueProps extends Omit<SpyFieldType, "targetName" | "action"> {
  targetValue: string | Record<string, any>;
  selectOptions?: OptionType[];
}

type Output = string | OptionType | undefined | null;

const getNewFieldValue = ({
  targetValue,
  isSelectField,
  nestedKeyValue,
  selectOptions
}: GetNewFieldValueProps): Output => {
  if (!isSelectField) {
    return !nestedKeyValue ? targetValue : (targetValue as Record<string, any>)?.[nestedKeyValue];
  }

  const selectedOption = selectOptions?.find(({ value }) => value === targetValue);

  return selectedOption;
};

export default getNewFieldValue;
