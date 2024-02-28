import { CheckboxFieldType } from "@src/types";

type Variants = Record<NonNullable<CheckboxFieldType["variant"]>, string>;

export const colors: Variants = {
  md: "grayscale.grayWarm",
  sm: "primary.black",
  cart: "primary.black"
};

export const fontWeights: Variants = {
  md: "400",
  sm: "500",
  cart: "500"
};

export const fontSizes: Variants = {
  md: "0.875rem",
  sm: "0.75rem",
  cart: "0.875rem"
};

export const lineHeights: Variants = {
  md: "1.125rem",
  sm: "1rem",
  cart: "1.125rem"
};

export const accentColors = {
  green: { checked: "primary.greenDirect", default: "primary.greenDirect10" },
  white: { checked: "primary.white", default: "primary.white" }
};

export const borderColors = {
  green: "primary.greenDirect",
  white: "primary.white",
  indigo2: "tercial.indigo2"
};
