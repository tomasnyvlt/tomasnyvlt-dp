import { CartDataType } from "@src/components/contents/Cart/types";

type Props = Pick<CartDataType, "discountArr" | "bonusPercentage">;

const START_INFO_TEXT = "Cena včetně";

const getDiscountInfoText = ({ discountArr, bonusPercentage }: Props): string | null => {
  if (!discountArr?.length && !bonusPercentage) return null;

  if (!discountArr?.length) {
    return `${START_INFO_TEXT} bonusu ${bonusPercentage}`;
  }

  if (!bonusPercentage) {
    return `${START_INFO_TEXT} slevy ${discountArr.join(" a ")}`;
  }

  return `${START_INFO_TEXT} slevy ${discountArr.join(" a ")} a bonusu ${bonusPercentage}`;
};

export default getDiscountInfoText;
