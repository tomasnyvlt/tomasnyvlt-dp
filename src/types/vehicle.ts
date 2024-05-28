export interface VehicleInfoProps {
  manufacturerModelCode: string;
  manufacturer: string;
  model: string;
  type: any; // ciselnik; typ vozidla
  category: any; // ciselnik; kategorie vozidla
  engineDisplacement: number; // objem motoru
  enginePower: number; //výkon motoru
  maxWeight: number; // max přípustná hmotnost
  usePurposeCode: any; // ciselnik; ucel pouziti vozidla
  fuelTypeCode: any; // ciselnik; typ paliva
  countPlace: number; // pocet mist k sezeni
  leadinDate: Date | null; // datum uvedeni do provozu
  leadinDateInFuture: boolean; // true pokud bude vozidlo uvedeno do provozu v budoucnu (nová vozidla)
  securityLevel: any; // List<Enum> zabezpeceni vozidla - lze vybrat 1 - X prvků
  actualValue: number; // hodnota vozu; pripadne VEHICLE_VALUE
  actualValueVATIncluded: boolean; // true = včetně daně; default = true
  purchaseValue: number; // pořizovací cena vozidla
  purchaseValueVATIncluded: boolean; // to same jako actualValueVATIncluded
  mileage: any; // ciselnik
  manufactureYear: number;
  registrationBookNumber: string; // cislo technickeho prukazu
  vin: string; //VIN kod
  evidenceNumber: string; // evidenční číslo
  registrationPlate: string; // spz
}

export interface LocalVehicleProps {
  vehicle?: VehicleInfoProps;
}
