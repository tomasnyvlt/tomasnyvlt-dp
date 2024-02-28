import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';

export const recapHeading: SectionType = {
  component: 'section',
  name: getRandomId(),
  css: { mt: '1rem' },
  fields: [
    {
      component: 'heading',
      initialValue: 'Informace pro sjednání',
      name: getRandomId(),
      css: { as: 'h2', textAlign: 'center', mt: '3rem' },
    },
  ],
};
