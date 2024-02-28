const VEHICLE = {
  SECURITY_LEVEL: "vehicle.securityLevel",
  WITH_SECURITY: "vehicle.withSecurity"
} as const;

const ADDITIONALS = {
  PREMIUM_WARRANTY: "additionals.premiumWarranty"
} as const;

const DISCOUNT = {
  // Do not use mtpl.XY and casco.XY prefixes to prevent
  // shadow copying on radio/netflix change
  MTPL_NAME: "mtplSalesDiscount",
  CASCO_NAME: "cascoSalesDiscount",
  MTPL_MAX: "settings.mtplDiscountMax",
  CASCO_MAX: "settings.cascoDiscountMax"
} as const;

export const SUITABILITY_RECORD_FIELD_NAME_PREFIX = "suitabilityRecord";

export const FIELD_NAMES = {
  FREQUENCY_CODE: "frequencyCode",
  LENGTH_INSURANCE: "lengthInsurance",
  BEGIN_DATE: "beginDate",
  END_DATE: "endDate",
  VEHICLE,
  ADDITIONALS,
  DISCOUNT
} as const;
