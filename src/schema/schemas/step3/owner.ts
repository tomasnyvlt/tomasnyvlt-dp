import { HELPER } from '@src/constants/helper';
import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import { getPersonSectionFields } from '@src/schema/schemas/common/getPersonSectionFields';

const insured = getPersonSectionFields({
  title: 'Vlastník vozidla je',
  fieldKey: 'insured',
  fieldsType: 'full',
  helpers: {
    permanentAddress: HELPER.address,
    contactAddress: HELPER.address,
    phone: HELPER.phone,
  },
});

export const owner: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  condition: {
    and: [
      {
        when: 'sameVehicleOwnerAndOperator',
        is: false,
      },
      {
        when: 'vehicleOwner',
        is: false,
      },
    ],
  },
  fields: [...insured],
};
