import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import { VehicleImageType } from '@src/schema/schemas/constants/vehicleImageType';
import { confVehicleInsuranceFeEnumsVehicleFuelTypeFe } from '@src/codetables/generated/conf-vehicle-insurance-fe-enums-vehicle-fuel-type-fe';

export const vehicleRecap: SectionType = {
  component: 'section',
  name: getRandomId(),
  css: { mt: '1rem' },
  fields: [
    {
      component: 'section',
      name: getRandomId(),
      variant: 'withBorder',
      css: { mt: '3rem' },
      fields: [
        {
          component: 'heading',
          initialValue: 'Předmět pojištění',
          name: getRandomId(),
          css: { as: 'h2', textAlign: 'left', mt: '1.5rem' },
        },
        {
          component: 'image',
          name: getRandomId(),
          css: {
            mt: '2rem',
          },
          file: {
            id: getRandomId(),
            caption: 'Osobní automobil',
            url: 'https://cdn.direct.cz/osobak_f76832c15c.svg',
          },
          resolveProps: (_props, _fieldApi, formOptions) => {
            const type = formOptions.getState().values.vehicle.type.value;

            return {
              file: {
                PERSONAL_VEHICLE: {
                  id: getRandomId(),
                  caption: 'Osobní automobil',
                  url: 'https://cdn.direct.cz/osobak_f76832c15c.svg',
                },
                MOTORCYCLE: {
                  id: getRandomId(),
                  caption: 'Motocykl',
                  url: 'https://cdn.direct.cz/motorka_fe6bda3e25.svg',
                },
                VAN: {
                  id: getRandomId(),
                  caption: 'Van',
                  url: 'https://cdn.direct.cz/pickup_d115318784.svg',
                },
                AMBULANCE: {
                  id: getRandomId(),
                  caption: 'Sanitní automobil',
                  url: 'https://cdn.direct.cz/sanita_307132eab0.svg',
                },
                BUS: {
                  id: getRandomId(),
                  caption: 'Autobus',
                  url: 'https://cdn.direct.cz/autobus_f83f45e9fc.svg',
                },
                TRUCK: {
                  id: getRandomId(),
                  caption: 'Nákladní automobil',
                  url: 'https://cdn.direct.cz/nakladak_87a7b8d7d9.svg',
                },
              }[type as VehicleImageType],
            };
          },
        },
      ],
    },
    {
      component: 'box',
      name: getRandomId(),
      fields: [
        {
          component: 'spz-with-brand',
          name: 'spz-with-brand',
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { vehicle } = formOptions.getState().values;

            const otherModel =
              vehicle?.manufacturerModelCode?.value === 'OTHER' ||
              (vehicle?.manufacturerModelCode?.value as string)?.endsWith(
                'OTHER'
              ) ||
              (typeof vehicle?.manufacturerModelCode === 'string' &&
                (vehicle?.manufacturerModelCode as string).endsWith('OTHER'));

            return {
              content: {
                spz: vehicle?.registrationPlate,
                manufacturer: `${
                  vehicle?.brand?.value !== 'OTHER'
                    ? vehicle?.brand?.label ?? vehicle?.manufacturer
                    : vehicle?.manufacturer
                } ${otherModel ? vehicle.model : vehicle?.manufacturerModelCode?.label ?? vehicle.model}`,
              },
            };
          },
        },
      ],
    },
    {
      component: 'box-with-content',
      name: 'boxWithContentInfoVehicle',
      css: {
        display: 'grid',
        gridTemplateColumns: { _: '1', sm: '2' },
        gap: '0.125rem',
        mt: { _: '2.5rem', sm: '4rem' },
      },
      resolveProps: (_props, _fieldApi, formOptions) => {
        const { vehicle } = formOptions.getState().values;

        return {
          content: {
            items: [
              vehicle?.fuelTypeCode && {
                label: 'Na co jezdí',
                value: confVehicleInsuranceFeEnumsVehicleFuelTypeFe.find(
                  (type) => type.code === vehicle?.fuelTypeCode.value
                )?.langDescription,
              },
              vehicle?.category && {
                label: 'Kód kategorie vozidla',
                value: vehicle?.category.label,
              },
              vehicle?.engineDisplacement && {
                label: 'Objem válců',
                value: `${vehicle?.engineDisplacement?.toLocaleString()} ccm`,
              },
              vehicle?.enginePower && {
                label: 'Výkon motoru',
                value: `${vehicle?.enginePower} kW`,
              },
              vehicle?.maxWeight && {
                label: 'Maximální přípustná hmotnost',
                value: `${vehicle?.maxWeight.toLocaleString()} kg`,
              },
              vehicle?.leadinDate && {
                label: 'Datum první registrace vozidla',
                value: new Date(vehicle?.leadinDate)?.toLocaleDateString(),
              },
              vehicle?.usePurposeCode && {
                label: 'Způsob užití vozidla',
                value: vehicle?.usePurposeCode?.label,
              },
              vehicle?.type && {
                label: 'Kategorie vozidla',
                value: vehicle?.type?.label,
              },
            ],
          },
        };
      },
    },
  ],
};
