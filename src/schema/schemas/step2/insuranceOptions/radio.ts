import { SectionType } from '@src/types';
import { getFetcherDataExtended } from '@src/utils/getFetcherDataExtended';
import getRandomId from '@src/utils/getRandomId';
import { INSURANCE_RADIO_FIELD_NAME } from '@src/schema/schemas/step2/insuranceOptions/constants';
import getRadioOptions from '@src/schema/schemas/step2/insuranceOptions/utilities/getRadioOptions';

export const insuranceRadioOptions: SectionType = {
  component: 'section',
  css: {
    mb: '2rem',
  },
  name: getRandomId(),
  condition: {
    and: [
      {
        when: INSURANCE_RADIO_FIELD_NAME,
        isEmpty: true,
      },
      {
        when: 'preloaded',
        is: (value: boolean | undefined) => {
          return !value;
        },
      },
    ],
  },
  fields: [
    {
      component: 'radio-box',
      label: 'Výběr základní nabídky - následně lze upravit',
      name: INSURANCE_RADIO_FIELD_NAME,
      theme: 'primary',
      options: [],
      optionCss: {
        minH: {
          _: '28rem',
          sm: '29.375rem',
        },
      },
      expectedOptionsLength: 3,
      expectedRecommendedOptionWithTag: true,
      onChangeCb: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      validate: [{ type: 'required', message: 'Vyberte jednu z možností.' }],
      resolveProps: (_props, _fieldApi, formOptions) => {
        const { data, isFetchLoading, isFetchLoadingDebounce } =
          getFetcherDataExtended('autosjednavac');

        if (!data) {
          return {
            isDataLoading: true,
          };
        }

        const { values } = formOptions.getState();
        const options = getRadioOptions(data, values);

        return {
          options,
          isDataLoading: isFetchLoading || isFetchLoadingDebounce,
        };
      },
    },
    {
      component: 'info-box',
      topCss: {
        mt: {
          _: '2rem',
          sm: '2.5rem',
        },
      },
      name: getRandomId(),
      content: JSON.stringify({
        blocks: [
          {
            key: 'bqubj',
            text: 'Každou nabídku lze upravit, např. přidat Havarijní pojištění.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 34, length: 27, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }),
    },
  ],
};
