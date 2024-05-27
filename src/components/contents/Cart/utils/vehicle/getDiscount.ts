import { nonBreakingSpace } from "@src/components/contents/Cart/constants";
import {
  CascoResponseType,
  MtplResponseType,
} from '@src/types/TO_DELETE_autosjednavac/AutoSjednavacFetchType';

const getDiscount = (data: MtplResponseType | CascoResponseType): string | null => {
  if (data?.selected && data?.premiumTotal > 0 && data?.defaultSalesDiscount > 0) {
    return `${Math.round(data.defaultSalesDiscount * 100)}${nonBreakingSpace}%`;
  }

  return null;
};

export default getDiscount;
