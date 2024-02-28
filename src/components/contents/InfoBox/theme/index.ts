export interface Variant {
  info: string;
  gradient: string;
  clear: string;
  infoNoBorder: string;
  error: string;
  notice: string;
  success: string;
}

export const backgrounds: Variant = {
  info: "#F5E8FF",
  gradient: "linear-gradient(77.45deg, #5A53E1 0%, #CC7EFF 69.65%, #C098F2 100%)",
  clear: "transparent",
  infoNoBorder: "#F5E8FF",
  error: "#FEECEC",
  notice: "#f5e8ff",
  success: "linear-gradient(90deg, #B3F2AE 0%, #CFFECB 100%)"
};

export const sizes: Variant = {
  info: "0.625rem",
  gradient: "0.625rem",
  clear: "0.625rem",
  infoNoBorder: "0.625rem",
  error: "0.875rem",
  notice: "0.625rem",
  success: "0.625rem"
};

export const lineHeights: Variant = {
  info: "0.875rem",
  gradient: "0.875rem",
  clear: "0.875rem",
  infoNoBorder: "0.875rem",
  error: "1.375rem",
  notice: "0.875rem",
  success: "0.875rem"
};

export const colors: Variant = {
  info: "tercial.indigo1Alpha50",
  gradient: "primary.white",
  clear: "tercial.indigo1Alpha50",
  infoNoBorder: "tercial.indigo1Alpha50",
  error: "tercial.red1",
  notice: "tercial.indigo2",
  success: "tercial.green3"
};

export const fill: Variant = {
  info: "tercial.indigo1",
  gradient: "primary.white",
  clear: "tercial.indigo1",
  infoNoBorder: "tercial.indigo1",
  error: "tercial.red1",
  notice: "tercial.indigo2",
  success: "tercial.green3"
};

export const borders: Variant = {
  info: "tercial.indigo1Alpha50",
  gradient: "primary.white",
  clear: "tercial.indigo1Alpha50",
  infoNoBorder: "transparent",
  error: "primary.white",
  notice: "tercial.indigo1Alpha50",
  success: "tercial.green3"
};
