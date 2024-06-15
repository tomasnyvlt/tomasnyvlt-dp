import { FormStoreReturnType } from '@src/store/types';
import { FormFetcherType } from '@src/formTypes';

const formStoreInstaceMap = new Map<string, FormStoreReturnType>();

const set = <T extends FormFetcherType>(
  key: T,
  value: FormStoreReturnType<T>
): void => {
  if (formStoreInstaceMap.has(key)) {
    throw new Error(`Form instance for form type "${key}" already exists.`);
  }

  formStoreInstaceMap.set(key, value);
};

const get = <T extends FormFetcherType>(
  key: T
): FormStoreReturnType<T> | undefined => {
  const formInstance = formStoreInstaceMap.get(key);

  return formInstance;
};

export const formStoreInstance = { set, get } as const;
