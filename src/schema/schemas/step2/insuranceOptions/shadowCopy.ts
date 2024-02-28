import { ShadowCopyFieldType } from '@src/types';
import {
  INSURANCE_SELECT_FIELD_NAME,
  INSURANCE_SHADOW_COPY_FIELD_NAME,
} from '@src/schema/schemas/step2/insuranceOptions/constants';

export const insuranceOptionShadowCopy: ShadowCopyFieldType = {
  component: 'shadow-copy',
  name: INSURANCE_SHADOW_COPY_FIELD_NAME,
  copyFields: ['mtpl', 'assistance', 'casco', 'additionals'],
  activeWhen: [
    {
      fieldName: INSURANCE_SELECT_FIELD_NAME,
      value: `option-${13}`,
    },
  ],
};
