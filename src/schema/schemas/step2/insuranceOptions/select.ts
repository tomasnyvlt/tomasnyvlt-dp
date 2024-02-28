import { ConditionDefinition } from '@data-driven-forms/react-form-renderer';

import { BoxType, OptionType, SelectDecorFieldType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import getRandomId from '@src/utils/getRandomId';
import { bestCondition } from '@src/schema/schemas/step2/insuranceOptions/conditions/best';
import { minimumCondition } from '@src/schema/schemas/step2/insuranceOptions/conditions/minimum';
import {
  INSURANCE_SELECT_FIELD_NAME,
  LABELS,
} from '@src/schema/schemas/step2/insuranceOptions/constants';
import getSelectOptions from '@src/schema/schemas/step2/insuranceOptions/utilities/getSelectOptions';

interface BoxSelectType extends Omit<BoxType, 'fields'> {
  fields: SelectDecorFieldType[];
}

const getCondition = (): ConditionDefinition => {
  return {
    sequence: [
      // Custom
      {
        // Do not use shorthand syntax "not: [bestCondition, minimumCondition]",
        // because it will not work properly as logical AND
        and: [
          {
            not: bestCondition,
          },
          {
            not: minimumCondition,
          },
        ],
        then: {
          set: {
            [INSURANCE_SELECT_FIELD_NAME]: {
              label: LABELS.CUSTOM,
              value: `option-${13}`,
            },
          },
        },
        else: {
          visible: true,
        },
      },
      // Minimum
      {
        ...minimumCondition,
        then: {
          set: {
            [INSURANCE_SELECT_FIELD_NAME]: {
              label: LABELS.MINIMUM,
              value: `option-${11}`,
            },
          },
        },
        else: {
          visible: true,
        },
      },
      // Best
      {
        ...bestCondition,
        then: {
          set: {
            [INSURANCE_SELECT_FIELD_NAME]: {
              label: LABELS.BEST,
              value: `option-${12}`,
            },
          },
        },
        else: {
          visible: true,
        },
      },
    ],
  };
};

export const insuranceSelectOptions: BoxSelectType = {
  component: 'box',
  name: getRandomId(),
  css: {
    w: 'min(100%, 30.3125rem)',
    mx: 'auto',
  },
  fields: [
    {
      component: 'select-decor-field',
      name: INSURANCE_SELECT_FIELD_NAME,
      label: 'Nabídka pojištění',
      options: [],
      optionsData: [],
      validate: [{ type: 'required', message: 'Prosím vyberte.' }],
      condition: getCondition(),
      resolveProps: (_props, _fieldApi, formOptions) => {
        const data = getFetcherData('autosjednavac');
        const { values } = formOptions.getState() || {};

        const optionsData = getSelectOptions(data, values);
        const options: OptionType[] = optionsData.map((option) => ({
          label: option.label,
          value: option.value,
        }));

        return {
          optionsData,
          options,
        };
      },
    },
  ],
};
