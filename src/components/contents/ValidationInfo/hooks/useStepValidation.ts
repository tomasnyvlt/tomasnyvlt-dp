import {
  UseFieldApiConfig,
  useFormApi,
} from '@data-driven-forms/react-form-renderer';
import WizardContext from '@data-driven-forms/react-form-renderer/wizard-context';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { FAKE_FIELD_NAME_PREFIX } from '@src/components/contents/ValidationInfo/constants';
import getPreventNextStepDependency from '@src/components/contents/ValidationInfo/utils/getPreventNextStepDependency';
import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { PreventNextStepConfigType } from '@src/utils/getPreventNextStepConfig';
import getRandomId from '@src/utils/getRandomId';
import getDeepObjectValue from '@src/utils/getDeepObjectValue';
import { logger } from '@src/utils/logger';

export interface UseFakeFieldApiConfig extends UseFieldApiConfig {
  validationOnMount: true;
  errorMessageId: string;
}

interface ErrorMessageType {
  message: string;
  id: string;
  fieldName: string;
  isActive: boolean;
}

export interface ActiveErrorMessageArrayType {
  fieldErrors?: string[];
  restValidationErrors?: string[];
}

export interface Output {
  activeErrorMessages: string[];
  fakeFields?: UseFakeFieldApiConfig[];
  handleErrorMessageActivation: (fieldName: string, isActive: boolean) => void;
}

/**
 * Additional custom validation hook.
 *
 * Sometimes we need to validate fields from  different steps
 * and those validations are not triggered by the form api,
 * because fields are not mounted (registered) in the current step.
 *
 * Be careful, this hook can block next step for good, if you use
 * any field name that is not provided in the form (or when it is not setted by DDF change function).
 *
 * Use this hook only when you need to validate fields from different steps and use it only for those fields.
 *
 * Fields from current step will be handled by DDF API,
 * so it is not necessary to use this hook for them. It could only cause performance issues.
 */
const useStepValidation = (): Output => {
  const { activeStepIndex } = useContext(WizardContext);

  const useStore = useFormStoreContext();
  const { getPreventNextStepConfigArr, restValidation } = useStore((state) => ({
    getPreventNextStepConfigArr: state.getPreventNextStepConfigArr,
    restValidation: state.restValidation,
  }));

  const { getState, getRegisteredFields } = useFormApi();
  const { values } = getState();

  const { errorMessages: restValidationErrors } = restValidation ?? {};

  const [fieldErrorMessages, setFieldErrorMessages] = useState<
    ErrorMessageType[]
  >([]);
  const [activeErrorMessages, setActiveErrorMessages] = useState<string[]>([]);
  const [activeErrorMessagesObj, setActiveErrorMessagesObj] =
    useState<ActiveErrorMessageArrayType>({
      fieldErrors: [],
      restValidationErrors: [],
    });
  const [fakeFields, setFakeFields] = useState<UseFakeFieldApiConfig[]>([]);

  const nextStepValidationConfig: PreventNextStepConfigType[] | undefined =
    useMemo(() => {
      const preventNextStepConfigArr = getPreventNextStepConfigArr?.();

      return preventNextStepConfigArr?.[activeStepIndex];
    }, [getPreventNextStepConfigArr, activeStepIndex]);

  // Values are from different steps, so we do not need to add them to dependencies
  const preventNextStepDependency = useMemo(() => {
    return getPreventNextStepDependency(nextStepValidationConfig, values);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextStepValidationConfig]);

  const handleErrorMessageActivation = useCallback(
    (fieldName: string, isActive: boolean): void => {
      setFieldErrorMessages((prevErrors) => {
        return prevErrors.map((error) => {
          if (error.fieldName !== fieldName) return error;

          return {
            ...error,
            isActive,
          };
        });
      });
    },
    []
  );

  useEffect(() => {
    setActiveErrorMessagesObj((prevErrors) => {
      return {
        ...prevErrors,
        restValidationErrors: restValidationErrors ?? [],
      };
    });
  }, [restValidationErrors]);

  useEffect(() => {
    if (!fieldErrorMessages?.length) {
      setActiveErrorMessagesObj((prevErrors) => {
        return {
          ...prevErrors,
          fieldErrors: [],
        };
      });
      return undefined;
    }

    const activeErrors = [...fieldErrorMessages].filter(
      (error) => error.isActive
    );
    const uniqueErrors = activeErrors.filter((error, index) => {
      return activeErrors.findIndex((err) => err.id === error.id) === index;
    });

    const uniquerErrorMessages = uniqueErrors.map((err) => err.message);

    setActiveErrorMessagesObj((prevErrors) => {
      return {
        ...prevErrors,
        fieldErrors: uniquerErrorMessages,
      };
    });

    return () => {
      setActiveErrorMessagesObj((prevErrors) => {
        return {
          ...prevErrors,
          fieldErrors: [],
        };
      });
    };
  }, [fieldErrorMessages]);

  useEffect(() => {
    setFieldErrorMessages([]);

    if (!nextStepValidationConfig?.length) {
      return undefined;
    }

    const fieldsArr: UseFakeFieldApiConfig[] = nextStepValidationConfig.reduce(
      (acc, curr, index) => {
        const { fieldNames, fields, message } = curr;

        if (!fieldNames?.length || !fields?.length) {
          return acc;
        }

        const registeredFieldsOnStep = getRegisteredFields();

        curr.fieldNames.forEach((fieldName) => {
          const isFieldRegisteredOnCurrentStep =
            registeredFieldsOnStep?.includes(fieldName);

          if (isFieldRegisteredOnCurrentStep) {
            logger(
              `Field "${fieldName}" is registered on current step - do not use fields from current step, they are handled by DDF API`
            );
            return;
          }

          // Field for fake registration and validation
          const basicFakeField = fields.find(
            (field) => field?.name === fieldName
          );

          if (!basicFakeField) {
            logger(`Field "${fieldName}" was not found in fields array`);
            return;
          }

          const fakeName = getRandomId(FAKE_FIELD_NAME_PREFIX);
          const errorMessageId = `error-${index}`;

          const nameKeys = fieldName.split('.');
          const initialValue = getDeepObjectValue({
            obj: values,
            keys: nameKeys,
          });

          setFieldErrorMessages((prevErrors) => {
            return [
              ...prevErrors,
              {
                message,
                id: errorMessageId,
                fieldName: fakeName,
                isActive: false,
              },
            ];
          });

          const fakeField: UseFakeFieldApiConfig = {
            ...basicFakeField,
            // Add fake name so fake value will be validated
            // and then removed from form state
            // without changing real value
            name: fakeName,
            errorMessageId,
            initialValue,
            validationOnMount: true,
          };

          acc.push(fakeField);
        });

        return acc;
      },
      [] as UseFakeFieldApiConfig[]
    );

    setFakeFields(fieldsArr);

    return () => {
      setFakeFields([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preventNextStepDependency]);

  useEffect(() => {
    const fieldErrors = activeErrorMessagesObj?.fieldErrors ?? [];
    const restErrors = activeErrorMessagesObj?.restValidationErrors ?? [];

    setActiveErrorMessages([...fieldErrors, ...restErrors]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(activeErrorMessagesObj)]);

  return {
    activeErrorMessages,
    fakeFields,
    handleErrorMessageActivation,
  };
};

export { useStepValidation };
