import { CartDataType } from '@src/components/contents/Cart/types';
import getVehicleCartDataFromFetcher from '@src/components/contents/Cart/utils/vehicle/getVehicleCartDataFromFetcher';
import { FormType } from '@src/types';
import { FetcherResponseType, FormFetcherType } from '@src/formTypes';

interface Props<T extends FormFetcherType> {
  fetcherData: FetcherResponseType<T>;
  formType: FormType;
  formValues: Record<string, any>;
}

export const getCartDataFromFetcher = <T extends FormFetcherType>({
  fetcherData,
  formType,
  formValues,
}: Props<T>): CartDataType => {
  switch (formType) {
    case 'autosjednavac': {
      return getVehicleCartDataFromFetcher({
        fetcherData: fetcherData as FetcherResponseType<'autosjednavac'>,
        formValues,
      });
    }
    default: {
      return { finalPrice: 0, discountArr: [], items: [] };
    }
  }
};
