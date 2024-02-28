import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import { getPersonSectionFields } from '@src/schema/schemas/common/getPersonSectionFields';

const insured = getPersonSectionFields({
  title: 'Vlastník vozidla je',
  fieldKey: 'insured',
  fieldsType: 'select-only',
});

const insuredInfoSection: SectionType = {
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

export default insuredInfoSection;
