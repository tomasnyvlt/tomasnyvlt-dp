import { FIELD_NAMES } from '@src/schema/schemas/constants/fieldNames';
import {
  AdditionalsResponseType,
  CascoResponseType,
  PredefinedMtplPackageType,
} from '@src/schematypes/AutoSjednavacFetchType';

export const LABELS = {
  MINIMUM: 'Základ a\xa0přesto\nnadstandard',
  BEST: 'Naše nejvýhodnější\nnabídka',
  CUSTOM: 'Pojištění si\nsestavím sám',
};

export const INSURANCE_SHADOW_COPY_FIELD_NAME = 'insuranceOptionShadowCopy';
export const INSURANCE_RADIO_FIELD_NAME = 'insuranceRadioOptions';
export const INSURANCE_SELECT_FIELD_NAME = 'insuranceSelectOptions';

/**
 * KEYS FOR FIELDS
 *
 * fieldName: form field name
 * objKey: key of limits object (BE response)
 */
export const CASCO_SELECT_KEYS: Array<{
  fieldName: string;
  objKey: keyof CascoResponseType;
}> = [
  { fieldName: 'casco.carAccidentLimit2', objKey: 'carAccidentLimits' },
  { fieldName: 'casco.animalLimit2', objKey: 'animalLimits' },
  { fieldName: 'casco.theftLimit2', objKey: 'theftLimits' },
  { fieldName: 'casco.naturalLimit2', objKey: 'naturalLimits' },
];

export const CASCO_STRING_KEYS: string[] = [
  'casco.carAccidentLimit2',
  'casco.animalLimit2',
  'casco.theftLimit2',
  'casco.naturalLimit2',
];

/**
 * KEYS FOR FIELDS
 *
 * fieldName: form field name
 * objKey: key of limits object (BE response - array of limit objects)
 * packageKey: key of the package object (BE response - only values)
 */
export const ADDITIONAL_OPTION_KEYS: Array<{
  fieldName: string;
  objKey: keyof AdditionalsResponseType;
  packageKey: keyof PredefinedMtplPackageType['additionals'];
}> = [
  {
    fieldName: 'additionals.glassLimits',
    objKey: 'glassLimits',
    packageKey: 'glassLimit',
  },
  {
    fieldName: 'additionals.baggageLimits',
    objKey: 'baggageLimits',
    packageKey: 'baggageLimit',
  },
  {
    fieldName: 'additionals.injuryLimitSelect',
    objKey: 'injuryLimits',
    packageKey: 'injuryLimit',
  },
];

export const ADDITIONAL_BOOLEAN_KEYS = [
  'additionals.directClaimManagement',
  'additionals.glassLimit',
  'additionals.injuryLimitCheckbox',
  'additionals.parents',
  FIELD_NAMES.ADDITIONALS.PREMIUM_WARRANTY,
  'additionals.baggageLimit',
];
