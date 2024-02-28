import { LEGAL_FORM, PartnerInfoType } from "components/contents/forms/AutosjednavacForm/types/PartnerInfoType";

type PersonObject = Omit<PartnerInfoType, "legalFormCode"> & {
  legalFormCode?: {
    value?: LEGAL_FORM;
  };
  policyNumber?: string;
};

const getItemsFromPerson = (person: Partial<PersonObject>, twoColumnsLayout?: boolean) => {
  if (twoColumnsLayout) {
    const itemsLeft = [
      person.policyNumber && { label: "Číslo smlouvy:", value: person.policyNumber },
      person.birthDate && { label: "Datum narození:", value: new Date(person.birthDate).toLocaleDateString() },
      person.phone && { label: "Telefon:", value: person.phone.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4") },
      person.email && { label: "E-mail:", value: person.email }
    ];
    const itemsRight = [
      person.contactAddress && {
        label: "Kontaktní adresa:",
        value: `${person.contactAddress.street} ${person.contactAddress.houseNumber}, ${person.contactAddress.city}, ${person.contactAddress.zip}`
      },
      person.permanentAddress && {
        label:
          person?.legalFormCode?.value === "COMPANY" || person?.legalFormCode?.value === "SELFEMPLOYED"
            ? "Adresa sídla:"
            : "Trvalá adresa:",
        value: `${person.permanentAddress.street} ${person.permanentAddress.houseNumber}, ${person.permanentAddress.city}, ${person.permanentAddress.zip}`
      },
      person.companyIn && { label: "IČ:", value: person.companyIn },
      person.personalIn && {
        label: "Rodné číslo:",
        value: person.personalIn.toString()?.replace(/^(\d{6})(\d{0,4})$/, "$1/$2")
      }
    ];
    return [itemsLeft, itemsRight];
  }
  const items = [
    person.policyNumber && { label: "Číslo smlouvy:", value: person.policyNumber },
    person.permanentAddress && {
      label:
        person?.legalFormCode?.value === "COMPANY" || person?.legalFormCode?.value === "SELFEMPLOYED"
          ? "Adresa sídla:"
          : "Trvalá adresa:",
      value: `${person.permanentAddress.street} ${person.permanentAddress.houseNumber}, ${person.permanentAddress.city}, ${person.permanentAddress.zip}`
    },
    person.contactAddress && {
      label: "Kontaktní adresa:",
      value: `${person.contactAddress.street} ${person.contactAddress.houseNumber}, ${person.contactAddress.city}, ${person.contactAddress.zip}`
    },
    person.companyIn && { label: "IČ:", value: person.companyIn },
    person.personalIn && {
      label: "Rodné číslo:",
      value: person.personalIn.toString()?.replace(/^(\d{6})(\d{0,4})$/, "$1/$2")
    },
    person.birthDate && { label: "Datum narození:", value: new Date(person.birthDate).toLocaleDateString() },
    person.phone && { label: "Telefon:", value: person.phone.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4") },
    person.email && { label: "E-mail:", value: person.email }
  ];
  return items;
};

export default getItemsFromPerson;
