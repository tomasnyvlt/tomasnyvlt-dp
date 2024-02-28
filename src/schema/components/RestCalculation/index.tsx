import { useFormApi } from '@data-driven-forms/react-form-renderer';
import WizardContext from '@data-driven-forms/react-form-renderer/wizard-context';
import { FC, useCallback, useContext, useEffect, useRef } from 'react';

import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { useValuesChanges } from '@src/hooks/useValuesChanges';
import { FormFieldsType } from '@src/types';
import {
  CALCULATION_ACTIVE_ON_STEPS,
  dateSectionFieldNames,
  preventActiveFieldArr,
} from '@src/schema/components/RestCalculation/constants';
import getFilteredFields from '@src/schema/components/RestCalculation/utils/getFilteredFields';
import getRequestBody from '@src/schema/components/RestCalculation/utils/getRequestBody';
import { setInitialPackageValues } from '@src/schema/components/RestCalculation/utils/setInitialPackageValues';
import { CAR_INSURANCE_FORM_BODY_LS_KEY } from '@src/schema/constants';
import { FIELD_NAMES } from '@src/schema/schemas/constants/fieldNames';
import { INSURANCE_RADIO_FIELD_NAME } from '@src/schema/schemas/step2/insuranceOptions/constants';
import {
  AutoSjednavacFetchRequestType,
  AutoSjednavacFetchResponseType,
} from '@src/schema/types/AutoSjednavacFetchType';
import config from '@src/config';
import debounce from '@src/utils/debounce';
import dpApiFetch from '@src/utils/dpApiFetch';

