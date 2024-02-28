import { x } from "@xstyled/emotion";
import { FC } from "react";

import Button from "@src/components/controls/NavigationButtons/components/Button";
import { useNavigationButtons } from "@src/components/controls/NavigationButtons/hooks/useNavigationButtons";

const NavigationButtons: FC = () => {
  const { nextButton, prevButton, activeOnCurrentStep } = useNavigationButtons();

  if (!activeOnCurrentStep) return null;

  return (
    <x.div
      display="flex"
      justifyContent="center"
      gap="1rem"
      borderTop="1px solid"
      borderColor="grayscale.gray4"
      pt="2rem"
    >
      {[prevButton, nextButton].map(({ variant, handleClick, isVisible, label, isLoading, ref }, index) => {
        if (!isVisible) return null;

        return (
          <Button
            key={`${index.toString()}`}
            v={variant}
            s="sm"
            onClick={handleClick}
            loading={isLoading}
            type="button"
            buttonRef={ref}
          >
            {label}
          </Button>
        );
      })}
    </x.div>
  );
};

export default NavigationButtons;
