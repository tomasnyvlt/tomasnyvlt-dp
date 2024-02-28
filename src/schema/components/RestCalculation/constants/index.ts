import { FormFieldsType } from '@src/types';
import { FIELD_NAMES } from '@src/schema/schemas/constants/fieldNames';

export const CALCULATION_ACTIVE_ON_STEPS = [0, 1, 2, 3];

export const preventActiveFieldArr: Partial<FormFieldsType['component'][]> = [
  'text-field',
  'range-field',
  'smartform-field',
  'masked-number-field',
  'masked-pattern-field',
];

export const dateSectionFieldNames: string[] = [
  FIELD_NAMES.BEGIN_DATE,
  FIELD_NAMES.END_DATE,
  FIELD_NAMES.LENGTH_INSURANCE,
];
