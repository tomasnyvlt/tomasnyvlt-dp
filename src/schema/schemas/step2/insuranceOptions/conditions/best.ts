import { ConditionProp } from '@data-driven-forms/react-form-renderer';

import { OptionType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import { commonCondition } from '@src/schema/schemas/step2/insuranceOptions/conditions/common';
import getConditionResult from '@src/schema/schemas/step2/insuranceOptions/conditions/getConditionResult';
import {
  AsssistanceRequestType,
  PackageType,
  PredefinedMtplPackageType,
} from '@src/schematypes/AutoSjednavacFetchType';

const getPredefinedBestPackage = (
  packages: PackageType[]
): PredefinedMtplPackageType => {
  const predefinedPackages = packages?.filter(({ type }) => type === 'mtpl');
  const predefinedPackage = (
    predefinedPackages as unknown as PredefinedMtplPackageType[]
  )?.reduce((acc, cur) => {
    if (!('configurable' in acc)) return cur;
    if (cur.configurable) return acc;

    return Number(cur?.mtpl?.basicLimit ?? 0) >
      Number(acc?.mtpl?.basicLimit ?? 0)
      ? cur
      : acc;
  }, {} as PredefinedMtplPackageType);

  return predefinedPackage;
};

/**
 * Best option is selected when:
 */
export const bestCondition: ConditionProp = {
  and: [
    /**
     * COMMON CONDITIONS
     */
    ...commonCondition,
    /**
     * MTPL
     */
    {
      when: 'mtpl',
      is: (mtpl: Record<string, string>) => {
        const { basicLimit } = mtpl || {};

        // Get predefined package on this nested level
        const data = getFetcherData('autosjednavac');
        const predefinedPackage = getPredefinedBestPackage(
          data?.packages ?? []
        );

        return getConditionResult.mtpl({ predefinedPackage, basicLimit });
      },
    },
    /**
     * ASSISTANCE
     */
    {
      when: 'assistance',
      is: (
        assistance: AsssistanceRequestType & { malfunctionAssistance2: boolean }
      ) => {
        const { variantCode, malfunctionAssistance2 } = assistance || {};

        // Get predefined package on this nested level
        const data = getFetcherData('autosjednavac');
        const predefinedPackage = getPredefinedBestPackage(
          data?.packages ?? []
        );

        return getConditionResult.assistance({
          predefinedPackage,
          variantCode,
          malfunctionAssistance2,
        });
      },
    },
    /**
     * ADDITIONALS
     */
    {
      when: 'additionals',
      is: (additionals: Record<string, boolean | OptionType>) => {
        // Get predefined package on this nested level
        const data = getFetcherData('autosjednavac');
        const predefinedPackage = getPredefinedBestPackage(
          data?.packages ?? []
        );

        return getConditionResult.additionals({
          predefinedPackage,
          additionalValues: additionals,
        });
      },
    },
  ],
};
