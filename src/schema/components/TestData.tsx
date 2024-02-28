import { useFormApi } from '@data-driven-forms/react-form-renderer';
import WizardContext from '@data-driven-forms/react-form-renderer/wizard-context';
import { FC, useCallback, useContext } from 'react';

import DirectButton from '@src/components/other/DirectButton';
import config from '@src/config';

/**
 * This component is used only in non-production environment
 *
 * It fills fake data to form on first step
 */
const TestData: FC = () => {
  const { activeStepIndex } = useContext(WizardContext);
  const { change } = useFormApi();

  // Fake data - Accessible only in non-production environment
  const fillFakeData = useCallback(() => {
    change('partner.legalFormCode', {
      label: 'Fyzická osoba',
      value: 'PERSON',
    });
    change('partner.phone', '+420739968866');
    change('partner.permanentAddress.zip', '13000');
    change('partner.firstName', 'Tonda');
    change('partner.lastName', 'Vomáčka');
    change('partner.personalIn', '9909244092');
    change('partner.namePrefix', 'Král kodérů');
    change('partner.email', 'tomaskyvl@direct.cz');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (activeStepIndex !== 0 || config?.env === 'prod') return null;

  return (
    <DirectButton
      s="xs"
      v="gradient"
      position="absolute"
      onClick={fillFakeData}
    >
      Testovací data
    </DirectButton>
  );
};

export default TestData;
