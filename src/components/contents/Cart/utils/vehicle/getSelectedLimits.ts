import {
  CartItemType,
  CartItemTypeBasic,
  SelectableOptionItem,
  SelectableOptionItemRemovable
} from "@src/components/contents/Cart/types";
import { PremiumPriceType } from '@src/types/TO_DELETE_autosjednavac/AutoSjednavacFetchType';
import { getFormattedPrice } from '@src/utils/getFormattedPrice';

type GetDescriptionProps = Pick<SelectableOptionItem, "description" | "selectedLimit">;

const getFormattedDescription = ({ description, selectedLimit }: GetDescriptionProps): string => {
  if (typeof selectedLimit === "boolean" || (!selectedLimit?.value && !selectedLimit?.label)) return description;

  const { value, label } = selectedLimit || {};

  if (Number.isNaN(Number(value))) {
    return `${description} - limit ${label?.toLowerCase()}`;
  }

  return `${description} - limit ${getFormattedPrice({ price: Number(value) })}`;
};

const getSelectedLimits = (optionsArr: SelectableOptionItem[]): CartItemType[] => {
  const items: CartItemType[] = [];

  optionsArr.forEach((item) => {
    const { price, description, selectedLimit, removable, fieldName, defaultFieldValue, priceShortTerm } =
      item as SelectableOptionItemRemovable;

    if (!(price as PremiumPriceType)?.premium) return;

    const formattedDescription = getFormattedDescription({ description, selectedLimit });

    const basicData: Omit<CartItemTypeBasic, "removable"> = {
      description: formattedDescription,
      price: (price as PremiumPriceType).premium,
      formattedPrice: getFormattedPrice({
        price: (price as PremiumPriceType).premium,
        withYear: !priceShortTerm
      }) as string
    };

    if (!removable) {
      items.push({ ...basicData, removable });
      return;
    }

    items.push({
      ...basicData,
      removable,
      fieldName,
      defaultFieldValue
    });
  });

  return items;
};

export default getSelectedLimits;
