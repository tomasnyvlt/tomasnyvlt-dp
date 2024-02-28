import { BasicComponentType } from "@src/types/basic";
import { DesignComponentType } from "@src/types/designComponents";
import { FormFieldsType, OptionType } from "@src/types/formFields";
import { FetchComponentType } from "@src/types/fetchComponents";
import { FC, MouseEvent } from "react";
import { TippyProps } from "@tippyjs/react";

/**
 * Layout types
 */
export interface HeadingType extends BasicComponentType {
  component: "heading";
  initialValue?: string;
}

export interface CardPersonItemType {
  label: string;
  value: string;
}

export interface TextType extends BasicComponentType {
  component: "text";
  tooltip?: string;
  tooltipPosition?: TippyProps["placement"];
  initialValue?: string;
  richText?: boolean;
}

export interface IconType extends BasicComponentType {
  component: "icon";
  icon: FC;
}

interface SmartformAddressType {
  city: string;
  zip: string;
  houseNumber: string;
  street: string;
  countryCode: string;
}

export interface ExtendedSmartformAddressType extends SmartformAddressType {
  addressWhole: string;
}

export interface CardPersonPersonType {
  legalFormCode: OptionType;
  phone?: string;
  email?: string;
  permanentAddress?: SmartformAddressType;
  contactAddress?: SmartformAddressType;
  firstName: string;
  lastName: string;
  namePrefix?: string;
  personalIn?: string;
  channelType?: string;
  sameAddress?: boolean;
  companyName?: string;
  companyIn?: string;
  birthDate?: string;
}

interface CardPersonBasicType extends BasicComponentType {
  component: "card-person";
  person?: CardPersonPersonType;
  tags?: string[];
  description?: string;
}

interface CardPersonSingleColumnType extends CardPersonBasicType {
  items?: CardPersonItemType[];
  twoColumnsLayout?: false;
}

interface CardPersonDoubleColumnType extends CardPersonBasicType {
  items?: CardPersonItemType[][];
  twoColumnsLayout: true;
}

export type CardPersonType = CardPersonSingleColumnType | CardPersonDoubleColumnType;

export interface NumberedStepsType extends BasicComponentType {
  component: "numbered-steps";
  steps: Array<string>;
}

export interface LinkWithIconType extends BasicComponentType {
  as: "button" | "a";
  component: "link-with-icon";
  initialValue?: string;
  withIcon?: boolean;
  href?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

export interface BoxType extends BasicComponentType {
  component: "box";
  fields?: Array<DesignComponentType | FormFieldsType | LayoutFieldsType>;
}

export interface GridType extends BasicComponentType {
  component: "grid";
  fields: Array<DesignComponentType | FormFieldsType | LayoutFieldsType>;
  bottomFields?: Array<DesignComponentType | FormFieldsType | LayoutFieldsType>;
}

export interface PaymentOverviewType extends BasicComponentType {
  component: "payment-overview";
}

// Section wrapper
export interface SectionType extends BasicComponentType {
  component: "section";
  variant?: "withBorder" | "withBorderMobile";
  fields: Array<LayoutFieldsType | DesignComponentType | FormFieldsType | SectionType | FetchComponentType>;
}

export type LayoutFieldsType =
  | GridType
  | HeadingType
  | TextType
  | IconType
  | BoxType
  | LinkWithIconType
  | CardPersonType
  | NumberedStepsType
  | PaymentOverviewType;
