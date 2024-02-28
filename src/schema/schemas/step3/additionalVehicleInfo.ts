import { VALIDATION_MESSAGE } from '@src/constants/validation';
import { OptionType, SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import { FEATURE_FLAGS } from '@src/schema/schemas/constants/featureFlags';
import { getOrvHelper } from '@src/schema/schemas/utils/getOrvHelper';
import getDeepObjectValue from '@src/utils/getDeepObjectValue';
import { coreCcEnumerationsVehicleManufacturerModel } from '@src/codetables/generated/core-cc-enumerations-vehicle-manufacturer-model';

export const additionalVehicleInfo: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  css: { mt: '1rem' },
  fields: [
    {
      component: 'heading',
      name: getRandomId(),
      initialValue: 'Detail vozidla',
      css: { as: 'h2', mt: '1.5rem' },
    },
    {
      component: 'grid',
      name: getRandomId(),
      css: {
        alignItems: 'flex-start',
      },
      fields: [
        {
          component: 'toggle-field',
          name: 'vehicle.vinOrEc',
          legend: '',
          options: [
            {
              value: 1,
              label: 'VIN',
            },
            {
              value: 0,
              label: 'Evid. číslo',
            },
          ],
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();

            const { evidenceNumber } = values;
            const initialValue = evidenceNumber ? 0 : 1;

            return {
              initialValue,
              helper: getOrvHelper.vehicleVinOrEc(values),
            };
          },
        },
        {
          component: 'text-field',
          name: 'vehicle.vin',
          label: 'VIN',
          isRequired: true,
          inputProps: {
            _input: {
              maxLength: 17,
              textTransform: 'uppercase',
            },
          },
          onBeforeChange: (value) => value.replaceAll(' ', ''),
          validate: [
            { type: 'required', message: 'Prosím vyplňte.' },
            {
              type: 'max-length',
              threshold: 17,
              message: 'VIN nesmí obsahovat více než 17 znaků.',
            },
          ],
          condition: {
            when: 'vehicle.vinOrEc',
            is: (value: number) => Number(value) === 1,
          },
          helperCss: {
            display: 'inline',
            lineHeight: '1rem',
          },
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();
            const vin = values?.vehicle?.vin;
            const initialValue = vin ?? '';

            return {
              initialValue,
              helper: getOrvHelper.vehicleVin(values),
            };
          },
        },
        {
          component: 'text-field',
          name: 'vehicle.evidenceNumber',
          label: 'Evidenční číslo',
          isRequired: true,
          validate: [{ type: 'required', message: 'Prosím vyplňte.' }],
          condition: {
            when: 'vehicle.vinOrEc',
            is: (value: number) => Number(value) === 0,
          },
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();
            const evidenceNumber = values?.vehicle?.evidenceNumber;
            const initialValue = evidenceNumber ?? '';

            return {
              initialValue,
            };
          },
        },
        {
          component: 'text-field',
          name: 'vehicle.registrationBookNumber',
          label: 'Číslo velkého technického průkazu',
          helper:
            'Pokud ho neznáte, nechejte políčko prázdné, můžete nám ho dodat později.',
          inputProps: {
            _input: {
              textTransform: 'uppercase',
            },
          },
          onBeforeChange: (value) => value.replaceAll(' ', ''),
          condition: {
            when: 'vehicle.type',
            is: (option: OptionType) => {
              const { value } = option || {};

              const hide =
                value === 'WORK_MACHINE_NONREGISTRED' ||
                value === 'TRAILER_WORK_MACHINE_NONREGISTRED';
              return !hide;
            },
          },
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();
            const { vehicle } = values;

            const initialValue = vehicle?.registrationBookNumber ?? '';
            const isOrvEnabled = getDeepObjectValue({
              obj: values,
              keys: FEATURE_FLAGS.ORV_ENABLED.split('.'),
            });

            return {
              initialValue,
              label: isOrvEnabled
                ? 'Číslo dokladu o registraci vozidla II'
                : 'Číslo velkého technického průkazu',
              helper: getOrvHelper.registrationBookNumber(isOrvEnabled),
            };
          },
        },
        {
          component: 'text-field',
          name: 'vehicle.manufacturer',
          label: 'Tovární značka',
          isRequired: true,
          validate: [
            { type: 'required', message: VALIDATION_MESSAGE.required },
          ],
          condition: {
            or: [
              {
                when: 'vehicle.type',
                is: (value: OptionType) =>
                  value.value !== 'PERSONAL_VEHICLE' && value.value !== 'VAN',
              },
              {
                when: 'vehicle.brand',
                is: (value: OptionType) =>
                  coreCcEnumerationsVehicleManufacturerModel.find(
                    (model) => model.modelCode === value?.value
                  )?.manufacturerCode === 'OTHER',
              },
            ],
          },
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();
            const { manufacturerModelCode, type } = values.vehicle;
            const typeInitialValue =
              type.value !== 'PERSONAL_VEHICLE' &&
              type.value !== 'VAN' &&
              !(manufacturerModelCode?.value as string)?.endsWith('_OTHER') &&
              manufacturerModelCode?.value !== 'OTHER';

            return {
              initialValue: typeInitialValue
                ? coreCcEnumerationsVehicleManufacturerModel.find(
                    (model) => model.modelCode === manufacturerModelCode?.value
                  )?.manufacturerName
                : '',
              helper: getOrvHelper.vehicleManufacturer(values),
            };
          },
        },
        {
          component: 'text-field',
          name: 'vehicle.model',
          label: 'Model',
          isRequired: true,
          validate: [
            { type: 'required', message: VALIDATION_MESSAGE.required },
          ],
          condition: {
            or: [
              {
                when: 'vehicle.type',
                is: (value: OptionType) =>
                  value.value !== 'PERSONAL_VEHICLE' && value.value !== 'VAN',
              },
              {
                when: 'vehicle.manufacturerModelCode',
                is: (option: OptionType) => {
                  const { value } = option || {};

                  const modelName =
                    coreCcEnumerationsVehicleManufacturerModel.find(
                      (model) => model.modelCode === value
                    )?.modelName;

                  const show =
                    modelName === 'Ostatní' ||
                    modelName === 'Ostatní modely' ||
                    modelName === 'Ostaní modely';
                  return show;
                },
              },
            ],
          },
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();

            const { manufacturerModelCode, type } = values.vehicle;
            const typeInitialValue =
              type.value !== 'PERSONAL_VEHICLE' &&
              type.value !== 'VAN' &&
              !(manufacturerModelCode?.value as string)?.endsWith('_OTHER') &&
              manufacturerModelCode?.value !== 'OTHER';

            return {
              initialValue: typeInitialValue
                ? coreCcEnumerationsVehicleManufacturerModel.find(
                    (model) => model.modelCode === manufacturerModelCode?.value
                  )?.modelName
                : '',
              helper: getOrvHelper.vehicleModel(values),
            };
          },
        },
      ],
    },
  ],
};
