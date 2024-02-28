import * as VEHICLE from "@src/components/contents/Cart/constants/vehicle";
import {
  CartItemType,
  GetCartDataProps,
  SelectableOptionItem
} from "@src/components/contents/Cart/types";
import getSelectedLimits from "@src/components/contents/Cart/utils/vehicle/getSelectedLimits";
import getFormattedPrice from "@src/utils/getFormattedPrice";
import {
  AdditionalsResponseType,
  PremiumPriceType
} from "components/contents/forms/AutosjednavacForm/types/AutoSjednavacFetchType";

const shouldIncludeAdditionals = (additionals: AdditionalsResponseType): boolean => {
  const { selected, premiumTotal, baggage, glass, injury, injuryDriver, parents, directClaimManagement } =
    additionals || {};

  if (!selected && premiumTotal < 1) return false;

  const isAdditionalsSelected: boolean = !![baggage, glass, injury, injuryDriver, parents, directClaimManagement].find(
    (item) => (item as PremiumPriceType)?.premium > 0
  );

  return isAdditionalsSelected;
};

const getItems = ({
  fetcherData,
  formValues
}: GetCartDataProps<"autosjednavac-zarazeni-do-flotily">): CartItemType[] => {
  const { mtpl, casco, assistance, additionals } = fetcherData || {};
  const items: CartItemType[] = [];

  // POV
  if (formValues?.mtpl?.selected && mtpl?.premiumTotal > 0 && !!formValues?.mtpl?.basicLimit) {
    items.push({
      description: `Povinné ručení Limit ${formValues?.mtpl?.basicLimit} mil. Kč`,
      price: mtpl?.premiumTotal,
      formattedPrice: getFormattedPrice({
        price: mtpl?.premiumTotal,
        withYear: true
      }) as string,
      removable: false
    });
  }

  // Assistance
  const selectedAssistance = assistance?.basicAssistanceLimits?.find(
    (limit) => limit.premiumNoMalfunction === assistance?.basicAssistance?.premium
  );
  const price = assistance?.premiumTotal ?? 0;

  if (selectedAssistance) {
    items.push({
      description:
        selectedAssistance.value === "TIR_V1" || selectedAssistance.value === "TIR_V2"
          ? selectedAssistance.description
          : `Asistence ${selectedAssistance.description.split(" ")[1]}`,
      price,
      formattedPrice: getFormattedPrice({ price, withYear: !fetcherData?.shortTerm }) as string,
      removable: false,
      info: !price ? "Součást smlouvy" : undefined
    });
  }

  // HAV
  if (casco?.premiumTotal > 0) {
    const packageId = formValues?.casco?.packageId;
    const pickedId = parseInt((packageId ?? "").replace(/\D/g, ""), 10);

    if (pickedId) {
      const cascoPackage = fetcherData.packages.find(({ id }) => id === pickedId);

      if (cascoPackage?.name) {
        items.push({
          description: cascoPackage.name,
          price: casco.premiumTotal,
          formattedPrice: getFormattedPrice({ price: casco.premiumTotal, withYear: true }) as string,
          removable: false
        });
      }
    }
  }

  // Additionals
  if (shouldIncludeAdditionals(additionals)) {
    const { baggage, glass, injury, injuryDriver, parents, directClaimManagement } = additionals;

    const optionsArr: SelectableOptionItem[] = [
      {
        price: baggage,
        priceShortTerm: fetcherData?.shortTerm,
        description: VEHICLE.ADDITIONAL_BAGGAGE,
        selectedLimit: formValues?.additionals?.baggageLimits,
        removable: true,
        fieldName: "additionals.baggageLimit",
        defaultFieldValue: false
      },
      {
        price: glass,
        priceShortTerm: fetcherData?.shortTerm,
        description: VEHICLE.ADDITIONAL_GLASS,
        selectedLimit: formValues?.additionals?.glassLimits,
        removable: true,
        fieldName: "additionals.glassLimit",
        defaultFieldValue: false
      },
      {
        price: injury,
        priceShortTerm: fetcherData?.shortTerm,
        description: VEHICLE.ADDITIONAL_INJURY,
        selectedLimit: formValues?.additionals?.injuryLimitSelect,
        removable: true,
        fieldName: "additionals.injuryLimitCheckbox",
        defaultFieldValue: false
      },
      {
        price: injuryDriver,
        priceShortTerm: fetcherData?.shortTerm,
        description: VEHICLE.ADDITIONAL_INJURY_DRIVER,
        selectedLimit: formValues?.additionals?.injuryLimitSelect,
        removable: true,
        fieldName: "additionals.injuryLimitCheckbox",
        defaultFieldValue: false
      },
      {
        price: parents,
        priceShortTerm: fetcherData?.shortTerm,
        description: VEHICLE.ADDITIONAL_PARENTS,
        selectedLimit: formValues?.additionals?.parents,
        removable: true,
        fieldName: "additionals.parents",
        defaultFieldValue: false
      },
      {
        price: directClaimManagement,
        priceShortTerm: fetcherData?.shortTerm,
        description: VEHICLE.ADDITIONAL_DIRECT_CLAIM_MANAGEMENT,
        selectedLimit: formValues?.additionals?.directClaimManagement,
        removable: true,
        fieldName: "additionals.directClaimManagement",
        defaultFieldValue: false
      }
    ];

    const selectedLimitsArr = getSelectedLimits(optionsArr);
    items.push(...selectedLimitsArr);
  }

  return items;
};

export default getItems;
