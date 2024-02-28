import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import { fetchCarInfo } from '@src/schema/schemas/step1/utils/fetchCarInfo';

export const vehicleSpzFetch: SectionType = {
  component: 'section',
  name: getRandomId(),
  css: { mt: '3rem' },
  // TODO MS - Invalid prop `condition` supplied to `Memo`.
  condition: {
    and: [
      { when: 'displayAllVehicleInfo', is: false },
      {
        when: 'vehicle.manufacturerModelCode',
        isEmpty: true,
      },
    ],
  },
  fields: [
    {
      component: 'spz-fetch-field',
      name: getRandomId(),
      inputName: 'vehicle.registrationPlate',
      buttonName: 'spzFetchButton',
      file: {
        id: getRandomId(),
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
      fields: [
        {
          component: 'text-field',
          name: 'vehicle.registrationPlate',
          label: 'SPZ',
          initialValue: '',
          inputProps: {
            _input: {
              textTransform: 'uppercase',
            },
          },
          validate: [
            {
              type: 'required-if',
              fields: { dontHaveSpz: false },
              message:
                'Zadejte nám SPZ a my zkusíme najít a vyplnit údaje o vozidle za vás.',
            },
          ],
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();

            return {
              isRequired: !values.dontHaveSpz,
            };
          },
        },
        {
          component: 'checkbox-field',
          name: 'dontHaveSpz',
          label: 'SPZ nemám',
          initialValue: false,
          condition: {
            when: 'dontHaveSpz',
            is: true,
            then: {
              set: () => {
                return {
                  displayAllVehicleInfo: true,
                };
              },
            },
            else: {
              visible: true,
            },
          },
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { spzLoading } = formOptions.getState().values;

            return {
              isDisabled: spzLoading,
            };
          },
        },
        {
          component: 'box',
          name: getRandomId(),
          css: { mt: '1.5rem' },
          fields: [
            {
              component: 'checkbox-field',
              name: 'spzLoading',
              label: 'Načítám údaje o vozidle',
              initialValue: false,
              hideField: true,
            },
            {
              component: 'button-field',
              name: 'spzFetchButton',
              label: 'Načíst údaje o vozidle',
              variant: 'gradient',
              css: { w: '100%' },
              validate: [
                { type: 'required', message: 'Načtěte údaje o vozidle.' },
              ],
              resolveProps: (_props, _fieldApi, formOptions) => {
                const { getState, change } = formOptions;
                const { values } = getState();

                const spz = values.vehicle?.registrationPlate;
                const isLoading = values.spzLoading;

                const onClick = () => {
                  if (isLoading) return;

                  change('spzLoading', true);
                  fetchCarInfo(spz, change);
                };

                return {
                  onClick,
                  isLoading,
                };
              },
            },
          ],
        },
      ],
    },
  ],
};
