import { default as WizardContext } from '@data-driven-forms/react-form-renderer/wizard-context';
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import { x } from '@xstyled/emotion';
import { FC, useContext, useEffect, useId, useRef, useState } from 'react';

import CartContent from '@src/components/contents/Cart/components/CartContent';
import CartMainButton from '@src/components/contents/Cart/components/CartMainButton';
import MeetingRecordButton from '@src/components/contents/Cart/components/MeetingRecordButton';
import OwnTemplateCheckbox from '@src/components/contents/Cart/components/OwnTemplateCheckbox';
import { useCart } from '@src/components/contents/Cart/hooks/useCart';
import { useFormStoreContext } from '@src/hooks/useFormStoreContext';

interface CartProps {
  isContentVisible: boolean;
}

const Cart: FC<CartProps> = ({ isContentVisible }) => {
  const useStore = useFormStoreContext();
  const { isInternalUser, isAgent, dataLayer } = useStore((state) => ({
    isInternalUser: state.isInternalUser,
    isAgent: state.isAgent,
    dataLayer: state.dataLayer,
  }));
  const { isOpen, setIsOpen, hasVisibleCartFields, cartData, deleteItem } =
    useCart();
  const sendDataToGTM = useGTMDispatch();
  const { currentStep } = useContext(WizardContext);
  const { finalPrice, itemsCount } = cartData;

  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [mainButtonHeight, setMainButtonHeight] = useState(0);

  const ariaId = useId();
  const mainButtonId = `cart-button-${ariaId}`;
  const contentId = `cart-content-${ariaId}`;

  useEffect(() => {
    const buttonContainerEl = buttonContainerRef.current;

    if (!buttonContainerEl) return undefined;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setMainButtonHeight(entry.contentRect.height);
      });
    });

    setMainButtonHeight(buttonContainerEl.getBoundingClientRect().height);
    resizeObserver.observe(buttonContainerEl);

    return () => {
      resizeObserver.unobserve(buttonContainerEl);
    };
  }, [buttonContainerRef, isContentVisible]);

  useEffect(() => {
    if (!buttonContainerRef.current) return;

    sendDataToGTM({
      event: `${dataLayer?.pageMainCategory ?? ''}_sjednavac_kosik`,
      step: `${currentStep.name} - ${currentStep.title}`,
      action: isOpen ? 'Otevření' : 'Zavření',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isContentVisible) return null;

  return (
    <x.div
      position="sticky"
      bottom={{ _: '1.625rem', sm: '1.875rem' }}
      my="2rem"
      mx="auto"
      maxW={isInternalUser || isAgent ? '42.5rem' : '30.1875rem'}
      bg="transparent"
      zIndex={1001}
    >
      {/* Height placeholder */}
      <x.div visibility="hidden" h={mainButtonHeight} />

      <x.div position="absolute" bottom="0" w="100%">
        {/* TODO: Unused code, remove or refactor
        <x.div mb={isAgentOpen ? "1.25rem" : 0}>
          <AgentHelp isOpen={isAgentOpen} setOpenAgentHelp={setIsAgentOpen} />
        </x.div>
        */}

        <x.div
          maxH={{
            _: '75vh',
            sm: '85vh',
          }}
          boxShadow="cardCheckbox"
          display="flex"
          flexDirection="column"
          backgroundColor="transparent"
          borderRadius="4.5rem"
        >
          <x.div
            h="100%"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            position="relative"
          >
            <x.div
              ref={buttonContainerRef}
              position="relative"
              display="flex"
              alignItems="center"
              borderRadius="4.5rem"
              background="linear-gradient(77.45deg, #5A53E1 0%, #CC7EFF 69.65%, #C098F2 100%)"
            >
              <CartMainButton
                finalPrice={finalPrice}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                itemsCount={itemsCount}
                buttonId={mainButtonId}
                contentId={contentId}
              />

              {/* Hide
                <AgentButton isCartOpen={isOpen} />
              */}

              <OwnTemplateCheckbox />
              <MeetingRecordButton isCartOpen={isOpen} />
            </x.div>

            <CartContent
              isOpen={isOpen}
              buttonId={mainButtonId}
              contentId={contentId}
              deleteItem={deleteItem}
              hasVisibleCartFields={hasVisibleCartFields}
              mainButtonHeight={mainButtonHeight}
              {...cartData}
            />
          </x.div>
        </x.div>
      </x.div>
    </x.div>
  );
};

export default Cart;
