import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import { discountGrid } from '@src/schema/schemas/common/discountGrid';
import { frequencyPaymentSectionCondition } from '@src/schema/schemas/common/frequencyPaymentSectionCondition';
import { FIELD_NAMES } from '@src/schema/schemas/constants/fieldNames';
import { frequencyRadioContainerResolveProps } from '@src/schema/schemas/utils/frequencyRadioContainerResolveProps';

export const frequencyPayment: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  condition: frequencyPaymentSectionCondition,
  fields: [
    {
      component: 'heading',
      name: getRandomId(),
      initialValue: 'Frekvence placení',
      css: { as: 'h2', textAlign: 'left', mt: '1.5rem', fontWeight: 500 },
    },
    discountGrid,
    {
      component: 'box',
      name: 'boxWithContentInfoVehicle',
      condition: {
        when: FIELD_NAMES.LENGTH_INSURANCE,
        is: false,
      },
      css: {
        background: 'white',
        mt: {
          _: '2rem',
          sm: '1.875rem',
          '&:not(:first-of-type)': {
            _: '4.125rem',
            sm: '4rem',
          },
        },
        borderRadius: '1.25rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: { sm: 'cardCheckbox' },
        w: '100%',
        minWidth: '100%',
      },
      fields: [
        {
          component: 'radio-container',
          name: FIELD_NAMES.FREQUENCY_CODE,
          withBorder: false,
          css: {
            w: { _: '100%', sm: '40.5rem' },
            minWidth: 'min(100%, 40.5rem)',
            p: { _: 0 },
          },
          buttonCss: { px: { _: '1.5rem', sm: 0 } },
          innerCss: { px: { sm: '0.75rem' }, pt: '1.25rem' },
          options: [],
          resolveProps: (...args) =>
            frequencyRadioContainerResolveProps(...args, 'sm'),
        },
      ],
    },
  ],
};
