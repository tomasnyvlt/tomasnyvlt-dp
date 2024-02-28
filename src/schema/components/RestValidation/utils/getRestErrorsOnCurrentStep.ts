import { SingleErrorType } from '@src/schema/components/RestValidation/types';
import { ArrWithObjectsType } from 'utils/getFlattenArrayByKey';

interface Props {
  restErrors?: SingleErrorType[];
  fields: ArrWithObjectsType;
  ignoreFields?: string[];
}

const getRestErrorsOnCurrentStep = ({
  restErrors,
  fields,
  ignoreFields,
}: Props): SingleErrorType[] => {
  if (!restErrors?.length) return [];

  const formattedErrors: SingleErrorType[] = [];

  // Get errors for each field by splitting field names
  restErrors.forEach(({ field, message }) => {
    const splittedFields = field.split('||');
    const errors = splittedFields.forEach((singleField) => {
      formattedErrors.push({
        field: singleField,
        message,
      });
    });

    return errors;
  });

  let preparedFields: ArrWithObjectsType = fields;

  if (ignoreFields?.length) {
    preparedFields = fields.filter(({ name }) => {
      return !ignoreFields.includes(name);
    });
  }

  // Create a lookup object from fieldArray for efficient lookups
  const fieldLookup: { [name: string]: boolean } = {};
  preparedFields.forEach(({ name }) => {
    fieldLookup[name] = true;
  });

  const filteredErrors: SingleErrorType[] = formattedErrors.filter((error) => {
    return error.field in fieldLookup;
  });

  // Filter out duplicate errors (sometimes we get multiple errors for one field)
  const filteredErrorsWithoutDuplicates: SingleErrorType[] = [];
  filteredErrors.forEach((error) => {
    const isDuplicate = filteredErrorsWithoutDuplicates.find(({ field }) => {
      return field === error.field;
    });

    if (isDuplicate) return;

    filteredErrorsWithoutDuplicates.push(error);
  });

  return filteredErrorsWithoutDuplicates;
};

export default getRestErrorsOnCurrentStep;
