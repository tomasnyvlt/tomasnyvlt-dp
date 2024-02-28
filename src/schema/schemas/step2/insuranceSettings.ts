import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
// import { INSURANCE_RADIO_FIELD_NAME } from "@src/schema/schemas/step2/insuranceOptions/constants";
// import { insuranceSelectOptions } from "@src/schema/schemas/step2/insuranceOptions/select";
// import { insuranceOptionShadowCopy } from "@src/schema/schemas/step2/insuranceOptions/shadowCopy";
import { packages } from '@src/schema/schemas/step2/packages';
import { paymentSetting } from '@src/schema/schemas/step2/paymentSetting';

export const insuranceSettings: SectionType = {
  component: 'section',
  name: getRandomId(),
  fields: [
    // insuranceOptionShadowCopy,
    // insuranceSelectOptions,
    packages,
    paymentSetting,
  ],
  // resolveProps: (_props, _fieldApi, formOptions) => {
  //   const { values } = formOptions.getState();
  //   const hideField: boolean = !values[INSURANCE_RADIO_FIELD_NAME] && !values.preloaded;

  //   return {
  //     hideField
  //   };
  // }
};
