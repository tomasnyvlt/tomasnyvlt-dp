export type LEGAL_FORM = "PERSON" | "COMPANY" | "SELFEMPLOYED";

export interface Address {
  city?: string;
  street?: string;
  houseNumber?: string;
  zip?: string;
  countryCode?: string; // ISO kod = CZ SK GB
  wholeAddress?: string;
}

export interface PartnerInfoType {
  firstName: string;
  lastName: string;
  legalFormCode: LEGAL_FORM; //  PERSON, COMPANY, SELFEMPLOYED enum - zivnostnik, fyzicka, pravnicka
  birthDate: string;
  permanentAddress: Partial<Address> | null;
  contactAddress: Partial<Address> | null;
  personalIn: string; // RC
  email: string;
  phone: string;
  namePrefix: string; // titul pred jmenem
  companyName: string;
  companyIn: string; // ICO;
  citizenship: string;
}
