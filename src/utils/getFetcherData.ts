import { formStoreInstance } from '@src/store/formStoreInstance';
import { FetcherResponseType, FormFetcherType } from '@src/formTypes';

export const getFetcherData = <T extends FormFetcherType>(
  formType: T
): FetcherResponseType<T> => {
  const formInstance = formStoreInstance.get(formType);

  if (!formInstance) {
    throw new Error(`Form instance for form type "${formType}" not found.`);
  }

  return formInstance.getState().fetcherData;
};
