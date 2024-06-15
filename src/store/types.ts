import { RefObject } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';

import {
  ActiveUserType,
  CartConfigType,
  ChatConfigType,
  DataLayerType,
  NavigationButtonsConfigType,
  SchemaType,
  StepperConfigType,
} from '@src/types';
import {
  FetcherRequestType,
  FetcherResponseType,
  FormFetcherType,
} from '@src/formTypes.ts';
import { UserType } from '@src/utils/getActiveUserType';
import { ValidationErrors } from '@src/utils/getFullErrorKeys';
import { PreventNextStepConfigType } from '@src/utils/getPreventNextStepConfig';
import { SpyFieldValueType } from '@src/utils/getSpyFields';
// import { UserDiscountLimitProps } from '@src/components/contexts/UserContext';
import { ArrWithObjectsType } from '@src/utils/getFlattenArrayByKey';
import { TODO } from '@src/utils/todo';

type UserDiscountLimitProps = TODO;

export interface StoreFactoryProps {
  schema: SchemaType;
}

export interface RestValidationType {
  // String error messages for usage in ValidationInfo component
  errorMessages?: string[];
  // Error objects for usage for specific fields be "field" key
  errors?: ValidationErrors;
  isLoading: boolean;
}

export interface FormStateType<T extends FormFetcherType = any> {
  // Configs
  cart?: CartConfigType;
  chat?: ChatConfigType;
  navigationButtons?: NavigationButtonsConfigType;
  dataLayer?: DataLayerType;
  // User
  isAgent: UserType['isAgent'];
  isInternalUser: UserType['isInternalUser'];
  activeUserType: ActiveUserType;
  discountLimits?: UserDiscountLimitProps[];
  setUserData: (
    userData: Pick<
      FormStateType,
      'isAgent' | 'isInternalUser' | 'discountLimits'
    >
  ) => void;
  // Stepper + navigation buttons
  stepNames: string[];
  getTotalSteps: () => number;
  getPreventNextStepConfigArr?: () => Array<
    PreventNextStepConfigType[] | undefined
  >;
  stepperConfig?: StepperConfigType;
  // SpyField
  spyFieldRefValues: RefObject<Record<string, SpyFieldValueType>>;
  setAllSpyFieldRefValues: (
    values: RefObject<Record<string, SpyFieldValueType>>
  ) => void;
  setSpyFieldRefValue: (name: string, value: SpyFieldValueType) => void;
  getSpyFieldRefValue: (name: string) => SpyFieldValueType;
  // Flatten fields
  flattenFields: ArrWithObjectsType;
  stepFlattenFields: ArrWithObjectsType[];
  getStepFlattenFields: (activeStepIndex: number) => ArrWithObjectsType;
  // Rest validation
  restValidation: RestValidationType;
  setRestValidation: (validation: RestValidationType) => void;
  // Fetcher
  isFetchLoading: boolean;
  setIsFetchLoading: (isLoading: boolean) => void;
  isFetchLoadingDebounce: boolean;
  setIsFetchLoadingDebounce: (isLoading: boolean) => void;
  fetcherData: FetcherResponseType<T>;
  setFetcherData: (data: FetcherResponseType<T>) => void;
  fetcherReqBody?: FetcherRequestType<T>;
  setFetcherReqBody: (body: FetcherRequestType<T>) => void;
  // OnBlur helpers
  onBlurFieldNames: string[];
  toggleOnBlur: boolean | undefined;
  callToggleOnBlur: () => void;
  // FormRenderer key for re-rendering
  formKey: string;
  // Reset
  restartForm: () => void;
}

export type InitialStateType = Omit<
  FormStateType,
  | 'setUserData'
  | 'getStepFlattenFields'
  | 'getTotalSteps'
  | 'getPreventNextStepConfigArr'
  | 'setAllSpyFieldRefValues'
  | 'setSpyFieldRefValue'
  | 'getSpyFieldRefValue'
  | 'setRestValidation'
  | 'setIsFetchLoading'
  | 'setIsFetchLoadingDebounce'
  | 'setFetcherData'
  | 'setFetcherReqBody'
  | 'callToggleOnBlur'
  | 'formKey'
  | 'restartForm'
>;

export type FormStoreReturnType<T extends FormFetcherType = any> =
  UseBoundStore<StoreApi<FormStateType<T>>>;
