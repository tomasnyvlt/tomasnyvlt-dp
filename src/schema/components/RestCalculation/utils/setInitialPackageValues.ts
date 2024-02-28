import getOnClickChangeFields from '@src/schema/schemas/step2/insuranceOptions/utilities/getOnClickChangeFields';
import {
  AutoSjednavacFetchResponseType,
  PredefinedMtplPackageType,
} from '@src/schema/types/AutoSjednavacFetchType';

interface Props {
  change: (name: string, value: any) => void;
  data: AutoSjednavacFetchResponseType;
  formValues: Record<string, any>;
}

export const setInitialPackageValues = ({
  change,
  data,
  formValues,
}: Props) => {
  const { packages } = data;
  // Package with id 17 is predefined for usage without Netflix options
  const predefinedPackage = packages.find(
    ({ id }) => id === 17
  ) as unknown as PredefinedMtplPackageType;

  if (!predefinedPackage) return;

  const initialValues = getOnClickChangeFields(
    data,
    formValues,
    predefinedPackage
  );

  if (!initialValues?.length) return;

  initialValues.forEach((item) => {
    const { fieldName, value } = item!;

    change(fieldName, value);
  });
};
