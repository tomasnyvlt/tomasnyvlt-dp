import { FormFetcherType } from '@src/formTypes';
import {
  FormStoreContext,
  FormStoreContextType,
} from '@src/context/FormStoreContext';
import { useContext } from 'react';

export const useFormStoreContext = <
  T extends FormFetcherType = any,
>(): FormStoreContextType<T> => {
  const formStore = useContext<FormStoreContextType<T>>(FormStoreContext);

  if (formStore === undefined) {
    throw new Error('FormStore is used outside of FormStoreContext.Provider');
  }

  return formStore;
};
