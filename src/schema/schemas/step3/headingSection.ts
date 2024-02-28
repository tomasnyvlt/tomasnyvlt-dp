import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';

export const headingSection: SectionType = {
  component: 'section',
  name: getRandomId(),

  fields: [
    {
      component: 'heading',
      name: getRandomId(),
      initialValue: 'Doplňující informace',
      css: { as: 'h2', textAlign: 'center', mt: '3rem', fontWeight: 500 },
    },
  ],
};
