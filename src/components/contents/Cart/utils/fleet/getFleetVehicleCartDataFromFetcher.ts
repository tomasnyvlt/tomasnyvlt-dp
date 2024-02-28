import { nonBreakingSpace } from "@src/components/contents/Cart/constants";
import { CartDataType, GetCartDataProps } from "@src/components/contents/Cart/types";
import getCartItems from "@src/components/contents/Cart/utils/fleet/getCartItems";
import getDiscount from "@src/components/contents/Cart/utils/vehicle/getDiscount";

const getFleetVehicleCartDataFromFetcher = ({
  fetcherData,
  formValues
}: GetCartDataProps<"autosjednavac-zarazeni-do-flotily">): CartDataType => {
  // mtpl = POV, casco = HAV
  const { mtpl, casco, premiumTotalCorrection, ckpBonusCoef, ckpBonusPercent } = fetcherData || {};

  const discountArr = [mtpl, casco].map((item) => getDiscount(item)).filter((discount) => discount) as string[];
  const items = getCartItems({ fetcherData, formValues });

  const cartData: CartDataType = {
    discountArr,
    bonusPercentage: ckpBonusCoef < 1 ? ckpBonusPercent.replace(" ", nonBreakingSpace) : null,
    finalPrice: premiumTotalCorrection ?? 0,
    items
  };

  return cartData;
};

export default getFleetVehicleCartDataFromFetcher;
