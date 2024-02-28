import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';

export const carousels: SectionType = {
  component: 'section',
  name: getRandomId(),
  css: {
    mt: {
      _: '1rem',
      sm: '4.25rem',
    },
  },
  fields: [
    {
      component: 'grid',
      name: getRandomId(),
      fields: [
        {
          component: 'carousel-box',
          name: getRandomId(),
          items: [
            {
              title: 'Nejoblíbenější pojišťovácká appka',
              content:
                'V ceně máte zdarma náhradní vozidlo, když se cokoliv stane, jsme tu a postaráme se o vás, ať už jde o výměnu oleje nebo poruchu.',
              file: {
                id: '8b3470ca-bdbd-4fa0-80d3-9306a5797cda',
                name: 'havarka.svg',
                alternativeText: 'havarka.svg',
                caption: 'havarka.svg',
                width: 205,
                height: 163,
                hash: 'havarka_b63c62724c',
                ext: '.svg',
                mime: 'image/svg+xml',
                size: 14.11,
                url: 'https://cdn.direct.cz/havarka_b781f3297d.svg',
                provider: 'aws-s3',
                createdAt: '2022-10-25T09:08:06.182Z',
                updatedAt: '2022-10-25T09:09:06.834Z',
              },
            },
            {
              title: 'Nejoblíbenější pojišťovácká appka',
              content:
                'V ceně máte zdarma náhradní vozidlo, když se cokoliv stane, jsme tu a postaráme se o vás, ať už jde o výměnu oleje nebo poruchu.',
              file: {
                id: '8b3470ca-bdbd-4fa0-80d3-9306a5797cda',
                name: 'Osobak.svg',
                alternativeText: 'Osobak.svg',
                caption: 'Osobak.svg',
                width: 185,
                height: 69,
                hash: 'Osobak_b63c62724c',
                ext: '.svg',
                mime: 'image/svg+xml',
                size: 14.11,
                url: 'https://cdn.direct.cz/Osobak_b63c62724c.svg',
                provider: 'aws-s3',
                createdAt: '2022-10-25T09:08:06.182Z',
                updatedAt: '2022-10-25T09:09:06.834Z',
              },
            },
            {
              title: 'Nejoblíbenější pojišťovácká appka',
              content:
                'Hlídání splatností, zelená karta, pomoc na jeden klik? To všechno už je také vaše, stahujte',
              button: {
                linkText: 'Zjistit více',
                linkUrl: '#',
                openLinkInNewTab: true,
              },
              file: {
                id: '8b3470ca-bdbd-4fa0-80d3-9306a5797cda',
                name: 'Osobak.svg',
                alternativeText: 'Osobak.svg',
                caption: 'Osobak.svg',
                width: 185,
                height: 69,
                hash: 'Osobak_b63c62724c',
                ext: '.svg',
                mime: 'image/svg+xml',
                size: 14.11,
                url: 'https://cdn.direct.cz/Osobak_b63c62724c.svg',
                provider: 'aws-s3',
                createdAt: '2022-10-25T09:08:06.182Z',
                updatedAt: '2022-10-25T09:09:06.834Z',
              },
            },
          ],
        },
        {
          component: 'carousel-box',
          name: getRandomId(),
          items: [
            {
              title: 'Nejoblíbenější pojišťovácká appka',
              content:
                'V ceně máte zdarma náhradní vozidlo, když se cokoliv stane, jsme tu a postaráme se o vás, ať už jde o výměnu oleje nebo poruchu.',
              button: {
                linkText: 'Zjistit více',
                linkUrl: '#',
                openLinkInNewTab: true,
              },
              file: {
                id: '8b3470ca-bdbd-4fa0-80d3-9306a5797cda',
                name: 'havarka.svg',
                alternativeText: 'havarka.svg',
                caption: 'havarka.svg',
                width: 205,
                height: 163,
                hash: 'havarka_b63c62724c',
                ext: '.svg',
                mime: 'image/svg+xml',
                size: 14.11,
                url: 'https://cdn.direct.cz/havarka_b781f3297d.svg',
                provider: 'aws-s3',
                createdAt: '2022-10-25T09:08:06.182Z',
                updatedAt: '2022-10-25T09:09:06.834Z',
              },
            },

            {
              title: 'Nejoblíbenější pojišťovácká appka',
              content:
                'Hlídání splatností, zelená karta, pomoc na jeden klik? To všechno už je také vaše, stahujte',

              file: {
                id: '8b3470ca-bdbd-4fa0-80d3-9306a5797cda',
                name: 'Osobak.svg',
                alternativeText: 'Osobak.svg',
                caption: 'Osobak.svg',
                width: 185,
                height: 69,
                hash: 'Osobak_b63c62724c',
                ext: '.svg',
                mime: 'image/svg+xml',
                size: 14.11,
                url: 'https://cdn.direct.cz/Osobak_b63c62724c.svg',
                provider: 'aws-s3',
                createdAt: '2022-10-25T09:08:06.182Z',
                updatedAt: '2022-10-25T09:09:06.834Z',
              },
            },
          ],
        },
      ],
    },
  ],
};
