import { FORM_STORE_REFRESH_TRIGGER_KEY } from '@src/constants/fields';
import { RadioWithInfoFieldType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import { getFetcherReqBody } from '@src/utils/getFetcherReqBody';
import getRandomId from '@src/utils/getRandomId';
import { FIELD_NAMES } from '@src/schema/schemas/constants/fieldNames';
import { vehicleSecurityLevel } from '@src/schema/types/VehicleInfoType';

const options = Object.entries(vehicleSecurityLevel).map(([value, label]) => ({
  label,
  value,
  isDisabled: value === 'NO_SECURITY',
}));

const initialValue = options.find(({ value }) => value === 'NO_SECURITY')!;

export const securityLevelSection: Required<
  Pick<RadioWithInfoFieldType, 'fields'>
>['fields'][number] = {
  component: 'grid',
  name: getRandomId(),
  css: {
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
    mt: 0,
    mb: '0.5rem',
  },
  condition: {
    when: FORM_STORE_REFRESH_TRIGGER_KEY,
    is: () => {
      const data = getFetcherData('autosjednavac');
      const { isAgent, isInternalUser } =
        getFetcherReqBody('autosjednavac')?.temp ?? {};

      // Hide security level section until other limits are fetched and chek if user is agent or internal
      return (
        !!data?.casco?.carAccidentLimits?.length && (isAgent || isInternalUser)
      );
    },
  },
  fields: [
    {
      component: 'checkbox-field',
      name: FIELD_NAMES.VEHICLE.WITH_SECURITY,
      label: 'Vozidlo má další zabezpečení',
      initialValue: true,
    },
    {
      component: 'select-field',
      name: FIELD_NAMES.VEHICLE.SECURITY_LEVEL,
      label: 'Vyberte zabezpečení vozidla',
      isSearchable: false,
      // Add asterisk, no need for validation - fallback value is provided
      isRequired: true,
      options,
      isMulti: true,
      initialValue: [initialValue],
      fallbackValue: initialValue,
      condition: {
        when: FIELD_NAMES.VEHICLE.WITH_SECURITY,
        is: true,
      },
    },
  ],
};
