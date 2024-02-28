import { SchemaType } from '@src/types';

export const schema: SchemaType = {
  fields: [
    {
      component: 'wizard',
      name: 'customWizard',
      formType: 'whistleblowing',
      fields: [
        {
          component: 'step',
          name: 'formStep',
          title: '',
          fields: [
            {
              component: 'section',
              name: 'ASD',
              css: {
                mt: '3rem',
              },
              fields: [
                {
                  component: 'heading',
                  name: 'asdasd',
                  initialValue: 'ASD',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
