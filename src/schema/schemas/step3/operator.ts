import { HELPER } from '@src/constants/helper';
import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import { getPersonSectionFields } from '@src/schema/schemas/common/getPersonSectionFields';

const occupant = getPersonSectionFields({
  title: 'Provozovatel vozidla je',
  fieldKey: 'occupant',
  fieldsType: 'full',
  helpers: {
    permanentAddress: HELPER.address,
    contactAddress: HELPER.address,
    phone: HELPER.phone,
  },
  minAge: 15,
  minAgeErrorMsg: 'Minimální věk pro provozování je {age} let.',
});

export const operator: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  condition: {
    or: [
      {
        and: [
          {
            when: 'sameVehicleOwnerAndOperator',
            is: false,
          },
          {
            when: 'vehicleOperator',
            is: false,
          },
        ],
      },
      {
        when: 'sameVehicleOwnerAndOperator',
        is: true,
      },
    ],
  },
  fields: [...occupant],
};
