import { OptionType } from '@src/types';
import { PredefinedMtplPackageType } from '@src/schematypes/AutoSjednavacFetchType';

interface ConditionBaseProps {
  predefinedPackage: PredefinedMtplPackageType;
}

/**
 * MTPL condition helper
 */
interface MtplConditionProps extends ConditionBaseProps {
  basicLimit: string;
}

const mtpl = ({
  basicLimit,
  predefinedPackage,
}: MtplConditionProps): boolean => {
  return basicLimit === `${predefinedPackage.mtpl?.basicLimit}`;
};

/**
 * Assistance condition helper
 */
interface AssistanceConditionProps extends ConditionBaseProps {
  variantCode: string;
  malfunctionAssistance2: boolean;
}

const assistance = ({
  variantCode,
  malfunctionAssistance2,
  predefinedPackage,
}: AssistanceConditionProps): boolean => {
  const packageCode = predefinedPackage.assistance?.variantCode;
  const predefinedMalfunction =
    predefinedPackage.assistance?.malfunctionAssistance;

  if (packageCode === 'PERSONAL_V1') {
    return (
      variantCode === packageCode &&
      predefinedMalfunction === malfunctionAssistance2
    );
  }

  return (
    variantCode === predefinedPackage.assistance?.variantCode &&
    !malfunctionAssistance2
  );
};

/**
 * Additionals condition helper
 */
interface AdditionalsConditionProps extends ConditionBaseProps {
  additionalValues: Record<string, boolean | OptionType>;
}

interface AdditionalConditionSelectType {
  // Checkbox
  selected: boolean;
  // Select value
  selectedValue: string;
  // Predefined value
  predefinedValue: string;
}

const additionals = ({
  additionalValues,
  predefinedPackage,
}: AdditionalsConditionProps): boolean => {
  const { additionals: predefinedAdditionals } = predefinedPackage;

  if (!additionalValues || !predefinedAdditionals) return false;

  const {
    glassLimit,
    baggageLimit,
    injuryLimitCheckbox,
    parents,
    directClaimManagement,
    premiumWarranty,
  } = additionalValues as Record<string, boolean>;

  const { glassLimits, baggageLimits, injuryLimitSelect } =
    additionalValues as Record<string, OptionType>;

  // Predefined booleans
  const predefinedDirectClaimManagement =
    predefinedAdditionals?.directClaimManagement ?? false;
  const predefinedParents = predefinedAdditionals?.parents ?? false;
  const predefinedPremiumWarranty =
    predefinedAdditionals?.premiumWarranty ?? false;

  // Predefined limits
  const predefinedGlassLimit: string = predefinedAdditionals?.glassLimit ?? '0';
  const predefinedBaggageLimit: string =
    predefinedAdditionals?.baggageLimit ?? '0';
  const predefinedInjuryLimit: string =
    predefinedAdditionals?.injuryLimit ?? '0';

  // Conditions
  if (predefinedDirectClaimManagement !== directClaimManagement) return false;
  if (predefinedParents !== parents) return false;
  if (predefinedPremiumWarranty !== premiumWarranty) return false;

  const conditionArr: AdditionalConditionSelectType[] = [
    {
      predefinedValue: predefinedGlassLimit,
      selectedValue: glassLimits?.value ?? '0',
      selected: glassLimit,
    },
    {
      predefinedValue: predefinedBaggageLimit,
      selectedValue: baggageLimits?.value ?? '0',
      selected: baggageLimit,
    },
    {
      predefinedValue: predefinedInjuryLimit,
      selectedValue: injuryLimitSelect?.value ?? '0',
      selected: injuryLimitCheckbox,
    },
  ];

  const isSameAsPredefined = conditionArr.every(
    ({ predefinedValue, selected, selectedValue }) => {
      if (selected) return predefinedValue === selectedValue;

      return predefinedValue === '0';
    }
  );

  return isSameAsPredefined;
};

const getConditionResult = {
  mtpl,
  assistance,
  additionals,
};

export default getConditionResult;
