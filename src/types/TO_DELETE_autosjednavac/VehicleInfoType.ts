export interface VehicleInfoType {
  manufacturerModelCode: string;
  manufacturer: string;
  model: string;
  type: VehicleType; // ciselnik; typ vozidla
  category: VehicleCategory; // ciselnik; kategorie vozidla
  engineDisplacement: number; // objem motoru
  enginePower: number; //výkon motoru
  maxWeight: number; // max přípustná hmotnost
  usePurposeCode: keyof typeof usage; // ciselnik; ucel pouziti vozidla
  fuelTypeCode: FuelTypeCode; // ciselnik; typ paliva
  countPlace: number; // pocet mist k sezeni
  leadinDate: Date | null; // datum uvedeni do provozu
  leadinDateInFuture: boolean; // true pokud bude vozidlo uvedeno do provozu v budoucnu (nová vozidla)
  securityLevel: VehicleSecurityLevelType[]; // List<Enum> zabezpeceni vozidla - lze vybrat 1 - X prvků
  actualValue: number; // hodnota vozu; pripadne VEHICLE_VALUE
  actualValueVATIncluded: boolean; // true = včetně daně; default = true
  purchaseValue: number; // pořizovací cena vozidla
  purchaseValueVATIncluded: boolean; // to same jako actualValueVATIncluded
  mileage: Mileage; // ciselnik
  manufactureYear: number;
  registrationBookNumber: string; // cislo technickeho prukazu
  vin: string; //VIN kod
  evidenceNumber: string; // evidenční číslo
  registrationPlate: string; // spz
  temp: {
    manufacturer?: string;
    model?: string;
    vin?: boolean;
  };
}

export type VehicleType =
  | "MOTORCYCLE"
  | "MOTORCYCLE_3_4_WHEEL"
  | "BIKE_WITH_ENGINE"
  | "PERSONAL_VEHICLE"
  | "VAN"
  | "TRUCK"
  | "SEMITRAILER_TRUCK"
  | "TRAILER"
  | "SEMITRAILER"
  | "CARAVAN"
  | "TRACTOR"
  | "SINGLE_WHEEL_TRACTOR"
  | "WORK_MACHINE_REGISTRED"
  | "WORK_MACHINE_NONREGISTRED"
  | "TRAILER_WORK_MACHINE_REGISTRED"
  | "TRAILER_WORK_MACHINE_NONREGISTRED"
  | "BUS"
  | "PUBLIC_TRANSPORT_BUS"
  | "TROLLEY_BUS"
  | "MOTOR_CARAVAN"
  | "AMBULANCE"
  | "OTHER_VEHICLE";

export type VehicleCategory = "L" | "LA" | "LB" | "LC" | "LD" | "LE" | "M1" | "M2";

export type FuelTypeCode =
  | "BENZINE"
  | "DIESEL"
  | "LPG"
  | "CNG"
  | "BENZINE_LPG"
  | "BENZINE_CNG"
  | "DIESEL_LPG"
  | "DIESEL_CNG"
  | "BENZINE_ELECTRIC"
  | "DIESEL_ELECTRIC"
  | "ELECTRIC"
  | "NONE"
  | "HYDROGENIUM"
  | "HYDROGENIUM_ELECTRIC";

export type Mileage = keyof typeof mileage;

export type VariantCode = "PERSONAL_V1" | "PERSONAL_V2" | "PERSONAL_V3" | "PERSONAL_V4" | "TIR_V1" | "TIR_V2";

export type CarReplacementDay = "DAYS_0" | "DAYS_3" | "DAYS_5" | "DAYS_10";

