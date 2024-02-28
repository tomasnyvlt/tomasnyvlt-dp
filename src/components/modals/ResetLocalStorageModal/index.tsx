import { x } from '@xstyled/emotion';
import { useModal } from 'anolis-ui';
import { FC, ReactNode } from 'react';

import AutosjednavacContent from '@src/components/modals/ResetLocalStorageModal/content/AutosjednavacContent';
import { FormType } from '@src/types';
import setFormValuesFromDataObject from '@src/utils/setFormValuesFromDataObject';
import DirectButton from '@src/components/other/DirectButton';
import { Basic } from '@src/components/contents/Modal';

interface ResetLocalStorageModalProps {
  localStorageItem: any;
  localStorageKey: string;
  change: (name: string, value?: Record<string, any>) => void;
  formType: FormType;
}

const ResetLocalStorageModal: FC<ResetLocalStorageModalProps> = ({
  change,
  localStorageItem,
  localStorageKey,
  formType,
}) => {
  const [closeModal] = useModal(null);

  const clearLocalStorage = (): void => {
    localStorage.removeItem(localStorageKey);
    window.reload();
    closeModal();
  };

  const setFormValues = (): void => {
    setFormValuesFromDataObject({ change, data: localStorageItem });
    closeModal();
  };

  const getModalContent = (): ReactNode | null => {
    switch (formType) {
      case 'autosjednavac':
        return <AutosjednavacContent data={localStorageItem} />;
      default:
        return null;
    }
  };

  return (
    <Basic headingText="Máte rozpracované sjednání">
      {getModalContent()}

      <x.div
        px="2rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <x.p textAlign="center" mt="3rem">
          Přejete si v rozdělaném sjednání pokračovat nebo chcete začít znovu?{' '}
        </x.p>

        <x.div display="flex" gap={{ _: '1rem', sm: '2rem' }} mt="3rem">
          <DirectButton v="outline" onClick={clearLocalStorage}>
            Začít znovu
          </DirectButton>

          <DirectButton v="gradient" onClick={setFormValues}>
            Pokračovat
          </DirectButton>
        </x.div>
      </x.div>
    </Basic>
  );
};

export default ResetLocalStorageModal;
