import { x } from '@xstyled/emotion';
import { FC } from 'react';
import { VehicleImageType } from '@src/types/TO_DELETE_autosjednavac/vehicleImageType';
import { AutoSjednavacFetchRequestType } from '@src/types/TO_DELETE_autosjednavac/AutoSjednavacFetchType';
import { confTariffVehicleManufacturerModelFe } from '@src/codetables/generated/conf-tariff-vehicle-manufacturer-model-fe';
import { confVehicleInsuranceFeEnumsVehicleTypeFe } from '@src/codetables/generated/conf-vehicle-insurance-fe-enums-vehicle-type-fe';

interface AutosjednavacContentProps {
  data: AutoSjednavacFetchRequestType;
}

interface VehicleImageProps {
  caption: string;
  url: string;
  width: number;
  height: number;
}

const AutosjednavacContent: FC<AutosjednavacContentProps> = ({ data }) => {
  const type = data.vehicle?.type;
  const manufacturerModelCode = data.vehicle?.manufacturerModelCode;
  const manufacturer = data.vehicle?.manufacturer;
  const vehicleModel = data.vehicle?.model;

  const image: Record<VehicleImageType, VehicleImageProps> = {
    PERSONAL_VEHICLE: {
      caption: 'Osobní automobil',
      url: 'https://cdn.direct.cz/osobak_f76832c15c.svg',
      width: 169,
      height: 63,
    },
    MOTORCYCLE: {
      caption: 'Motocykl',
      url: 'https://cdn.direct.cz/motorka_fe6bda3e25.svg',
      width: 127,
      height: 58,
    },
    VAN: {
      caption: 'Van',
      url: 'https://cdn.direct.cz/pickup_d115318784.svg',
      width: 154,
      height: 71,
    },
    AMBULANCE: {
      caption: 'Sanitní automobil',
      url: 'https://cdn.direct.cz/sanita_307132eab0.svg',
      width: 172,
      height: 85,
    },
    BUS: {
      caption: 'Autobus',
      url: 'https://cdn.direct.cz/autobus_f83f45e9fc.svg',
      width: 211,
      height: 98,
    },
    TRUCK: {
      caption: 'Nákladní automobil',
      url: 'https://cdn.direct.cz/nakladak_87a7b8d7d9.svg',
      width: 161,
      height: 104,
    },
  } as Record<VehicleImageType, VehicleImageProps>;

  const otherManufacturer = manufacturerModelCode?.endsWith('OTHER');
  const vehicleManufacturerModel = confTariffVehicleManufacturerModelFe?.find(
    (model) => model.modelCode === manufacturerModelCode
  );

  return (
    <>
      {type && image[type as VehicleImageType] ? (
        <x.img
          src={image[type as VehicleImageType].url}
          width={image[type as VehicleImageType].width}
          height={image[type as VehicleImageType].height}
          alt={image[type as VehicleImageType].caption}
        />
      ) : (
        <x.img
          src="https://cdn.direct.cz/osobak_f76832c15c.svg"
          width={169}
          height={63}
          alt="Vozidlo"
        />
      )}

      <x.p
        fontSize="0.75rem"
        lineHeight="1rem"
        color="primary.black"
        textAlign="center"
        fontWeight={500}
        mt="3rem"
      >
        {otherManufacturer
          ? data.vehicle?.manufacturer ?? ''
          : vehicleManufacturerModel?.manufacturerName ?? manufacturer}

        {type === 'PERSONAL_VEHICLE' || type === 'VAN' || type === 'TRUCK' ? (
          (data.vehicle?.manufacturerModelCode as string)?.endsWith('OTHER') ? (
            <> {vehicleModel}</>
          ) : (
            <> {vehicleManufacturerModel?.modelName ?? <> {vehicleModel}</>}</>
          )
        ) : (
          <> {vehicleModel ?? ''}</>
        )}
      </x.p>

      {data.vehicle?.registrationPlate ? (
        <x.p
          fontSize="2rem"
          lineHeight="2.25rem"
          color="primary.greenDirectDarker"
          textAlign="center"
          fontWeight={500}
          mt="2px"
        >
          SPZ: {data.vehicle?.registrationPlate}
        </x.p>
      ) : data.vehicle?.type ? (
        data.vehicle?.type && (
          <x.p
            color="primary.greenDirectDarker"
            textAlign="center"
            fontWeight={500}
            mt="2px"
          >
            {
              confVehicleInsuranceFeEnumsVehicleTypeFe?.find(
                (vehicleType) => vehicleType.code === data.vehicle.type
              )?.langDescription
            }
          </x.p>
        )
      ) : null}
    </>
  );
};

export default AutosjednavacContent;
