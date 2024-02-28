import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import { FEATURE_FLAGS } from '@src/schema/schemas/constants/featureFlags';
import { FIELD_NAMES } from '@src/schema/schemas/constants/fieldNames';

export const insuranceStart: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  fields: [
    {
      component: 'heading',
      name: getRandomId(),
      initialValue: 'Počátek pojištění',
      css: { as: 'h2', textAlign: 'left', mt: '1.5rem', fontWeight: 500 },
    },
    {
      component: 'grid',
      name: getRandomId(),
      css: { gridTemplateColumns: { sm: '1fr 1fr' } },
      fields: [
        {
          component: 'box',
          name: getRandomId(),
          css: {
            boxShadow: 'cardCheckbox',
            borderRadius: '1.25rem',
            w: { sm: '19.4375rem' },
            h: '9rem',
            p: '1.5rem',
          },
          fields: [
            {
              component: 'heading',
              name: getRandomId(),
              initialValue: 'Dne',
              css: {
                as: 'p',
                textAlign: 'left',
                fontWeight: 500,
                color: 'grayscale.gray2',
                fontSize: '0.875rem',
                lineHeight: '1.125rem',
              },
            },
            {
              component: 'heading',
              name: getRandomId(),
              initialValue: '11.11.2022',
              css: {
                as: 'p',
                textAlign: 'left',
                fontWeight: 500,
                color: 'primary.black',
                fontSize: '0.875rem',
                lineHeight: '1.125rem',
              },
              resolveProps: (_props, _fieldApi, formOptions) => {
                return {
                  initialValue:
                    new Date(
                      formOptions.getState().values?.[FIELD_NAMES.BEGIN_DATE]
                    ).toLocaleDateString() ?? '',
                };
              },
            },
            {
              component: 'heading',
              name: getRandomId(),
              initialValue: 'sjednané na',
              css: {
                as: 'p',
                textAlign: 'left',
                mt: '1.5rem',
                fontWeight: 500,
                color: 'grayscale.gray2',
                fontSize: '0.875rem',
                lineHeight: '1.125rem',
              },
              resolveProps: (_props, _fieldApi, formOptions) => {
                const endDate =
                  formOptions.getState().values?.[FIELD_NAMES.END_DATE];

                return {
                  initialValue: endDate ? 'sjednané do' : 'sjednané na',
                };
              },
            },
            {
              component: 'heading',
              name: getRandomId(),
              initialValue: 'dobu neurčitou',
              css: {
                as: 'p',
                textAlign: 'left',
                fontWeight: 500,
                color: 'primary.black',
                fontSize: '0.875rem',
                lineHeight: '1.125rem',
              },
              resolveProps: (_props, _fieldApi, formOptions) => {
                const endDate =
                  formOptions.getState().values?.[FIELD_NAMES.END_DATE];

                return {
                  initialValue: endDate
                    ? new Date(endDate).toLocaleDateString()
                    : 'dobu neurčitou',
                };
              },
            },
          ],
        },
      ],
    },
    {
      component: 'info-box',
      name: getRandomId(),
      css: { maxW: { sm: '25.4375rem' }, mt: '2.5rem' },
      condition: {
        when: FEATURE_FLAGS.ONLINE_PAYMENT_ONLY,
        is: true,
      },
      content: JSON.stringify({
        blocks: [
          {
            key: 'adadxcvw',
            text: 'Pojištění vám začne platit po uhrazení.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }),
    },
  ],
};
