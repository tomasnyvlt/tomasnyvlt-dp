import { default as WizardContext } from '@data-driven-forms/react-form-renderer/wizard-context';
import { FC, useContext } from 'react';

import Heading from '@src/components/contents/Heading';
import Stepper from '@src/components/controls/Stepper';
import { useFormStoreContext } from '@src/hooks/useFormStoreContext';

const Header: FC = () => {
  const { currentStep } = useContext(WizardContext);

  const useStore = useFormStoreContext();
  const getTotalSteps = useStore((state) => state.getTotalSteps);

  return (
    <>
      <Heading
        component="heading"
        name={currentStep.name}
        initialValue={currentStep.title}
      />

      {getTotalSteps() > 1 && <Stepper />}
    </>
  );
};

export default Header;
