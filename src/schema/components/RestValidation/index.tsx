import { useFormApi } from '@data-driven-forms/react-form-renderer';
import WizardContext from '@data-driven-forms/react-form-renderer/wizard-context';
import { FC, useCallback, useContext, useEffect, useRef } from 'react';

import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { useValuesChanges } from '@src/hooks/useValuesChanges';
import { ValidationErrors } from '@src/utils/getFullErrorKeys';
import getFilteredFields from '@src/schema/components/RestCalculation/utils/getFilteredFields';
import getRequestBody from '@src/schema/components/RestCalculation/utils/getRequestBody';
import {
  VALIDATION_ACTIVE_ON_STEPS,
  ignoreFieldsArr,
  vehicleInfoFieldKeys,
} from '@src/schema/components/RestValidation/constants';
import { SingleErrorType } from '@src/schema/components/RestValidation/types';
import composeRichTextError from '@src/schema/components/RestValidation/utils/composeRichTextError';
import getRestErrorsOnCurrentStep from '@src/schema/components/RestValidation/utils/getRestErrorsOnCurrentStep';
import getVisibleFieldErrors from '@src/schema/components/RestValidation/utils/getVisibleFieldErrors';
import { AutoSjednavacFetchRequestType } from '@src/schema/types/AutoSjednavacFetchType';
import config from '@src/config';
import debounce from '@src/utils/debounce';
import dpApiFetch, { ErrorType } from '@src/utils/dpApiFetch';

interface AutosjednavacValidationErrorType {
  validations: {
    warnings?: SingleErrorType[];
    errors?: SingleErrorType[];
  };
}

