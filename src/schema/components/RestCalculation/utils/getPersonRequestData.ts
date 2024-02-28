import { OptionType } from '@src/types';
import getFormattedDate from '@src/utils/getFormattedDate';
import { Address, PartnerInfoType } from '@src/schema/types/PartnerInfoType';

interface PersonFormValuesType
  extends Omit<
    PartnerInfoType,
    'legalFormCode' | 'citizenship' | 'permanentAddress' | 'contactAddress'
  > {
  legalFormCode?: OptionType<PartnerInfoType['legalFormCode'] | 'FOREIGN'>;
  sameAddress: boolean;
  permanentAddress?: Address;
  contactAddress?: Address;
}

interface Props {
  person: PersonFormValuesType;
  additionalDataObj?: Record<string, any>;
}

const getPersonRequestData = ({
  person,
  additionalDataObj = {},
}: Props): Partial<PartnerInfoType> | undefined => {
  const { legalFormCode, sameAddress, phone, email } = person || {};

  if (!legalFormCode?.value) return undefined;
  const permanentAddress: Partial<Address> | undefined = {
    ...person?.permanentAddress,
  };

  const contactAddress: Partial<Address> | undefined = sameAddress
    ? undefined
    : {
        ...person?.contactAddress,
      };

  if (permanentAddress && !permanentAddress?.zip) {
    permanentAddress.zip = (person?.permanentAddress as Address)?.zip;
  }

  if (contactAddress && !contactAddress?.zip) {
    contactAddress.zip = (person?.contactAddress as Address)?.zip;
  }

  const requestObject: Partial<PartnerInfoType> = {
    // If FOREIGN person type is selected in form, send "PERSON" to API
    legalFormCode:
      legalFormCode.value === 'FOREIGN' ? 'PERSON' : legalFormCode.value,
    phone,
    email,
    permanentAddress,
    contactAddress,

    // Only for NOT COMPANY
    ...(legalFormCode.value !== 'COMPANY' && {
      firstName: person?.firstName,
      lastName: person?.lastName,
      namePrefix: person?.namePrefix,
    }),

    // Only for PERSON person
    ...(legalFormCode.value === 'PERSON' && {
      personalIn: person?.personalIn,
      birthDate: getFormattedDate(person?.birthDate),
    }),

    // Only for COMPANY and SELFEMPLOYED
    ...((legalFormCode.value === 'COMPANY' ||
      legalFormCode.value === 'SELFEMPLOYED') && {
      companyName: person?.companyName,
      companyIn: person?.companyIn,
    }),

    // Only for FOREIGN
    ...(legalFormCode.value === 'FOREIGN' && {
      citizenship: 'OTHER',
      birthDate: getFormattedDate(person?.birthDate),
    }),

    ...additionalDataObj,
  };

  return requestObject;
};

export default getPersonRequestData;
