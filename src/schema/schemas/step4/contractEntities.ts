import { SectionType } from '@src/types';
import getItemsFromPerson from '@src/utils/getItemsFromPerson';
import getRandomId from '@src/utils/getRandomId';

export const contractEntites: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  css: {
    px: { sm: '0' },
  },
  fields: [
    {
      component: 'heading',
      name: getRandomId(),
      initialValue: 'Osoby na smlouvě',
      css: { as: 'h2', textAlign: 'left', mt: '3.5rem', fontWeight: 500 },
    },
    {
      component: 'grid',
      name: getRandomId(),
      fields: [
        {
          component: 'card-person',
          name: getRandomId(),
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { partner, vehicleOperator, vehicleOwner } =
              formOptions.getState().values;

            const person = {
              ...partner,
              contactAddress: partner.contactAddress,
              permanentAddress: partner.permanentAddress,
            };

            const items = getItemsFromPerson(person);

            return {
              tags: [
                'Pojistník',
                vehicleOperator && 'Provozovatel',
                vehicleOwner && 'Vlastník',
              ],
              person,
              items,
            };
          },
        },

        {
          component: 'card-person',
          name: getRandomId(),
          condition: {
            when: 'vehicleOperator',
            is: false,
          },
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { occupant, sameVehicleOwnerAndOperator } =
              formOptions.getState().values;

            const person = {
              ...occupant,
              contactAddress: occupant.contactAddress,
              permanentAddress: occupant.permanentAddress,
            };

            const items = getItemsFromPerson(person);

            return {
              tags: ['Provozovatel', sameVehicleOwnerAndOperator && 'Vlastník'],
              person,
              items,
            };
          },
        },
        {
          component: 'card-person',
          name: getRandomId(),
          condition: {
            and: [
              {
                when: 'vehicleOwner',
                is: false,
              },
              {
                when: 'sameVehicleOwnerAndOperator',
                is: false,
              },
            ],
          },
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { insured } = formOptions.getState().values;

            const person = {
              ...insured,
              contactAddress: insured.contactAddress,
              permanentAddress: insured.permanentAddress,
            };

            const items = getItemsFromPerson(person);

            return {
              tags: ['Vlastník'],
              person,
              items,
            };
          },
        },
      ],
    },
  ],
};
