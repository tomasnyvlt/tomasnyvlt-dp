import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import { discountGrid } from '@src/schema/schemas/common/discountGrid';
import { frequencyPaymentSectionCondition } from '@src/schema/schemas/common/frequencyPaymentSectionCondition';
import { FIELD_NAMES } from '@src/schema/schemas/constants/fieldNames';
import { frequencyRadioContainerResolveProps } from '@src/schema/schemas/utils/frequencyRadioContainerResolveProps';

export const paymentSetting: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  css: {
    mt: { _: '0.5rem', sm: '3.5rem' },
  },
  condition: frequencyPaymentSectionCondition,
  fields: [
    {
      component: 'heading',
      name: getRandomId(),
      initialValue: 'Frekvence placení',
      css: { as: 'h2', textAlign: 'left', fontWeight: 500, pt: '1.5rem' },
    },
    discountGrid,
    {
      component: 'box',
      name: getRandomId(),
      condition: {
        when: FIELD_NAMES.LENGTH_INSURANCE,
        is: false,
      },
      css: {
        mt: {
          _: '2rem',
          sm: '1.5rem',
          '&:not(:first-of-type)': {
            _: '4.125rem',
            sm: '4rem',
          },
        },
      },
      fields: [
        {
          component: 'radio-container',
          name: FIELD_NAMES.FREQUENCY_CODE,
          withBorder: true,
          css: { p: 0, minWidth: '100%' },
          innerCss: { px: '1.5rem', pt: '1.375rem' },
          buttonCss: { px: 0, mx: 0 },
          initialValue: 'ANNUALY',
          options: [],
          resolveProps: frequencyRadioContainerResolveProps,
        },
      ],
    },
  ],
};
