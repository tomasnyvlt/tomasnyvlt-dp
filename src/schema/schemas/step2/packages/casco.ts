import { CardCheckboxType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import { getFetcherDataExtended } from '@src/utils/getFetcherDataExtended';
import { getFetcherReqBody } from '@src/utils/getFetcherReqBody';
import getFormattedPrice from '@src/utils/getFormattedPrice';
import getRandomId from '@src/utils/getRandomId';
import { securityLevelSection } from '@src/schema/schemas/step2/securityLevelSection';
import { LimitType } from '@src/schema/types/AutoSjednavacFetchType';

export const casco: CardCheckboxType = {
  component: 'card-checkbox',
  label: 'Havarijní pojištění',
  name: 'casco.selected',
  initialValue: true,
  validate: [
    {
      type: 'required-if',
      fields: { 'mtpl.selected': false },
      message:
        'Vyberte si alespoň jednu z možností - Povinné ručení, nebo Havarijní pojištění',
    },
  ],
  resolveProps: (_props, _fieldApi, formOptions) => {
    const { data, isFetchLoading } = getFetcherDataExtended('autosjednavac');
    const { values } = formOptions.getState();

    const isDisabled = (): boolean => {
      // CASCO and MTPL are both disabled - allow user to choose one of them
      if (!values.casco?.selected && !values.mtpl?.selected) return false;

      return !values.mtpl?.selected;
    };

    const isHidden =
      data?.casco?.hidden ||
      (values?.dontHaveSpz &&
        (values?.vehicle?.type.value === 'OTHER_VEHICLE' ||
          values?.vehicle?.type.value === 'BIKE_WITH_ENGINE'));

    return {
      price: data?.casco?.premiumTotal ?? '0',
      priceShortTerm: data?.shortTerm,
      noPriceText: values?.vehicle.actualValue
        ? undefined
        : 'Bez hodnoty vozidla cenu zobrazit neumíme',
      defaultSalesDiscount: data?.casco?.defaultSalesDiscount ?? undefined,
      isDisabled: isDisabled(),
      isPriceLoading: isFetchLoading,
      css: {
        order: values.casco?.selected ? (!values.mtpl?.selected ? 3 : 5) : 8,
      },
      hideField: isHidden,
    };
  },
  fields: [
    {
      component: 'grid',
      name: getRandomId(),
      css: {
        padding: '0 1.5rem',
        gridTemplateColumns: '1fr',
        gap: '1.5rem',
        w: '100%',
        pb: '1.5rem',
      },
      fields: [
        {
          component: 'masked-number-field',
          suffix: ' Kč',
          maxValue: 99999999,
          name: 'vehicle.actualValue',
          label: 'Doplňte hodnotu vozidla',
          validate: [
            {
              type: 'required-if',
              fields: { 'mtpl.selected': false },
              message: 'Vyplňte cenu vozidla',
            },
            {
              type: 'only-number',
            },
            {
              type: 'min-number-value',
              includeThreshold: true,
              value: 1,
              message: 'Cena vozidla musí být větší než 0',
            },
          ],
          helper:
            '{"blocks":[{"key":"bqubj","text":"Jak ji zjistím? ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":15,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=jak-ji-zjistim","targetOption":"_self"}}}}',
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();

            return {
              isRequired: !values.mtpl?.selected,
            };
          },
        },
        {
          component: 'checkbox-field',
          name: 'vehicle.actualValueVATIncluded',
          label: JSON.stringify({
            blocks: [
              {
                key: 'baqubj',
                text: 'Hodnota vozidla je s DPH',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          }),
          initialValue: true,
          condition: {
            when: 'vehicle.actualValueVATIncluded',
            is: () => {
              const reqBody = getFetcherReqBody('autosjednavac');

              return reqBody?.temp.isInternalUser || reqBody?.temp.isAgent;
            },
          },
        },
        {
          component: 'select-field',
          name: 'casco.participation',
          label: 'Spoluúčast',
          helper:
            '{"blocks":[{"key":"bqubj","text":"Co myslíme spoluúčastí?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":23,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=casco-spoluucast","targetOption":"_self"}}}}',
          initialValue: { label: '5 000 Kč', value: 'PARTICIPATION_5000' },
          isSearchable: false,
          options: [],
          resolveProps: () => {
            const data = getFetcherData('autosjednavac');
            return {
              options: data?.casco?.participationsOptions?.map(
                (option: { description: string; value: string }) => ({
                  label: option.description,
                  value: option.value,
                })
              ),
            };
          },
        },
        {
          component: 'toggle-field',
          name: 'casco.foreignTerritories',
          legend: 'Kde má pojištění platit?',
          options: [
            {
              value: 0,
              label: 'ČR',
            },
            {
              value: 1,
              label: 'Evropa',
            },
          ],
          initialValue: 1,
          resolveProps: () => {
            const reqBody = getFetcherReqBody('autosjednavac');

            return {
              hideField: !reqBody?.temp.isInternalUser,
            };
          },
        },
        {
          component: 'box',
          name: getRandomId(),
          fields: [
            {
              name: getRandomId(),
              component: 'grid',
              // HELPER FIELDS, NOT VISIBLE
              css: { display: 'none' },
              condition: {
                when: 'vehicle.actualValue',
                isNotEmpty: true,
              },
              fields: [
                {
                  component: 'checkbox-field',
                  name: 'casco.firstTimePackageId',
                  label: '',
                  initialValue: true,
                },
                {
                  component: 'checkbox-field',
                  name: 'casco.firstTimeTheftLimit',
                  label: '',
                  initialValue: true,
                },
                {
                  component: 'checkbox-field',
                  name: 'casco.firstTimeNaturalLimit',
                  label: '',
                  initialValue: true,
                },
                {
                  component: 'checkbox-field',
                  name: 'casco.firstTimeCarAccidentLimit',
                  label: '',
                  initialValue: true,
                },
                {
                  component: 'checkbox-field',
                  name: 'casco.firstTimeAnimalLimit',
                  label: '',
                  initialValue: true,
                },
                {
                  component: 'text-field',
                  name: 'casco.fakePackage4Price',
                  label: '',
                  resolveProps: () => {
                    return {
                      hideField: true,
                    };
                  },
                },
                {
                  component: 'text-field',
                  name: 'casco.naturalLimit',
                  label: 'Přírodní nebezpečí',
                  initialValue: '0',
                  resolveProps: (_props, _fieldApi, formOptions) => {
                    const packageId =
                      formOptions.getState().values.casco?.packageId;
                    const limitFromFillForm =
                      formOptions.getState().values.casco?.naturalLimit;
                    const data = getFetcherData('autosjednavac');

                    if (!data || data?.casco?.naturalLimits === undefined) {
                      return {};
                    }

                    const option = data?.casco?.naturalLimits?.find(
                      (currentLimit) => currentLimit.value === limitFromFillForm
                    );

                    // Nastavujeme fillform hodnotu při prvním načtení
                    if (
                      option &&
                      // Kontrolujeme jestli je hodnota stejná jako v selectu
                      formOptions.getState().values.casco?.naturalLimit2
                        ?.value === 'VEHICLE_VALUE' &&
                      formOptions.getState().values.casco?.naturalLimit2
                        ?.value !== limitFromFillForm &&
                      formOptions.getState().values.casco
                        ?.firstTimeNaturalLimit === true
                    ) {
                      formOptions.change('casco.naturalLimit2', {
                        label: option?.description,
                        value: limitFromFillForm,
                      });

                      formOptions.change('casco.firstTimeNaturalLimit', false);

                      return {};
                    }

                    // Při výběru balíčku s ID 2 nebo ID 3 se nastavuje limit na hodnotu vozidla
                    if (packageId === 'id2' || packageId === 'id3') {
                      formOptions.change('casco.naturalLimit', 'VEHICLE_VALUE');
                      return {};
                    }

                    // Při výběru balíčku s ID 4 (sestavím si sám) se nastavuje limit podle value ze selectu
                    if (packageId === 'id4') {
                      formOptions.change(
                        'casco.naturalLimit',
                        formOptions.getState().values.casco?.naturalLimit2
                          ?.value ?? '0'
                      );
                      return {};
                    }

                    return {};
                  },
                },
                {
                  component: 'text-field',
                  name: 'casco.theftLimit',
                  label: 'Odcizení a vandalismus',
                  initialValue: '0',
                  resolveProps: (_props, _fieldApi, formOptions) => {
                    const packageId =
                      formOptions.getState().values.casco?.packageId;
                    const limitFromFillForm =
                      formOptions.getState().values.casco?.theftLimit;
                    const data = getFetcherData('autosjednavac');

                    if (!data || data?.casco?.theftLimits === undefined) {
                      return {};
                    }

                    const option = data?.casco?.theftLimits?.find(
                      (currentLimit) => currentLimit.value === limitFromFillForm
                    );

                    // Nastavujeme fillform hodnotu při prvním načtení
                    if (
                      option &&
                      // Kontrolujeme jestli je hodnota stejná jako v selectu
                      formOptions.getState().values.casco?.theftLimit2
                        ?.value === 'VEHICLE_VALUE' &&
                      formOptions.getState().values.casco?.theftLimit2
                        ?.value !== limitFromFillForm &&
                      formOptions.getState().values.casco
                        ?.firstTimeTheftLimit === true
                    ) {
                      formOptions.change('casco.theftLimit2', {
                        label: option?.description,
                        value: limitFromFillForm,
                      });

                      formOptions.change('casco.firstTimeTheftLimit', false);

                      return {};
                    }

                    // Při výběru balíčku s ID 2 nebo ID 3 se nastavuje limit na hodnotu vozidla
                    if (packageId === 'id2' || packageId === 'id3') {
                      formOptions.change('casco.theftLimit', 'VEHICLE_VALUE');
                      return {};
                    }

                    // Při výběru balíčku s ID 4 (sestavím si sám) se nastavuje limit podle value ze selectu
                    if (packageId === 'id4') {
                      formOptions.change(
                        'casco.theftLimit',
                        formOptions.getState().values.casco?.theftLimit2
                          ?.value ?? '0'
                      );
                      return {};
                    }

                    return {};
                  },
                },
                {
                  component: 'text-field',
                  name: 'casco.animalLimit',
                  label: 'Střet a poškození zvířaty',
                  initialValue: '0',
                  resolveProps: (_props, _fieldApi, formOptions) => {
                    const packageId =
                      formOptions.getState().values.casco?.packageId;
                    const limitFromFillForm =
                      formOptions.getState().values.casco?.animalLimit;
                    const data = getFetcherData('autosjednavac');

                    if (!data || data?.casco?.animalLimits === undefined) {
                      return {};
                    }

                    const option = data?.casco?.animalLimits?.find(
                      (currentLimit) => currentLimit.value === limitFromFillForm
                    );

                    // Nastavujeme fillform hodnotu při prvním načtení
                    if (
                      option &&
                      // Kontrolujeme jestli je hodnota stejná jako v selectu
                      formOptions.getState().values.casco?.animalLimit2
                        ?.value === 'VEHICLE_VALUE' &&
                      formOptions.getState().values.casco?.animalLimit2
                        ?.value !== limitFromFillForm &&
                      formOptions.getState().values.casco
                        ?.firstTimeAnimalLimit === true
                    ) {
                      formOptions.change('casco.animalLimit2', {
                        label: option?.description,
                        value: limitFromFillForm,
                      });

                      formOptions.change('casco.firstTimeAnimalLimit', false);

                      return {};
                    }

                    // Při výběru balíčku s ID 2 nebo ID 3 se nastavuje limit na hodnotu vozidla
                    if (packageId === 'id2' || packageId === 'id3') {
                      formOptions.change('casco.animalLimit', 'VEHICLE_VALUE');
                      return {};
                    }

                    // Při výběru balíčku s ID 4 (sestavím si sám) se nastavuje limit podle value ze selectu
                    if (packageId === 'id4') {
                      formOptions.change(
                        'casco.animalLimit',
                        formOptions.getState().values.casco?.animalLimit2
                          ?.value ?? '0'
                      );
                      return {};
                    }

                    return {};
                  },
                },
                {
                  component: 'text-field',
                  name: 'casco.carAccidentLimit',
                  label: 'Dopravní nehoda',
                  initialValue: '0',
                  resolveProps: (_props, _fieldApi, formOptions) => {
                    const packageId =
                      formOptions.getState().values.casco?.packageId;
                    const limitFromFillForm =
                      formOptions.getState().values.casco?.carAccidentLimit;
                    const data = getFetcherData('autosjednavac');

                    if (!data || data?.casco?.carAccidentLimits === undefined) {
                      return {};
                    }

                    const option = data?.casco?.carAccidentLimits?.find(
                      (currentLimit) => currentLimit.value === limitFromFillForm
                    );

                    // Nastavujeme fillform hodnotu při prvním načtení
                    if (
                      option &&
                      // Kontrolujeme jestli je hodnota stejná jako v selectu
                      formOptions.getState().values.casco?.carAccidentLimit2
                        ?.value === '0' &&
                      formOptions.getState().values.casco?.carAccidentLimit2
                        ?.value !== limitFromFillForm &&
                      formOptions.getState().values.casco
                        ?.firstTimeCarAccidentLimit === true
                    ) {
                      formOptions.change('casco.carAccidentLimit2', {
                        label: option?.description,
                        value: limitFromFillForm,
                      });

                      formOptions.change(
                        'casco.firstTimeCarAccidentLimit',
                        false
                      );

                      return {};
                    }

                    // Při výběru balíčku s ID 2 nebo ID 3 se nastavuje limit na hodnotu vozidla
                    if (packageId === 'id2' || packageId === 'id3') {
                      formOptions.change(
                        'casco.carAccidentLimit',
                        'VEHICLE_VALUE'
                      );
                      return {};
                    }

                    // Při výběru balíčku s ID 4 (sestavím si sám) se nastavuje limit podle value ze selectu
                    if (packageId === 'id4') {
                      formOptions.change(
                        'casco.carAccidentLimit',
                        formOptions.getState().values.casco?.carAccidentLimit2
                          ?.value ?? '0'
                      );
                      return {};
                    }

                    return {};
                  },
                },
              ],
            },
            {
              component: 'radio-info-container',
              name: 'casco.packageId',
              resolveProps: (_props, _fieldApi, formOptions) => {
                const { values } = formOptions.getState();
                const data = getFetcherData('autosjednavac');

                if (!data) {
                  return {};
                }

                const initialId2 = data?.packages?.find((p) => p.id === 2);
                const initialId3 = data?.packages?.find((p) => p.id === 3);

                if (values.vehicle.actualValue) {
                  if (values.casco.firstTimePackageId) {
                    if (values.casco.gap) {
                      if (initialId2) {
                        formOptions.change('casco.firstTimePackageId', false);
                        formOptions.change('casco.packageId', 'id2');
                        return {};
                      }
                      if (initialId3) {
                        formOptions.change('casco.firstTimePackageId', false);
                        formOptions.change('casco.packageId', 'id3');
                        return {};
                      }
                    }
                    formOptions.change('casco.firstTimePackageId', false);
                    formOptions.change('casco.packageId', 'id4');
                  }
                }

                return {
                  initialValue: values.vehicle.actualValue
                    ? initialId2?.price
                      ? 'id2'
                      : initialId3?.price
                        ? 'id3'
                        : 'id4'
                    : undefined,
                };
              },
              fields: [
                {
                  component: 'radio-with-info-field',
                  name: 'id2',
                  showHelperWhenChecked: true,
                  hideField: true,
                  label: 'Havarijko na kupní cenu nového vozidla',
                  value: 'id2',
                  helper:
                    '{"blocks":[{"key":"cssu45","text":"Jak to myslíme?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":15,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=havarijko-na-kupni-cenu-ojeteho-vozidla","targetOption":"_self"}}}}',
                  fields: [
                    {
                      component: 'radio-info-list',
                      name: getRandomId(),
                      description: 'Pojištěná rizika na hodnotu vozidla:',
                      info: [
                        'Dopravní nehoda',
                        'Střet a poškození zvířaty',
                        'Odcizení a vandalismus',
                        'Přírodní nebezpečí',
                      ],
                    },
                  ],
                  resolveProps: (_props, _fieldApi, formOptions) => {
                    const data = getFetcherData('autosjednavac');
                    const reqBody = getFetcherReqBody('autosjednavac');
                    const chosenPackage = data?.packages?.find(
                      (cascoPackage: { id: number }) => cascoPackage.id === 2
                    );
                    const { values } = formOptions.getState();

                    return {
                      price: chosenPackage?.price ?? undefined,
                      priceShortTerm: data.shortTerm,
                      hidePrice: reqBody?.temp.isInternalUser,
                      noPriceText: values?.vehicle.actualValue
                        ? undefined
                        : 'Cenu bez hodnoty vozidla nespočítáme',
                      label: chosenPackage?.name ?? undefined,
                      hideField: !chosenPackage,
                      hideNestedFields:
                        !values?.vehicle.actualValue ||
                        values.casco?.packageId !== 'id2',
                      isDisabled: !values?.vehicle.actualValue,
                    };
                  },
                },
                {
                  component: 'radio-with-info-field',
                  name: 'id3',
                  showHelperWhenChecked: true,
                  hideField: true,
                  label: 'Havarijko na kupní cenu nového vozidla',
                  value: 'id3',
                  helper:
                    '{"blocks":[{"key":"cssu2","text":"Jak to myslíme?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":15,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=havarijko-na-kupni-cenu-ojeteho-vozidla","targetOption":"_self"}}}}',
                  fields: [
                    {
                      component: 'radio-info-list',
                      name: getRandomId(),
                      description: 'Pojištěná rizika na hodnotu vozidla:',
                      info: [
                        'Dopravní nehoda',
                        'Střet a poškození zvířaty',
                        'Odcizení a vandalismus',
                        'Přírodní nebezpečí',
                      ],
                    },
                  ],
                  resolveProps: (_props, _fieldApi, formOptions) => {
                    const data = getFetcherData('autosjednavac');
                    const reqBody = getFetcherReqBody('autosjednavac');
                    const chosenPackage = data?.packages?.find(
                      (cascoPackage: { id: number }) => cascoPackage.id === 3
                    );
                    const { values } = formOptions.getState();

                    return {
                      price: chosenPackage?.price ?? undefined,
                      priceShortTerm: data.shortTerm,
                      hidePrice: reqBody?.temp.isInternalUser,
                      noPriceText: values?.vehicle.actualValue
                        ? undefined
                        : 'Cenu bez hodnoty vozidla nespočítáme',
                      label: chosenPackage?.name ?? undefined,
                      hideField: !chosenPackage,
                      hideNestedFields:
                        !values?.vehicle.actualValue ||
                        values.casco?.packageId !== 'id3',
                      isDisabled: !values?.vehicle.actualValue,
                    };
                  },
                },
                {
                  component: 'radio-with-info-field',
                  name: 'id4',
                  showHelperWhenChecked: true,
                  initializeOnMount: true,
                  hideField: true,
                  label: 'Havarijko si sestavím sám',
                  value: 'id4',
                  fields: [
                    {
                      component: 'select-field',
                      name: 'casco.carAccidentLimit2',
                      label: 'Dopravní nehoda',
                      isSearchable: false,
                      options: [],
                      initialValue: { label: 'Nemám zájem', value: '0' },
                      resolveProps: () => {
                        const data = getFetcherData('autosjednavac');

                        return {
                          options: data?.casco?.carAccidentLimits
                            ?.slice(0)
                            .reverse()
                            .map((limit: LimitType) => ({
                              label: limit.description,
                              value: limit.value,
                            })),
                          hideField: !data?.casco?.carAccidentLimits,
                        };
                      },
                      helper:
                        '{"blocks":[{"key":"bqubj","text":"Co myslíme dopravní nehodou? ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":28,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=co-myslime-dopravni-nehodou","targetOption":"_self"}}}}',
                    },
                    {
                      component: 'select-field',
                      name: 'casco.animalLimit2',
                      label: 'Střet a poškození zvířaty',
                      isSearchable: false,
                      options: [],
                      initialValue: {
                        label: 'Hodnota vozidla',
                        value: 'VEHICLE_VALUE',
                      },
                      resolveProps: () => {
                        const data = getFetcherData('autosjednavac');

                        return {
                          options: data?.casco?.animalLimits
                            ?.slice(0)
                            .reverse()
                            .map((limit: LimitType) => ({
                              label: `${limit.description}${
                                limit.value !== 'VEHICLE_VALUE' &&
                                limit.value !== '0'
                                  ? `(${getFormattedPrice({ price: limit.premium })})`
                                  : ''
                              }`,
                              value: limit.value,
                            })),
                          hideField: !data?.casco?.animalLimits,
                          updateLabelOnOptionChange: true,
                        };
                      },
                      helper:
                        '{"blocks":[{"key":"bqubj","text":"Co myslíme střetem a poškozením zvířaty?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":40,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=co-myslime-stretem-se-zviraty","targetOption":"_self"}}}}',
                    },
                    {
                      component: 'select-field',
                      name: 'casco.theftLimit2',
                      label: 'Odcizení a vandalismus',
                      isSearchable: false,
                      options: [],
                      initialValue: {
                        label: 'Hodnota vozidla',
                        value: 'VEHICLE_VALUE',
                      },
                      resolveProps: () => {
                        const data = getFetcherData('autosjednavac');
                        return {
                          options: data?.casco?.theftLimits
                            ?.slice(0)
                            .reverse()
                            .map((limit: LimitType) => ({
                              label: `${limit.description}${
                                limit.value !== 'VEHICLE_VALUE' &&
                                limit.value !== '0'
                                  ? `(${getFormattedPrice({ price: limit.premium })})`
                                  : ''
                              }`,
                              value: limit.value,
                            })),
                          hideField: !data?.casco?.theftLimits,
                          updateLabelOnOptionChange: true,
                        };
                      },
                      helper:
                        '{"blocks":[{"key":"bqubj","text":"Co myslíme odcizením a vandalismem?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":35,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=co-myslime-odcizenim-a-vandalismem","targetOption":"_self"}}}}',
                    },
                    {
                      component: 'select-field',
                      name: 'casco.naturalLimit2',
                      label: 'Přírodní nebezpečí',
                      isSearchable: false,
                      options: [],
                      initialValue: {
                        label: 'Hodnota vozidla',
                        value: 'VEHICLE_VALUE',
                      },
                      resolveProps: () => {
                        const data = getFetcherData('autosjednavac');
                        return {
                          options: data?.casco?.naturalLimits
                            ?.slice(0)
                            .reverse()
                            .map((limit: LimitType) => ({
                              label: `${limit.description}${
                                limit.value !== 'VEHICLE_VALUE' &&
                                limit.value !== '0'
                                  ? `(${getFormattedPrice({ price: limit.premium })})`
                                  : ''
                              }`,
                              value: limit.value,
                            })),
                          hideField: !data?.casco?.naturalLimits,
                          updateLabelOnOptionChange: true,
                        };
                      },
                      helper:
                        '{"blocks":[{"key":"bqubj","text":"Co myslíme přírodním nebezpečím?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":32,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=co-je-prirodni-nebezpeci","targetOption":"_self"}}}}',
                    },
                    securityLevelSection,
                  ],
                  resolveProps: (_props, _fieldApi, formOptions) => {
                    const data = getFetcherData('autosjednavac');
                    const reqBody = getFetcherReqBody('autosjednavac');
                    const chosenPackage = data?.packages?.find(
                      (cascoPackage: { id: number }) => cascoPackage.id === 4
                    );
                    const { values } = formOptions.getState();
                    const { fakePackage4Price } = values.casco;

                    if (values.casco.packageId === 'id4') {
                      // TODO: Sorry for timeout, but without it, console error is thrown
                      setTimeout(() => {
                        formOptions.change(
                          'casco.fakePackage4Price',
                          data?.casco?.premiumTotal
                        );
                      }, 1);
                    }

                    return {
                      price: fakePackage4Price ?? 0,
                      priceShortTerm: data?.shortTerm,
                      hidePrice: reqBody?.temp.isInternalUser,
                      noPriceText: values?.vehicle.actualValue
                        ? undefined
                        : 'Cenu bez hodnoty vozidla nespočítáme',
                      label: chosenPackage?.name ?? undefined,
                      hideField: !chosenPackage,
                      hideNestedFields:
                        !values?.vehicle.actualValue ||
                        values.casco?.packageId !== 'id4',
                      isDisabled: !values?.vehicle.actualValue,
                    };
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
