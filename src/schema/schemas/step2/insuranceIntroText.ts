import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';

export const insuranceIntroText: SectionType = {
  component: 'section',
  name: getRandomId(),
  css: { mt: '1rem', mb: '4.5rem' },
  fields: [
    {
      component: 'heading',
      name: getRandomId(),
      initialValue: 'Informace pro sjednání',
      css: { as: 'h2', textAlign: 'center', mt: '3rem', fontWeight: 500 },
    },
  ],
};
