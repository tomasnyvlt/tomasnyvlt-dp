import { PreventNextStepType } from '@src/types';
import getDeepObjectValue from '@src/utils/getDeepObjectValue';

const getPreventNextStepDependency = (
  preventConfig: PreventNextStepType[] | undefined,
  values: Record<string, string>
): string | null => {
  if (!preventConfig?.length) return null;

  const fieldsArr = preventConfig.flat().map((item) => item.fieldNames);
  const fields = fieldsArr.flat();

  if (!fields?.length) return null;

  const keysArr = fields.map((item) => item.split('.'));
  const valuesByKeys = keysArr.map((fieldKeyArr) => {
    return getDeepObjectValue({ obj: values, keys: fieldKeyArr });
  });

  return JSON.stringify(valuesByKeys);
};

export default getPreventNextStepDependency;
