import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import { VehicleImageType } from '@src/schema/schemas/constants/vehicleImageType';
import { confTariffVehicleManufacturerModelFe } from '@src/codetables/generated/conf-tariff-vehicle-manufacturer-model-fe';
import { confVehicleInsuranceFeEnumsVehicleUsePurposeFe } from '@src/codetables/generated/conf-vehicle-insurance-fe-enums-vehicle-use-purpose-fe';
import { confVehicleInsuranceFeEnumsVehicleTypeFe } from '@src/codetables/generated/conf-vehicle-insurance-fe-enums-vehicle-type-fe';
import { confVehicleInsuranceFeEnumsVehicleFuelTypeFe } from '@src/codetables/generated/conf-vehicle-insurance-fe-enums-vehicle-fuel-type-fe';

export const vehicleInfoOverview: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorderMobile',
  css: { mt: '2.5rem' },
  condition: {
    and: [
      { when: 'displayAllVehicleInfo', is: false },
      {
        when: 'vehicle.manufacturerModelCode',
        isNotEmpty: true,
      },
    ],
  },
  fields: [
    {
      component: 'info-box',
      topCss: { mt: '2.5rem' },
      name: getRandomId(),
      content:
        '{"blocks":[{"key":"cssu112","text":"Informace o vozidle jsme našli. Zkontrolujte je, prosím.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":57,"length":10,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=jak-zjistit","targetOption":"_self"}}}}',
    },
    {
      component: 'section',
      name: getRandomId(),
      css: { mt: '3rem' },
      fields: [
        {
          component: 'image',
          name: getRandomId(),
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
      component: 'spz-with-brand',
      name: 'spz-with-brand',
      // TODO MS - Invalid prop `condition` supplied to `Memo`.
      condition: {
        when: 'vehicle',
        isNotEmpty: true,
      },
      resolveProps: (_props, _fieldApi, formOptions) => {
        const vehicle = formOptions.getState().values?.vehicle;
        const type = vehicle?.type.value;
        const manufacturerModelCode =
          vehicle?.manufacturerModelCode?.value ??
          vehicle?.manufacturerModelCode;
        const otherModelVehicle =
          typeof manufacturerModelCode === 'string'
            ? manufacturerModelCode?.endsWith('_OTHER')
            : false;
        const otherVehicle =
          typeof manufacturerModelCode === 'string'
            ? manufacturerModelCode === 'OTHER'
            : false;

        const manufacturerResult =
          otherVehicle && otherModelVehicle
            ? vehicle?.manufacturer ?? ''
            : otherVehicle
              ? vehicle?.manufacturer ?? ''
              : confTariffVehicleManufacturerModelFe?.find(
                  (model) => model.modelCode === manufacturerModelCode
                )?.manufacturerName ?? '';

        const modelResult =
          type === 'PERSONAL_VEHICLE' || type === 'VAN' || type === 'TRUCK'
            ? otherVehicle || otherModelVehicle
              ? vehicle?.model ?? ''
              : confTariffVehicleManufacturerModelFe?.find(
                  (model) => model.modelCode === manufacturerModelCode
                )?.modelName ?? vehicle?.model
            : vehicle?.model ?? '';

        return {
          content: {
            spz: vehicle?.registrationPlate,
            manufacturer: `${manufacturerResult} ${modelResult}`,
          },
        };
      },
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
              vehicle?.fuelTypeCode?.value && {
                label: 'Na co jezdí',
                value: confVehicleInsuranceFeEnumsVehicleFuelTypeFe?.find(
                  (type) => type.code === vehicle?.fuelTypeCode?.value
                )?.langDescription,
              },
              vehicle?.category?.label && {
                label: 'Kód kategorie vozidla',
                value: vehicle?.category?.label,
              },
              vehicle?.engineDisplacement && {
                label: 'Objem válců',
                value: `${vehicle?.engineDisplacement.toLocaleString()} ccm`,
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
              vehicle?.usePurposeCode?.value && {
                label: 'Způsob užití vozidla',
                value: confVehicleInsuranceFeEnumsVehicleUsePurposeFe?.find(
                  (type) => type.code === vehicle?.usePurposeCode?.value
                )?.langDescription,
              },
              vehicle?.type && {
                label: 'Kategorie vozidla',
                value: confVehicleInsuranceFeEnumsVehicleTypeFe?.find(
                  (type) => type.code === vehicle?.type?.value
                )?.langDescription,
              },
            ],
          },
        };
      },
    },
    {
      component: 'checkbox-button',
      name: 'displayAllVehicleInfo',
      initialValue: false,
      label: 'Upravit',
    },
  ],
};
