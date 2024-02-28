import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';

export const entityAddress: SectionType = {
  component: 'section',
  name: 'section-22',
  variant: 'withBorder',
  fields: [
    {
      component: 'heading',
      name: getRandomId(),
      initialValue: 'Adresa bydliště',
      css: { as: 'h2', mt: '1.5rem' },
    },
    {
      component: 'grid',
      name: getRandomId(),
      css: { gap: { _: '2.5rem', sm: '2rem 1.5rem' } },
      fields: [
        {
          component: 'smartform-field',
          name: 'partner.permanentAddress',
          label: 'Adresa',
          instance: '1',
          helper: 'Začněte psát adresu a my jí zkusíme dohledat',
          isRequired: true,
          validate: [
            { type: 'required', message: 'Prosím zadejte adresu.' },
            { type: 'address-smartform', message: 'Adresa není kompletní.' },
          ],
          resolveProps: (_props, _fieldApi, formOptions) => {
            const fillForm =
              formOptions.getState().values?.partner.permanentAddress;

            return {
              setFromFillForm: fillForm,
            };
          },
        },
        {
          component: 'box',
          css: {
            display: 'flex',
            alignItems: 'center',
            mb: { sm: '1.375rem' },
          },
          name: getRandomId(),
          fields: [
            {
              component: 'checkbox-field',
              name: 'partner.sameAddress',
              label:
                '{"blocks":[{"key":"bqubj","text":"Kontaktní adresa je shodná s adresou bydliště","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              initialValue: true,
              resolveProps: (_props, _fieldApi, formOptions) => {
                const fillForm =
                  formOptions.getState().values?.partner.contactAddress;

                return {
                  initialValue: !fillForm,
                };
              },
            },
          ],
        },
        {
          component: 'box',
          name: getRandomId(),
          condition: {
            when: 'partner',
            is: (obj: Record<string, any>) => {
              const { sameAddress } = obj ?? {};

              return !sameAddress;
            },
          },
          fields: [
            {
              component: 'heading',
              name: getRandomId(),
              initialValue: 'Kontaktní adresa',
              css: { as: 'h2' },
            },
            {
              component: 'smartform-field',
              name: 'partner.contactAddress',
              css: { mt: '1.5rem' },
              instance: '2',
              label: 'Kontaktní adresa',
              isRequired: true,
              helper: 'Začněte psát adresu a my jí zkusíme dohledat',
              validate: [
                { type: 'required', message: 'Prosím zadejte adresu.' },
                {
                  type: 'address-smartform',
                  message: 'Adresa není kompletní.',
                },
              ],
              resolveProps: (_props, _fieldApi, formOptions) => {
                const fillForm =
                  formOptions.getState().values?.partner.contactAddress;

                return {
                  setFromFillForm: fillForm,
                };
              },
            },
          ],
        },
      ],
    },
  ],
};
