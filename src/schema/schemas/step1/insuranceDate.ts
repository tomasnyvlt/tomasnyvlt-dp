import { addDays } from 'date-fns';

import { FORM_STORE_REFRESH_TRIGGER_KEY } from '@src/constants/fields';
import { VALIDATION_MESSAGE } from '@src/constants/validation';
import { SectionType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import getRandomId from '@src/utils/getRandomId';
import { FEATURE_FLAGS } from '@src/schema/schemas/constants/featureFlags';
import { FIELD_NAMES } from '@src/schema/schemas/constants/fieldNames';

export const insuranceDate: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  // TODO RequiredInfo - remove this `mb` if required info will return
  css: {
    mb: '2rem',
  },
  fields: [
    {
      component: 'grid',
      css: {
        rowGap: { _: '2.5rem', sm: '0' },
        gridTemplateColumns: { sm: '1fr 1.5rem 1fr' },
        gridTemplateRows: { sm: 'auto auto' },
        columnGap: { sm: '0' },
      },
      name: getRandomId(),
      fields: [
        {
          component: 'date-picker',
          name: FIELD_NAMES.BEGIN_DATE,
          css: { gridColumn: { sm: '1' }, gridRow: { sm: '1' } },
          label: 'Kdy má pojištění začít platit?',
          isRequired: true,
          helper: 'Např. 12. 3. 2021',
          initialValue: new Date().toISOString(),
          validate: [
            { type: 'date' },
            { type: 'required', message: VALIDATION_MESSAGE.requiredDate },
          ],
          defaultCalendarType: 'day',
          resolveProps: () => {
            const data = getFetcherData('autosjednavac');

            return {
              helper: `Např. ${new Date().toLocaleDateString()}`,
              initialDate: data?.beginDateFrom,
              minDate: data?.beginDateFrom,
              maxDate: data?.beginDateTo,
            };
          },
        },
        {
          component: 'info-box',
          name: getRandomId(),
          topCss: {
            gridColumn: { sm: '1 / -1' },
            gridRow: { sm: '2' },
            mt: { sm: '2rem' },
          },
          css: { maxW: { sm: '30.625rem' } },
          variant: 'clear',
          condition: {
            and: [
              {
                when: FORM_STORE_REFRESH_TRIGGER_KEY,
                is: () => {
                  const data = getFetcherData('autosjednavac');
                  return data?.onlinePaymentOnly;
                },
              },
              {
                when: FEATURE_FLAGS.ONLINE_PAYMENT_ONLY,
                is: true,
              },
            ],
          },
          content: JSON.stringify({
            blocks: [
              {
                key: 'adadxcvw',
                text: 'Pro tento počátek pojištění bude třeba zaplatit online.',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [{ offset: 39, length: 15, style: 'BOLD' }],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          }),
        },
        {
          component: 'box',
          name: getRandomId(),
          css: {
            display: 'flex',
            alignItems: 'center',
            mb: { sm: '1.375rem' },
            gridColumn: { sm: '3' },
            gridRow: { sm: '1' },
          },
          fields: [
            {
              component: 'checkbox-field',
              name: FIELD_NAMES.LENGTH_INSURANCE,
              label:
                '{"blocks":[{"key":"bqubj","text":"Pojištění chci sjednat na dobu určitou","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              initialValue: false,
              resolveProps: (_props, _fieldApi, formOptions) => {
                const { values } = formOptions.getState();

                const initialValue = values?.[FIELD_NAMES.END_DATE];
                const checkboxValue = values?.[FIELD_NAMES.LENGTH_INSURANCE];

                return {
                  initialValue:
                    (Boolean(initialValue) || checkboxValue) ?? false,
                };
              },
              condition: {
                when: FIELD_NAMES.LENGTH_INSURANCE,
                is: true,
                then: {
                  visible: true,
                  set: {
                    [FIELD_NAMES.FREQUENCY_CODE]: 'SINGLE',
                  },
                },
                else: {
                  visible: true,
                  set: {
                    [FIELD_NAMES.FREQUENCY_CODE]: 'ANNUALY',
                    [FIELD_NAMES.END_DATE]: null,
                  },
                },
              },
            },
          ],
        },
      ],
    },
    {
      component: 'grid',
      css: { mt: '2rem' },
      name: getRandomId(),
      condition: {
        when: FIELD_NAMES.LENGTH_INSURANCE,
        is: true,
      },
      fields: [
        {
          component: 'date-picker',
          name: FIELD_NAMES.END_DATE,
          label: 'Do kdy má pojištění platit?',
          validate: [
            { type: 'date' },
            { type: 'required', message: VALIDATION_MESSAGE.requiredDate },
          ],
          isRequired: true,
          spyField: {
            targetName: FIELD_NAMES.BEGIN_DATE,
            action: 'clear',
            whenVisitedKeys: [FIELD_NAMES.BEGIN_DATE],
          },
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();

            const beginDate = values?.[FIELD_NAMES.BEGIN_DATE];
            const endDate = values?.[FIELD_NAMES.END_DATE];

            // Pojištění může být sjednáno na dobu určitou, ale nejméně na 15 dní a nejvýše na 365 dní
            // (hodnoty níže jsou menší o jeden den, protože pojištění platí od "nultého" dne).
            const minDate = addDays(new Date(beginDate), 14);
            const maxDate = addDays(new Date(beginDate), 364);
            const initialDate = endDate ? new Date(endDate) : minDate;

            return {
              helper: `Např. ${new Date().toLocaleDateString()}`,
              initialDate,
              minDate,
              maxDate,
            };
          },
        },
      ],
    },
    {
      component: 'info-box',
      name: getRandomId(),
      css: { maxW: { sm: '30.625rem' }, mt: '2.5rem' },
      variant: 'clear',
      condition: {
        when: FIELD_NAMES.LENGTH_INSURANCE,
        is: true,
      },
      content: JSON.stringify({
        blocks: [
          {
            key: 'adadxcvw',
            text: 'Pojištění na dobu určitou můžete sjednat minimálně na 15 dnů a maximálně na rok.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 54, length: 25, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }),
    },
  ],
};
