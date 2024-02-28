import { OptionType } from '@src/types';
import getPersonRequestData from '@src/schema/components/RestCalculation/utils/getPersonRequestData';
import { SUITABILITY_RECORD_HAS_OWN_TEMPLATE } from '@src/schema/schemas/cart';
import {
  FIELD_NAMES,
  SUITABILITY_RECORD_FIELD_NAME_PREFIX,
} from '@src/schema/schemas/constants/fieldNames';
import { AutoSjednavacFetchRequestType } from '@src/schema/types/AutoSjednavacFetchType';
import { PartnerInfoType } from '@src/schema/types/PartnerInfoType';
import { VehicleSecurityLevelType } from '@src/schema/types/VehicleInfoType';
import getDeepObjectValue from '@src/utils/getDeepObjectValue';

/**
 * Get request body for AutoSjednavac fetcher
 *
 * @param {Record<string, any>} formValues
 * @param {boolean} isInternal
 * @param {boolean} isAgent
 * @param {number} stepIndex
 * @returns {AutoSjednavacFetchRequestType}
 */
const getRequestBody = (
  formValues: Record<string, any>,
  isInternal: boolean,
  isAgent: boolean,
  stepIndex: number
): AutoSjednavacFetchRequestType => {
  const isCascoSelected =
    formValues.casco?.selected &&
    !Number.isNaN(parseInt(formValues?.vehicle.actualValue, 10));
  const suitabilityRecordValues =
    formValues?.[SUITABILITY_RECORD_FIELD_NAME_PREFIX];

  const mtplDiscount = !Number.isNaN(
    Number(formValues?.[FIELD_NAMES.DISCOUNT.MTPL_NAME])
  )
    ? Number(formValues[FIELD_NAMES.DISCOUNT.MTPL_NAME]) / 100
    : undefined;
  const cascoDiscount = !Number.isNaN(
    Number(formValues?.[FIELD_NAMES.DISCOUNT.CASCO_NAME])
  )
    ? Number(formValues[FIELD_NAMES.DISCOUNT.CASCO_NAME]) / 100
    : undefined;

  const withSecurity: boolean =
    (isAgent || isInternal) && (formValues?.vehicle?.withSecurity ?? true);

  const securityLevel: VehicleSecurityLevelType[] = withSecurity
    ? (
        formValues.vehicle
          ?.securityLevel as OptionType<VehicleSecurityLevelType>[]
      )?.map((option) => option?.value || option)
    : ['NO_SECURITY'];

  return {
    frequencyCode: formValues?.[FIELD_NAMES.FREQUENCY_CODE] ?? 'ANNUALY',
    getPackages: true,
    // Do not send limits on first step to prevent wrong options for different vehicle types
    getApplicableLimitsOnly: stepIndex !== 0,
    getLimits: stepIndex !== 0,
    beginDate: formValues?.[FIELD_NAMES.BEGIN_DATE] ?? undefined,
    endDate: formValues?.endDate ?? undefined,
    temp: {
      isInternalUser: isInternal,
      isAgent,
    },
    partner: getPersonRequestData({
      person: formValues.partner,
      additionalDataObj: {
        channelType: 'EMAIL',
      },
    }) as Partial<PartnerInfoType>,
    vehicle: {
      registrationPlate:
        (formValues?.vehicle?.registrationPlate as string)?.toUpperCase() ??
        undefined,
      // Subtyp vozidel - vrátit až bude třeba
      // type: formValues?.vehicle?.subtype?.value ?? formValues?.vehicle?.type?.value ?? undefined, // PERSONAL_VEHICLE, (OSOBNI)
      type: formValues?.vehicle?.type?.value ?? undefined, // PERSONAL_VEHICLE, (OSOBNI)
      category: formValues?.vehicle?.category?.value ?? undefined, // M1, N1m ,,,
      enginePower: formValues?.vehicle?.enginePower ?? undefined,
      engineDisplacement: formValues?.vehicle?.engineDisplacement ?? undefined,
      maxWeight: formValues?.vehicle?.maxWeight
        ? parseInt(formValues?.vehicle.maxWeight, 10)
        : undefined,
      actualValue: formValues?.vehicle?.actualValue
        ? parseInt(formValues?.vehicle.actualValue, 10)
        : undefined,
      actualValueVATIncluded:
        formValues?.vehicle?.actualValueVATIncluded ?? true,
      usePurposeCode: formValues?.vehicle?.usePurposeCode?.value ?? 'COMMON', // COMMON, (BEZNE UZITTI VOZIDLA )
      mileage: 'MAX_150000',
      securityLevel,
      registrationBookNumber:
        (
          formValues?.vehicle?.registrationBookNumber as string
        )?.toUpperCase() ?? undefined,
      vin: (formValues?.vehicle?.vin as string)?.toUpperCase() ?? undefined,
      evidenceNumber: formValues?.vehicle?.evidenceNumber ?? undefined,
      countPlace: formValues?.vehicle?.countPlace ?? undefined,
      fuelTypeCode: formValues?.vehicle?.fuelTypeCode?.value ?? undefined,
      temp: {
        vin: true,
      },
      leadinDate: formValues?.vehicle?.leadinDate ?? undefined,
      leadinDateInFuture: formValues?.vehicle?.leadinDateInFuture ?? undefined,
      manufacturerModelCode:
        formValues?.vehicle?.manufacturerModelCode?.value ??
        formValues?.vehicle?.manufacturerModelCode ??
        undefined,
      model: formValues?.vehicle?.model ?? undefined,
      manufacturer: formValues?.vehicle?.manufacturer ?? undefined,
    },
    mtpl: {
      salesDiscount: mtplDiscount,
      basicLimit: formValues.mtpl?.selected
        ? formValues?.mtpl?.basicLimit
        : undefined,
      selected: formValues.mtpl?.selected,
    },
    assistance: {
      malfunctionAssistance:
        formValues?.assistance?.malfunctionAssistance ?? false,
      variantCode: formValues?.assistance?.variantCode ?? undefined,
      carReplacementDays:
        Number(formValues?.assistance?.carReplacementBoolean) === 1
          ? formValues?.assistance?.carReplacementDays?.value ?? undefined
          : undefined,
    },
    additionals: {
      glassLimit: formValues?.additionals?.glassLimit
        ? formValues?.additionals?.glassLimits?.value
        : undefined,
      directClaimManagement: formValues?.additionals?.directClaimManagement,
      injuryDriverLimit:
        formValues?.additionals?.injuryLimitCheckbox &&
        formValues?.additionals?.injuryLimitDriverOrAll?.value === 'driverOnly'
          ? formValues?.additionals?.injuryLimitSelect?.value
          : undefined,
      injuryLimit:
        formValues?.additionals?.injuryLimitCheckbox &&
        formValues.additionals?.injuryLimitDriverOrAll?.value === 'all'
          ? formValues?.additionals?.injuryLimitSelect?.value
          : undefined,
      parents: formValues?.additionals?.parents,
      baggageLimit: formValues?.additionals?.baggageLimit
        ? formValues?.additionals?.baggageLimits?.value
        : undefined,
      premiumWarranty: formValues?.additionals?.premiumWarranty ?? undefined,
    },
    casco: {
      salesDiscount: cascoDiscount,
      selected: isCascoSelected,
      ...(isCascoSelected
        ? {
            animalLimit: formValues?.casco?.animalLimit ?? undefined,
            carAccidentLimit: formValues?.casco?.carAccidentLimit ?? undefined,
            naturalLimit: formValues?.casco?.naturalLimit ?? undefined,
            theftLimit: formValues?.casco?.theftLimit ?? undefined,
            foreignTerritories:
              Number(formValues?.casco?.foreignTerritories) === 1,
            gap:
              formValues?.casco?.packageId === 'id3' ||
              formValues?.casco?.packageId === 'id2',
            participation: formValues?.casco?.participation?.value ?? undefined,
            carCheck: {
              type: formValues?.photoCheck,
              address: formValues.inspectionPermanentAddress
                ? formValues.partner?.permanentAddress
                : formValues.alternateAddressPhotoVehicle ?? undefined,
              firstName: formValues.partner?.firstName ?? undefined,
              lastName: formValues.partner?.lastName ?? undefined,
              phone: formValues?.inspectionPhone
                ? formValues?.partner?.phone
                : formValues?.alternatePhone ?? undefined,
            },
          }
        : {}),
    },
    occupant: !formValues?.vehicleOperator
      ? getPersonRequestData({
          person: formValues?.occupant,
        })
      : undefined,
    insured: formValues?.sameVehicleOwnerAndOperator
      ? // If same vehicle owner and operator is true, then copy occupant data for insured
        getPersonRequestData({
          person: formValues?.occupant,
        })
      : !formValues?.sameVehicleOwnerAndOperator && !formValues?.vehicleOwner
        ? getPersonRequestData({
            person: formValues?.insured,
          })
        : undefined,
    marketingAgreement: formValues?.marketingAgreement ?? undefined,
    termsAgreement: formValues?.termsAgreement ?? undefined,
    termsAgreement2: formValues?.termsAgreement2 ?? undefined,
    getFeConfig: true,
    dontHaveSpz: formValues?.dontHaveSpz,
    suitabilityRecord:
      isInternal || isAgent
        ? {
            post: false,
            insurers: [],
            ownTemplate:
              getDeepObjectValue({
                obj: formValues,
                keys: SUITABILITY_RECORD_HAS_OWN_TEMPLATE.split('.'),
              }) ?? false,
            ...suitabilityRecordValues,
          }
        : undefined,

    // policyValidation: true
    // TODO: nasetovat policyvalidation na true na poslednim kroku pred platbou, policyValidation true volane na kalkulaci posle zpatky pole errors ktere vypisuje co chybi v requestu, pokud to nasetujem uz od kroku 0 nevrati se nam kalkulace a bude to rvat ze tam nemame treba VINko, nebo vahu vozidla (setujeme az na 3. kroku)
  };
};

export default getRequestBody;
