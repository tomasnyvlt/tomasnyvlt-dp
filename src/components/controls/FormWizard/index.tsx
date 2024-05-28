import Wizard, { WizardProps } from '@data-driven-forms/common/wizard';
import { FormSpy } from '@data-driven-forms/react-form-renderer';
import { default as WizardContext } from '@data-driven-forms/react-form-renderer/wizard-context';
import { x } from '@xstyled/emotion';
import { Container } from 'anolis-ui';
import { FC, useContext } from 'react';

import Cart from '@src/components/contents/Cart';
import Header from '@src/components/contents/Header';
import RequiredInfo from '@src/components/contents/RequiredInfo';
import ValidationInfo from '@src/components/contents/ValidationInfo';
import { useFormWizard } from '@src/components/controls/FormWizard/hooks/useFormWizard';
import NavigationButtons from '@src/components/controls/NavigationButtons';
import OnBlurListener from '@src/components/controls/OnBlurListener';
// import Chat from "@src/components/ui/Chat";
//import { GlobalEmbedSjednavacChatStyle } from "@src/components/ui/Chat/styles/GlobalEmbedChatStyle";
// import config from '@src/config';

const STICKY_CONTAINER_BOTTOM_POSITION = '5rem';

interface FormWizardProps {
  name?: string;
}

const FormWizard: FC<FormWizardProps> = ({ name }) => {
  const { formOptions, currentStep, activeStepIndex } =
    useContext(WizardContext);
  const {
    someStickyElementsVisible,
    hasStepRequiredFields,
    cart,
    hideBottomElements,
    requiredInfo,
    chat,
    onBlurActive,
    customComponents,
  } = useFormWizard({
    name,
  });

  return (
    <>
      <Container
        mb={someStickyElementsVisible ? STICKY_CONTAINER_BOTTOM_POSITION : 0}
      >
        <Header />

        <x.div
          mx="auto"
          mb={!hasStepRequiredFields && someStickyElementsVisible ? '4rem' : 0}
          maxW={currentStep?.maxWidth || '100%'}
        >
          {formOptions.renderForm(currentStep.fields)}

          {cart?.activeOnSteps?.length && (
            <Cart
              isContentVisible={
                someStickyElementsVisible &&
                cart.activeOnSteps.includes(activeStepIndex)
              }
            />
          )}

          {hasStepRequiredFields &&
            !hideBottomElements &&
            !requiredInfo?.hiddenOnSteps?.includes?.(activeStepIndex) && (
              <RequiredInfo />
            )}

          <ValidationInfo />

          <NavigationButtons />
        </x.div>
      </Container>

      {/* Do not unmount this component to avoid losing state inside children */}
      <x.div
        display={
          someStickyElementsVisible &&
          chat?.activeOnSteps.includes(activeStepIndex)
            ? 'flex'
            : 'none'
        }
        flexDirection="row"
        position="sticky"
        px="1rem"
        bottom={STICKY_CONTAINER_BOTTOM_POSITION}
        zIndex="1000"
      >
        {/* TODO: FIX this
            <PoraditSe isContentVisible={stickyElementsVisible} />
          */}
        <>
          {/*
          <GlobalEmbedSjednavacChatStyle />
          <x.div display={{ _: "none", sm: "block" }}>
            <Chat
              scriptSrc={
                config.env === "test"
                  ? "https://direct-test.servicedesk.net/Chat/ChatWidgetLoader/4e0cdbf3-17fa-4f26-9807-91ed848b4e1b"
                  : "https://direct.servicedesk.net/Chat/ChatWidgetLoader/5fc86280-b2d2-4bc3-a4df-17be91c3f2d1"
              }
            />
          </x.div>
          */}
        </>
      </x.div>

      {onBlurActive && <OnBlurListener />}

      {/*
        Custom components sourced from the schema.
        - Rendered within the wizard, allowing access to the wizard's context.
        - Handy for components requiring some additional functionality but returning null.
      */}
      {customComponents?.map(({ Component, key, props = {} }) => (
        <Component key={key} {...props} />
      ))}
    </>
  );
};

const WrappedFormWizard = (props: WizardProps) => (
  <FormSpy subscription={{ values: true }}>
    {() => <Wizard Wizard={FormWizard} {...props} />}
  </FormSpy>
);

export default WrappedFormWizard;
