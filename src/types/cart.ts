import { CheckboxFieldType } from "@src/types";

/**
 * Cart types
 */

type CartFieldType = CheckboxFieldType;

type CartFieldsWithDescriptionType = CartFieldType & {
  description: string;
  priceFetcherDataAttr?: never;
};

type CartFieldsWithDataAttr = CartFieldType & {
  description?: never;
  priceFetcherDataAttr: string;
};

export type CartFieldsType = CartFieldsWithDescriptionType | CartFieldsWithDataAttr;
