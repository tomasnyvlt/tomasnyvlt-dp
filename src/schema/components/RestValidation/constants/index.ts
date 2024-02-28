export const VALIDATION_ACTIVE_ON_STEPS = [0, 1, 2, 3];

// Array of fields to ignore in REST validation for each step
export const ignoreFieldsArr: Array<string[]> = [
  // Step 1
  [
    "vehicle.model",
    /**
     * Fillform problematic fields on 1st step
     *
     * The problem is that client sends some empty fields from 3rd step
     * and after fillform on 1st step these fields are required because
     * BE has occupat/insured/partner data, so it looks like client is on 3rd step.
     */
    "partner.email",
    "occupant.birthDate",
    "occupant.legalFormCode",
    "insured.birthDate",
    "insured.citizenship",
    "insured.legalFormCode",
    "insured.personalIn"
  ]
];

// First step vehicle info fields
export const vehicleInfoFieldKeys: string[] = [
  "vehicle.type",
  "vehicle.brand",
  "vehicle.model",
  "vehicle.registrationPlate",
  "vehicle.fuelTypeCode",
  "vehicle.leadinDate",
  "vehicle.usePurposeCode",
  "vehicle.category",
  "vehicle.enginePower",
  "vehicle.engineDisplacement"
];
