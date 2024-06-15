import { FormOptions } from '@data-driven-forms/react-form-renderer';
import { AnyObject } from '@data-driven-forms/react-form-renderer/common-types/any-object';
import { FetcherResponseType, FormFetcherType } from '@src/formTypes.ts';
import { CartFieldsType } from '@src/types/cart';
import { FormFieldsType } from '@src/types/formFields';
import { LayoutFieldsType, SectionType } from '@src/types/layout';
import { FC } from 'react';

export * from '@src/types/cart';
export * from '@src/types/designComponents';
export * from '@src/types/formFields';
export * from '@src/types/layout';
export * from '@src/types/validation';

export type FormType =
  | 'autosjednavac'
  | 'autosjednavac-zarazeni-do-flotily'
  | 'klientske-zmeny'
  | 'whistleblowing';

export interface HideBottomElementsFieldType {
  fieldName: string;
  value: unknown;
}

/**
 * Wrapper types
 */
export type ActiveUserType = 'broker' | 'internal' | 'customer';

export interface PreventNextStepType {
  message: string;
  /**
   * By default for all user types
   */
  userType?: ActiveUserType[];
  fieldNames: string[];
}

export interface StepType {
  component: 'step';
  name: string;
  title: string;
  fields: SectionType[];
  maxWidth?: string;
  hideBottomElementsWhen?: {
    type: 'and' | 'or';
    fields: HideBottomElementsFieldType[];
  };
  dataLayer?: {
    virtualPageUrl: string;
    virtualPageTitle: string;
  };
  sendToGTMOnLoad?: (values: AnyObject) => AnyObject;
  sendToGTMOnNext?: (values: AnyObject) => AnyObject;
  preventNextStep?: PreventNextStepType[];
}

export interface CartConfigType {
  activeOnSteps: number[];
  cartFields?: CartFieldsType[];
  suitabilityRecordModal: {
    id: string;
    schema: SectionType[];
    ownTemplateSchema?: LayoutFieldsType[];
  };
}

export interface NavigationButtonConfigType {
  labelArr?: Array<string | undefined | null>;
}

export interface StepperConfigType {
  /* Whole stepper */
  hiddenOnSteps?: number[];
  /* Only steps */
  hiddenSteps?: number[];
  /* Prevent stepper function on steps */
  preventFunctionsOnStep?: number[];
  /**
   * Should jump to start from last step when user click on prev button
   * and restart whole form (clear all values) and restart store
   */
  restartFormOnLastStepPrev?: boolean;
}

export interface NavigationButtonsConfigType {
  activeOnSteps: number[];
  prev?: NavigationButtonConfigType;
  next?: NavigationButtonConfigType;
}

export interface RequiredInfoConfigType {
  hiddenOnSteps?: number[];
}

export interface ChatConfigType {
  activeOnSteps: number[];
}

export interface DataLayerType {
  visitorLoginState?: 'zákazník';
  pageType?: string;
  pageDepartment?: string;
  pageMainCategory?: string;
}

export interface OnBlurConfigType {
  activeOnSteps: number[];
  fieldNames?: string[];
  componentNames?: FormFieldsType['component'][];
}

export interface CustomComponentType {
  Component: FC;
  key: string;
  props?: Record<string, any>;
}

export interface WizardType {
  component: 'wizard';
  name: string;
  localStorageKey?: string;
  fields: StepType[];
  formType: FormType;
  cart?: CartConfigType;
  stepper?: StepperConfigType;
  requiredInfo?: RequiredInfoConfigType;
  navigationButtons?: NavigationButtonsConfigType;
  chat?: ChatConfigType;
  dataLayer?: DataLayerType;
  customComponents?: CustomComponentType[];
  onBlurConfig?: OnBlurConfigType;
}

export interface SchemaType {
  fields: WizardType[];
  onSubmit?: (
    formOptions: FormOptions,
    fetcherData: FetcherResponseType<FormFetcherType>
  ) => void;
}
