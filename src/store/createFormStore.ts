import { FetcherResponseType, FormFetcherType } from '@src/formTypes';
import config from '@src/config';
import { formStoreInstance } from '@src/store/formStoreInstance';
import {
  FormStateType,
  InitialStateType,
  StoreFactoryProps,
} from '@src/store/types';
import { generateUniqueKey } from '@src/utils/generateUniqueKey';
import getActiveUserType from '@src/utils/getActiveUserType';
import getFlattenArrayByKey, {
  ArrWithObjectsType,
} from '@src/utils/getFlattenArrayByKey';
import getOnBlurFieldNames from '@src/utils/getOnBlurFieldNames';
import getPreventNextStepConfig from '@src/utils/getPreventNextStepConfig';
import { DELETE_PREFIX_VALUE } from '@src/utils/getRandomId';
import getStepNames from '@src/utils/getStepNames';
import { logger } from '@src/utils/logger';
import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

// Devtools wrapper for non-production environment only
const devtoolsInNonProd = (config.env === 'prod'
  ? (fn: any) => fn
  : devtools) as unknown as typeof devtools;

export const createFormStore = <T extends FormFetcherType = any>({
  schema,
}: StoreFactoryProps) => {
  const [wizard] = schema.fields;
  const { formType, cart, navigationButtons, chat, onBlurConfig, dataLayer } =
    wizard;

  const formStore = formStoreInstance.get(formType as FormFetcherType);

  if (formStore) {
    logger(
      `Form instance for form type "${formType}" already exists - returning existing instance.`
    );

    return formStore;
  }

  const flattenFields: ArrWithObjectsType = getFlattenArrayByKey({
    array: [...wizard.fields, ...(cart?.suitabilityRecordModal?.schema ?? [])],
    objectKey: 'fields',
  }).filter(({ name }) => !name.startsWith(DELETE_PREFIX_VALUE));

  const stepFlattenFields: ArrWithObjectsType[] = wizard.fields.map(
    (step, index) =>
      getFlattenArrayByKey({
        array: [
          step,
          ...(index === wizard.fields.length - 1
            ? cart?.suitabilityRecordModal?.schema ?? []
            : []),
        ],
        objectKey: 'fields',
      }).filter(({ name }) => !name.startsWith(DELETE_PREFIX_VALUE))
  );

  // Initial store state for reset (only values without setters)
  const initialState: InitialStateType = {
    // Configs
    cart,
    chat,
    navigationButtons,
    dataLayer,
    // User
    isAgent: false,
    isInternalUser: false,
    activeUserType: 'customer',
    // Stepper + navigation buttons
    stepNames: getStepNames(schema),
    stepperConfig: wizard?.stepper,
    // SpyField
    spyFieldRefValues: { current: {} },
    // Flatten fields
    flattenFields,
    stepFlattenFields,
    // Rest validation
    restValidation: { errorMessages: [], errors: {}, isLoading: false },
    // Fetcher
    isFetchLoading: false,
    isFetchLoadingDebounce: false,
    fetcherData: {} as FetcherResponseType<T>,
    // OnBlur helpers
    onBlurFieldNames: getOnBlurFieldNames(flattenFields, onBlurConfig),
    toggleOnBlur: undefined,
    // Fetcher
    fetcherReqBody: undefined,
  };

  const newStore = createWithEqualityFn<FormStateType<FormFetcherType>>()(
    devtoolsInNonProd((set, get) => ({
      ...initialState,

      // Setters + getters
      setUserData: (userData) =>
        set(() => ({
          isAgent: userData.isAgent,
          isInternalUser: userData.isInternalUser,
          activeUserType: getActiveUserType(userData),
          discountLimits: userData.discountLimits,
        })),
      getStepFlattenFields: (activeStepIndex) =>
        get().stepFlattenFields[activeStepIndex],
      getTotalSteps: () => get().stepNames.length,
      getPreventNextStepConfigArr: () => {
        const preventNextConfig = getPreventNextStepConfig({
          flattenFields,
          wizardFields: wizard.fields,
          activeUserType: get().activeUserType,
        });

        return preventNextConfig;
      },
      setAllSpyFieldRefValues: (values) =>
        set(() => ({ spyFieldRefValues: values ?? { current: {} } })),
      setSpyFieldRefValue: (name, value) =>
        set((state) => ({
          spyFieldRefValues: {
            ...state.spyFieldRefValues,
            current: { ...state.spyFieldRefValues.current, [name]: value },
          },
        })),
      getSpyFieldRefValue: (name) => get().spyFieldRefValues.current?.[name],
      setRestValidation: (validation) =>
        set(() => ({ restValidation: validation })),
      setIsFetchLoading: (isLoading) =>
        set(() => ({ isFetchLoading: isLoading })),
      // Debounced version of setIsFetchLoading (200ms debounce)
      // handled in: @src/hooks/useFormStoreSideEffects.ts
      setIsFetchLoadingDebounce: (isLoading) =>
        set(() => ({ isFetchLoadingDebounce: isLoading })),
      setFetcherData: (data) => set(() => ({ fetcherData: data })),
      setFetcherReqBody: (body) => set(() => ({ fetcherReqBody: body })),
      callToggleOnBlur: () =>
        set((state) => ({ toggleOnBlur: !state.toggleOnBlur })),
      // Form key prop for form re-rendering
      formKey: generateUniqueKey(),
      /**
       * Restart form - reset store to initial state and generate new form key prop
       * which will cause re-rendering of the form
       */
      restartForm: () =>
        set(() => ({ ...initialState, formKey: generateUniqueKey() })),
    })),
    // Object.is the default equalityFn which can be changed to shallow or anything else
    shallow
  );

  formStoreInstance.set(formType as FormFetcherType, newStore);

  return newStore;
};
