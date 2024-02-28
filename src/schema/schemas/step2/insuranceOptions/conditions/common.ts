import { ConditionProp } from '@data-driven-forms/react-form-renderer';

import { OptionType } from '@src/types';

/**
 * Common conditions for minimum and best option
 */
export const commonCondition: ConditionProp[] = [
  /**
   * CASCO
   */
  {
    when: 'casco',
    is: (casco: Record<string, any>) => {
      const { packageId, ...rest } = casco ?? {};

      if (packageId === 'id3') return false;

      const keys = [
        'naturalLimit2',
        'theftLimit2',
        'animalLimit2',
        'carAccidentLimit2',
      ];
      const filteredCasco = Object.entries(rest).filter(([key]) =>
        keys.includes(key)
      );
      const selectArr: OptionType[] = filteredCasco.map(([, select]) => select);

      const isSelectedSomeValue = selectArr.some((select) => {
        const { value } = select ?? {};
        return value && value !== '0';
      });

      return !isSelectedSomeValue;
    },
  },
  /**
   * CAR REPLACEMENT
   */
  {
    or: [
      {
        when: 'assistance',
        is: (assistance: {
          carReplacementDays: OptionType;
          carReplacementBoolean: string;
        }) => {
          const { carReplacementDays, carReplacementBoolean } =
            assistance || {};

          if (!Number(carReplacementBoolean)) {
            return true;
          }

          return !carReplacementDays?.value;
        },
      },
    ],
  },
];
