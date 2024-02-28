import { VALIDATION_MESSAGE } from '@src/constants/validation';
import { OptionType, SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import { getOrvHelper } from '@src/schema/schemas/utils/getOrvHelper';
import { vehicleCategory } from '@src/schema/types/VehicleInfoType';
import { confVehicleInsuranceFeEnumsVehicleFuelTypeFe } from '@src/codetables/generated/conf-vehicle-insurance-fe-enums-vehicle-fuel-type-fe';
import { confVehicleInsuranceFeEnumsVehicleUsePurposeFe } from '@src/codetables/generated/conf-vehicle-insurance-fe-enums-vehicle-use-purpose-fe';

export const vehicleEngine: SectionType = {
  // ENGINE
  component: 'section',
  variant: 'withBorder',
  name: getRandomId(),
  condition: {
    when: 'vehicle.type',
    is: (value: OptionType) =>
      value.value !== 'TRAILER' ||
      'TRAILER_WORK_MACHINE_NONREGISTRED' ||
      'TRAILER_WORK_MACHINE_REGISTRED',
  },
  resolveProps: (_props, _fieldApi, formOptions) => {
    const { displayAllVehicleInfo, vehicle } = formOptions.getState().values;
    const { getFieldState } = formOptions;
    const fieldStateFuelTypeCode = getFieldState('vehicle.fuelTypeCode');
    const fieldStateVehicleEngineDisplacement = getFieldState(
      'vehicle.engineDisplacement'
    );
    const fieldStateVehicleEnginePower = getFieldState('vehicle.enginePower');
    const fieldStateVehicleleadinDate = getFieldState('vehicle.leadinDate');
    const fieldStateVehicleCategory = getFieldState('vehicle.category');
    const fieldStateVehicleUsePursposeCode = getFieldState(
      'vehicle.usePurposeCode'
    );
    const fieldStateVehicleMaxWeight = getFieldState('vehicle.maxWeight');

    const withoutEngine =
      vehicle?.type?.value === 'TRAILER' ||
      vehicle?.type?.value === 'SEMITRAILER' ||
      vehicle?.type?.value === 'CARAVAN' ||
      vehicle?.type?.value === 'TRAILER_WORK_MACHINE_NONREGISTRED' ||
      vehicle?.type?.value === 'TRAILER_WORK_MACHINE_REGISTRED';

    return {
      // Chceme schovat jen prvky, které se načetly z B3, ty které ne, chceme vidět i po doplnění hodnot
      hideField:
        !(
          displayAllVehicleInfo ||
          (!withoutEngine &&
            !(
              vehicle?.fuelTypeCode &&
              !fieldStateFuelTypeCode?.active &&
              !fieldStateFuelTypeCode?.touched &&
              !fieldStateFuelTypeCode?.visited
            )) ||
          // Když máme elektrický auto, je nám jedno objem válců
          (vehicle.fuelTypeCode === 'ELECTRIC' &&
            !(
              vehicle?.engineDisplacement &&
              !fieldStateVehicleEngineDisplacement?.active &&
              !fieldStateVehicleEngineDisplacement?.touched &&
              !fieldStateVehicleEngineDisplacement?.visited
            )) ||
          (!withoutEngine &&
            !(
              vehicle?.enginePower &&
              !fieldStateVehicleEnginePower?.active &&
              !fieldStateVehicleEnginePower?.touched &&
              !fieldStateVehicleEnginePower?.visited
            )) ||
          !(
            vehicle?.leadinDate &&
            !fieldStateVehicleleadinDate?.active &&
            !fieldStateVehicleleadinDate?.touched &&
            !fieldStateVehicleleadinDate?.visited
          ) ||
          !(
            vehicle?.category &&
            !fieldStateVehicleCategory?.active &&
            !fieldStateVehicleCategory?.touched &&
            !fieldStateVehicleCategory?.visited
          ) ||
          !(
            vehicle?.usePurposeCode &&
            !fieldStateVehicleUsePursposeCode?.active &&
            !fieldStateVehicleUsePursposeCode?.touched &&
            !fieldStateVehicleUsePursposeCode?.visited
          ) ||
          !(
            vehicle?.maxWeight &&
            !fieldStateVehicleMaxWeight?.active &&
            !fieldStateVehicleMaxWeight?.touched &&
            !fieldStateVehicleMaxWeight?.visited
          )
        ) ||
        (!displayAllVehicleInfo && !vehicle?.manufacturerModelCode),
    };
  },
  fields: [
    {
      component: 'heading',
      name: getRandomId(),
      initialValue: 'Tohle jsme nedohledali, doplňte',
      css: { as: 'h2', mt: '1.5rem' },
      condition: {
        and: [
          { when: 'displayAllVehicleInfo', is: false },
          {
            when: 'vehicle',
            isNotEmpty: true,
          },
        ],
      },
    },
    {
      component: 'grid',
      name: getRandomId(),
      resolveProps: (_props, _fieldApi, formOptions) => {
        const { values } = formOptions.getState();
        const fieldStateFuelTypeCode = formOptions.getFieldState(
          'vehicle.fuelTypeCode'
        );
        const fieldStateMaxWeight =
          formOptions.getFieldState('vehicle.maxWeight');

        return {
          hideField:
            !(
              values?.displayAllVehicleInfo || !values?.vehicle?.fuelTypeCode
            ) &&
            !fieldStateFuelTypeCode?.active &&
            !fieldStateFuelTypeCode?.touched &&
            !fieldStateFuelTypeCode?.visited &&
            !(values?.displayAllVehicleInfo || !values?.vehicle?.maxWeight) &&
            !fieldStateMaxWeight?.active &&
            !fieldStateMaxWeight?.touched &&
            !fieldStateMaxWeight?.visited,
        };
      },
      fields: [
        {
          component: 'box',
          name: getRandomId(),
          condition: {
            when: 'vehicle.type',
            is: (option: OptionType) => {
              const { value } = option || {};

              const hide =
                value === 'TRAILER' ||
                value === 'SEMITRAILER' ||
                value === 'CARAVAN' ||
                value === 'TRAILER_WORK_MACHINE_NONREGISTRED' ||
                value === 'TRAILER_WORK_MACHINE_REGISTRED';
              return !hide;
            },
          },
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();
            const fieldState = formOptions.getFieldState(
              'vehicle.fuelTypeCode'
            );

            return {
              hideField:
                !(
                  values?.displayAllVehicleInfo ||
                  !values?.vehicle?.fuelTypeCode
                ) &&
                !fieldState?.active &&
                !fieldState?.touched &&
                !fieldState?.visited,
            };
          },
          fields: [
            {
              component: 'select-field',
              name: 'vehicle.fuelTypeCode',
              label: 'Na co jezdí?',
              isRequired: true,
              options: confVehicleInsuranceFeEnumsVehicleFuelTypeFe?.map(
                (type) => ({
                  label: type.langDescription,
                  value: type.code,
                })
              ),
              condition: {
                when: 'vehicle.fuelTypeCode',
                isNotEmpty: true,
                then: {
                  set: (formState) => {
                    const fuelTypeCode =
                      formState.values.vehicle?.fuelTypeCode.value;

                    return {
                      'vehicle.fuelTypeCode': {
                        value: fuelTypeCode,
                        label:
                          confVehicleInsuranceFeEnumsVehicleFuelTypeFe?.find(
                            (type) => type.code === fuelTypeCode
                          )?.langDescription,
                      },
                    };
                  },
                },
                else: { visible: true, set: {} },
              },
              resolveProps: (_props, _fieldApi, formOptions) => {
                const { values } = formOptions.getState();

                if (values?.vehicle?.fuelTypeCode?.value === 'ELECTRIC') {
                  formOptions.change('vehicle.engineDisplacement', undefined);
                }

                return {};
              },
              validate: [{ type: 'required', message: 'Prosím vyberte' }],
            },
          ],
        },
        {
          component: 'box',
          name: getRandomId(),
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();
            const fieldState = formOptions.getFieldState('vehicle.maxWeight');

            return {
              hideField:
                !(
                  values?.displayAllVehicleInfo || !values?.vehicle?.maxWeight
                ) &&
                !fieldState?.active &&
                !fieldState?.touched &&
                !fieldState?.visited,
            };
          },
          fields: [
            {
              component: 'masked-number-field',
              name: 'vehicle.maxWeight',
              label: 'Maximální přípustná hmotnost',
              suffix: ' kg',
              maxValue: 99999,
              isRequired: true,
              helperCss: {
                color: 'grayscale.grayWarm',
                border: 0,
                textDecoration: 'underline',
              },
              validate: [
                { type: 'required', message: 'Prosím vyplňte.' },
                { type: 'only-number', message: 'Pouze čísla.' },
              ],
              condition: {
                when: 'vehicle.maxWeight',
                isNotEmpty: true,
                then: {
                  set: (formState) => {
                    return {
                      'vehicle.maxWeight': formState.values.vehicle?.maxWeight,
                    };
                  },
                },
                else: { visible: true, set: {} },
              },
              resolveProps: (_props, _fieldApi, formOptions) => {
                const { values } = formOptions.getState();

                return {
                  helper: getOrvHelper.vehicleMaxWeight(values),
                };
              },
            },
          ],
        },
      ],
    },
    {
      component: 'info-box',
      name: getRandomId(),
      topCss: {
        mt: { _: '2rem', sm: '2.5rem' },
        mb: { _: '0.5rem', sm: '1.5rem' },
      },
      condition: {
        and: [
          {
            when: 'vehicle.type',
            is: (option: OptionType) => {
              const { value } = option || {};

              const hide =
                value === 'TRAILER' ||
                value === 'SEMITRAILER' ||
                value === 'CARAVAN' ||
                value === 'TRAILER_WORK_MACHINE_NONREGISTRED' ||
                value === 'TRAILER_WORK_MACHINE_REGISTRED';
              return !hide;
            },
          },
          { when: 'displayAllVehicleInfo', is: true },
        ],
      },
      content:
        '{"blocks":[{"key":"cssadasu2","text":"Pokud vozidlo využívá více než jeden druh paliva, uveďte oba, např. Benzín-LPG.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":68,"length":10,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
    },
    {
      component: 'grid',
      name: getRandomId(),
      fields: [
        {
          component: 'box',
          name: getRandomId(),
          condition: {
            and: [
              {
                when: 'vehicle.type',
                is: (option: OptionType) => {
                  const { value } = option || {};

                  const hide =
                    value === 'TRAILER' ||
                    value === 'SEMITRAILER' ||
                    value === 'CARAVAN' ||
                    value === 'TRAILER_WORK_MACHINE_NONREGISTRED' ||
                    value === 'TRAILER_WORK_MACHINE_REGISTRED';
                  return !hide;
                },
              },
              {
                when: 'vehicle.fuelTypeCode',
                is: (option: OptionType) => {
                  const { value } = option || {};

                  const hide = value === 'ELECTRIC';
                  return !hide;
                },
              },
            ],
          },
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();
            const fieldState = formOptions.getFieldState(
              'vehicle.engineDisplacement'
            );

            return {
              hideField:
                !(
                  values?.displayAllVehicleInfo ||
                  !values?.vehicle?.engineDisplacement
                ) &&
                !fieldState?.active &&
                !fieldState?.touched &&
                !fieldState?.visited,
            };
          },
          fields: [
            {
              component: 'masked-number-field',
              suffix: ' ccm',
              maxValue: 999999,
              name: 'vehicle.engineDisplacement',
              label: 'Objem válců',
              condition: {
                when: 'vehicle.engineDisplacement',
                isNotEmpty: true,
                then: {
                  set: (formState) => {
                    return {
                      'vehicle.engineDisplacement':
                        formState.values.vehicle?.engineDisplacement,
                    };
                  },
                },
                else: { visible: true, set: {} },
              },
              isRequired: true,
              validate: [{ type: 'required', message: 'Prosím vyplňte' }],
              resolveProps: (_props, _fieldApi, formOptions) => {
                const { values } = formOptions.getState();

                return {
                  helper: getOrvHelper.vehicleEngineDisplacement(values),
                };
              },
            },
          ],
        },
        {
          component: 'box',
          name: getRandomId(),
          condition: {
            when: 'vehicle.type',
            is: (option: OptionType) => {
              const { value } = option || {};

              const hide =
                value === 'TRAILER' ||
                value === 'SEMITRAILER' ||
                value === 'CARAVAN' ||
                value === 'TRAILER_WORK_MACHINE_NONREGISTRED' ||
                value === 'TRAILER_WORK_MACHINE_REGISTRED';
              return !hide;
            },
          },
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();
            const fieldState = formOptions.getFieldState('vehicle.enginePower');

            return {
              hideField:
                !(
                  values?.displayAllVehicleInfo || !values?.vehicle?.enginePower
                ) &&
                !fieldState?.active &&
                !fieldState?.touched &&
                !fieldState?.visited,
            };
          },
          fields: [
            {
              component: 'masked-number-field',
              suffix: ' kW',
              maxValue: 999999,
              name: 'vehicle.enginePower',
              label: 'Výkon motoru',
              condition: {
                when: 'vehicle.enginePower',
                isNotEmpty: true,
                then: {
                  set: (formState) => {
                    return {
                      'vehicle.enginePower':
                        formState.values?.vehicle?.enginePower,
                    };
                  },
                },
                else: { visible: true, set: {} },
              },
              isRequired: true,
              validate: [{ type: 'required', message: 'Prosím vyplňte' }],
              resolveProps: (_props, _fieldApi, formOptions) => {
                const { values } = formOptions.getState();

                return {
                  helper: getOrvHelper.vehicleEnginePower(values),
                };
              },
            },
          ],
        },
        {
          component: 'box',
          name: getRandomId(),
          css: {
            display: 'flex',
            alignItems: 'center',
            mb: { sm: '1.375rem' },
          },
          fields: [
            {
              component: 'checkbox-field',
              name: 'vehicle.leadinDateInFuture',
              condition: {
                when: 'vehicle.leadinDate',
                isEmpty: true,
              },
              label:
                '{"blocks":[{"key":"bqubj","text":"Nové vozidlo, zatím nebylo registrováno","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              initialValue: false,
            },
          ],
        },
        {
          component: 'box',
          name: getRandomId(),
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();
            const fieldState = formOptions.getFieldState('vehicle.leadinDate');

            return {
              hideField:
                !(
                  values?.displayAllVehicleInfo || !values?.vehicle?.leadinDate
                ) &&
                !fieldState?.active &&
                !fieldState?.touched &&
                !fieldState?.visited,
            };
          },
          fields: [
            {
              component: 'date-picker',
              name: 'vehicle.leadinDate',
              isRequired: true,
              validate: [
                { type: 'date' },
                { type: 'required', message: VALIDATION_MESSAGE.requiredDate },
              ],
              label: 'Datum první registrace',
              maxDate: new Date().toISOString(),
              defaultCalendarType: 'year',
              condition: {
                sequence: [
                  {
                    when: 'vehicle.leadinDateInFuture',
                    is: true,
                    then: {
                      visible: false,
                      set: (formState) => {
                        const leadinDate =
                          formState.values?.vehicle?.leadinDate;

                        return {
                          'vehicle.leadinDate': leadinDate
                            ? new Date(leadinDate)?.toISOString()
                            : null,
                        };
                      },
                    },
                    else: { visible: true },
                  },
                  {
                    when: 'vehicle.leadinDate',
                    isNotEmpty: true,
                    then: {
                      visible: true,
                      set: (formState) => {
                        const leadinDate = formState.values.vehicle?.leadinDate;

                        return {
                          'vehicle.leadinDate': new Date(
                            leadinDate
                          )?.toISOString(),
                        };
                      },
                    },
                  },
                ],
              },
              resolveProps: (_props, _fieldApi, formOptions) => {
                const { values } = formOptions.getState();

                return {
                  helper: getOrvHelper.vehicleLeadinDate(values),
                };
              },
            },
          ],
        },
        {
          component: 'box',
          name: getRandomId(),
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();
            const fieldState = formOptions.getFieldState('vehicle.category');

            return {
              hideField:
                !(
                  values?.displayAllVehicleInfo || !values?.vehicle?.category
                ) &&
                !fieldState?.active &&
                !fieldState?.touched &&
                !fieldState?.visited,
            };
          },
          fields: [
            {
              // M1, N1m ,,,
              component: 'select-field',
              name: 'vehicle.category',
              label: 'Kód kategorie vozidla',
              spyField: {
                targetName: 'vehicle.type',
                nestedKeyValue: 'value',
                action: 'clear',
                whenVisitedKeys: ['vehicle.type'],
              },
              isRequired: true,
              options: [],
              condition: {
                when: 'vehicle.type',
                is: (option: OptionType) => {
                  const { value } = option || {};

                  return value !== 'OTHER_VEHICLE';
                },
              },
              resolveProps: (_props, _fieldApi, formOptions) => {
                const { values } = formOptions.getState();

                const vehicleType = (values?.vehicle?.type?.value ||
                  values?.vehicle?.type) as keyof typeof vehicleCategory;

                return {
                  options:
                    vehicleType &&
                    vehicleCategory[vehicleType]?.map((category: string) => ({
                      label: category,
                      value: category,
                    })),
                  helper: getOrvHelper.vehicleCategory(values),
                };
              },
              validate: [{ type: 'required', message: 'Prosím vyberte' }],
            },
          ],
        },
        {
          component: 'box',
          name: getRandomId(),
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();
            const fieldState = formOptions.getFieldState(
              'vehicle.usePurposeCode'
            );

            return {
              hideField:
                !(
                  values?.displayAllVehicleInfo ||
                  !values?.vehicle?.usePurposeCode
                ) &&
                !fieldState?.active &&
                !fieldState?.touched &&
                !fieldState?.visited,
            };
          },
          fields: [
            {
              // COMMON, (BEZNE UZITTI VOZIDLA )
              component: 'select-field',
              name: 'vehicle.usePurposeCode',
              label: 'Způsob užití vozidla',
              initialValue: {
                label:
                  confVehicleInsuranceFeEnumsVehicleUsePurposeFe?.[0]
                    .langDescription,
                value: confVehicleInsuranceFeEnumsVehicleUsePurposeFe?.[0].code,
              },
              isRequired: true,
              helper:
                '{"blocks":[{"key":"cssu2","text":"Co myslíme způsobem užití vozidla?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":34,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=usePurposeCode","targetOption":"_self"}}}}',
              options: confVehicleInsuranceFeEnumsVehicleUsePurposeFe?.map(
                (type) => ({
                  label: type.langDescription,
                  value: type.code,
                })
              ),
              condition: {
                when: 'vehicle.usePurposeCode',
                isNotEmpty: true,
                then: {
                  set: (formState) => {
                    return {
                      'vehicle.usePurposeCode':
                        formState.values.vehicle?.usePurposeCode,
                    };
                  },
                },
                else: { visible: true, set: {} },
              },
              validate: [{ type: 'required', message: 'Prosím vyberte' }],
              resolveProps: (_props, _fieldApi, formOptions) => {
                const usePurposeCode =
                  formOptions.getState().values?.vehicle?.usePurposeCode?.value;

                return {
                  isDisabled: usePurposeCode === 'TAXI',
                };
              },
            },
          ],
        },
      ],
    },
  ],
};
