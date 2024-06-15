import { FetcherResponseType, FormFetcherType } from '@src/formTypes';
import { OptionType } from '@src/types';
import {
  PremiumPriceType,
  PriceType,
} from '@src/types/TO_DELETE_autosjednavac/AutoSjednavacFetchType';

export interface CartItemTypeBasic {
  description: string;
  price: number;
  formattedPrice?: string;
  info?: string;
  removable: false;
}

type DefaultFieldValueType = string | boolean | Record<string, unknown> | null;

export interface CartItemTypeRemovable
  extends Omit<CartItemTypeBasic, 'removable'> {
  removable: true;
  fieldName: string;
  defaultFieldValue: DefaultFieldValueType; // Default field value used for change
}

export type CartItemType = CartItemTypeBasic | CartItemTypeRemovable;

export interface ChangeProps {
  fieldName: string;
  value: DefaultFieldValueType;
}

export interface SelectableOptionItemBasic {
  price: PriceType | PremiumPriceType;
  priceShortTerm?: boolean;
  selectedLimit?: boolean | OptionType;
  description: string;
  removable: false;
}

export interface SelectableOptionItemRemovable
  extends Omit<SelectableOptionItemBasic, 'removable'> {
  fieldName: string;
  defaultFieldValue: DefaultFieldValueType;
  removable: true;
}

export type SelectableOptionItem =
  | SelectableOptionItemBasic
  | SelectableOptionItemRemovable;

export interface CartDataType {
  finalPrice: number;
  discountArr: string[];
  bonusPercentage?: string | null;
  items: CartItemType[];
}

export interface GetCartDataProps<T extends FormFetcherType> {
  fetcherData: FetcherResponseType<T>;
  formValues: Record<string, any>;
}
