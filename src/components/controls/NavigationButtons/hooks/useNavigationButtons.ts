import selectNext from '@data-driven-forms/common/wizard/select-next';
import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { default as WizardContext } from '@data-driven-forms/react-form-renderer/wizard-context';
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import { RefObject, useCallback, useContext, useEffect, useRef } from 'react';

import { GetButtonStyleProps } from '@src/components/controls/NavigationButtons/utils/getButtonStyle';
import scrollToFirstErrorOnPage from '@src/components/controls/utils/scrollToFirstErrorOnPage';
import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { NavigationButtonConfigType } from '@src/types';

interface ButtonType {
  label: string;
  isVisible: boolean;
  isLoading?: boolean;
  handleClick: () => void;
  variant: GetButtonStyleProps['variant'];
  ref: RefObject<HTMLButtonElement>;
}

interface GetButtonLabelAttrType extends NavigationButtonConfigType {
  activeIndex: number;
  fallback: string;
}

interface Output {
  nextButton: ButtonType;
  prevButton: ButtonType;
  activeOnCurrentStep: boolean;
}

const useNavigationButtons = (): Output => {
  const { formOptions, handlePrev, activeStepIndex, handleNext, currentStep } =
    useContext(WizardContext);
  const { handleSubmit, getFieldState, resetFieldState } = useFormApi();

  const useStore = useFormStoreContext();
  const {
    stepNames,
    getTotalSteps,
    restValidation,
    isFetchLoading,
    navigationButtons,
    getStepFlattenFields,
  } = useStore((state) => ({
    stepNames: state.stepNames,
    getTotalSteps: state.getTotalSteps,
    restValidation: state.restValidation,
    isFetchLoading: state.isFetchLoading,
    navigationButtons: state.navigationButtons,
    getStepFlattenFields: state.getStepFlattenFields,
  }));

  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const sendDataToGTM = useGTMDispatch();

  const { errors, values } = formOptions.getState();

  const getButtonLabel = useCallback(
    ({ labelArr, activeIndex, fallback }: GetButtonLabelAttrType) => {
      return labelArr?.[activeIndex] || fallback;
    },
    []
  );

  const handlePrevClick = (): void => {
    handlePrev();
  };

  // Blur navigation button on next step change to remove focus state from button
  const blurFocusedButton = useCallback(() => {
    const { activeElement } = document;

    const prevBtnEl = prevBtnRef.current;
    const nextBtnEl = nextBtnRef.current;

    if (activeElement === prevBtnEl) {
      prevBtnEl?.blur();
      return;
    }

    if (activeElement === nextBtnEl) {
      nextBtnEl?.blur();
    }
  }, [prevBtnRef, nextBtnRef]);

  const handleNextClick = (): void => {
    // Rest validation or calculation is loading - do not allow to go to next step
    if (restValidation.isLoading || isFetchLoading) return;

    if (currentStep?.sendToGTMOnNext) {
      sendDataToGTM({
        ...currentStep?.sendToGTMOnNext?.(values),
      });
    }

    // DDF errors
    if (Object.keys(errors ?? {}).length) {
      // Show all errors and try to focus first input
      handleSubmit();

      // Scroll to the first error on current step
      scrollToFirstErrorOnPage(errors);

      return;
    }

    // Rest errors
    if (
      Object.keys(restValidation.errors ?? {})?.length ||
      restValidation.errorMessages?.length
    ) {
      // Scroll (and focus) to the first rest error on current step
      scrollToFirstErrorOnPage(restValidation.errors, true);

      return;
    }

    handleNext(
      selectNext(stepNames[activeStepIndex + 1], formOptions.getState)
    );
  };

  // Reset fields meta data on step change
  useEffect(() => {
    const currentStepFlattenFields = getStepFlattenFields(activeStepIndex);

    currentStepFlattenFields.forEach(({ name }) => {
      const fieldState = getFieldState(name);

      if (!fieldState) return;

      resetFieldState(name);
    });

    blurFocusedButton();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStepIndex]);

  const prevButton: ButtonType = {
    label: getButtonLabel({
      labelArr: navigationButtons?.prev?.labelArr,
      activeIndex: activeStepIndex,
      fallback: 'Zpět',
    }),
    isVisible: activeStepIndex > 0,
    isLoading: false,
    handleClick: handlePrevClick,
    variant: 'outline',
    ref: prevBtnRef,
  };

  const nextButton: ButtonType = {
    label: getButtonLabel({
      labelArr: navigationButtons?.next?.labelArr,
      activeIndex: activeStepIndex,
      fallback: 'Pokračovat',
    }),
    isVisible: activeStepIndex < getTotalSteps() - 1,
    isLoading: restValidation.isLoading || isFetchLoading,
    handleClick: handleNextClick,
    variant: 'gradient',
    ref: nextBtnRef,
  };

  return {
    nextButton,
    prevButton,
    activeOnCurrentStep:
      navigationButtons?.activeOnSteps?.includes(activeStepIndex) ?? false,
  };
};

export { useNavigationButtons };