const RestCalculation: FC = () => {
  const { activeStepIndex } = useContext(WizardContext);
  const { change, getState, getFieldState } = useFormApi();
  const { values } = getState();

  const isCalculationActive =
    CALCULATION_ACTIVE_ON_STEPS.includes(activeStepIndex);

  const { changes, updateChanges } = useValuesChanges();

  const useStore = useFormStoreContext<'autosjednavac'>();
  const {
    setFetcherData,
    setFetcherReqBody,
    isInternalUser,
    isAgentUser,
    flattenFields,
    toggleOnBlur,
    setIsFetchLoading,
  } = useStore((state) => ({
    setFetcherData: state.setFetcherData,
    setFetcherReqBody: state.setFetcherReqBody,
    isInternalUser: state.isInternalUser,
    isAgentUser: state.isAgent,
    flattenFields: state.flattenFields,
    toggleOnBlur: state.toggleOnBlur,
    setIsFetchLoading: state.setIsFetchLoading,
  }));

  // TODO remove these two refs when we will return Netflix options
  const isInitialPackageValuesSetRef = useRef(false);
  const formValuesRef = useRef<Record<string, any>>({});

  const requestBodyRef = useRef<AutoSjednavacFetchRequestType>();
  const abortControllerRef = useRef<AbortController | null>(null);

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

      formValuesRef.current = formValues;
    },
    []
  );

  const preventFetch = useCallback(
    (changedFields: string[], stepIndex: number): boolean => {
      // Fetch on first step only if some field from date section is changed
      if (stepIndex === 0) {
        const isDateSectionChanged = changedFields.some((fieldName) =>
          dateSectionFieldNames.includes(fieldName)
        );
        const isDateSectionValid = dateSectionFieldNames.every((fieldName) => {
          // If field is not rendered, consider it valid
          return getFieldState(fieldName)?.valid ?? true;
        });

        return !(isDateSectionChanged && isDateSectionValid);
      }

      const filteredFields = getFilteredFields(changedFields);

      if (!filteredFields.length) return true;

      const fieldConfigArr = filteredFields
        .map((fieldKey) => flattenFields.find(({ name }) => name === fieldKey))
        .filter(Boolean);

      if (!fieldConfigArr?.length) return true;

      // Check fields state and decide if fetch should be prevented
      const shouldPreventFetch = filteredFields.some((fieldKey) => {
        const fieldState = getFieldState(fieldKey);

        if (!fieldState) return false;

        const { active, valid } = fieldState;

        if (!valid) return true;

        const fieldConfig = fieldConfigArr.find(
          (field) => field?.name === fieldKey
        ) as FormFieldsType;

        // Prevent fetch if field is one of the preventActiveFieldArr and is active
        if (preventActiveFieldArr.includes(fieldConfig?.component) && active) {
          return true;
        }

        return false;
      });

      return shouldPreventFetch;
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [flattenFields]
  );

  const fetchCalculation = useCallback(async (): Promise<void> => {
    // Cancel previous request
    if (abortControllerRef?.current) {
      abortControllerRef.current.abort();
    }

    // Make request cancellable
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    const body = requestBodyRef.current;

    try {
      setIsFetchLoading(true);

      const data = await dpApiFetch<AutoSjednavacFetchResponseType>({
        method: 'POST',
        url: `${config.directApiUrl}/api/latest/rest/vehicle/insurance/v5/calculation`,
        body,
        headers: {
          'x-source': 'WEB_VEHICLE_R',
        },
        signal,
      });

      setFetcherData(data);

      if (!data) return;

      // TODO remove this when we will return Netflix options
      const hasLocaleStorageData = localStorage.getItem(
        CAR_INSURANCE_FORM_BODY_LS_KEY
      );
      if (!isInitialPackageValuesSetRef.current && !hasLocaleStorageData) {
        if (!formValuesRef.current?.predefined) {
          setInitialPackageValues({
            change,
            data,
            formValues: formValuesRef.current,
          });
        }

        isInitialPackageValuesSetRef.current = true;
      }

      const oldLocalStorage =
        localStorage.getItem(CAR_INSURANCE_FORM_BODY_LS_KEY) &&
        JSON.parse(localStorage.getItem(CAR_INSURANCE_FORM_BODY_LS_KEY)!);
      const newLocalStorageObject = {
        ...oldLocalStorage,
        ...body,
        preloaded: true,
      };
      localStorage.setItem(
        CAR_INSURANCE_FORM_BODY_LS_KEY,
        JSON.stringify(newLocalStorageObject)
      );

      // Set default discount for MTPL and CASCO if it's not set yet (only for internal and anonymous users).
      // Agent's `initialValue` is set in: @src/schema/components/DiscountSettings.tsx
      if (body?.temp?.isAgent) return;

      if (typeof body?.mtpl.salesDiscount !== 'number') {
        change(
          FIELD_NAMES.DISCOUNT.MTPL_NAME,
          Math.round(data.mtpl.defaultSalesDiscount * 100)
        );
      }

      if (typeof body?.casco.salesDiscount !== 'number') {
        change(
          FIELD_NAMES.DISCOUNT.CASCO_NAME,
          Math.round(data.casco.defaultSalesDiscount * 100)
        );
      }
    } catch (error) {
      if (signal.aborted) return;

      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      if (!signal.aborted) {
        setIsFetchLoading(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(
    debounce(() => fetchCalculation(), 100, activeStepIndex === 1),
    [activeStepIndex]
  );

  useEffect(() => {
    if (!isCalculationActive) return;

    updateRequestBody(values, isInternalUser, isAgentUser, activeStepIndex);
    const requestBody = requestBodyRef.current;

    if (!requestBody || preventFetch(Object.keys(changes), activeStepIndex))
      return;

    // Set `isFetchLoading` to true if one of changes is `insuranceRadioOptions`
    // to trigger loading cart price animation as soon as possible
    if (
      Object.keys(changes).some((key) => key === INSURANCE_RADIO_FIELD_NAME)
    ) {
      setIsFetchLoading(true);
    }

    updateChanges();
    setFetcherReqBody(requestBody);

    debouncedFetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changes, isInternalUser, isAgentUser, toggleOnBlur]);

  // Fetch on step change
  // Mainly for fillform when no changes are made on step change
  useEffect(() => {
    if (!isCalculationActive) return;

    updateRequestBody(values, isInternalUser, isAgentUser, activeStepIndex);
    updateChanges();
    setFetcherReqBody(requestBodyRef.current!);

    fetchCalculation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStepIndex]);

  return null;
};

export default RestCalculation;
