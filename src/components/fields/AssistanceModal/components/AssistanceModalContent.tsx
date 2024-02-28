import { Field, useFormApi } from '@data-driven-forms/react-form-renderer';
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import { x } from '@xstyled/emotion';
import { useModal } from 'anolis-ui';
import { FC, useEffect, useRef, useState } from 'react';

import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { FormFieldsType, RadioBoxFieldType } from '@src/types';
import DirectButton from '@src/components/other/DirectButton';
import config from '@src/config';
import scroll from '@src/utils/scroll';
import { Basic } from '@src/components/contents/Modal';

interface AssistanceModalContentProps {
  closeModal: () => void;
  radioBoxFieldComponent: RadioBoxFieldType;
  otherFields?: FormFieldsType[];
}

const AssistanceModalContent: FC<AssistanceModalContentProps> = ({
  closeModal,
  radioBoxFieldComponent,
  otherFields,
}) => {
  const { renderForm } = useFormApi();
  const [openInfoModal] = useModal(Basic);
  const sendDataToGTM = useGTMDispatch();
  const useStore = useFormStoreContext();
  const { pageMainCategory } = useStore((state) => state.dataLayer) || {};

  const closeBtnContainerRef = useRef<HTMLDivElement | null>(null);

  const [closeBtnContainerHeight, setCloseBtnContainerHeight] =
    useState<number>(52);

  const onCloseBtnClick = (): void => {
    // Move close modal function to the end of the event loop
    // to prevent clicking under the modal elements on mobile
    window.setTimeout(() => {
      closeModal();
    }, 0);
  };

  useEffect(() => {
    const closeBtnContainerEl = closeBtnContainerRef?.current;

    if (!closeBtnContainerEl) return;

    setCloseBtnContainerHeight(closeBtnContainerEl.offsetHeight);
  }, [closeBtnContainerRef]);

  useEffect(() => {
    scroll.lock();

    return () => {
      scroll.unlock();
    };
  }, []);

  return (
    <x.div
      boxShadow={{ _: '0', lg: 'cardCheckbox' }}
      borderRadius={{ _: '0', lg: '2.25rem' }}
      px="0"
      h={{ _: '100%', lg: 'fit-content' }}
      display="flex"
      flexDirection="column"
      bg="primary.white"
      position="relative"
      w="100%"
      margin="0 auto"
    >
      <x.div
        ref={closeBtnContainerRef}
        position="sticky"
        display="flex"
        top="1.5rem"
        ml="auto"
        mr="1.5rem"
        zIndex={2}
      >
        <DirectButton
          type="button"
          onClick={onCloseBtnClick}
          v="gradient"
          s="sm"
          minH="2.625rem"
          w="fit-content"
        >
          Hotovo
        </DirectButton>
      </x.div>

      <x.div h="100%" overflow="auto" mt={`-${closeBtnContainerHeight}px`}>
        <x.div
          pt={{
            _: '2.5rem',
            sm: '1.375rem',
          }}
          px="1.5rem"
        >
          <x.p
            fontWeight={600}
            lineHeight="1.375rem"
            fontSize="1.125rem"
            color="primary.black"
            maxW={{
              _: '50%',
              sm: '80%',
            }}
          >
            Asistence
          </x.p>

          <x.p
            pt="1.75rem"
            fontSize="0.875rem"
            lineHeight="1.125rem"
            color="grayscale.gray1"
          >
            Příjezd a práce mechanika, odtah a vyproštění. Pomůžeme při nehodě a
            drobných závadách.
          </x.p>

          <x.button
            mt="0.5rem"
            type="button"
            mb="1.5rem"
            p="0"
            h="fit-content"
            fontSize="0.625rem"
            lineHeight="0.875rem"
            textDecoration="underline"
            color="inherit"
            background={{ _: 'none', hover: 'none', focus: 'none' }}
            border={{ _: 'none', hover: 'none', focus: 'none' }}
            outline={{
              '&:focus': 'none',
              '&:focus-visible': '2px solid',
            }}
            outlineColor={{ '&:focus-visible': 'primary.greenDirect' }}
            outlineOffset={0}
            onClick={() => {
              sendDataToGTM({
                event: `${pageMainCategory ?? ''}_sjednavac_auto_asistence`,
              });
              // TIR_V1 nebo TIR_V2 má jiný modál než ostatní
              openInfoModal({
                headingText: 'Co všechno je součástí naší asistence?',
                content: (
                  <x.div w="100%" px={{ sm: '2rem' }}>
                    {radioBoxFieldComponent.options.filter(
                      (option) =>
                        option.value === 'TIR_V1' || option.value === 'TIR_V2'
                    )?.length > 0 ? (
                      <x.img
                        src={`${config.domain}/static/img/asistenceNapovedaNad3_5t.webp`}
                        width={613}
                        height={669}
                        // layout="fixed"
                        alt="Asistence vozidla nad 3,5t"
                      />
                    ) : (
                      <x.img
                        src={`${config.domain}/static/img/asistenceNapoveda.png`}
                        width={613}
                        height={882}
                        // layout="fixed"
                        alt="Asistence vozidla"
                      />
                    )}
                  </x.div>
                ),
              });
            }}
          >
            Všechny asistence
          </x.button>
        </x.div>
        <x.div
          display="flex"
          flexDirection="column"
          maxH="100%"
          overflow="hidden"
          px="1.5rem"
        >
          <x.p
            fontWeight={600}
            pt="1.5rem"
            lineHeight="1.375rem"
            fontSize="1.125rem"
            color="primary.black"
            pb={{ _: '2.25rem', sm: '0' }}
            borderTop="1px solid"
            borderTopColor="grayscale.gray4"
          >
            Vyberte si variantu
          </x.p>

          <x.div
            py={{ _: '2.25rem', sm: '0.75rem', lg: '2.25rem' }}
            maxWidth={{ sm: '49.375rem', lg: 'initial' }}
          >
            {renderForm([
              radioBoxFieldComponent,
              ...((otherFields || []) as Field[]),
            ])}
          </x.div>
        </x.div>
      </x.div>
    </x.div>
  );
};

export default AssistanceModalContent;
