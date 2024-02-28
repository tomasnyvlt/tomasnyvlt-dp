import { SectionType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import getRandomId from '@src/utils/getRandomId';

type CarCheckTypes =
  | 'CHECK_BY_CLIENT'
  | 'CHECK_BY_ENGINNER'
  | 'CHECK_BY_AGENT'
  | 'PREVIOUS_POLICY';

export const vehicleInspection: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  fields: [
    {
      component: 'heading',
      name: getRandomId(),
      initialValue: 'Prohlídka vozidla',
      css: { as: 'h2', textAlign: 'left', mt: '1.5rem', fontWeight: 500 },
      resolveProps: () => {
        const data = getFetcherData('autosjednavac');
        const { possibleTypes } = data.casco.carCheckRequired;

        if (possibleTypes?.length === 1) {
          if (possibleTypes[0] === 'CHECK_BY_ENGINNER') {
            return { initialValue: 'Prohlídku vozidla provede náš technik' };
          }

          if (possibleTypes[0] === 'CHECK_BY_AGENT') {
            return { initialValue: 'Prohlídku vozidla provede náš makléř' };
          }

          if (possibleTypes[0] === 'PREVIOUS_POLICY') {
            return { initialValue: 'Použijeme již nafocené fotky' };
          }

          return { initialValue: 'Prohlídku vozidla provedete sami' };
        }
        return { initialValue: 'Prohlídka vozidla' };
      },
    },
    {
      component: 'switch-field',
      name: 'photoCheck',
      initialValue: 'CHECK_BY_CLIENT',
      css: { mt: '2rem' },
      options: [],
      resolveProps: () => {
        const data = getFetcherData('autosjednavac');
        const { possibleTypes } = data.casco.carCheckRequired;

        const getLabelName = (optionValue: CarCheckTypes): string => {
          return {
            CHECK_BY_CLIENT: 'Nafotíte ho sami',
            CHECK_BY_ENGINNER: 'Nafotí ho náš technik',
            CHECK_BY_AGENT: 'Nafotí ho makléř',
            PREVIOUS_POLICY: 'Použít nafocené fotky',
          }[optionValue];
        };
        const options = possibleTypes?.map((type) => ({
          label: getLabelName(type as CarCheckTypes),
          value: type,
        }));

        if (
          possibleTypes?.length === 0 ||
          (possibleTypes?.length === 1 &&
            possibleTypes[0] === 'CHECK_BY_CLIENT')
        ) {
          return { hideField: true };
        }

        if (possibleTypes?.length === 1) {
          return { initialValue: possibleTypes[0], hideField: true };
        }

        return {
          hideField: false,
          options,
        };
      },
    },
    {
      component: 'box',
      name: getRandomId(),
      css: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
      fields: [
        {
          component: 'info-box',
          variant: 'infoNoBorder',
          topCss: { mt: '2.5rem', maxW: '25.4375rem' },
          name: getRandomId(),
          content:
            '{"blocks":[{"key":"bqubj","text":"Kde vás nejpravděpodobněji zastihneme mezi 8-18 hodinou? Mobilní technik za vámi přijede klidně i do práce a celou prohlídku zvládne za cca 20 minut. Přečtěte si, jak probíhá prohlídka. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":35,"style":"BOLD"}],"entityRanges":[{"offset":150,"length":35,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=jak-probiha-prohlidka","targetOption":"_self"}}}}',
        },
      ],
      condition: {
        when: 'photoCheck',
        is: 'CHECK_BY_ENGINNER',
      },
    },
  ],
  resolveProps: () => {
    const data = getFetcherData('autosjednavac');
    const { possibleTypes } = data.casco.carCheckRequired;

    if (
      !possibleTypes ||
      possibleTypes?.length === 0 ||
      (possibleTypes?.length === 1 && possibleTypes[0] === 'CHECK_BY_CLIENT')
    ) {
      return { hideField: true };
    }

    return { hideField: false };
  },
};
