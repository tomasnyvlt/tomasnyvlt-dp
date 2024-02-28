import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';

interface CheckboxSettingType {
  label?: string;
  order?: number;
}

interface CheckboxesSettingType {
  vehicleOwner?: CheckboxSettingType;
  vehicleOperator?: CheckboxSettingType;
  sameVehicleOwnerAndOperator?: CheckboxSettingType;
}

const getLabel = (label: string): string => {
  return JSON.stringify({
    blocks: [
      {
        key: 'bqubj',
        text: label,
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  });
};

export const getOwnerAndOperatorCheckboxes = (
  checkboxesSetting: CheckboxesSettingType = {}
): SectionType => {
  const { sameVehicleOwnerAndOperator, vehicleOperator, vehicleOwner } =
    checkboxesSetting;

  return {
    component: 'section',
    name: getRandomId(),
    condition: {
      when: 'sameVehicleOwnerAndOperator',
      is: true,
      then: {
        set: { vehicleOwner: false, vehicleOperator: false },
      },
      else: {
        visible: true,
        set: {},
      },
    },
    fields: [
      {
        component: 'grid',
        name: getRandomId(),
        css: { alignItems: 'center' },
        condition: {
          or: [
            {
              when: 'vehicleOwner',
              is: true,
            },
            {
              when: 'vehicleOperator',
              is: true,
            },
          ],
          then: {
            set: {
              sameVehicleOwnerAndOperator: false,
            },
          },
          else: {
            visible: true,
            set: {},
          },
        },
        fields: [
          {
            component: 'box',
            name: getRandomId(),
            css: {
              order: vehicleOwner?.order ?? 1,
            },
            fields: [
              {
                component: 'checkbox-field',
                name: 'vehicleOwner',
                initialValue: true,
                label: getLabel(vehicleOwner?.label ?? 'Jsem vlastník vozidla'),
                resolveProps: (_props, _fieldApi, formOptions) => {
                  const initialValue = formOptions.getState().values.insured;

                  return {
                    initialValue: !initialValue,
                  };
                },
              },
            ],
          },
          {
            component: 'box',
            name: getRandomId(),
            css: {
              order: vehicleOperator?.order ?? 2,
            },
            fields: [
              {
                component: 'checkbox-field',
                name: 'vehicleOperator',
                initialValue: true,
                label: getLabel(
                  vehicleOperator?.label ??
                    'Jsem provozovatel zapsaný v malém technickém průkazu'
                ),
                resolveProps: (_props, _fieldApi, formOptions) => {
                  const initialValue = formOptions.getState().values.occupant;

                  return {
                    initialValue: !initialValue,
                  };
                },
              },
            ],
          },
          {
            component: 'box',
            name: getRandomId(),
            css: {
              order: sameVehicleOwnerAndOperator?.order ?? 3,
            },
            condition: {
              or: [
                {
                  when: 'vehicleOwner',
                  is: false,
                },
                {
                  when: 'vehicleOperator',
                  is: false,
                },
              ],
            },
            fields: [
              {
                component: 'checkbox-field',
                name: 'sameVehicleOwnerAndOperator',
                initialValue: false,
                label: getLabel(
                  sameVehicleOwnerAndOperator?.label ??
                    'Provozovatel a vlastník jsou stejná osoba'
                ),
              },
            ],
          },
        ],
      },
    ],
  };
};
