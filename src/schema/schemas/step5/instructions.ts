import { SectionType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import getRandomId from '@src/utils/getRandomId';
import { FEATURE_FLAGS } from '@src/schema/schemas/constants/featureFlags';
import getDeepObjectValue from '@src/utils/getDeepObjectValue';

const carImageFile = {
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
};

export const instructions: SectionType = {
  component: 'section',
  variant: 'withBorder',
  name: getRandomId(),
  css: { pb: '2.5rem', pt: { _: '1.25rem', sm: '0.625rem' } },
  resolveProps: (_props, _fieldApi, formOptions) => {
    const formValues = formOptions.getState().values;
    const data = getFetcherData('autosjednavac');
    const spz = formValues?.registrationPlate;
    const registrationBookNumber = formValues?.vehicle?.registrationBookNumber;
    const dontHaveSpz = formValues?.dontHaveSpz;
    const vehicleNonREGISTRED =
      formValues?.vehicle?.type?.value === 'WORK_MACHINE_NONREGISTRED' ||
      formValues?.vehicle?.type?.value === 'SINGLE_WHEEL_TRACTOR' ||
      formValues?.vehicle?.type?.value ===
        'TRAILER_WORK_MACHINE_NONREGISTRED' ||
      formValues?.vehicle?.type?.value === 'OTHER_VEHICLE';

    return {
      hideField:
        vehicleNonREGISTRED ||
        (!dontHaveSpz &&
          spz &&
          registrationBookNumber &&
          !data?.casco?.selected),
    };
  },
  fields: [
    {
      component: 'grid',
      css: { display: { _: 'flex', sm: 'grid' }, flexDirection: 'column' },
      name: getRandomId(),
      fields: [
        {
          component: 'carousel-box',
          contentCss: { pb: { _: '3.25rem', sm: 0 } },
          name: getRandomId(),
          items: [],
          resolveProps: (_props, _fieldApi, formOptions) => {
            const formValues = formOptions.getState().values;
            const vehicle = formValues?.vehicle;
            const data = getFetcherData('autosjednavac');
            const date = new Date(data.installmentDate).toLocaleDateString();
            const dontHaveSpz = formValues?.dontHaveSpz;
            const noSpz = !vehicle?.registrationPlate;
            const noRegistrationBookNumber = !vehicle?.registrationBookNumber;

            const isOrvEnabled = getDeepObjectValue({
              obj: formValues,
              keys: FEATURE_FLAGS.ORV_ENABLED.split('.'),
            });

            return {
              items: [
                {
                  title: `Do ${date} nám prosím pošlete:`,
                  content: JSON.stringify({
                    blocks: [
                      {
                        key: 'bqubj',
                        text: noRegistrationBookNumber
                          ? isOrvEnabled
                            ? '- číslo Dokladu o registraci vozidla II'
                            : '- číslo Velkého technického průkazu'
                          : '',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [
                          { offset: 0, length: 78, style: 'BOLD' },
                        ],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '3pns2',
                        text:
                          dontHaveSpz && noSpz
                            ? '- registrační značku vozidla'
                            : '',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [
                          { offset: 0, length: 28, style: 'BOLD' },
                        ],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '33mrn',
                        text: '',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: '6899s',
                        text: 'Nejjednodušeji to zvládnete přes Direct ',
                        type: 'header-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'fr47f',
                        text: 'appku.',
                        type: 'header-one',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                      {
                        key: 'rj64',
                        text: 'Pokud nám údaje nedodáte, pojištění v tento den skončí a nebude dál platit.',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                      },
                    ],
                    entityMap: {},
                  }),
                },
              ],
              hideField: !noSpz && !noRegistrationBookNumber,
            };
          },
        },
        {
          component: 'carousel-box',
          name: getRandomId(),
          items: [],
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { photoCheck } = formOptions.getState().values;
            const data = getFetcherData('autosjednavac');

            return {
              items: [
                photoCheck === 'CHECK_BY_CLIENT'
                  ? {
                      title: `Nezapomeňte udělat prohlídku vozidla co nejdřív.`,
                      content:
                        'Vybrali jste si možnost, že vozidlo nafotíte sami. Podrobnější informace jsme vám poslali do e-mailu.',
                      file: carImageFile,
                    }
                  : {
                      title: 'Náš technik se vám ozve.',
                      content:
                        'Vybrali jste si možnost, že vozidlo nafotí náš technik. Podrobnější informace jsme vám poslali do e-mailu.',
                      file: carImageFile,
                    },
              ],
              hideField: !data?.casco?.selected,
            };
          },
        },
      ],
    },
  ],
};
