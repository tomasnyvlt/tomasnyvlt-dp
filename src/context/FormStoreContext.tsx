import { FormFetcherType } from '@src/formTypes';
import { createFormStore } from '@src/store/createFormStore';
import { FormStoreReturnType } from '@src/store/types';
import { SchemaType } from '@src/types';
import { FC, PropsWithChildren, createContext } from 'react';

interface FormStoreContextProps {
  schema: SchemaType;
}

export type FormStoreContextType<T extends FormFetcherType = any> =
  FormStoreReturnType<T>;

export const FormStoreContext = createContext<FormStoreContextType>(
  undefined as any
);

const FormStoreContextProvider: FC<
  PropsWithChildren<FormStoreContextProps>
> = ({ schema, children }) => {
  // Create a new store for each Provider
  const useFormStore = createFormStore({ schema });

  return (
    <FormStoreContext.Provider value={useFormStore}>
      {children}
    </FormStoreContext.Provider>
  );
};

export default FormStoreContextProvider;
