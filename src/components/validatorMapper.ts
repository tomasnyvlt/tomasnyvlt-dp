import { Meta } from '@data-driven-forms/react-form-renderer';
import { differenceInYears } from 'date-fns';

import { VALIDATION_MESSAGE } from '@src/constants/validation';
import { CustomValidationType, ValueOf } from '@src/types/validation';
import { getValueByString } from '@src/utils/getValueByString';
import { addressSmartformValidation } from '@src/utils/validations/addressSmartformValidation';
import { isPatternValid } from '@src/utils/validations/pattern-validations';
import { personalCzId } from '@src/utils/validations/personalCzId';

type ValidatorKeyType = ValueOf<Pick<CustomValidationType, 'type'>>;

interface MetaType extends Meta<any> {
  name: string;
  value: string | number | undefined | boolean | Record<string, any>;
}

type ValidatorFunctionType<Type extends ValidatorKeyType = any> = (
  attrs: Extract<CustomValidationType, { type: Type }>
) => (
  value: any,
  allValues: Record<string, any>,
  meta: MetaType
) => string | null;

// Validation functions for mapper
const requiredIf: ValidatorFunctionType<'required-if'> =
  ({ fields, message = 'Toto pole je povinné.', logical = 'AND' }) =>
  (_value, allValues, field) => {
    if (field?.value) return null;

    let isRequired = false;

    const isValueEqual = (fieldKey: string): boolean => {
      const conditionValue = fields?.[fieldKey]?.value ?? fields?.[fieldKey];
      const fieldValue = getValueByString(fieldKey, allValues);
      // Check if value is select object and get value from it or use value as is
      const value = fieldValue?.value ?? fieldValue;

      return value === conditionValue;
    };

    if (logical === 'AND') {
      isRequired = Object.keys(fields).every(isValueEqual);
    }

    if (logical === 'OR') {
      isRequired = Object.keys(fields).some(isValueEqual);
    }

    return isRequired ? message : null;
  };

const czechId: ValidatorFunctionType<'czech-id'> =
  ({ message = 'Rodné číslo je neplatné.' }) =>
  (value: string) => {
    if (!value) return null;

    return personalCzId(value).isValid ? null : message;
  };

const addressSmartform: ValidatorFunctionType<'address-smartform'> =
  ({ message = 'Adresa není platná.' }) =>
  (value: any) => {
    if (!value) return null;

    return addressSmartformValidation(value) ? null : message;
  };

const email: ValidatorFunctionType<'email'> =
  ({ message = 'E-mail je ve špatném formátu.' }) =>
  (value: string) => {
    if (!value) return null;
    return isPatternValid(value, 'email') ? null : message;
  };

const onlyNumber: ValidatorFunctionType<'only-number'> =
  ({ message = 'Vstup musí obsahovat pouze čísla.' }) =>
  (value: string) => {
    if (!value) return null;
    return isPatternValid(value, 'only-number') ? null : message;
  };

const phone: ValidatorFunctionType<'phone'> =
  ({ message = 'Špatný formát čísla nebo chybí předvolba.' }) =>
  (value: string) => {
    if (!value) return null;
    return isPatternValid(value, 'phone') ? null : message;
  };

const phoneWithCode: ValidatorFunctionType<'phone-with-code'> =
  ({ message = 'Špatný formát čísla nebo chybí předvolba.' }) =>
  (value: string) => {
    if (!value) return null;
    if (value === '+420' || value === '+421') return null;
    return isPatternValid(value, 'phone') ? null : message;
  };

const date: ValidatorFunctionType<'date'> =
  ({ message = VALIDATION_MESSAGE.date }) =>
  (value: string) => {
    if (!value) return null;
    const isValid =
      isPatternValid(value, 'date') || isPatternValid(value, 'iso-date');

    return isValid ? null : message;
  };

const minAge: ValidatorFunctionType<'min-age'> =
  ({ message = 'Minimální věk je {age} let.', threshold, component }) =>
  (value: string) => {
    if (!value) return null;

    const errMessage = message.replace('{age}', `${threshold}`);

    if (component === 'czech-id') {
      const idData = personalCzId(value);

      return idData.isValid && (idData.age ?? 0) >= threshold
        ? null
        : errMessage;
    }

    const today = new Date(Date.now()).setHours(0, 0, 0, 0);
    const timelessDateOfBirth = new Date(value).setHours(0, 0, 0, 0);
    const age = differenceInYears(today, timelessDateOfBirth);

    return age >= threshold ? null : errMessage;
  };

const exactLengthWithoutSpaces: ValidatorFunctionType<
  'exact-length-without-spaces'
> =
  ({ message = `Přesný obsah znaků je {threshold}`, threshold }) =>
  (value: string) => {
    const errMessage = message.replace('{threshold}', `${threshold}`);
    if (!value) return null;

    const stringWithoutSpaces = value.toString().replace(' ', '');
    return stringWithoutSpaces.length === threshold ? null : errMessage;
  };

// Mapper
const validatorMapper: Record<ValidatorKeyType, ValidatorFunctionType> = {
  'required-if': requiredIf,
  'czech-id': czechId,
  email,
  'only-number': onlyNumber,
  phone,
  'phone-with-code': phoneWithCode,
  date,
  'min-age': minAge,
  'address-smartform': addressSmartform,
  'exact-length-without-spaces': exactLengthWithoutSpaces,
};

export default validatorMapper;
