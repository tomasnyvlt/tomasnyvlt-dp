import { CartDataType } from "@src/components/contents/Cart/types";
import getFleetVehicleCartDataFromFetcher from "@src/components/contents/Cart/utils/fleet/getFleetVehicleCartDataFromFetcher";
import getVehicleCartDataFromFetcher from "@src/components/contents/Cart/utils/vehicle/getVehicleCartDataFromFetcher";
import { FormType } from "@src/types";
import { FetcherResponseType, FormFetcherType } from "@src/types/fetcher";

interface Props<T extends FormFetcherType> {
  fetcherData: FetcherResponseType<T>;
  formType: FormType;
  formValues: Record<string, any>;
}

const getCartDataFromFetcher = <T extends FormFetcherType>({
  fetcherData,
  formType,
  formValues
}: Props<T>): CartDataType => {
  switch (formType) {
    case "autosjednavac": {
      return getVehicleCartDataFromFetcher({
        fetcherData: fetcherData as FetcherResponseType<"autosjednavac">,
        formValues
      });
    }
    case "autosjednavac-zarazeni-do-flotily": {
      return getFleetVehicleCartDataFromFetcher({
        fetcherData: fetcherData as FetcherResponseType<"autosjednavac-zarazeni-do-flotily">,
        formValues
      });
    }
    default: {
      return { finalPrice: 0, discountArr: [], items: [] };
    }
  }
};

export default getCartDataFromFetcher;
