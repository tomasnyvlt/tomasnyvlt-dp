import {
  ActiveUserType,
  FieldsBasicType,
  PreventNextStepType,
  StepType,
} from '@src/types';
import { ArrWithObjectsType } from '@src/utils/getFlattenArrayByKey';

export interface PreventNextStepConfigType extends PreventNextStepType {
  fields: Array<FieldsBasicType | undefined>;
}

interface Props {
  flattenFields: ArrWithObjectsType;
  wizardFields: StepType[];
  activeUserType: ActiveUserType;
}

const getPreventNextStepConfig = ({
  flattenFields,
  wizardFields,
  activeUserType,
}: Props): Array<PreventNextStepConfigType[] | undefined> => {
  const configArr: Array<
    (PreventNextStepConfigType | undefined)[] | undefined
  > = wizardFields.map((step) => {
    if (!step.preventNextStep) return undefined;

    const stepConfig: (PreventNextStepConfigType | undefined)[] =
      step.preventNextStep.map((preventConfig) => {
        const { fieldNames, userType } = preventConfig || {};

        // Filter out fields that are not for current user type
        if (userType?.length && !userType.includes(activeUserType)) {
          return undefined;
        }

        const fields = fieldNames.map((fieldName) => {
          const field = flattenFields.find(
            (flattenField) => flattenField.name === fieldName
          );

          return field as FieldsBasicType;
        });

        // Filter out fields without validate function - they are not needed
        const filteredFields = fields.filter((field) => !!field?.validate);

        return {
          ...preventConfig,
          fields: filteredFields,
        };
      });

    return stepConfig;
  });

  // Filter out undefined fields in nested config array
  const filteredConfigArr: Array<PreventNextStepConfigType[] | undefined> =
    configArr.map((stepConfig) => {
      if (!stepConfig) return undefined;

      return stepConfig.filter(Boolean) as PreventNextStepConfigType[];
    });

  return filteredConfigArr;
};

export default getPreventNextStepConfig;
