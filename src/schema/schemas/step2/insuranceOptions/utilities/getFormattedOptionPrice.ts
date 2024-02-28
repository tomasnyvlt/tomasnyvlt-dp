import getFormattedPrice from '@src/utils/getFormattedPrice';
import {
  AssistanceLimitsResponseType,
  LimitType,
} from '@src/schematypes/AutoSjednavacFetchType';

interface OptionBasicDataType {
  mtpl: LimitType | undefined;
  assistance: AssistanceLimitsResponseType;
}

interface FormattedPriceAttrType extends OptionBasicDataType {
  additionalPrices?: number[];
}

export const getFormattedOptionPrice = ({
  assistance,
  mtpl,
  additionalPrices,
}: FormattedPriceAttrType): string => {
  const basicPrice =
    (mtpl?.premium ?? 0) + (assistance?.premiumNoMalfunction ?? 0);
  const price = !additionalPrices?.length
    ? basicPrice
    : additionalPrices.reduce((acc, curr) => acc + curr, basicPrice);

  return getFormattedPrice({ price, withYear: true })!;
};
