import { RadioBoxInfoType, RadioBoxOptionType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import getFormattedPrice from '@src/utils/getFormattedPrice';
import getOnClickChangeFields from '@src/schema/schemas/step2/insuranceOptions/utilities/getOnClickChangeFields';
import {
  PackageType,
  PredefinedMtplPackageType,
} from '@src/schematypes/AutoSjednavacFetchType';

type FetcherDataType = ReturnType<typeof getFetcherData<'autosjednavac'>>;

const getInfoItems = (
  fetcherData: FetcherDataType,
  predefinedPackage: PredefinedMtplPackageType
): Array<RadioBoxInfoType[]> => {
  const mtpl = fetcherData.mtpl?.basicLimits?.find(
    ({ value }) => value === `${predefinedPackage.mtpl?.basicLimit}`
  );
  const assistance = fetcherData.assistance?.basicAssistanceLimits?.find(
    ({ value }) => value === predefinedPackage.assistance?.variantCode
  );
  const glassAdditionals = fetcherData.additionals?.glassLimits?.find(
    ({ value }) => value === `${predefinedPackage.additionals?.glassLimit}`
  );
  const shortTerm = fetcherData?.shortTerm;

  const mtplInfo: RadioBoxInfoType = {
    headings: ['Povinné ručení'],
    text: [
      `${getFormattedPrice({ price: mtpl?.premium, withYear: !shortTerm })}\n(Limit ${mtpl?.description ?? '-'}\xa0Kč)`,
    ],
  };

  // This just checks if "premiumNoMalfunction" OR "premiumInclMalfunction" price should be used
  const hasAssistanceMalfunction =
    predefinedPackage.assistance?.malfunctionAssistance;
  // Get correct malfunction price from fetcherData
  const malfunctionPrice =
    (hasAssistanceMalfunction
      ? assistance?.premiumInclMalfunction
      : assistance?.premiumNoMalfunction) ?? 0;

  const assistanceInfo: RadioBoxInfoType = {
    headings: [
      `Asistence ${assistance?.description?.split(' ')[1] ?? '-'}\n${
        malfunctionPrice ? 's\xa0poruchou' : 'bez\xa0poruchy'
      }`,
    ],
    text: [
      !malfunctionPrice
        ? 'V ceně'
        : getFormattedPrice({
            price: malfunctionPrice,
            withYear: !shortTerm,
          }) ?? '-',
    ],
  };

  const additionalsInfo: RadioBoxInfoType = {
    headings: ['Něco navíc', 'Pojištění skel'],
    text: [
      !glassAdditionals || glassAdditionals?.premium === 0
        ? 'není součástí\nbalíčku'
        : `${getFormattedPrice({
            price: glassAdditionals.premium,
            withYear: !shortTerm,
          })}\n(Limit ${glassAdditionals.description})`,
    ],
  };

  const hasAdditionalsSection = fetcherData.packages
    ?.filter((singlePackage) => singlePackage.type === 'mtpl')
    ?.filter((mtplPackage) => mtplPackage?.additionals)
    // Additionals can be in object but with `false` value
    ?.some((additionalItem) => !!additionalItem);

  const infoItems: Array<RadioBoxInfoType[]> = [[mtplInfo]];

  if (assistance) {
    infoItems.push([assistanceInfo]);
  }

  if (hasAdditionalsSection) {
    infoItems.push([additionalsInfo]);
  }

  return infoItems;
};

const getSingleRadioOption = (
  fetcherData: FetcherDataType,
  values: Record<string, any>,
  predefinedPackage: PredefinedMtplPackageType
): RadioBoxOptionType => {
  const { name, price, id, configurable, defaultChoice } = predefinedPackage;
  const shortTerm = fetcherData?.shortTerm;

  if (configurable) {
    return {
      label: name,
      value: `option-${id}`,
      mobileButtonText: 'Sestavit',
      buttonText: 'Sestavím si sám',
      price: {
        text: 'Cena dle zvolených produktů',
        variant: 'small',
      },
      info: [
        [
          {
            isRichText: true,
            text: [
              JSON.stringify({
                blocks: [
                  {
                    key: 'f71rt',
                    text: 'Vyšší limit Povinného ručení nebo Asistence do zahraničí nebo Havarijní pojištění?',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [
                      { offset: 6, length: 22, style: 'BOLD' },
                      { offset: 34, length: 22, style: 'BOLD' },
                      { offset: 62, length: 20, style: 'BOLD' },
                    ],
                    entityRanges: [],
                    data: {},
                  },
                  {
                    key: 'khjp',
                    text: 'Sami si vyberete situace, kdy vám pojištění pomůže. A nastavíte si limity, jaké vám vyhovují.',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              }),
            ],
          },
        ],
      ],
      onClickChangeFields: getOnClickChangeFields(
        fetcherData,
        values,
        predefinedPackage
      ),
    };
  }

  const infoItems = getInfoItems(fetcherData, predefinedPackage);

  return {
    label: name,
    value: `option-${id}`,
    buttonText: 'Zobrazit',
    recommended: defaultChoice,
    price: {
      text:
        getFormattedPrice({ price, withYear: !shortTerm }) ??
        'Cena není stanovena',
    },
    info: infoItems,
    onClickChangeFields: getOnClickChangeFields(
      fetcherData,
      values,
      predefinedPackage
    ),
  };
};

const getRadioOptions = (
  fetcherData: FetcherDataType,
  values: Record<string, any>
): RadioBoxOptionType[] => {
  const { mtpl, assistance, packages } = fetcherData || {};

  const predefinedPackages: PackageType[] = packages?.filter(
    ({ type }) => type === 'mtpl'
  );

  if (
    !mtpl?.basicLimits?.length ||
    !assistance?.basicAssistanceLimits?.length ||
    !predefinedPackages?.length
  )
    return [];

  const options = predefinedPackages.map((predefinedPackage) =>
    getSingleRadioOption(
      fetcherData,
      values,
      predefinedPackage as unknown as PredefinedMtplPackageType
    )
  );

  return options;
};

export default getRadioOptions;
