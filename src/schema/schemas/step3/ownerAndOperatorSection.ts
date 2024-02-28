import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import { getOwnerAndOperatorCheckboxes } from '@src/schema/schemas/common/getOwnerAndOperatorCheckboxes';

const checkboxes = getOwnerAndOperatorCheckboxes();

export const ownerAndOperatorSection: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  fields: [
    {
      component: 'heading',
      name: getRandomId(),
      initialValue: 'Vlastník a provozovatel vozidla',
      css: { as: 'h2', mt: '1.5rem' },
    },
    { ...checkboxes },
  ],
};