const RestValidation: FC = () => {
  const { activeStepIndex } = useContext(WizardContext);
  const { getState, getFieldState, change } = useFormApi();
  const { errors, values } = getState();

  const isValidationActive =
    VALIDATION_ACTIVE_ON_STEPS.includes(activeStepIndex);

  const { changes, updateChanges } = useValuesChanges();

  const useStore = useFormStoreContext<'autosjednavac'>();
  const {
    flattenFields,
    isInternalUser,
    isAgentUser,
    getStepFlattenFields,
    setRestValidation,
    fetcherReqBody,
  } = useStore((state) => ({
    flattenFields: state.flattenFields,
    isInternalUser: state.isInternalUser,
    isAgentUser: state.isAgent,
    getStepFlattenFields: state.getStepFlattenFields,
    setRestValidation: state.setRestValidation,
    fetcherReqBody: state.fetcherReqBody,
  }));

  // Helper ref values
  const activeStepIndexRef = useRef<typeof activeStepIndex>(activeStepIndex);
  const requestBodyRef = useRef<AutoSjednavacFetchRequestType>();
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Keep this useEffect before every function that could use activeStepIndex.
   * It is needed to set ref helpers first so it can be used in optimized functions and useEffects
   * without need of adding it into dependency array.
   */
  useEffect(() => {
    activeStepIndexRef.current = activeStepIndex;
  }, [activeStepIndex]);

  const updateRequestBody = useCallback(
    (
      formValues: Record<string, any>,
      isInternal: boolean,
      isAgent: boolean,
      stepIndex: number
    ) => {
      requestBodyRef.current = getRequestBody(
        formValues,
        isInternal,
        isAgent,
        stepIndex
      );
    },
    []
  );

  const preventFetch = (changedFields: string[]): boolean => {
    // TODO MS - place getFilteredFields into shared utils function for autosjednavac
    // TODO MS - when refactor with "calculation" and "validator" fields will be done
    const filteredFields = getFilteredFields(changedFields);

    if (!filteredFields?.length) return true;

    const fieldConfigArr = filteredFields
      .map((fieldKey) => flattenFields.find(({ name }) => name === fieldKey))
      .filter(Boolean);

    if (!fieldConfigArr?.length) return true;

    // Check fields state and decide if fetch should be prevented
    const shouldPreventFetch = filteredFields.some((fieldKey) => {
      const fieldState = getFieldState(fieldKey);

      if (!fieldState) return false;

      const { valid } = fieldState;

      // Prevent fetch if field is not valid
      return !valid;
    });

    return shouldPreventFetch;
  };

  const handleValidationError = useCallback(
    (error: ErrorType): void => {
      const { originalError } = error as ErrorType;
      const { validations } =
        (originalError as AutosjednavacValidationErrorType) || {};

      const currentStepFields = getStepFlattenFields(
        activeStepIndexRef.current
      );

      // Errors without field error duplicates
      const errorsOnCurrentStep = getRestErrorsOnCurrentStep({
        restErrors: validations?.errors,
        fields: currentStepFields,
        ignoreFields: ignoreFieldsArr[activeStepIndexRef.current],
      });

      // If first step and there is vehicle info field error, then display all vehicle info fields
      if (activeStepIndexRef.current === 0) {
        const hasVehicleInfoField = errorsOnCurrentStep.some(({ field }) =>
          vehicleInfoFieldKeys.includes(field)
        );

        if (hasVehicleInfoField) {
          change('displayAllVehicleInfo', true);
        }
      }

      const visibleFieldErrors: ValidationErrors =
        getVisibleFieldErrors(errorsOnCurrentStep);

      const visibleErrorsMessages: string[] = errorsOnCurrentStep
        ?.map(({ field, message }) => {
          if (visibleFieldErrors?.[field]) return null;

          // Do not display error message if it is from vehicle info hidden section
          // to prevent error message box blink before displayAllVehicleInfo is open
          if (
            activeStepIndexRef?.current === 0 &&
            vehicleInfoFieldKeys.includes(field)
          ) {
            return null;
          }

          return message;
        })
        .filter(Boolean) as string[];

      const uniqueErrorsMessages = Array.from(new Set(visibleErrorsMessages));
      const filteredErrorsMessages = uniqueErrorsMessages.filter((message) => {
        const fieldErrors: string[] = Object.values(visibleFieldErrors || {});

        if (!fieldErrors.length) return true;

        return !fieldErrors.some((fieldError) => fieldError === message);
      });

      // Pure RichText error messages without duplicates
      const composedErrorMessages =
        filteredErrorsMessages.map(composeRichTextError);

      setRestValidation({
        errors: visibleFieldErrors,
        errorMessages: composedErrorMessages,
        isLoading: false,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const sendValidation = useCallback(
    async (): Promise<void> => {
      // Cancel previous request
      if (abortControllerRef?.current) {
        abortControllerRef.current.abort();
      }

      // Make request cancellable
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;

      // Reset validation state to hide errors that are possibly valid now
      setRestValidation({
        errors: {},
        errorMessages: [],
        isLoading: true,
      });

      try {
        await dpApiFetch({
          method: 'POST',
          url: `${config.directApiUrl}/api/latest/rest/vehicle/insurance/v5/calculation/validation`,
          body: requestBodyRef.current,
          headers: {
            'x-source': 'WEB_VEHICLE_R',
          },
          signal,
        });

        setRestValidation({
          errors: {},
          errorMessages: [],
          isLoading: false,
        });
      } catch (error) {
        if (signal.aborted) return;

        handleValidationError(error as ErrorType);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSendValidation = useCallback(
    debounce(() => sendValidation(), 30),
    []
  );

  useEffect(() => {
    if (!isValidationActive) return;

    updateRequestBody(values, isInternalUser, isAgentUser, activeStepIndex);
    const requestBody = requestBodyRef.current;

    if (!requestBody) return;

    /**
     * Do not send rest validation if there are errors
     * or if fetcherReqBody is not set (this means that calculation was not fired yet)
     * or if preventFetch func returns true
     */
    if (
      Object.keys(errors ?? {}).length ||
      !fetcherReqBody ||
      preventFetch(Object.keys(changes))
    ) {
      return;
    }

    updateChanges();

    debouncedSendValidation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changes, errors, isInternalUser, isAgentUser, activeStepIndex]);

  useEffect(() => {
    return () => {
      setRestValidation({
        errorMessages: [],
        errors: {},
        isLoading: false,
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default RestValidation;
