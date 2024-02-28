import { OptionType, SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import { confVehicleInsuranceFeEnumsVehicleTypeFe } from '@src/codetables/generated/conf-vehicle-insurance-fe-enums-vehicle-type-fe';
import { confTariffVehicleManufacturerModelFe } from '@src/codetables/generated/conf-tariff-vehicle-manufacturer-model-fe';

export const vehicleBrandModelType: SectionType = {
  // BRAND, MODEL, CATEGORY
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  resolveProps: (_props, _fieldApi, formOptions) => {
    const { values } = formOptions.getState();
    const vehicle = values?.vehicle;

    return {
      hideField:
        !(
          values?.displayAllVehicleInfo ||
          !vehicle?.type ||
          !vehicle?.manufacturerModelCode ||
          !vehicle?.registrationPlate
        ) ||
        (!values?.displayAllVehicleInfo && !vehicle?.manufacturerModelCode),
    };
  },
  fields: [
    {
      name: getRandomId(),
      component: 'grid',
      resolveProps: (_props, _fieldApi, formOptions) => {
        const { values } = formOptions.getState();
        return {
          hideField: !(values?.displayAllVehicleInfo || !values?.vehicle?.type),
        };
      },
      fields: [
        {
          // Typ vozidla - PERSONAL_VEHICLE (OSOBNI)
          component: 'select-field',
          name: 'vehicle.type',
          label: 'Kategorie vozidla',
          isRequired: true,
          helper: 'Pomůže nám sestavit formulář na míru',
          options: confVehicleInsuranceFeEnumsVehicleTypeFe?.map((type) => ({
            label: type.langDescription,
            value: type.code,
          })),
          initialValue: {
            label:
              confVehicleInsuranceFeEnumsVehicleTypeFe?.[0].langDescription,
            value: confVehicleInsuranceFeEnumsVehicleTypeFe?.[0].code,
          },
          resolveProps: (_props, _fieldApi, formOptions) => {
            const formValues = formOptions.getState().values;
            const vehicleTypeValue =
              formValues?.vehicle?.type?.value ?? formValues?.vehicle?.type;
            const initialVehicleFromCodetable =
              confVehicleInsuranceFeEnumsVehicleTypeFe?.[0];

            if (
              vehicleTypeValue === 'TRAILER' ||
              vehicleTypeValue === 'SEMITRAILER' ||
              vehicleTypeValue === 'CARAVAN' ||
              vehicleTypeValue === 'TRAILER_WORK_MACHINE_NONREGISTRED' ||
              vehicleTypeValue === 'TRAILER_WORK_MACHINE_REGISTRED'
            ) {
              formOptions.change('vehicle.engineDisplacement', undefined);
              formOptions.change('vehicle.enginePower', undefined);
            }

            /*
            Subtyp vozidel - vrátit až bude třeba
            if (
              vehicleTypeValue === "NONREGISTERED_ELECTRIC_SCOOTER" ||
              vehicleTypeValue === "NONREGISTERED_SEGWAY" ||
              vehicleTypeValue === "NONREGISTERED_GARDEN_TRACTOR" ||
              vehicleTypeValue === "NONREGISTERED_GOLF_CAR" ||
              vehicleTypeValue === "NONREGISTERED_KART" ||
              vehicleTypeValue === "NONREGISTERED_OTHER"
            ) {
              formOptions.change("vehicle.type", "OTHER_VEHICLE");
              formOptions.change("vehicle.subtype", vehicleTypeValue);
            }
             */

            return {
              initialValue: formValues.vehicle?.type ?? {
                label: initialVehicleFromCodetable?.langDescription,
                value: initialVehicleFromCodetable?.code,
              },
            };
          },
          validate: [{ type: 'required', message: 'Prosím vyberte' }],
        },
        /*
        Subtyp vozidel - vrátit až bude třeba
        {
          // Subtyp vozidla - Nové kategorie vozítek - pouze pokud je typ vozidla OTHER
          component: "select-field",
          name: "vehicle.subtype",
          label: "Podkategorie vozidla",
          isRequired: true,
          options: confVehicleInsuranceFeEnumsVehicleSubtypeFe.map((type) => ({
            label: type.langDescription,
            value: type.code
          })),
          initialValue: {
            label: confVehicleInsuranceFeEnumsVehicleSubtypeFe[0].langDescription,
            value: confVehicleInsuranceFeEnumsVehicleSubtypeFe[0].code
          },
          condition: {
            when: "vehicle.type",
            is: (vehicleType: string | { value: string }) => {
              const value = typeof vehicleType === "string" ? vehicleType : vehicleType.value;
              return (
                value === "OTHER_VEHICLE" ||
                value === "NONREGISTERED_ELECTRIC_SCOOTER" ||
                value === "NONREGISTERED_SEGWAY" ||
                value === "NONREGISTERED_GARDEN_TRACTOR" ||
                value === "NONREGISTERED_GOLF_CAR" ||
                value === "NONREGISTERED_KART" ||
                value === "NONREGISTERED_OTHER"
              );
            }
          },
          validate: [{ type: "required", message: "Prosím vyberte" }]
        },

         */
        {
          name: getRandomId(),
          component: 'box',
          css: { display: { _: 'none', sm: 'flex' } },
        },
      ],
    },
    {
      component: 'grid',
      name: 'card-brand-grid',
      css: { gridTemplateColumns: '1fr' },
      condition: {
        and: [
          {
            when: 'vehicle.type',
            is: (option: OptionType) => {
              const { value } = option || {};

              return value === 'PERSONAL_VEHICLE' || value === 'VAN';
            },
          },
          { when: 'displayAllVehicleInfo', is: true },
        ],
      },
      resolveProps: (_props, _fieldApi, formOptions) => {
        const formValues = formOptions.getState().values;
        const vehicleType =
          formValues?.vehicle?.type?.value === 'PERSONAL_VEHICLE' ||
          formValues?.vehicle?.type?.value === 'VAN';

        return {
          hideField: !(
            (formValues?.displayAllVehicleInfo && vehicleType) ||
            (vehicleType && !formValues?.vehicle?.manufacturerModelCode)
          ),
        };
      },
      fields: [
        {
          component: 'radio-image',
          label: 'Značka vozidla',
          name: 'vehicle.brandRadio',
          // TODO MS - Invalid prop `condition` supplied to `Memo`.
          condition: {
            or: [
              { when: 'displayAllVehicleInfo', is: true },
              {
                when: 'vehicle.type',
                is: (option: OptionType) => {
                  const { value } = option || {};

                  return value === 'PERSONAL_VEHICLE' || value === 'VAN';
                },
              },
            ],
          },
          spyField: {
            targetName: 'vehicle.brand',
            nestedKeyValue: 'value',
          },
          options: [
            {
              imgSrc: '/static/img/car-brands/dark/skoda.svg',
              label: 'Škoda',
              value: 'SKODA',
            },
            {
              imgSrc: '/static/img/car-brands/dark/wolksvagen.svg',
              label: 'Volkswagen',
              value: 'VOLKSWAGEN',
            },
            {
              imgSrc: '/static/img/car-brands/dark/ford.svg',
              label: 'Ford',
              value: 'FORD',
            },
            {
              imgSrc: '/static/img/car-brands/dark/peugeot.svg',
              label: 'Peugeot',
              value: 'PEUGEOT',
            },
            {
              imgSrc: '/static/img/car-brands/dark/renault.svg',
              label: 'Renault',
              value: 'RENAULT',
            },
            {
              imgSrc: '/static/img/car-brands/dark/citroen.svg',
              label: 'Citroen',
              value: 'CITROËN',
            },
          ],
        },
      ],
    },
    {
      name: getRandomId(),
      component: 'grid',
      condition: {
        when: 'vehicle.type',
        is: (option: OptionType) => {
          const { value } = option || {};

          const visible = value === 'PERSONAL_VEHICLE' || value === 'VAN';
          return visible;
        },
      },
      resolveProps: (_props, _fieldApi, formOptions) => {
        const formValues = formOptions.getState().values;
        const vehicleType =
          formValues?.vehicle?.type?.value === 'PERSONAL_VEHICLE' ||
          formValues?.vehicle?.type?.value === 'VAN';

        return {
          hideField: !(
            (formValues?.displayAllVehicleInfo && vehicleType) ||
            (vehicleType && !formValues?.vehicle?.manufacturerModelCode)
          ),
        };
      },
      fields: [
        {
          component: 'select-field',
          name: 'vehicle.brand',
          label: 'Značka vozidla',
          spyField: {
            targetName: 'vehicle.brandRadio',
            isSelectField: true,
          },
          condition: {
            when: 'vehicle.manufacturerModelCode',
            is: (value: string | {}) => {
              return typeof value === 'string' && value.length > 0;
            },
            then: {
              set: (formState) => {
                const manufacturerModelCode =
                  formState.values?.vehicle?.manufacturerModelCode?.value ??
                  formState.values?.vehicle?.manufacturerModelCode;

                return {
                  'vehicle.brand': {
                    label: confTariffVehicleManufacturerModelFe.find(
                      (model) => model.code === manufacturerModelCode
                    )?.manufacturerName,

                    value: confTariffVehicleManufacturerModelFe.find(
                      (model) => model.code === manufacturerModelCode
                    )?.manufacturerCode,
                  },
                };
              },
            },
            else: {
              visible: true,
            },
          },
          isRequired: true,
          options: confTariffVehicleManufacturerModelFe
            ?.map(({ manufacturerCode, manufacturerName }) => ({
              label: manufacturerName,
              value: manufacturerCode,
            }))
            .filter(
              (value, index, self) =>
                index === self.findIndex((t) => t.value === value.value)
            ),
          validate: [{ type: 'required', message: 'Prosím vyberte' }],
        },
        {
          component: 'box',
          name: getRandomId(),
          condition: {
            when: 'vehicle.brand',
            isNotEmpty: true,
          },
          fields: [
            {
              component: 'select-field',
              name: 'vehicle.manufacturerModelCode',
              label: 'Model vozidla',
              spyField: {
                targetName: 'vehicle.brand',
                nestedKeyValue: 'value',
                action: 'clear',
                whenVisitedKeys: ['vehicle.brand', 'vehicle.brandRadio'],
              },
              isRequired: true,
              options: [],
              resolveProps: (_props, _fieldApi, formOptions) => {
                const brandValue =
                  formOptions.getState().values.vehicle?.brand?.value;

                const options: OptionType[] =
                  confTariffVehicleManufacturerModelFe
                    .filter(
                      (manufacturer) =>
                        manufacturer.manufacturerCode === brandValue
                    )
                    .map(({ modelCode, modelName }) => ({
                      label: modelName,
                      value: modelCode,
                    }));

                return {
                  options,
                };
              },
              condition: {
                when: 'vehicle.manufacturerModelCode',
                is: (value: string | {}) => {
                  return typeof value === 'string' && value.length > 0;
                },
                then: {
                  set: (formState) => {
                    const manufacturerModelCode =
                      formState.values?.vehicle?.manufacturerModelCode?.value ??
                      formState.values?.vehicle?.manufacturerModelCode;

                    const vehicleModel =
                      confTariffVehicleManufacturerModelFe.find(
                        (model) => model.modelCode === manufacturerModelCode
                      );

                    return {
                      'vehicle.manufacturerModelCode': {
                        label: vehicleModel?.modelName,
                        value: vehicleModel?.modelCode,
                      },
                    };
                  },
                },
                else: {
                  visible: true,
                },
              },
              validate: [{ type: 'required', message: 'Prosím vyberte' }],
            },
          ],
        },
      ],
    },
    {
      name: getRandomId(),
      component: 'grid',
      condition: {
        when: 'vehicle.type',
        is: (option: OptionType) => {
          const { value } = option || {};

          const hide =
            value === 'WORK_MACHINE_NONREGISTRED' ||
            value === 'SINGLE_WHEEL_TRACTOR' ||
            value === 'TRAILER_WORK_MACHINE_NONREGISTRED';
          return !hide;
        },
      },
      resolveProps: (_props, _fieldApi, formOptions) => {
        const { values } = formOptions.getState();
        return {
          hideField: !(
            values?.displayAllVehicleInfo || !values?.vehicle?.registrationPlate
          ),
        };
      },
      fields: [
        {
          component: 'box',
          name: getRandomId(),
          condition: {
            when: 'dontHaveSpz',
            is: false,
          },
          fields: [
            {
              component: 'text-field',
              name: 'vehicle.registrationPlate',
              label: 'SPZ',
              inputProps: {
                _input: {
                  textTransform: 'uppercase',
                },
              },
              condition: {
                when: 'vehicle.registrationPlate',
                isNotEmpty: true,
                then: {
                  set: (formState) => {
                    return {
                      'vehicle.registrationPlate':
                        formState.values.vehicle?.registrationPlate,
                    };
                  },
                },
                else: { visible: true, set: {} },
              },
            },
          ],
        },
        {
          component: 'box',
          name: getRandomId(),
          css: { display: 'flex', alignItems: 'center' },
          fields: [
            {
              component: 'checkbox-field',
              name: 'dontHaveSpz',
              label:
                '{"blocks":[{"key":"bqubj","text":"Českou SPZ nemám nebo jí neznám.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              initialValue: false,
            },
          ],
        },
      ],
    },
  ],
};
