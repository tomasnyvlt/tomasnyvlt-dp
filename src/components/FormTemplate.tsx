import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { FormTemplateRenderProps } from '@data-driven-forms/react-form-renderer/common-types/form-template-render-props';
import { x } from '@xstyled/emotion';
import { AnolisProvider } from 'anolis-ui';
import { FC, FormEvent, ReactNode } from 'react';

import Modal from '@src/components/contents/Modal';
import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { useFormStoreSideEffects } from '@src/hooks/useFormStoreSideEffects';
import { useFormStoreStateSetup } from '@src/hooks/useFormStoreStateSetup';

const FormTemplate: FC<FormTemplateRenderProps> = ({ formFields, schema }) => {
  const useStore = useFormStoreContext();
  const fetcherData = useStore((state) => state.fetcherData);

  const formOptions = useFormApi();
  const { handleSubmit } = formOptions;

  // Store hooks
  useFormStoreStateSetup();
  useFormStoreSideEffects();

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    handleSubmit();
    if (schema?.onSubmit) {
      event.preventDefault();
      schema.onSubmit(formOptions, fetcherData);
    }
  };

  return (
    <>
      <x.div display="flex" alignItems="center" justifyContent="center">
        <x.form onSubmit={handleOnSubmit} noValidate flexGrow="1" maxW="100%">
          <div>{formFields as ReactNode}</div>
        </x.form>
      </x.div>

      <AnolisProvider theme={null}>
        <Modal />
      </AnolisProvider>
    </>
  );
};

export default FormTemplate;
