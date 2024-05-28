import { AnyObject, useFormApi } from '@data-driven-forms/react-form-renderer';
import { default as WizardContext } from '@data-driven-forms/react-form-renderer/wizard-context';
import { useContext, useEffect, useRef, useState } from 'react';
import scrollToFirstErrorOnPage from '@src/components/controls/utils/scrollToFirstErrorOnPage';
import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { useParams, useNavigate } from 'react-router-dom';

type ValidationErrors = AnyObject | undefined;

interface CheckPathErrorsOutput {
  shouldPreventJump: boolean;
  errorStepIndex?: number;
}

interface Output {
  isStepperHidden: boolean;
  hiddenSteps?: number[];
  activeStepIndex: number;
  maxStepIndex: number;
  totalSteps: number;
  activeLineWidth: string;
  goToStep: (stepIndex: number) => void;
  isStepperDisabled: boolean;
}

const STEP_URL_QUERY = 'step';

const useStepper = (): Output => {
  const navigate = useNavigate();
  const stepUrlQueryParam = useParams<{ STEP_URL_QUERY: string }>();
  const { formOptions, activeStepIndex, maxStepIndex, jumpToStep } =
    useContext(WizardContext);
  const { handleSubmit } = useFormApi();

  const useStore = useFormStoreContext();
  const { getTotalSteps, restValidation, stepperConfig, restartForm } =
    useStore((state) => ({
      getTotalSteps: state.getTotalSteps,
      restValidation: state.restValidation,
      stepperConfig: state.stepperConfig,
      restartForm: state.restartForm,
    }));

  const { errors } = formOptions.getState();

  const {
    preventFunctionsOnStep,
    hiddenOnSteps,
    hiddenSteps,
    restartFormOnLastStepPrev = false,
  } = stepperConfig || {};

  const totalSteps = getTotalSteps();
  const stepUrlQuery = stepUrlQueryParam.STEP_URL_QUERY;
  const isStepperHidden = hiddenOnSteps?.includes(activeStepIndex) ?? false;
  const isStepperDisabled =
    preventFunctionsOnStep?.includes(activeStepIndex) ?? false;

  const [stepErrors, setStepErrors] = useState<ValidationErrors[]>([]);
  const stepJumpPreventedRef = useRef(false);
  const visibleSteps = totalSteps - (hiddenSteps?.length ?? 0);
  const activeLineWidth: string = `${Math.ceil((maxStepIndex / (visibleSteps - 1)) * 100)}%`;

  const checkPathErrors = (targetStep: number): CheckPathErrorsOutput => {
    let shouldPreventJump = !!(
      Object.keys(errors ?? {}).length || restValidation?.errors?.length
    );
    let errorStepIndex: number | undefined;

    if (!shouldPreventJump) {
      for (let i = activeStepIndex; i < targetStep; i += 1) {
        if (!stepErrors[i] || Object.keys(stepErrors[i] || {}).length) {
          shouldPreventJump = true;
          errorStepIndex = i;
          break;
        }
      }
    }

    return {
      shouldPreventJump,
      errorStepIndex,
    };
  };

  const scrollToErrors = (): void => {
    handleSubmit();
    scrollToFirstErrorOnPage(errors);
    stepJumpPreventedRef.current = false;
  };

  const replaceRouterToCurrentStep = (): void => {
    navigate(`?${STEP_URL_QUERY}=${activeStepIndex + 1}`, { replace: true });
  };

  const goToStep = (index: number): void => {
    if (
      index > totalSteps - 1 ||
      index > maxStepIndex ||
      index === activeStepIndex ||
      isStepperDisabled
    ) {
      if (restartFormOnLastStepPrev && activeStepIndex === totalSteps - 1) {
        restartForm();
        return;
      }
      return;
    }

    if (index < activeStepIndex) {
      jumpToStep(index);
      return;
    }

    if (restValidation?.isLoading) {
      return;
    }

    const { shouldPreventJump, errorStepIndex } = checkPathErrors(index);

    if (shouldPreventJump) {
      stepJumpPreventedRef.current = true;

      if (errorStepIndex === undefined) {
        scrollToErrors();
        replaceRouterToCurrentStep();
        return;
      }

      jumpToStep(errorStepIndex);
      return;
    }

    jumpToStep(index);
  };

  useEffect(() => {
    navigate(`?${STEP_URL_QUERY}=${activeStepIndex + 1}`, { replace: false });

    if (stepJumpPreventedRef.current) return;

    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }, [navigate, activeStepIndex]);

  useEffect(() => {
    if (!stepUrlQuery) return;

    const newStepIndex = Number(stepUrlQuery) - 1;

    if (activeStepIndex === newStepIndex) {
      return;
    }

    if (
      Number.isNaN(newStepIndex) ||
      newStepIndex > totalSteps - 1 ||
      newStepIndex > maxStepIndex
    ) {
      replaceRouterToCurrentStep();
      return;
    }

    goToStep(newStepIndex);
  }, [stepUrlQuery, activeStepIndex, maxStepIndex, totalSteps]);

  useEffect(() => {
    if (stepJumpPreventedRef.current && Object.keys(errors || {}).length) {
      scrollToErrors();
    }

    setStepErrors((prev) => ({
      ...prev,
      [activeStepIndex]: errors,
    }));
  }, [errors, activeStepIndex]);

  return {
    isStepperHidden,
    hiddenSteps,
    activeStepIndex,
    maxStepIndex,
    totalSteps,
    activeLineWidth,
    goToStep,
    isStepperDisabled,
  };
};

export { useStepper };
