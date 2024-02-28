import { ALL_CODETABLES } from '@src/codetables';
import { subYears } from 'date-fns';

import { VALIDATION_MESSAGE } from '@src/constants/validation';
import {
  CardPersonPersonType,
  DatePickerType,
  FormFieldsType,
  HeadingType,
  LayoutFieldsType,
  MaskedPatternFieldType,
  OptionType,
  SectionType,
} from '@src/types';
import { ValidationType } from '@src/types/validation';
import getRandomId from '@src/utils/getRandomId';

type PartiallyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface Props {
  title: string;
  fieldKey: 'partner' | 'occupant' | 'insured';
  helpers?: Partial<Record<keyof CardPersonPersonType, string>>;
  minAge?: number;
  /**
   * You can use {age} in the message which will be replaced with the minAge value
   */
  minAgeErrorMsg?: string;
  /**
   * full: All fileds for 3rd step - default
   *
   * basic: Only basic fields for 1st step
   *
   * minimal: Minimum fields for 1st step occupant and insured section
   *
   * select-only: Only select field for 1st step insured section
   */

  fieldsType?: 'full' | 'basic' | 'minimum' | 'select-only';
}

type Output = Pick<SectionType, 'fields'>['fields'];

const { coreCcEnumerationsPartnerType: partnerOptions } = ALL_CODETABLES;
type PartnerType = PartiallyOptional<
  (typeof partnerOptions)[number],
  'apiName' | 'createdAt' | 'erased' | 'product'
>;

