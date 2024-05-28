import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { default as WizardContext } from '@data-driven-forms/react-form-renderer/wizard-context';
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import { useModal } from 'anolis-ui';
// import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
// import { hotjar } from "react-hotjar";

import FillFormModal from '@src/components/modals/FillFormModal';
import ResetLocalStorageModal from '@src/components/modals/ResetLocalStorageModal';
import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import {
  CartConfigType,
  ChatConfigType,
  CustomComponentType,
  FormFieldsType,
  HideBottomElementsFieldType,
  RequiredInfoConfigType,
  WizardType,
} from '@src/types';
import setFormValuesFromDataObject from '@src/utils/setFormValuesFromDataObject';
import getFlattenArrayByKey from '@src/utils/getFlattenArrayByKey';
import { useGetFillformId } from '@src/utils/useGetFillformId.ts';
import { useLocation } from 'react-router-dom';

export const CAR_INSURANCE_FORM_BODY_LS_KEY = 'ciNeg';
export const CAR_INSURANCE_FIX_MODAL_LS_KEY = 'ciFixModal';

interface Props {
  name?: string;
}

interface Output {
  someStickyElementsVisible: boolean;
  hasStepRequiredFields: boolean;
  cart?: CartConfigType;
  hideBottomElements: boolean;
  requiredInfo?: RequiredInfoConfigType;
  chat?: ChatConfigType;
  onBlurActive?: boolean;
  customComponents?: CustomComponentType[];
}

export const useFormWizard = ({ name }: Props): Output => {
  const { formOptions, currentStep, activeStepIndex } =
    useContext(WizardContext);
  const { change, getState } = useFormApi();
  const {
    localStorageKey,
    formType,
    onBlurConfig,
    dataLayer,
    customComponents,
    requiredInfo,
  } = formOptions.schema.fields[0] as WizardType;
  const { values } = getState();
  //const router = useRouter();

  const useStore = useFormStoreContext();
  const { cart, chat, activeUserType } = useStore((state) => ({
    cart: state.cart,
    chat: state.chat,
    // TODO: Remove after no needed - autosjednavac FIX
    activeUserType: state.activeUserType,
  }));

  const [closeModal] = useModal();

  const [openFillFormModal] = useModal(FillFormModal);
  const [openResetLocalStorageModal] = useModal(ResetLocalStorageModal);
  const sendDataToGTM = useGTMDispatch();
  const fillformParam = useGetFillformId();
  const location = useLocation();

  const onBlurActive = onBlurConfig?.activeOnSteps?.includes(activeStepIndex);

  const [hideBottomElements, setHideBottomElements] = useState(false);

  // TODO: Remove after no needed - autosjednavac FIX
  const [modalsBlocked, setModalsBlocked] = useState(true);

  const someStickyElementsVisible: boolean =
    !hideBottomElements &&
    ((chat?.activeOnSteps.includes(activeStepIndex) ?? false) ||
      (cart?.activeOnSteps.includes(activeStepIndex) ?? false));

  const hasStepRequiredFields: boolean = useMemo(() => {
    const flattenFields = getFlattenArrayByKey({
      array: currentStep.fields,
      objectKey: 'fields',
    });

    return (flattenFields as FormFieldsType[]).some(
      (field) => field.isRequired
    );
  }, [currentStep?.fields]);

  /**
   * Fill form modal
   */
  useEffect(() => {
    if (modalsBlocked) return;

    if (!fillformParam || !localStorageKey) return;

    openFillFormModal({ change, localStorageKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, modalsBlocked]);

  /**
   * Set or reset local storage
   */
  useEffect(() => {
    if (modalsBlocked) return;

    if (!location || !!fillformParam) return;

    if (!name || !localStorageKey || !localStorage.getItem(localStorageKey))
      return;

    const localStorageItem = JSON.parse(localStorage.getItem(localStorageKey)!);
    const { fromLP } = localStorageItem;
    setFormValuesFromDataObject({ change, data: localStorageItem });

    if (fromLP || !localStorageItem) return;

    openResetLocalStorageModal({
      localStorageItem,
      localStorageKey,
      formType,
      change,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, fillformParam, modalsBlocked]);

  /**
   * Hide bottom elements state setting
   */
  useEffect(() => {
    const { hideBottomElementsWhen } = currentStep ?? {};

    if (!hideBottomElementsWhen) return;

    const { type, fields: hideConditionFields } = hideBottomElementsWhen;

    let shouldHideBottomElements = false;

    const callbackArrayFunction = (field: HideBottomElementsFieldType) => {
      const { fieldName, value } = field;

      return values[fieldName] === value;
    };

    if (type === 'and') {
      shouldHideBottomElements = hideConditionFields.every(
        callbackArrayFunction
      );
    } else {
      shouldHideBottomElements = hideConditionFields.some(
        callbackArrayFunction
      );
    }

    setHideBottomElements(shouldHideBottomElements);
  }, [currentStep, values]);

  /**
   * Hotjar + GTM
   */
  useEffect(() => {
    // Hotjar - Změna stavu, protože neměníme url
    // https://help.hotjar.com/hc/en-us/articles/360061197694-User-Attributes-FAQs#i-have-a-single-page-app-do-i-need-to-make-an-identify-api-call-on-every-route
    {
      /*
    if (hotjar.initialized()) {
      hotjar.stateChange(currentStep.dataLayer?.virtualPageUrl ?? currentStep.name);
    }
    */
    }

    sendDataToGTM({
      event: 'ga.page',
      virtualPageUrl: currentStep.dataLayer?.virtualPageUrl,
      virtualPageTitle: currentStep.dataLayer?.virtualPageTitle,
      visitorLoginState: dataLayer?.visitorLoginState,
      pageType: dataLayer?.pageType,
      pageDepartment: dataLayer?.pageDepartment,
      pageMainCategory: dataLayer?.pageMainCategory,
    });

    if (!currentStep?.sendToGTMOnLoad) return;

    sendDataToGTM({
      ...currentStep.sendToGTMOnLoad(values),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  /**
   * TODO: Remove after no needed - autosjednavac FIX
   */
  useEffect(() => {
    /**
     * We need to remove `ciNeg` and `ngStorage-apiKey` from locale storage
     * to hopefully fix the issue with the form.
     *
     * Only for brokers.
     */
    const wasAlreadyClicked =
      localStorage.getItem(CAR_INSURANCE_FIX_MODAL_LS_KEY) === 'true';

    if (
      wasAlreadyClicked ||
      formType !== 'autosjednavac' ||
      activeUserType !== 'broker'
    ) {
      setModalsBlocked(false);
      return;
    }

    closeModal();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formType, activeUserType]);

  return {
    someStickyElementsVisible,
    hasStepRequiredFields,
    cart,
    hideBottomElements,
    requiredInfo,
    chat,
    onBlurActive,
    customComponents,
  };
};
