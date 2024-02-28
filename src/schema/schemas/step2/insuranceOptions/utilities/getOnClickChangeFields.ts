import { ClickChangeFieldType, OptionType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import {
  ADDITIONAL_BOOLEAN_KEYS,
  ADDITIONAL_OPTION_KEYS,
  CASCO_SELECT_KEYS,
  CASCO_STRING_KEYS,
  INSURANCE_SHADOW_COPY_FIELD_NAME,
} from '@src/schema/schemas/step2/insuranceOptions/constants';
import {
  AdditionalsResponseType,
  CascoResponseType,
  LimitType,
  PredefinedMtplPackageType,
} from '@src/schematypes/AutoSjednavacFetchType';

type FetcherDataType = ReturnType<typeof getFetcherData<'autosjednavac'>>;

interface Props
  extends Pick<
    ReturnType<typeof getFetcherData<'autosjednavac'>>,
    'additionals' | 'casco'
  > {
  cascoFormValue: boolean | Record<string, string>;
  formValues: Record<string, any>;
  predefinedPackage: PredefinedMtplPackageType;
}

const defaultCasco: ClickChangeFieldType[] = [
  {
    fieldName: 'casco.selected',
    value: true,
  },
  {
    fieldName: 'casco.participation',
    value: { label: '5 000 Kč', value: 'PARTICIPATION_5000' },
  },
];

const getResettedFieldOptions = <
  T extends CascoResponseType | AdditionalsResponseType,
>(
  sourceObj: T,
  optionKeys: Array<{ fieldName: string; objKey: keyof T }>
): Array<ClickChangeFieldType | null> => {
  const resettedFieldOptions: Array<ClickChangeFieldType | null> =
    optionKeys.map(({ fieldName, objKey }) => {
      const [{ description, value }] = (sourceObj?.[objKey] as LimitType[]) ?? [
        {},
      ];

      if (!description || !value) return null;

      return {
        fieldName,
        value: {
          label: description,
          value,
        } as OptionType,
      };
    });

  return resettedFieldOptions;
};

const getZeroStringValues = (
  fieldNames: string[]
): Array<ClickChangeFieldType> => {
  return fieldNames.map((fieldName) => ({
    fieldName,
    value: '0',
  }));
};

const getPredefinedFieldValues = ({
  formValues,
  cascoFormValue,
  predefinedPackage,
  additionals,
  casco,
}: Props): Array<ClickChangeFieldType | null> => {
  if (!additionals || !casco) return [];

  // Reset all CASCO fields to zero but keep casco open and keep participation value 5000.
  // For now we do not know how to predefine CASCO from CORE config.
  // We need to know value of the car first, so it is not possible to predefine CASCO package.
  const resettedCasco =
    typeof cascoFormValue === 'boolean' && !cascoFormValue
      ? [...defaultCasco]
      : [
          ...getResettedFieldOptions<CascoResponseType>(
            casco,
            CASCO_SELECT_KEYS
          ),
          ...getZeroStringValues(CASCO_STRING_KEYS),
          ...defaultCasco,
          {
            fieldName: 'casco.packageId',
            value: !formValues?.vehicle?.actualValue ? '' : 'id4',
          },
        ];

  const additionalSelectOptions: (ClickChangeFieldType<OptionType> | null)[] =
    ADDITIONAL_OPTION_KEYS.map(({ fieldName, objKey, packageKey }) => {
      const predefinedPackageValue =
        predefinedPackage?.additionals?.[packageKey];

      if (!predefinedPackageValue) return null;

      const limitsArr = additionals?.[objKey];

      if (!Array.isArray(limitsArr)) return null;

      const limit = limitsArr.find(
        ({ value }) => value === predefinedPackageValue
      );

      if (!limit) return null;

      const value: OptionType = {
        label: limit.description,
        value: limit.value,
      };

      return {
        fieldName,
        value,
      };
    });

  const additionalBooleanOptions: ClickChangeFieldType[] =
    ADDITIONAL_BOOLEAN_KEYS.map((fieldName) => {
      const additionalName = fieldName.split('.')[1];
      const value: boolean =
        !!predefinedPackage?.additionals?.[
          additionalName as keyof PredefinedMtplPackageType['additionals']
        ] ?? false;

      return {
        fieldName,
        value,
      };
    });

  const updatedAdditionals: Array<ClickChangeFieldType | null> = [
    ...additionalSelectOptions,
    ...additionalBooleanOptions,
  ];

  const filteredResettedCasco = resettedCasco.filter(Boolean);
  const filteredUpdatedAdditionals = updatedAdditionals.filter(Boolean);

  const predefinedFields: Array<ClickChangeFieldType | null> = [
    ...filteredResettedCasco,
    ...filteredUpdatedAdditionals,
    {
      fieldName: 'assistance.carReplacementBoolean',
      value: '0',
    },
  ];

  return predefinedFields;
};

const getOnClickChangeFields = (
  fetcherData: FetcherDataType,
  formValues: Record<string, any>,
  predefinedPackage: PredefinedMtplPackageType
): Array<ClickChangeFieldType | null> => {
  const { additionals, casco } = fetcherData;

  const {
    casco: cascoFormValue,
    [INSURANCE_SHADOW_COPY_FIELD_NAME]: shadowCopySettings,
  } = formValues || {};

  // TODO remove id !== 17 condition part when we will return Netflix
  if (predefinedPackage?.configurable && predefinedPackage.id !== 17) {
    if (!shadowCopySettings?.length) return [...defaultCasco];

    return shadowCopySettings;
  }

  const predefinedFieldValues = getPredefinedFieldValues({
    formValues,
    cascoFormValue,
    predefinedPackage,
    additionals,
    casco,
  });

  const mtplValue: string = `${predefinedPackage?.mtpl?.basicLimit}` ?? '0';
  const assistanceValue = predefinedPackage?.assistance?.variantCode;
  // Malfuntion assistance button is checked only is assistance value is PERSONAL_V1
  const assistanceMalfunction =
    assistanceValue === 'PERSONAL_V1' &&
    predefinedPackage?.assistance?.malfunctionAssistance;

  return [
    ...predefinedFieldValues,
    {
      fieldName: 'mtpl.selected',
      value: !!parseInt(mtplValue, 10),
    },
    {
      fieldName: 'mtpl.basicLimit',
      value: mtplValue,
    },
    assistanceValue && {
      fieldName: 'assistance.variantCode',
      value: assistanceValue,
    },
    {
      fieldName: 'assistance.malfunctionAssistance2',
      value: assistanceMalfunction,
    },
  ];
};

export default getOnClickChangeFields;