export const getPersonSectionFields = ({
  title,
  fieldKey,
  helpers,
  fieldsType = 'full',
  minAge,
  minAgeErrorMsg,
}: Props): Output => {
  const options: PartnerType[] = [
    // TODO FIX
    //...partnerOptions,
    {
      // If selected -> send "legalFormCode": "PERSON" to API and add "citizenship": "OTHER" to the payload
      code: 'FOREIGN',
      langDescription: 'Cizinec',
      orderBy: 4,
    },
  ];
  // TODO MS - do we want to sort options by orderBy?
  // const sortedOptions = options.sort((a, z) => a.orderBy - z.orderBy);
  const sortedOptions = options;

  // TODO MS - text change?
  // ? Živnostník -> Podnikatel - fyzická osoba
  // ? Právnická společnost -> Právnická osoba

  const titleField: HeadingType = {
    component: 'heading',
    name: getRandomId(),
    initialValue: title,
    css: { as: 'h2', mt: '1.5rem' },
  };

  const legalFormCodeGrid: LayoutFieldsType = {
    component: 'grid',
    name: getRandomId(),
    fields: [
      {
        component: 'select-field',
        name: `${fieldKey}.legalFormCode`,
        label: 'Druh osoby',
        helper: helpers?.legalFormCode,
        isRequired: true,
        options: sortedOptions.map(({ langDescription, code }) => ({
          label: langDescription,
          value: code,
        })),
        initialValue: {
          label: sortedOptions[0].langDescription,
          value: sortedOptions[0].code,
        },
        validate: [{ type: 'required', message: 'Prosím vyberte.' }],
      },
    ],
  };

  const zipField: MaskedPatternFieldType = {
    component: 'masked-pattern-field',
    format: '### ##',
    name: `${fieldKey}.permanentAddress.zip`,
    label: 'PSČ trvalého bydliště',
    isRequired: true,
    validate: [
      {
        type: 'only-number',
        message: 'PSČ musí obsahovat pouze čísla.',
      },
      {
        type: 'exact-length-without-spaces',
        threshold: 5,
        message: 'PSČ musí obsahovat přesně 5 znaků.',
      },
      { type: 'required', message: VALIDATION_MESSAGE.required },
    ],
    resolveProps: (_props, _fieldApi, formOptions) => {
      const { values } = formOptions.getState();

      const type = (values[fieldKey]?.legalFormCode as OptionType)?.value;

      if (type !== 'PERSON' && type !== 'FOREIGN') {
        return {
          label: 'PSČ sídla firmy',
        };
      }

      return {};
    },
  };

  const birthDateField: DatePickerType = {
    component: 'date-picker',
    name: `${fieldKey}.birthDate`,
    label: 'Datum narození',
    helper: helpers?.birthDate,
    isRequired: true,
    validate: [
      { type: 'required', message: VALIDATION_MESSAGE.required },
      { type: 'date' },
      ...(minAge
        ? ([
            {
              type: 'min-age',
              threshold: minAge,
              component: 'date',
              message: minAgeErrorMsg,
            },
          ] as ValidationType[])
        : []),
    ],
    ...(minAge
      ? {
          maxDate: subYears(new Date(), minAge).toISOString(),
        }
      : {}),
    defaultCalendarType: 'year',
    condition: {
      when: fieldKey,
      is: (obj: Record<string, any>) => {
        const { legalFormCode } = obj || {};
        const value =
          typeof legalFormCode === 'string'
            ? legalFormCode
            : legalFormCode?.value;

        return (
          value === 'FOREIGN' ||
          (value === 'PERSON' && fieldsType === 'minimum')
        );
      },
    },
  };

  if (fieldsType === 'select-only') {
    return [titleField, legalFormCodeGrid];
  }

  if (fieldsType === 'minimum') {
    return [
      titleField,
      legalFormCodeGrid,
      {
        component: 'grid',
        name: getRandomId(),
        css: { mt: { _: '1.5rem', sm: '2rem' }, rowGap: '1.5rem' },
        fields: [birthDateField, zipField],
      },
    ];
  }

  return [
    titleField,
    legalFormCodeGrid,
    {
      component: 'grid',
      name: getRandomId(),
      css: { mt: { _: '1.5rem', sm: '2rem' }, rowGap: '1.5rem' },
      fields: [
        {
          component: 'text-field',
          name: `${fieldKey}.firstName`,
          label: 'Křestní jméno',
          helper: helpers?.firstName,
          isRequired: true,
          validate: [
            { type: 'required', message: VALIDATION_MESSAGE.required },
          ],
          condition: {
            when: fieldKey,
            is: (obj: Record<string, any>) => {
              const { value } = obj?.legalFormCode ?? {};

              if (fieldsType !== 'full') {
                return value !== 'SELFEMPLOYED' && value !== 'COMPANY';
              }

              return value !== 'COMPANY';
            },
          },
        },
        {
          component: 'text-field',
          name: `${fieldKey}.lastName`,
          label: 'Příjmení',
          helper: helpers?.lastName,
          isRequired: true,
          validate: [
            { type: 'required', message: VALIDATION_MESSAGE.required },
          ],
          condition: {
            when: fieldKey,
            is: (obj: Record<string, any>) => {
              const { value } = obj?.legalFormCode ?? {};

              if (fieldsType !== 'full') {
                return value !== 'SELFEMPLOYED' && value !== 'COMPANY';
              }

              return value !== 'COMPANY';
            },
          },
        },
        ...(fieldsType === 'full'
          ? ([
              {
                component: 'text-field',
                name: `${fieldKey}.namePrefix`,
                label: 'Titul',
                helper: helpers?.namePrefix,
                condition: {
                  when: fieldKey,
                  is: (obj: Record<string, any>) => {
                    const { value } = obj?.legalFormCode ?? {};

                    return value !== 'COMPANY';
                  },
                },
              },
            ] as FormFieldsType[])
          : []),
        {
          component: 'box',
          name: getRandomId(),
          css: {
            display: { _: 'none', sm: 'block' },
          },
          condition: {
            when: fieldKey,
            is: (obj: Record<string, any>) => {
              const { value } = obj?.legalFormCode ?? {};

              if (fieldsType !== 'full') return false;

              return value === 'SELFEMPLOYED';
            },
          },
        },
        {
          component: 'text-field',
          name: `${fieldKey}.companyName`,
          label: 'Název firmy',
          helper: helpers?.companyName,
          isRequired: true,
          validate: [
            { type: 'required', message: VALIDATION_MESSAGE.required },
          ],
          condition: {
            when: fieldKey,
            is: (obj: Record<string, any>) => {
              const { value } = obj?.legalFormCode ?? {};

              return value === 'COMPANY' || value === 'SELFEMPLOYED';
            },
          },
        },
        {
          component: 'text-field',
          name: `${fieldKey}.companyIn`,
          label: 'IČO',
          helper: helpers?.companyIn,
          isRequired: true,
          inputProps: {
            _input: {
              maxLength: 8,
              minLength: 8,
              type: 'number',
            },
          },
          validate: [
            {
              type: 'required',
              message: VALIDATION_MESSAGE.required,
            },
            {
              type: 'only-number',
              message: 'IČO musí obsahovat pouze čísla.',
            },
            {
              type: 'exact-length',
              threshold: 8,
              message: 'IČO musí obsahovat přesně 8 znaků.',
            },
          ],
          condition: {
            when: fieldKey,
            is: (obj: Record<string, any>) => {
              const { value } = obj?.legalFormCode ?? {};

              return value === 'COMPANY' || value === 'SELFEMPLOYED';
            },
          },
        },
        {
          component: 'text-field',
          name: `${fieldKey}.firstName`,
          label: 'Křestní jméno',
          helper: helpers?.firstName,
          isRequired: true,
          validate: [
            { type: 'required', message: VALIDATION_MESSAGE.required },
          ],
          condition: {
            when: fieldKey,
            is: (obj: Record<string, any>) => {
              const { value } = obj?.legalFormCode ?? {};

              return fieldsType !== 'full' && value === 'SELFEMPLOYED';
            },
          },
        },
        {
          component: 'text-field',
          name: `${fieldKey}.lastName`,
          label: 'Příjmení',
          helper: helpers?.lastName,
          isRequired: true,
          validate: [
            { type: 'required', message: VALIDATION_MESSAGE.required },
          ],
          condition: {
            when: fieldKey,
            is: (obj: Record<string, any>) => {
              const { value } = obj?.legalFormCode ?? {};

              return fieldsType !== 'full' && value === 'SELFEMPLOYED';
            },
          },
        },
        {
          component: 'masked-pattern-field',
          format: '######/####',
          patternType: 'personalIn',
          name: `${fieldKey}.personalIn`,
          label: 'Rodné číslo',
          helper: helpers?.personalIn,
          isRequired: true,
          validate: [
            { type: 'required', message: VALIDATION_MESSAGE.required },
            { type: 'czech-id' },
            ...(minAge
              ? ([
                  {
                    type: 'min-age',
                    threshold: minAge,
                    component: 'czech-id',
                    message: minAgeErrorMsg,
                  },
                ] as ValidationType[])
              : []),
          ],
          condition: {
            when: fieldKey,
            is: (obj: Record<string, any>) => {
              const { value } = obj?.legalFormCode ?? {};

              return value === 'PERSON';
            },
          },
        },
        birthDateField,
        ...(fieldsType !== 'full' ? ([zipField] as FormFieldsType[]) : []),
        {
          component: 'masked-pattern-field',
          format: '+### ### ### ###',
          allowEmptyFormatting: true,
          patternType: 'phone',
          name: `${fieldKey}.phone`,
          label: 'Telefonní číslo',
          helper: helpers?.phone,
          isRequired: true,
          initialValue: '+420',
          validate: [
            { type: 'required', message: VALIDATION_MESSAGE.required },
            { type: 'phone' },
          ],
        },
        {
          component: 'text-field',
          name: `${fieldKey}.email`,
          label: 'E-mail',
          helper: helpers?.email,
          isRequired: fieldsType === 'full',
          type: 'e-mail',
          inputProps: {
            _input: {
              type: 'email',
            },
          },
          validate: [
            ...(fieldsType === 'full'
              ? ([
                  {
                    type: 'required',
                    message: VALIDATION_MESSAGE.required,
                  },
                ] as ValidationType[])
              : []),
            { type: 'email' },
          ],
        },
        ...(fieldsType === 'full'
          ? ([
              {
                component: 'smartform-field',
                name: `${fieldKey}.permanentAddress`,
                label: 'Adresa bydliště',
                helper: helpers?.permanentAddress,
                instance: `${fieldKey}.permanentAddress`,
                isRequired: true,
                validate: [
                  { type: 'required', message: VALIDATION_MESSAGE.required },
                  { type: 'address-smartform' },
                ],
                resolveProps: (_props, _fieldApi, formOptions) => {
                  const { values } = formOptions.getState();
                  const type = (values[fieldKey].legalFormCode as OptionType)
                    .value;
                  const fillForm =
                    formOptions.getState().values?.[fieldKey].permanentAddress;

                  if (type === 'COMPANY' || type === 'SELFEMPLOYED') {
                    return {
                      label: 'Adresa sídla firmy',
                      setFromFillForm: fillForm,
                    };
                  }

                  return {
                    setFromFillForm: fillForm,
                  };
                },
              },
              {
                component: 'checkbox-field',
                name: `${fieldKey}.sameAddress`,
                helper: helpers?.sameAddress,
                initialValue: true,
                label: JSON.stringify({
                  blocks: [
                    {
                      key: 'bqubj',
                      text: 'Kontaktní adresa je shodná s adresou bydliště',
                      type: 'unstyled',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {},
                    },
                  ],
                  entityMap: {},
                }),
                resolveProps: (_props, _fieldApi, formOptions) => {
                  const fillForm =
                    formOptions.getState().values?.[fieldKey].contactAddress;

                  return {
                    initialValue: !fillForm,
                  };
                },
              },
              {
                component: 'smartform-field',
                name: `${fieldKey}.contactAddress`,
                label: 'Kontaktní adresa v ČR',
                helper: helpers?.contactAddress,
                instance: `${fieldKey}.contactAddress`,
                isRequired: true,
                validate: [
                  { type: 'required', message: VALIDATION_MESSAGE.required },
                  { type: 'address-smartform' },
                ],
                condition: {
                  when: fieldKey,
                  is: (obj: Record<string, any>) => {
                    const { sameAddress } = obj ?? {};

                    return !sameAddress;
                  },
                },
                resolveProps: (_props, _fieldApi, formOptions) => {
                  const fillForm =
                    formOptions.getState().values?.[fieldKey].contactAddress;

                  return {
                    setFromFillForm: fillForm,
                  };
                },
              },
            ] as FormFieldsType[])
          : []),
      ],
    },
  ];
};
