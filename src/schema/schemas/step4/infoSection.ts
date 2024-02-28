import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';

export const infoSection: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  fields: [
    {
      component: 'box',
      css: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: '2.0625rem',
      },
      fields: [
        {
          component: 'info-box',
          content: 'Tyto dokumenty vám pošleme také na e-mail nebo poštou.',
          name: getRandomId(),
          variant: 'clear',
          css: {
            w: '100%',
            fontSize: '0.625rem',
            color: 'tercial.indigo1Alpha50',
            p: 0,
            m: 0,
          },
        },
      ],
      name: getRandomId(),
    },
  ],
};
