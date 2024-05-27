
// source: https://directpojistovnaas-my.sharepoint.com/:x:/g/personal/michal_fasina_direct_cz/EYjWtk2rS1xIkNXpx0UMjHsBYbNiEm94NLMDb7NiqXnSaA

import { Address, PartnerInfoType } from "./PartnerInfoType";
import { VariantCode, VehicleInfoType } from "./VehicleInfoType";

/**
 * Request type
 */
export interface AsssistanceRequestType {
  malfunctionAssistance: boolean;
  variantCode: string;
  carReplacementDays: string;
}

export interface AutoSjednavacFetchRequestType {
  beginDate: string;
  endDate: string; // pokud null tak je na dobu neurčitou
  getLimits: boolean; // při true vrací cenu každého limitu
  getApplicableLimitsOnly: boolean; // při tru vrací balíčky jen pro daného uživatele
  getPackages: boolean; // vrací balíčky pro hav
  getFeConfig?: boolean;
  frequencyCode: keyof typeof frequency;
  installmentValue?: number;
  agreementPlace?: string;
  vehicle: Partial<VehicleInfoType>;
  partner: Partial<PartnerInfoType>;
  occupant?: Partial<PartnerInfoType>;
  mtpl: {
    salesDiscount?: number;
    basicLimit?: string;
    selected: boolean;
  };
  assistance: AsssistanceRequestType;
  additionals: {
    glassLimit: string;
    directClaimManagement: boolean;
    injuryDriverLimit: string;
    injuryLimit: string;
    parents: boolean;
    baggageLimit: string;
    premiumWarranty: boolean;
  };
  casco: {
    selected: boolean;
    salesDiscount?: number;
    animalLimit?: string;
    carAccidentLimit?: string;
    foreignTerritories?: boolean;
    gap?: boolean;
    naturalLimit?: string;
    participation?: string;
    theftLimit?: string;
    carCheck?: {
      type?: string;
      agencyId?: string;
      firstName?: string;
      lastName?: string;
      possibleNow?: boolean;
      email?: string;
      phone?: string;
      address?: Partial<Address> | null;
    };
  };
  insured?: Partial<PartnerInfoType>;
  marketingAgreement?: boolean;
  termsAgreement?: boolean;
  termsAgreement2?: boolean;
  policyValidation?: boolean;
  temp: {
    isInternalUser: boolean;
    isAgent: boolean;
  };
  suitabilityRecord?: {
    post: boolean;
    insurers: string[];
    ownTemplate: boolean;
    recommendation: string;
    difference: string;
    request: string;
  };
  dontHaveSpz?: boolean;
}

const enum frequency {
  SINGLE = "SINGLE",
  ANNUALY = "ANNUALY",
  SEMIANNUALY = "SEMIANNUALY",
  QUARTERLY = "QUARTERLY"
}

export interface LimitType {
  premium: number;
  description: string;
  value: string;
}

export interface LimitWithCascoType extends LimitType {
  premiumBasic: number;
  premiumFullCasco: number;
}
/**
 * Response type
 */
// Format: YYYY-MM-DD
type TimeStamp = string;
export interface PriceType {
  price: number;
}
export interface PremiumPriceType {
  premium: number;
  basePremium: number;
  price: number;
}
export interface MtplResponseType {
  basePremiumTotal: number;
  premiumTotal: number;
  premium: number;
  basePremium: number;
  defaultSalesDiscount: number;
  // If getLimits = true
  basicLimits?: LimitType[];
  selected: boolean;
}
export interface AdditionalsResponseType {
  basePremiumTotal: number;
  premiumTotal: number;
  baggage: PremiumPriceType;
  glass: PriceType;
  glassLimits: LimitWithCascoType[];
  injury: PremiumPriceType;
  injuryLimits: LimitType[];
  parents: PremiumPriceType;
  injuryDriver: PremiumPriceType;
  premiumWarranty: PremiumPriceType;
  premiumWarrantyOptions: LimitType[];
  directClaimManagement: PremiumPriceType;
  baggageLimits: LimitType[];
  inuryLimits: LimitType;
  injuryDriverLimits: LimitType[];
  parentsOptions: LimitType[];
  directClaimManagementOptions: LimitType[];
  selected: boolean;
}
export interface CascoResponseType {
  basePremiumTotal: number;
  premiumTotal: number;
  defaultSalesDiscount: number;
  decreasingCascoIncluded: boolean;
  participationsOptions: Array<{
    value: string;
    description: string;
  }>;
  natural: PriceType | PremiumPriceType;
  theft: PriceType | PremiumPriceType;
  animal: PriceType | PremiumPriceType;
  carAccident: PriceType | PremiumPriceType;
  carCheckRequired: {
    value: boolean;
    possibleTypes: string[];
    acceptanceFromDate: TimeStamp;
    possibleNow: boolean;
  };
  readyForGAPN: boolean;
  readyForGAPO: boolean;
  naturalLimits: LimitType[];
  theftLimits: LimitType[];
  animalLimits: LimitType[];
  carAccidentLimits: LimitType[];
  limits: LimitType[];
  selected: boolean;
  hidden?: boolean;
}