const mileage = {
  MAX_10000: "do 10 000 km",
  MAX_20000: "do 20 000 km",
  MAX_30000: "do 30 000 km",
  MAX_40000: "do 40 000 km",
  MAX_50000: "do 50 000 km",
  MAX_60000: "do 60 000 km",
  MAX_70000: "do 70 000 km",
  MAX_80000: "do 80 000 km",
  MAX_90000: "do 90 000 km",
  MAX_100000: "do 100 000 km",
  MAX_110000: "do 110 000 km",
  MAX_120000: "do 120 000 km",
  MAX_130000: "do 130 000 km",
  MAX_140000: "do 140 000 km",
  MAX_150000: "do 150 000 km",
  MAX_999999: "nad 150 000 km"
};

const usage = {
  COMMON: "Běžné užití vozidla",
  SPECIAL: "Vozidlo s právem přednostní jízdy",
  TAXI: "Vozidlo taxislužby, uber, taxify či jiné formy sdílené jízdy",
  RENT: "Vozidlo určené k půjčování (autopůjčovna, carsharing)",
  BUSINESS: "Vozidlo k běžné podnikatelské činnosti",
  ADR: "Vozidlo pro přepravu nebezpečného nákladu",
  HISTORICAL: "Historické vozidlo",
  DRIVING_SCHOOL: "Vozidlo autoškoly",
  OTHER: "Jiný způsob užití vozidla"
};

export const vehicleSecurityLevel = {
  NO_SECURITY: "Bez zabezpečení",
  INTEGRAL_MECHANICAL_SECURITY: "Mechanické zabezpečení",
  VIN_ETCHING: "Označení skel",
  ACTIVE_SEARCH_SYSTEM: "Systém aktivního vyhledávání",
  PASIVE_SEARCH_SYSTEM: "Systém pasivního vyhledávání"
} as const;

export type VehicleSecurityLevelType = keyof typeof vehicleSecurityLevel;

export const vehicleCategory = {
  MOTORCYCLE: ["L"],
  QUAD_MOTORCYCLE: ["L"],
  BIKE_WITH_ENGINE: ["L"],
  PERSONAL_VEHICLE: ["M1", "M1G"],
  VAN: ["N1", "N1G"],
  TRUCK: ["N1", "N1G", "N2", "N2G", "N3", "N3G"],
  SEMITRAILER_TRUCK: ["N1", "N1G", "N2", "N2G", "N3", "N3G"],
  TRAILER: ["O1", "O2", "O3", "O4", "OT1", "OT2", "OT3", "OT4", "R1", "R2", "R3", "R4"],
  SEMITRAILER: ["O1", "O2", "O3", "O4", "OT1", "OT2", "OT3", "OT4", "R1", "R2", "R3", "R4"],
  CARAVAN: ["O1", "O2", "O3", "O4", "OT1", "OT2", "OT3", "OT4", "R1", "R2", "R3", "R4"],
  TRACTOR: ["T1", "T2", "T3", "T4", "T5", "C1", "C2", "C3", "C4", "C5", "R"],
  SINGLE_WHEEL_TRACTOR: ["T1", "T2", "T3", "T4", "T5", "T", "C1", "C2", "C3", "C4", "C5", "R", "SS"],
  WORK_MACHINE_REGISTRED: ["SS", "R", "Z"],
  WORK_MACHINE_NONREGISTRED: ["SS", "R", "Z"],
  TRAILER_WORK_MACHINE_REGISTRED: ["SP1", "SP2", "SP3", "SN1", "SN2", "SN3", "R"],
  TRAILER_WORK_MACHINE_NONREGISTRED: ["SP1", "SP2", "SP3", "SN1", "SN2", "SN3", "R"],
  BUS: ["M2", "M3", "M2G", "M3G"],
  PUBLIC_TRANSPORT_BUS: ["M2", "M3", "M2G", "M3G"],
  TROLLEY_BUS: ["M1", "M1G", "N1", "N1G", "N2", "N2G", "N3", "N3G"],
  MOTOR_CARAVAN: ["M1", "M1G", "N1", "N1G", "N2", "N2G", "N3", "N3G"],
  AMBULANCE: ["M1", "M1G", "M2", "M2G"],
  OTHER_VEHICLE: ["R", "Z"]
};
