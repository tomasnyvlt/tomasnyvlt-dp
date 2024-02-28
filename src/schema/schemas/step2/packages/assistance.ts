import {
  CardCheckboxType,
  CheckboxFieldType,
  RadioBoxInfoType,
  RadioBoxOptionType,
} from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import { getFetcherDataExtended } from '@src/utils/getFetcherDataExtended';
import { getFetcherReqBody } from '@src/utils/getFetcherReqBody';
import getFormattedPrice from '@src/utils/getFormattedPrice';
import getRandomId from '@src/utils/getRandomId';
import {
  AssistanceLimitsResponseType,
  AutoSjednavacFetchResponseType,
} from '@src/schematypes/AutoSjednavacFetchType';

type AssistanceValueType =
  | 'PERSONAL_V1'
  | 'PERSONAL_V2'
  | 'PERSONAL_V3'
  | 'PERSONAL_V4'
  | 'TIR_V1'
  | 'TIR_V2';

const getAssistanceCheckboxLabel = ({
  desiredPrice,
  priceShortTerm,
}: {
  desiredPrice: number;
  priceShortTerm?: boolean;
}): string => {
  return JSON.stringify({
    blocks: [
      {
        key: 'bqubj',
        text: `Přidat pomoc při poruše za ${getFormattedPrice({ price: desiredPrice, withYear: !priceShortTerm })}`,
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  });
};

const getMalfunctionPrice = (
  assistance?: AssistanceLimitsResponseType
): number => {
  if (!assistance) {
    return 0;
  }

  return assistance.premiumInclMalfunction - assistance.premiumNoMalfunction;
};

interface AssistanceDataType {
  limitCz: string;
  limitEu: string;
  illustrativeExample?: string;
  checkboxField?: CheckboxFieldType;
  malfunctionAssistance: string;
}

const assistanceData = (
  data: AutoSjednavacFetchResponseType,
  selectedValue: AssistanceValueType
): { [key: string]: AssistanceDataType } => {
  return {
    PERSONAL_V1: {
      limitCz: `Do nejbližšího servisu do limitu ${getFormattedPrice({ price: 3000 })}.`,
      limitEu: `Do nejbližšího servisu do limitu ${getFormattedPrice({ price: 6000 })}.`,
      illustrativeExample: JSON.stringify({
        blocks: [
          {
            key: '53qsg',
            text: 'Hodí se, když jezdíte hlavně po České republice, v okolí domova a potřebujete odtah do nejbližšího servisu. U této varianty je potřeba si rozmyslet, jestli má pomoci i v případě poruchy.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 29, length: 34, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
          {
            key: 'a1p86',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: '590cl',
            text: 'Ilustrativní příklad',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 0, length: 20, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
          {
            key: 'a4u1b',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: 'fkvtd',
            text: 'Klientovi se v Pardubicích porouchal alternátor. Měl asistenci S, ale bohužel neměl sjednanou pomoc v případě poruchy.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 78, length: 40, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
          {
            key: 'eia9e',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: '64cfc',
            text: 'Odtah do nejbližšího, 4 km vzdáleného servisu stál 1 350 Kč a vše musel zaplatit klient. Pokud by měl sjednanou i poruchu, zaplatilo by to pojištění.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 51, length: 8, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
          {
            key: '53sdl',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: '5o1sa',
            text: 'Upozornění: Případ je ilustrativní, i když se skutečně stal. U každé nehody nebo poruchy budeme přistupovat individuálně a bude vždy záležet na nastavení smlouvy, aktuálních cenách a dalších skutečnostech.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 0, length: 205, style: 'ITALIC' }],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }),
      malfunctionAssistance: 'není součástí balíčku',
      ...(data?.assistance.malfunctionAssistanceOptions && {
        checkboxField: {
          component: 'checkbox-field',
          name: 'assistance.malfunctionAssistance2',
          variant: 'sm',
          checkboxColor: 'white',
          checkboxBorderColor: 'indigo2',
          css: { mx: { _: '1.5rem', sm: '1rem' } },
          hideInRadioBoxContainer: selectedValue !== 'PERSONAL_V1',
          label: getAssistanceCheckboxLabel({
            desiredPrice: data?.assistance?.basicAssistanceLimits.filter(
              (limit: AssistanceLimitsResponseType) =>
                limit.value === 'PERSONAL_V1'
            )?.[0]?.premiumInclMalfunction,
            priceShortTerm: data.shortTerm,
          }),
          labelCss: {
            fontWeight: 500,
            color: 'primary.black',
            fontSize: '0.75rem',
            lineHeight: '1rem',
            maxW: '8rem',
          },
          resolveProps: (_props, _fieldApi, formOptions) => {
            const fetcherData = getFetcherData('autosjednavac');
            const { malfunctionAssistance } =
              formOptions.getState().values.assistance;

            // Stejný initialValue jako pro malfunctionAssistance, aby byl zaškrtlý checkbox při fillformu
            return {
              initialValue:
                malfunctionAssistance &&
                !!fetcherData?.assistance.malfunctionAssistanceOptions,
            };
          },
        },
      }),
    },
    PERSONAL_V2: {
      limitCz: `Odtah dle přání klienta do limitu ${getFormattedPrice({ price: 5000 })}.`,
      limitEu: `Do nejbližšího servisu do limitu ${getFormattedPrice({ price: 15000 })}.`,
      illustrativeExample: JSON.stringify({
        blocks: [
          {
            key: '53qsg',
            text: 'Hodí se, když jezdíte hlavně po České republice a v okolí domova. Potřebujete odtah do nejbližšího servisu a chcete pomoc i při poruše.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 29, length: 36, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
          {
            key: '792qe',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: 'a0eb9',
            text: 'Ilustrativní příklad',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 0, length: 20, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
          {
            key: 'fn18s',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: '926fn',
            text: 'Klientovi, který měl sjednanou asistenci M, se porouchal motor. Potřeboval odtáhnout domů, což bylo 65 km od místa, kde k poruše došlo.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 100, length: 5, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
          {
            key: 'be80',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: 'e9ida',
            text: '4 000 Kč za odtah zaplatil Direct, protože porucha je součástí varianty asistenční služby M.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 0, length: 8, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
          {
            key: '1jv29',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: '53n1j',
            text: 'Upozornění: Případ je ilustrativní, i když se skutečně stal. U každé nehody nebo poruchy budeme přistupovat individuálně a bude vždy záležet na nastavení smlouvy, aktuálních cenách a dalších skutečnostech.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 0, length: 205, style: 'ITALIC' }],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }),
      malfunctionAssistance: 'v ceně',
    },
    PERSONAL_V3: {
      limitCz: `Odtah dle přání klienta do limitu ${getFormattedPrice({ price: 10000 })}.`,
      limitEu: `Do nejbližšího servisu do limitu ${getFormattedPrice({ price: 30000 })}.`,
      illustrativeExample: JSON.stringify({
        blocks: [
          {
            key: '53qsg',
            text: 'Hodí se, když každý rok jedete autem na zahraniční dovolenou. Pravidelně jezdíte po celé České republice a chcete pomoc i při poruše.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 37, length: 24, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
          {
            key: '74oh6',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: '8jr6m',
            text: 'Ilustrativní příklad',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 0, length: 20, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
          {
            key: 'c4dqm',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: '9bvig',
            text: 'Porucha auta v Jihlavě, odtažení do servisu vzdáleného 120 km a náhradní auto – to vše dohromady stálo 12 463 Kč. Vše zaplatil Direct. Klient měl totiž sjednanou asistenci L, která zahrnuje i poruchu.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 103, length: 10, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
          {
            key: 'fc432',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: '7aile',
            text: 'Upozornění: Případ je ilustrativní, i když se skutečně stal. U každé nehody nebo poruchy budeme přistupovat individuálně a bude vždy záležet na nastavení smlouvy, aktuálních cenách a dalších skutečnostech.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 0, length: 205, style: 'ITALIC' }],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }),
      malfunctionAssistance: 'v ceně',
    },
    PERSONAL_V4: {
      limitCz: `Odtah kamkoliv v rámci ČR.`,
      limitEu: `Odtah kamkoliv.`,
      illustrativeExample: JSON.stringify({
        blocks: [
          {
            key: '53qsyg',
            text: 'Hodí se, když v autě v podstatě žijete. Jezdíte po Česku i po Evropě a chcete mít jistotu, že vám asistence maximálně pomůže.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 37, length: 24, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
          {
            key: '8jr6wm',
            text: 'Ilustrativní příklad',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 0, length: 20, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
          {
            key: 'c4dym',
            text: '',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: '9bviag',
            text: 'Klient se v Norsku střetl se zvěří. Následkem byl účet ve výši 129 267 Kč. Přesně tolik stálo zorganizování návratu klienta i s autem do České republiky. Vše zaplatil Direct. Bezlimitní repatriace je totiž součástí varianty XL.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [{ offset: 103, length: 10, style: 'BOLD' }],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }),
      malfunctionAssistance: 'v ceně',
    },
    TIR_V1: {
      limitCz: `Odtah do nejbližšího servisu do limitu ${getFormattedPrice({ price: 5000 })}.`,
      limitEu: `Odtah do nejbližšího servisu do limitu ${getFormattedPrice({ price: 10000 })}.`,
      malfunctionAssistance:
        getMalfunctionPrice(
          data?.assistance?.basicAssistanceLimits.filter(
            (limit: AssistanceLimitsResponseType) => limit.value === 'TIR_V1'
          )?.[0]
        ) === 0
          ? 'v ceně'
          : 'není součástí balíčku',
    },
    TIR_V2: {
      limitCz: `Odtah dle přání klienta do limitu ${getFormattedPrice({ price: 40000 })}.`,
      limitEu: `Do nejbližšího servisu do limitu ${getFormattedPrice({ price: 40000 })}.`,
      malfunctionAssistance:
        getMalfunctionPrice(
          data?.assistance?.basicAssistanceLimits.filter(
            (limit: AssistanceLimitsResponseType) => limit.value === 'TIR_V2'
          )?.[0]
        ) === 0
          ? 'v ceně'
          : 'není součástí balíčku',
    },
  };
};

export const assistance: CardCheckboxType = {
  component: 'card-checkbox',
  css: { order: { _: 2, sm: 4 } },
  label: 'Asistenční služby',
  name: 'assistanceCard',
  initialValue: true,
  resolveProps: (_props, _fieldApi) => {
    const { data, isFetchLoading } = getFetcherDataExtended('autosjednavac');

    return {
      price: data?.assistance?.premiumTotal,
      priceShortTerm: data?.shortTerm,
      isDisabled: true,
      isPriceLoading: isFetchLoading,
    };
  },
  fields: [
    {
      component: 'checkbox-field',
      css: { display: 'none' },
      name: 'assistance.malfunctionAssistance',
      initialValue: false,
      label: '',
      resolveProps: (_props, _fieldApi, formOptions) => {
        const data = getFetcherData('autosjednavac');
        const variantCode =
          formOptions.getState().values.assistance?.variantCode;
        const malfunctionAssistance =
          formOptions.getState().values.assistance?.malfunctionAssistance;
        const initialValueFromVariantCode =
          variantCode === 'TIR_V1' || variantCode === 'TIR_V2';

        return {
          initialValue:
            malfunctionAssistance === undefined
              ? !initialValueFromVariantCode &&
                !!data?.assistance?.malfunctionAssistanceOptions
              : malfunctionAssistance,
        };
      },
    },
    {
      component: 'grid',
      name: getRandomId(),
      css: {
        gridTemplateColumns: '1fr',
        px: '1.5rem',
        pb: '1.5rem',
        w: '100%',
      },
      fields: [
        {
          component: 'edit-field',
          label: 'Asistence M',
          name: 'assistance.editAssistance',
          css: {
            p: 0,
          },
          helper:
            '{"blocks":[{"key":"bqubj","text":"Všechny asistence","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":17,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=balicky-asistence","targetOption":"_self"}}}}',
          fields: [
            {
              component: 'assistance-modal',
              name: 'assistance.variantCode',
              label: 'Asistence',
              condition: {
                sequence: [
                  {
                    when: 'assistance.malfunctionAssistance2',
                    is: true,
                    then: {
                      set: () => {
                        return {
                          'assistance.malfunctionAssistance': true,
                          'assistance.variantCode': 'PERSONAL_V1',
                        };
                      },
                    },
                    else: {
                      visible: true,
                    },
                  },
                  {
                    when: 'assistance.malfunctionAssistance2',
                    is: false,
                    then: {
                      set: () => {
                        return {
                          'assistance.malfunctionAssistance': false,
                        };
                      },
                    },
                    else: {
                      visible: true,
                    },
                  },
                  {
                    when: 'assistance.variantCode',
                    is: 'PERSONAL_V2',
                    then: {
                      set: () => {
                        return {
                          'assistance.malfunctionAssistance': false,
                          'assistance.malfunctionAssistance2': false,
                        };
                      },
                    },
                    else: {
                      visible: true,
                    },
                  },
                  {
                    when: 'assistance.variantCode',
                    is: 'PERSONAL_V3',
                    then: {
                      set: () => {
                        return {
                          'assistance.malfunctionAssistance': false,
                          'assistance.malfunctionAssistance2': false,
                        };
                      },
                    },
                    else: {
                      visible: true,
                    },
                  },
                  {
                    when: 'assistance.variantCode',
                    is: 'PERSONAL_V4',
                    then: {
                      set: () => {
                        return {
                          'assistance.malfunctionAssistance': false,
                          'assistance.malfunctionAssistance2': false,
                        };
                      },
                    },
                    else: {
                      visible: true,
                    },
                  },
                ],
              },
              resolveProps: (_props, _fieldApi, formOptions) => {
                const data = getFetcherData('autosjednavac');
                const { values } = formOptions.getState();
                const basicAssistanceLimits =
                  data?.assistance?.basicAssistanceLimits;
                const reqBody = getFetcherReqBody('autosjednavac');
                const disablePersonalV4 = !(
                  reqBody?.temp.isInternalUser || reqBody?.temp.isAgent
                );

                const isValueInLimit = basicAssistanceLimits?.find(
                  (limit) => limit.value === values?.assistance?.variantCode
                );

                const initialValue = isValueInLimit
                  ? values?.assistance?.variantCode
                  : basicAssistanceLimits?.find(
                        (limit) => limit.value === 'PERSONAL_V2'
                      )
                    ? 'PERSONAL_V2'
                    : basicAssistanceLimits?.find(
                          (limit) => limit.value === 'PERSONAL_V1'
                        )
                      ? 'PERSONAL_V1'
                      : basicAssistanceLimits?.find(
                            (limit) => limit.value === 'TIR_V1'
                          )
                        ? 'TIR_V1'
                        : undefined;

                const assistanceDataNames: AssistanceValueType =
                  'PERSONAL_V1' ||
                  'PERSONAL_V2' ||
                  'PERSONAL_V3' ||
                  'PERSONAL_V4' ||
                  'TIR_V1' ||
                  'TIR_V2';

                const options: RadioBoxOptionType[] =
                  data?.assistance?.basicAssistanceLimits
                    ?.filter(
                      (limit: AssistanceLimitsResponseType) =>
                        limit.value !== (disablePersonalV4 ? 'PERSONAL_V4' : '')
                    )
                    .map((limit) => {
                      const getOptionInfo = (): Array<RadioBoxInfoType[]> => {
                        const optionData = assistanceData(
                          data,
                          values?.assistance?.variantCode
                        )[limit.value as typeof assistanceDataNames];

                        if (!optionData) {
                          return [];
                        }

                        return [
                          [
                            {
                              headings: ['Odtah ČR'],
                              text: [optionData?.limitCz],
                            },
                            {
                              headings: ['Odtah Evropa'],
                              text: optionData.illustrativeExample
                                ? [
                                    optionData?.limitEu,
                                    {
                                      modalLinkText: 'Ilustrativní příklad',
                                      modal: {
                                        heading: `Varianta ${limit.description.split(' ')[1]}`,
                                        content: optionData.illustrativeExample,
                                      },
                                    },
                                  ]
                                : [optionData?.limitEu],
                            },
                          ],
                          [
                            {
                              headings: [
                                {
                                  modalLinkText: 'Pomoc při poruše',
                                  modal: {
                                    heading: 'Pomoc při poruše',
                                    content: JSON.stringify({
                                      blocks: [
                                        {
                                          key: '53qsg',
                                          text: 'Porucha – nepojízdnost vozidla způsobená jakoukoliv nahodilou mechanickou, elektrickou či elektronickou závadou. Toto pojištění si můžete sjednat jen k asistenční variantě S. Ostatní varianty už toto pojištění obsahují automaticky. ',
                                          type: 'unstyled',
                                          depth: 0,
                                          inlineStyleRanges: [
                                            {
                                              offset: 0,
                                              length: 7,
                                              style: 'BOLD',
                                            },
                                          ],
                                          entityRanges: [],
                                          data: {},
                                        },
                                        {
                                          key: '58s65',
                                          text: '',
                                          type: 'unstyled',
                                          depth: 0,
                                          inlineStyleRanges: [],
                                          entityRanges: [],
                                          data: {},
                                        },
                                        {
                                          key: '8sfl5',
                                          text: 'Drobná závada - defekt pneumatiky, vybití startovací baterie, nedostatek nebo záměna paliva, ztráta, zabouchnutí nebo zalomení klíčů, zamrznutí paliva nebo ruční brzdy. Toto pojištění obsahují již všechny varianty asistence.',
                                          type: 'unstyled',
                                          depth: 0,
                                          inlineStyleRanges: [
                                            {
                                              offset: 0,
                                              length: 13,
                                              style: 'BOLD',
                                            },
                                          ],
                                          entityRanges: [],
                                          data: {},
                                        },
                                      ],
                                      entityMap: {},
                                    }),
                                  },
                                },
                              ],
                              text: [optionData.malfunctionAssistance],
                            },
                            {
                              ...(optionData?.checkboxField && {
                                checkboxField: optionData.checkboxField,
                              }),
                            },
                          ],
                        ];
                      };

                      const getLabel = (description: string): string => {
                        const type = description.split(' ')[1];

                        switch (type) {
                          case 'S':
                            return 'Základní (S)';
                          case 'M':
                            return 'Doporučená (M)';
                          case 'L':
                            return 'Rozšířená (L)';
                          default:
                            return description;
                        }
                      };

                      const option: RadioBoxOptionType = {
                        label: getLabel(limit.description),
                        value: limit.value,
                        price: {
                          text:
                            getFormattedPrice({
                              price: limit.premiumNoMalfunction,
                              withYear: !data?.shortTerm,
                            }) ?? '-',
                        },
                        buttonText: 'Vybrat',
                        checkedButtonText: 'Vybráno',
                        recommended: limit.value === 'PERSONAL_V2',
                        recommendedLgTag:
                          limit.value === 'PERSONAL_V2'
                            ? 'Doporučeno'
                            : undefined,
                        info: getOptionInfo(),
                      };

                      return option;
                    });

                return {
                  isOpen: values.assistance?.editAssistance,
                  editFields: ['assistance.editAssistance'],
                  options,
                  otherFields:
                    (values?.assistance?.variantCode === 'TIR_V1' ||
                      values?.assistance?.variantCode === 'TIR_V2') &&
                    data?.assistance?.malfunctionAssistanceOptions
                      ? [
                          {
                            component: 'heading',
                            name: 'delete.fakeBoxId214asdas3123541324',
                            initialValue: 'Doplňující informace',
                            css: {
                              as: 'h2',
                              textAlign: 'left',
                              mt: '2.5rem',
                              fontWeight: 600,
                              lineHeight: '1.375rem',
                              fontSize: '1.125rem',
                              color: 'primary.black',
                            },
                          },
                          {
                            component: 'box',
                            name: 'delete.fakeBoxId2143123541324',
                            css: { w: 'calc(50% - 0.75rem)' },
                            fields: [
                              {
                                component: 'checkbox-field',
                                name: 'assistance.malfunctionAssistance',
                                variant: 'sm',
                                checkboxColor: 'white',
                                checkboxBorderColor: 'indigo2',
                                css: {
                                  w: '100%',
                                  mt: { _: '1.5rem', sm: '2rem' },
                                  px: { _: '1.5rem', sm: '1rem' },
                                  minH: '3.5rem',
                                  border: '1px solid',
                                  borderColor: 'tercial.indigo2',
                                  borderRadius: '0.625rem',
                                  bg: 'tercial.indigo3',
                                },
                                helper: JSON.stringify({
                                  blocks: [
                                    {
                                      key: 'bqaubj',
                                      text: 'Co myslíme rozšířenou pomocí při poruše?',
                                      type: 'unstyled',
                                      entityRanges: [
                                        { offset: 0, length: 40, key: 0 },
                                      ],
                                    },
                                  ],
                                  entityMap: {
                                    '0': {
                                      type: 'LINK',
                                      mutability: 'MUTABLE',
                                      data: {
                                        url: '#modal=pomoc-pri-poruse',
                                        targetOption: '_self',
                                      },
                                    },
                                  },
                                }),
                                helperCss: { ml: 0 },
                                label: getAssistanceCheckboxLabel({
                                  desiredPrice: getMalfunctionPrice(
                                    data?.assistance?.basicAssistanceLimits?.filter(
                                      (limit: AssistanceLimitsResponseType) =>
                                        limit.description ===
                                        data.assistance?.variantCodeDescription
                                    )?.[0]
                                  ),
                                  priceShortTerm: data.shortTerm,
                                }),
                                labelCss: {
                                  fontWeight: 500,
                                  color: 'primary.black',
                                  fontSize: '0.75rem',
                                  lineHeight: '1rem',
                                  maxW: '8rem',
                                },
                              },
                            ],
                          },
                        ]
                      : undefined,
                  initialValue,
                };
              },
              options: [],
            },
          ],
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { data, isFetchLoading } =
              getFetcherDataExtended('autosjednavac');

            return {
              price: data?.assistance?.basicAssistance?.premium,
              priceShortTerm: data?.shortTerm,
              isPriceLoading: isFetchLoading,
              label: data?.assistance?.basicAssistanceLimits
                ?.find(
                  (limit: {
                    premiumInclMalfunction: number;
                    premiumNoMalfunction: number;
                    description: string;
                    value: string;
                  }) =>
                    limit.value ===
                    formOptions.getState().values.assistance?.variantCode
                )
                ?.description.replace('Varianta', 'Asistence'),
              helper:
                data?.assistance?.basicAssistanceLimits?.filter(
                  (option) =>
                    option.value === 'TIR_V1' || option.value === 'TIR_V2'
                )?.length ?? 0 > 1
                  ? JSON.stringify({
                      blocks: [
                        {
                          key: 'bqubj',
                          text: 'Všechny asistence',
                          type: 'unstyled',
                          entityRanges: [{ offset: 0, length: 27, key: 0 }],
                        },
                      ],
                      entityMap: {
                        '0': {
                          type: 'LINK',
                          mutability: 'MUTABLE',
                          data: {
                            url: '#modal=balicky-asistence-nad-3-5-t',
                            targetOption: '_self',
                          },
                        },
                      },
                    })
                  : JSON.stringify({
                      blocks: [
                        {
                          key: 'bquabj',
                          text: 'Všechny asistence',
                          type: 'unstyled',
                          entityRanges: [{ offset: 0, length: 17, key: 0 }],
                        },
                      ],
                      entityMap: {
                        '0': {
                          type: 'LINK',
                          mutability: 'MUTABLE',
                          data: {
                            url: '#modal=balicky-asistence',
                            targetOption: '_self',
                          },
                        },
                      },
                    }),
            };
          },
        },
        {
          component: 'box',
          name: getRandomId(),
          css: {
            display: 'grid',
            gap: '1rem',
            flexDirection: 'column',
          },
          fields: [
            {
              component: 'toggle-field',
              name: 'assistance.carReplacementBoolean',
              legend: 'Náhradní vozidlo',
              options: [
                {
                  value: 1,
                  label: 'Ano',
                },
                {
                  value: 0,
                  label: 'Ne',
                },
              ],
              helper: 'Cena za rok: od 299 Kč v závislosti délce zapůjčení',
              resolveProps: (_props, _fieldApi, formOptions) => {
                const data = getFetcherData('autosjednavac');
                const { values } = formOptions.getState();

                const {
                  carReplacementDays,
                  malfunctionAssistance,
                  malfunctionAssistance2,
                  variantCode,
                } = values.assistance || {};
                const initialValue = carReplacementDays ? 1 : 0;

                const includeMalfunction =
                  malfunctionAssistance ||
                  malfunctionAssistance2 ||
                  variantCode === 'PERSONAL_V2' ||
                  variantCode === 'PERSONAL_V3' ||
                  variantCode === 'PERSONAL_V4';

                const filteredOptions =
                  data?.assistance?.carReplacementDaysOptions?.filter(
                    (option) => option.value !== 'DAYS_0'
                  );
                const minPrice: number = filteredOptions?.reduce(
                  (acc, curr) => {
                    if (includeMalfunction) {
                      return curr.premiumInclMalfunction < acc
                        ? curr.premiumInclMalfunction
                        : acc;
                    }

                    return curr.premiumNoMalfunction < acc
                      ? curr.premiumNoMalfunction
                      : acc;
                  },
                  includeMalfunction
                    ? filteredOptions?.[0]?.premiumInclMalfunction
                    : filteredOptions?.[0]?.premiumNoMalfunction
                );

                const helper = `Cena za rok: od ${minPrice} Kč v závislosti délce zapůjčení`;

                return {
                  initialValue,
                  ...(minPrice ? { helper } : {}),
                };
              },
            },
            {
              component: 'select-field',
              name: 'assistance.carReplacementDays',
              label: 'Počet dnů zapůjčení vozidla',
              isSearchable: false,
              options: [],
              resolveProps: (_props, _fieldApi, formOptions) => {
                const data = getFetcherData('autosjednavac');
                const {
                  malfunctionAssistance,
                  malfunctionAssistance2,
                  variantCode,
                } = formOptions.getState().values.assistance;
                const includeMalfunction =
                  malfunctionAssistance ||
                  malfunctionAssistance2 ||
                  variantCode === 'PERSONAL_V2' ||
                  variantCode === 'PERSONAL_V3' ||
                  variantCode === 'PERSONAL_V4';

                return {
                  options: data?.assistance?.carReplacementDaysOptions
                    ?.filter((option) => option.value !== 'DAYS_0')
                    .map((option) => ({
                      label: `${option.description} (celkem ${
                        includeMalfunction
                          ? option.premiumInclMalfunction
                          : option.premiumNoMalfunction
                      } Kč)`,
                      value: option.value,
                    })),
                  hideField:
                    Number(
                      formOptions.getState().values.assistance
                        .carReplacementBoolean
                    ) === 0,
                  updateLabelOnOptionChange: true,
                };
              },
            },
          ],
          resolveProps: () => {
            const data = getFetcherData('autosjednavac');

            return {
              hideField: !data?.assistance?.carReplacementDaysOptions,
            };
          },
        },
      ],
    },
  ],
};
