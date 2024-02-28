import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import config from '@src/config';

export const documentsDownload: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  css: {
    mb: { sm: '1.75rem' },
  },
  fields: [
    {
      component: 'heading',
      name: getRandomId(),
      initialValue: 'Dokumenty k pojistné smlouvě ke stažení',
      css: { as: 'h2', textAlign: 'left', mt: '1.5rem', fontWeight: 500 },
    },
    {
      component: 'grid',
      css: {
        gridTemplateColumns: { sm: '1fr 1fr' },
        gap: { _: '1rem', sm: '1.5rem' },
      },
      name: getRandomId(),
      fields: [
        {
          component: 'box',
          name: getRandomId(),
          css: { display: 'flex', flexDirection: 'column', spaceY: '1.25rem' },
          fields: [
            {
              component: 'link-with-icon',
              as: 'a',
              initialValue:
                'Pojištění vozidel/Pojistné podmínky a vše důležité ke smlouvě (PDF)',
              withIcon: true,
              name: getRandomId(),
              href: `${config.directApiUrl}/document/download/ppas.pdf`,
            },
          ],
        },
      ],
    },
  ],
};
