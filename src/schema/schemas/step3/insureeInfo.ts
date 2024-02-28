import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';

export const insureeInfo: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  fields: [
    {
      component: 'heading',
      name: getRandomId(),
      initialValue: 'Údaje o pojistníkovi',
      css: { as: 'h2', mt: '1.5rem' },
    },
    {
      component: 'grid',
      name: getRandomId(),
      fields: [
        {
          component: 'text-field',
          name: 'partner.namePrefix',
          label: 'Titul',
        },
        {
          component: 'text-field',
          name: 'partner.email',
          label: 'E-mail',
          isRequired: true,
          validate: [
            { type: 'email' },
            { type: 'required', message: 'E-mail je povinný údaj.' },
          ],
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { email } = formOptions.getState().values ?? {};
            const initialValue = email ?? '';

            return {
              initialValue,
            };
          },
        },
      ],
    },
  ],
};
