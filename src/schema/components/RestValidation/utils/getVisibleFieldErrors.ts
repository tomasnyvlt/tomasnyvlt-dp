import getFirstVisibleFieldElement from '@src/utils/getFirstVisibleFieldElement';
import { ValidationErrors } from '@src/utils/getFullErrorKeys';
import { SingleErrorType } from '@src/schema/components/RestValidation/types';

const getVisibleFieldErrors = (
  errors: SingleErrorType[] = []
): ValidationErrors => {
  const visibleFieldErrorsArr = errors
    .map(({ field, message }) => {
      if (!getFirstVisibleFieldElement(field)) return null;

      return {
        field,
        message,
      };
    })
    .filter(Boolean) as SingleErrorType[];

  const visibleFieldErrors: ValidationErrors = visibleFieldErrorsArr.reduce(
    (acc, { field, message }) => {
      acc![field] = message;

      return acc;
    },
    {} as ValidationErrors
  );

  return visibleFieldErrors;
};

export default getVisibleFieldErrors;
