import { x } from "@xstyled/emotion";
import { FC } from "react";

import { BUTTON_SIZE } from "@src/components/controls/Stepper/constants";
import getStepColors from "@src/components/controls/Stepper/utils/getStepColors";

interface StepButtonProps {
  index: number;
  isHidden: boolean;
  isActive: boolean;
  wasActive: boolean;
  goToStep: (index: number) => void;
  isStepperDisabled: boolean;
}

const StepButton: FC<StepButtonProps> = ({ index, isHidden, isActive, wasActive, goToStep, isStepperDisabled }) => {
  const color = getStepColors({ isActive, wasActive });
  const isDisabled = isActive || !wasActive || isStepperDisabled;

  if (isHidden) return null;

  return (
    <x.button
      aria-label={`Přejít na krok ${index + 1}`}
      disabled={isDisabled}
      cursor={isDisabled ? "auto" : "pointer"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexShrink="0"
      color={color.text}
      bg={color.bg}
      borderRadius="100%"
      border="1px solid"
      borderColor={color.border}
      fontSize="0.875rem"
      fontWeight={600}
      w={BUTTON_SIZE}
      h={BUTTON_SIZE}
      outlineWidth={{
        "&:focus": "0",
        "&:focus-visible": "2px"
      }}
      zIndex="2"
      type="button"
      onClick={() => goToStep(index)}
    >
      {index + 1}
    </x.button>
  );
};

export default StepButton;
