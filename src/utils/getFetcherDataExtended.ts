import { formStoreInstance } from '@src/store/formStoreInstance';
import { FetcherResponseType, FormFetcherType } from '@src/formTypes';

interface Output<T extends FormFetcherType> {
  data?: FetcherResponseType<T>;
  isFetchLoading?: boolean;
  isFetchLoadingDebounce?: boolean;
}

export const getFetcherDataExtended = <T extends FormFetcherType>(
  formType: T
): Output<T> => {
  const formInstance = formStoreInstance.get(formType);

  if (!formInstance) {
    throw new Error(`Form instance for form type "${formType}" not found.`);
  }

  const { fetcherData, isFetchLoading, isFetchLoadingDebounce } =
    formInstance.getState() || {};

  return {
    data: fetcherData,
    isFetchLoading,
    isFetchLoadingDebounce,
  };
};