export interface AssistanceLimitsResponseType {
  premiumNoMalfunction: number;
  premiumInclMalfunction: number;
  description: string;
  value: string;
}

export interface PredefinedMtplPackageType {
  id: number;
  applicablePrice: number;
  installmentValue: number;
  installmentValueYear: number;
  installmentValueHalf: number;
  installmentValueQuarter: number;
  name: string;
  price: number;
  type: "mtpl";
  mtpl: {
    basicLimit: number;
    healthLossGuide: boolean;
  };
  additionals: {
    parents: boolean;
    glassLimit: string; // number as string
    premiumWarranty: boolean;
    directClaimManagement: boolean;
    baggageLimit?: string; // number as string - not defined yet in API
    injuryLimit?: string; // number as string - not defined yet in API
  };
  assistance: {
    variantCode: VariantCode;
    malfunctionAssistance: boolean;
  };
  configurable: boolean;
  reset: boolean;
  defaultChoice: boolean;
}

export interface PackageType {
  id: number;
  name: string;
  description: string;
  price: number;
  type: "casco" | "mtpl";
  configurable?: false;
  defaultChoice?: false;
  mtpl: {
    basicLimit: number;
    healthLossGuide: number;
  };
  casco: {
    carAccidentLimit: number;
    theftLimit: number;
    naturalLimit: number;
    animalLimit: number;
    gap: number;
    foreignTerritories: number;
    participation: number;
  };
  additionals: {
    parents: number;
    glassLimit: number;
    injuryLimit: number;
    injuryDriverLimit: number;
    premiumWarranty: number;
    baggageLimit: number;
    directClaimManagement: number;
  };
  assistance: {
    variantCode: string;
    carReplacementDays: number;
    malfunctionAssistance: number;
  };
}

export interface AutoSjednavacFetchResponseType {
  basePremiumTotal: number;
  premiumTotal: number;
  premiumTotalCorrection: number;
  version: string;
  fillForm: string;
  ckpBonusIncluded: boolean;
  ckpBonusCoef: number;
  ckpBonusPercent: string;
  ckpClaims: number;
  ckpMonthsTotal: number;
  finalPriceMtplAndCasco: boolean;
  underwritingRequired: boolean;
  // Only if finalPriceMtplAndCasco = true
  installmentDate: TimeStamp;
  // Only if finalPriceMtplAndCasco = true
  installmentValue: number;
  beginDateFrom: TimeStamp;
  beginDateTo: TimeStamp;
  frequencyDescription: string;
  installmentOptions: Array<{
    frequencyCode: keyof typeof frequency;
    installmentValue: number;
  }>;
  mtpl: MtplResponseType;
  casco: CascoResponseType;
  assistance: {
    premiumTotal: number;
    basePremiumTotal: number;
    variantCodeDescription: string;
    basicAssistance: PremiumPriceType;
    malfunctionAssistance: PremiumPriceType;
    carReplacement: PremiumPriceType;
    abroadAssistance: {
      // 1 | 0
      value: number;
    };
    basicAssistanceLimits: AssistanceLimitsResponseType[];
    carReplacementDaysOptions: AssistanceLimitsResponseType[];
    malfunctionAssistanceOptions?: { description: string; value: boolean; premium: number }[];
  };
  additionals: AdditionalsResponseType;
  packages: PackageType[];
  vehicle: {
    normalVehicle: boolean;
    oldVehicle: boolean;
    historicVehicle: boolean;
    electroVehicle: boolean;
  };
  feConfig: {
    bannerCasco: {
      text1: string;
      text2: string;
      enabled: boolean;
    };
  };
  shortTerm: boolean;
  onlinePaymentOnly: boolean;
}
