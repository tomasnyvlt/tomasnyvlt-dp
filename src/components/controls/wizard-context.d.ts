declare module "@data-driven-forms/react-form-renderer/wizard-context" {
  import { Field } from "@data-driven-forms/common";
  import { AnyObject } from "@data-driven-forms/react-form-renderer/common-types/any-object";
  import { FormOptions } from "@data-driven-forms/react-form-renderer/renderer-context";
  import { Context } from "react";

  export interface WizardContextValue {
    formOptions: FormOptions;
    crossroads: string[];
    dataLayer?: {
      visitorLoginState?: "zákazník";
      pageType?: string;
      pageDepartment?: string;
      pageMainCategory?: string;
    };
    currentStep: {
      fields: Field[];
      name: string;
      title: string;
      nextStep?: string;
      maxWidth?: string;
      hideBottomElementsWhen?: {
        type: "and" | "or";
        fields: Array<{
          fieldName: string;
          value: unknown;
        }>;
      };
      dataLayer?: {
        virtualPageUrl?: string;
        virtualPageTitle?: string;
      };
      sendToGTMOnLoad?: (values: AnyObject) => AnyObject;
      sendToGTMOnNext?: (values: AnyObject) => AnyObject;
      preventNextStep?: Array<{
        message: string;
        fields: string[];
      }>;
    };
    handlePrev: Function;
    onKeyDown: Function;
    jumpToStep: (index: number, valid?: boolean) => void;
    setPrevSteps: Function;
    handleNext: Function;
    navSchema: Object;
    activeStepIndex: number;
    maxStepIndex: number;
    isDynamic: boolean;
    prevSteps: string[];
  }

  declare const WizardContext: Context<WizardContextValue>;

  export default WizardContext;
}
