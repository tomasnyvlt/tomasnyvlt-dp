import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';

export const vehicleIntroText: SectionType = {
  component: 'section',
  name: getRandomId(),
  css: { mt: '1rem' },
  fields: [
    {
      component: 'checkbox-button',
      name: 'displayAllVehicleInfo',
      initialValue: false,
      label: 'Upravit',
      css: { display: 'none' },
    },
    {
      component: 'heading',
      initialValue: 'Základní údaje o vozidle',
      name: getRandomId(),
      css: { as: 'h2', textAlign: 'center', mt: '3rem' },
    },
    {
      component: 'box',
      css: { display: 'flex', justifyContent: 'center' },
      name: getRandomId(),
      fields: [
        {
          component: 'heading',
          initialValue:
            'Pro sjednání smlouvy prosím doplňte zbývající údaje o vozidle, které pojišťujete.',
          name: getRandomId(),
          css: {
            as: 'p',
            textAlign: 'center',
            mt: '0.625rem',
            fontSize: '0.875rem',
            lineHeight: '1.125rem',
            color: 'primary.black50',
            maxW: '26.5rem',
          },
        },
      ],
    },
  ],
};
