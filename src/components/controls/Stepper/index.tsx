import { x } from "@xstyled/emotion";
import { FC } from "react";

import StepButton from "@src/components/controls/Stepper/components/StepButton";
import { BUTTON_SIZE } from "@src/components/controls/Stepper/constants";
import { useStepper } from "@src/components/controls/Stepper/hooks/useStepper";

const Stepper: FC = () => {
  const {
    isStepperHidden,
    hiddenSteps,
    activeStepIndex,
    maxStepIndex,
    totalSteps,
    goToStep,
    activeLineWidth,
    isStepperDisabled
  } = useStepper();

  if (isStepperHidden) return null;

  return (
    <x.div
      display="flex"
      alignItems="center"
      overflow="hidden"
      m="3rem auto 0"
      px="1.375rem"
      w="100%"
      maxW="26.5rem"
      borderRadius="6.25rem"
      backgroundColor="primary.white"
      boxShadow="0rem 0.25rem 0.25rem rgba(51, 51, 51, 0.04), 0rem 0.25rem 1rem rgba(51, 51, 51, 0.08)"
    >
      <x.div
        position="relative"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py="1.375rem"
        w="100%"
      >
        {[...Array(totalSteps)].map((_val, index) => (
          <StepButton
            key={`${index.toString()}`}
            isHidden={!!hiddenSteps?.includes(index)}
            isActive={index === activeStepIndex}
            wasActive={index <= maxStepIndex}
            goToStep={goToStep}
            isStepperDisabled={isStepperDisabled}
            index={index}
          />
        ))}

        <x.div w="100%" backgroundColor="grayscale.gray4" h="1px" position="absolute" />

        <x.div
          w="100%"
          maxW={`min(${activeLineWidth}, calc(100% - (${BUTTON_SIZE} / 2)))`}
          transition="max-width 300ms ease-in-out"
          backgroundColor="primary.greenDirect50"
          h="1px"
          position="absolute"
          zIndex="1"
        />
      </x.div>
    </x.div>
  );
};

export default Stepper;
