import { OptionDecorDataType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import getFormattedPrice from '@src/utils/getFormattedPrice';
import getOnClickChangeFields from '@src/schema/schemas/step2/insuranceOptions/utilities/getOnClickChangeFields';
import {
  PackageType,
  PredefinedMtplPackageType,
} from '@src/schematypes/AutoSjednavacFetchType';

type FetcherDataType = ReturnType<typeof getFetcherData<'autosjednavac'>>;

const getSelectOption = (
  fetcherData: FetcherDataType,
  values: Record<string, any>,
  predefinedPackage: PredefinedMtplPackageType
): OptionDecorDataType => {
  const { name, price, id } = predefinedPackage;
  const shortTerm = fetcherData?.shortTerm;

  return {
    label: name,
    info: !price
      ? undefined
      : getFormattedPrice({ price, withYear: !shortTerm }) ?? undefined,
    value: `option-${id}`,
    onClickChangeFields: getOnClickChangeFields(
      fetcherData,
      values,
      predefinedPackage
    ),
  };
};

const getSelectOptions = (
  fetcherData: FetcherDataType,
  values: Record<string, any>
): OptionDecorDataType[] => {
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
    getSelectOption(
      fetcherData,
      values,
      predefinedPackage as unknown as PredefinedMtplPackageType
    )
  );

  return options;
};

export default getSelectOptions;
