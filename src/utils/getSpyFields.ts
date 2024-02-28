import { FieldsBasicType, OptionType } from '@src/types';
import { ArrWithObjectsType } from '@src/utils/getFlattenArrayByKey';

export type SpyFieldValueType = string | OptionType | undefined | null;

/**
 * Get formated spy fields from schema
 */
const getSpyFields = (
  flattenFields: ArrWithObjectsType
): Record<string, SpyFieldValueType> => {
  // Filter only spy fields
  const spyFields: FieldsBasicType[] = (
    flattenFields as FieldsBasicType[]
  ).filter((field) => {
    return field?.spyField;
  });

  // Create object with spy fields
  const spyFieldsObject = spyFields.reduce((acc, field) => {
    return {
      ...acc,
      [field.name]: field?.defaultValue ?? (field as any)?.initialValue,
    };
  }, {});

  return spyFieldsObject;
};

export default getSpyFields;
