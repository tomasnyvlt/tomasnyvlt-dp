import { nonBreakingSpace } from "@src/components/contents/Cart/constants";
import {
  CascoResponseType,
  MtplResponseType
} from "components/contents/forms/AutosjednavacForm/types/AutoSjednavacFetchType";

const getDiscount = (data: MtplResponseType | CascoResponseType): string | null => {
  if (data?.selected && data?.premiumTotal > 0 && data?.defaultSalesDiscount > 0) {
    return `${Math.round(data.defaultSalesDiscount * 100)}${nonBreakingSpace}%`;
  }

  return null;
};

export default getDiscount;
