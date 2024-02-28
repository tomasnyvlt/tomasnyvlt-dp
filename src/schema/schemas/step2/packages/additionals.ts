import { FORM_STORE_REFRESH_TRIGGER_KEY } from '@src/constants/fields';
import { GridType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import getFormattedPrice from '@src/utils/getFormattedPrice';
import getRandomId from '@src/utils/getRandomId';
import { FIELD_NAMES } from '@src/schema/schemas/constants/fieldNames';
import { LimitType } from '@src/schematypes/AutoSjednavacFetchType';

export const additionals: GridType = {
  component: 'grid',
  css: { gridTemplateColumns: { _: '1', sm: '2' }, gap: '1.5rem' },
  name: getRandomId(),
  resolveProps: (_props, _fieldApi, formOptions) => {
    const formValues = formOptions?.getState().values;
    const defaultFieldsToRender = 4;

    return {
      fieldsToRender:
        formValues.seeAllAdditionals ||
        ((formValues?.additionals?.injuryLimitCheckbox ?? false) &&
          (formValues?.additionals?.parents ?? false))
          ? 6
          : defaultFieldsToRender,
      defaultFieldsToRender,
    };
  },
  bottomFields: [
    {
      component: 'checkbox-button',
      label: 'Zobrazit více',
      withIcon: true,
      name: 'seeAllAdditionals',
      resolveProps: (_props, _fieldApi, formOptions) => {
        const formValues = formOptions?.getState().values;

        if (formValues?.seeAllAdditionals) {
          return {
            label: 'Zobrazit méně',
          };
        }
        return {
          initialValue:
            (formValues?.additionals?.injuryLimitCheckbox ?? false) ||
            (formValues?.additionals?.parents ?? false),
        };
      },
    },
  ],
  fields: [
    {
      component: 'card-checkbox-additional',
      label: 'Pojištění skel',
      tag: 'Nejprodávanější',
      cardHelper:
        '{"blocks":[{"key":"bqubj","text":"Co myslíme pojištěním skel?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":27,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=co-myslime-pojistenim-skel","targetOption":"_self"}}}}',
      condition: {
        when: FORM_STORE_REFRESH_TRIGGER_KEY,
        is: () => {
          const data = getFetcherData('autosjednavac');
          return data?.additionals?.glassLimits;
        },
      },
      name: 'additionals.glassLimit',
      resolveProps: (_props, _fieldApi, formOptions) => {
        const data = getFetcherData('autosjednavac');
        const formValues = formOptions?.getState().values;

        return {
          price:
            formValues?.additionals?.glassLimit &&
            formValues?.additionals?.glassLimits
              ? data?.additionals?.glassLimits?.find(
                  (limit: LimitType) =>
                    limit.value === formValues?.additionals?.glassLimits?.value
                )?.premium
              : data?.additionals?.glassLimits?.find(
                  (limit: LimitType) => limit.value === '7000'
                )?.premium,
          priceShortTerm: data.shortTerm,
        };
      },
      fields: [
        {
          component: 'select-field',
          name: 'additionals.glassLimits',
          label: 'Limit pojištění',
          isSearchable: false,
          options: [],
          resolveProps: (_props, _fieldApi, formOptions) => {
            const data = getFetcherData('autosjednavac');
            const formValues = formOptions?.getState().values;

            const inititalValue =
              typeof formValues?.additionals?.glassLimit === 'string'
                ? formValues?.additionals.glassLimit
                : '7000';

            return {
              options: data?.additionals?.glassLimits?.map(
                (limit: {
                  description: string;
                  premium: number;
                  premiumBasic: number;
                  premiumFullCasco: number;
                  value: string;
                }) => ({
                  label: `${limit.description}${
                    limit.premium !== 0
                      ? `(${getFormattedPrice({ price: limit.premium })})`
                      : ''
                  }`,
                  value: limit.value,
                })
              ),
              initialValue: inititalValue,
            };
          },
        },
      ],
    },
    {
      component: 'card-checkbox-additional',
      label: 'Pojištění nezaviněné bouračky',
      cardHelper:
        '{"blocks":[{"key":"bqubj","text":"Co myslíme pojištěním nezaviněné bouračky?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":42,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=pojisteni-nezavinene-bouracky","targetOption":"_self"}}}}',
      name: 'additionals.directClaimManagement',
      condition: {
        when: FORM_STORE_REFRESH_TRIGGER_KEY,
        is: () => {
          const data = getFetcherData('autosjednavac');
          return data?.additionals?.directClaimManagementOptions;
        },
      },
      resolveProps: () => {
        const data = getFetcherData('autosjednavac');
        return {
          price: data?.additionals.directClaimManagementOptions?.find(
            (option: { premium: number; description: string; value: string }) =>
              option.value === 'true'
          )?.premium,
          priceShortTerm: data?.shortTerm,
        };
      },
    },
    {
      component: 'card-checkbox-additional',
      label: 'Pojištění dětských sedaček a zavazadel',
      cardHelper:
        '{"blocks":[{"key":"bqubj","text":"Co myslíme pojištěním dětských sedaček a zavazadel?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":51,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=pojisteni-sedacek-zavazadel","targetOption":"_self"}}}}',
      name: 'additionals.baggageLimit',
      fields: [
        {
          component: 'select-field',
          name: 'additionals.baggageLimits',
          label: 'Limit pojištění',
          isRequired: true,
          isSearchable: false,
          options: [],
          resolveProps: (_props, _fieldApi, formOptions) => {
            const data = getFetcherData('autosjednavac');
            const formValues = formOptions?.getState().values;

            const inititalValue =
              typeof formValues?.additionals.baggageLimit === 'string'
                ? formValues?.additionals.baggageLimit
                : '5000';

            return {
              options: data?.additionals?.baggageLimits?.map(
                (limit: LimitType) => ({
                  label: `${limit.description}${
                    limit.premium !== 0
                      ? `(${getFormattedPrice({ price: limit.premium })})`
                      : ''
                  }`,
                  value: limit.value,
                })
              ),
              initialValue: inititalValue,
            };
          },
          validate: [{ type: 'required', message: 'Prosím vyberte' }],
        },
      ],
      condition: {
        when: FORM_STORE_REFRESH_TRIGGER_KEY,
        is: () => {
          const data = getFetcherData('autosjednavac');
          return data?.additionals?.baggageLimits;
        },
      },
      resolveProps: (_props, _fieldApi, formOptions) => {
        const data = getFetcherData('autosjednavac');
        const formValues = formOptions?.getState().values;

        return {
          price:
            formValues?.additionals?.baggageLimit &&
            formValues?.additionals?.baggageLimits
              ? data?.additionals.baggageLimits?.find(
                  (option: {
                    premium: number;
                    description: string;
                    value: string;
                  }) =>
                    option.value ===
                    formValues?.additionals?.baggageLimits.value
                )?.premium
              : data?.additionals.baggageLimits?.find(
                  (option: {
                    premium: number;
                    description: string;
                    value: string;
                  }) => option.value === '5000'
                )?.premium,
          priceShortTerm: data?.shortTerm,
          initialValue: formValues?.additionals?.baggageLimit,
        };
      },
    },
    {
      component: 'card-checkbox-additional',
      label: 'Garance ceny pojištění na 3 roky',
      cardHelper:
        '{"blocks":[{"key":"bqubj","text":"Co myslíme garancí ceny pojištění?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":34,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=garance-3roky","targetOption":"_self"}}}}',
      name: FIELD_NAMES.ADDITIONALS.PREMIUM_WARRANTY,
      condition: {
        and: [
          {
            when: FIELD_NAMES.LENGTH_INSURANCE,
            is: false,
          },
          {
            when: FORM_STORE_REFRESH_TRIGGER_KEY,
            is: () => {
              const data = getFetcherData('autosjednavac');
              return data?.additionals?.premiumWarrantyOptions;
            },
          },
        ],
      },
      resolveProps: () => {
        const data = getFetcherData('autosjednavac');
        return {
          price: data?.additionals.premiumWarrantyOptions?.find(
            (option: LimitType) => option.value === 'true'
          )?.premium,
          priceShortTerm: data?.shortTerm,
        };
      },
    },
    {
      component: 'card-checkbox-additional',
      label: '',
      cardHelper:
        '{"blocks":[{"key":"bqubj","text":"Co myslíme úrazovým pojištěním?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":31,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=co-je-urazove-pojisteni","targetOption":"_self"}}}}',
      name: 'additionals.injuryLimitCheckbox',
      fields: [
        {
          component: 'grid',
          name: getRandomId(),
          css: { mt: '0', gridTemplateColumns: '1' },
          fields: [
            {
              component: 'select-field',
              name: 'additionals.injuryLimitDriverOrAll',
              label: 'Chci pojistit',
              isSearchable: false,
              options: [],
              resolveProps: (_props, _fieldApi, formOptions) => {
                const formValues = formOptions?.getState().values;
                const vehicleType = formValues?.vehicle?.type?.value;
                const initialValue = formValues?.additionals.injuryLimit
                  ? 'all'
                  : 'driverOnly';

                const typesToHide = [
                  'PERSONAL_VEHICLE',
                  'VAN',
                  'SEMITRAILER_TRUCK',
                  'TRUCK',
                  'MOTORCYCLE',
                  'CARAVAN',
                ];
                const hideField = typesToHide.some((type) =>
                  vehicleType.includes(type)
                );

                return {
                  options: [
                    { label: 'Jen řidiče', value: 'driverOnly' },
                    { label: 'Řidiče i posádku', value: 'all' },
                  ],
                  initialValue,
                  hideField: !hideField,
                };
              },
            },
            {
              component: 'select-field',
              name: 'additionals.injuryLimitSelect',
              label: 'Limit na jednu událost',
              spyField: {
                targetName: 'additionals.injuryLimitDriverOrAll',
                nestedKeyValue: 'value',
                action: 'clear',
                whenVisitedKeys: ['additionals.injuryLimitDriverOrAll'],
              },
              isSearchable: false,
              options: [],
              resolveProps: (_props, _fieldApi, formOptions) => {
                const data = getFetcherData('autosjednavac');
                const formValues = formOptions?.getState().values;

                const noInjuryLimit =
                  !formValues?.additionals?.injuryLimitCheckbox ||
                  (formValues?.additionals?.injuryDriverLimit === '0' &&
                    formValues.additionals?.injuryLimit === '0');

                const initialValue =
                  (noInjuryLimit
                    ? '100000'
                    : formValues?.additionals?.injuryDriverLimit
                      ? formValues?.additionals?.injuryDriverLimit
                      : formValues?.additionals?.injuryLimit) ?? '100000';

                return {
                  options:
                    formValues?.additionals?.injuryLimitDriverOrAll?.value ===
                    'driverOnly'
                      ? data?.additionals?.injuryDriverLimits?.map(
                          (limit: LimitType) => ({
                            label: `${limit.description}${
                              limit.premium !== 0
                                ? `(${getFormattedPrice({ price: limit.premium })})`
                                : ''
                            }`,
                            value: limit.value,
                          })
                        )
                      : data?.additionals?.injuryLimits?.map(
                          (limit: LimitType) => ({
                            label: `${limit.description}${
                              limit.premium !== 0
                                ? `(${getFormattedPrice({ price: limit.premium })})`
                                : ''
                            }`,
                            value: limit.value,
                          })
                        ),
                  initialValue,
                };
              },
            },
          ],
        },
      ],

      condition: {
        when: FORM_STORE_REFRESH_TRIGGER_KEY,
        is: () => {
          const data = getFetcherData('autosjednavac');
          return data?.additionals?.injuryDriverLimits;
        },
      },
      resolveProps: (_props, _fieldApi, formOptions) => {
        const data = getFetcherData('autosjednavac');
        const formValues = formOptions.getState().values;
        const vehicleType = formValues?.vehicle?.type?.value;

        const noInjuryLimit =
          !formValues.additionals?.injuryLimitCheckbox ||
          formValues.additionals?.injuryLimitSelect === null;

        const driverAndOthersTypes = [
          'PERSONAL_VEHICLE',
          'VAN',
          'SEMITRAILER_TRUCK',
          'TRUCK',
          'MOTORCYCLE',
          'CARAVAN',
        ];
        const driverAndOthers = driverAndOthersTypes.some((type) =>
          vehicleType.includes(type)
        );

        return {
          price: noInjuryLimit
            ? data?.additionals?.injuryDriverLimits?.find(
                (limit: LimitType) => limit.value === '100000'
              )?.premium
            : formValues?.additionals?.injuryLimitDriverOrAll?.value ===
                'driverOnly'
              ? data?.additionals?.injuryDriverLimits?.find(
                  (limit: LimitType) =>
                    limit.value ===
                    formValues?.additionals?.injuryLimitSelect?.value
                )?.premium
              : data?.additionals?.injuryLimits?.find(
                  (limit: LimitType) =>
                    limit.value ===
                    formValues?.additionals?.injuryLimitSelect?.value
                )?.premium,
          initialValue: !!(
            formValues?.additionals?.injuryLimit ||
            formValues?.additionals?.injuryDriverLimit
          ) as boolean,
          label: driverAndOthers
            ? 'Úrazové pojištění řidiče a cestujícího'
            : 'Úrazové pojištění řidiče',
          priceShortTerm: data?.shortTerm,
        };
      },
    },
    {
      component: 'card-checkbox-additional',
      label: 'Pojištění smrti obou rodičů ve vozidle',
      cardHelper:
        '{"blocks":[{"key":"bqubj","text":"Co myslíme smrtí obou rodičů ve vozidle?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":40,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=smrt-rodicu-ve-vozidle","targetOption":"_self"}}}}',
      name: 'additionals.parents',
      condition: {
        when: FORM_STORE_REFRESH_TRIGGER_KEY,
        is: () => {
          const data = getFetcherData('autosjednavac');
          return data?.additionals?.parentsOptions;
        },
      },
      resolveProps: () => {
        const data = getFetcherData('autosjednavac');

        return {
          price: data?.additionals.parentsOptions?.find(
            (option: { premium: number; description: string; value: string }) =>
              option.value === 'true'
          )?.premium,
          priceShortTerm: data?.shortTerm,
        };
      },
    },
  ],
};
