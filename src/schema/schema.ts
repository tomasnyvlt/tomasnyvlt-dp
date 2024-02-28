import { SchemaType } from '@src/types';
import DiscountSettings from '@src/schema/components/DiscountSettings';
import FeatureFlags from '@src/schema/components/FeatureFlags';
import RestCalculation from '@src/schema/components/RestCalculation';
import RestValidation from '@src/schema/components/RestValidation';
import TestData from '@src/schema/components/TestData';
import { CAR_INSURANCE_FORM_BODY_LS_KEY } from '@src/schema/constants';
import {
  cartFields,
  ownTemplateSchema,
  suitabilityRecordModalSchema,
} from '@src/schema/schemas/cart';
import { FIELD_NAMES } from '@src/schema/schemas/constants/fieldNames';
import { preventLastStepClick } from '@src/schema/schemas/preventLastStepClick';
import bonusCalculationSection from '@src/schema/schemas/step1/bonusCalculationSection';
import { insuranceDate } from '@src/schema/schemas/step1/insuranceDate';
import insuredInfoSection from '@src/schema/schemas/step1/insuredInfoSection';
import occupantInfoSection from '@src/schema/schemas/step1/occupantInfoSection';
import { vehicleBrandModelType } from '@src/schema/schemas/step1/vehicleBrandModelType';
import { vehicleEngine } from '@src/schema/schemas/step1/vehicleEngine';
import { vehicleInfoOverview } from '@src/schema/schemas/step1/vehicleInfoOverview';
import { vehicleIntroText } from '@src/schema/schemas/step1/vehicleIntroText';
import { vehicleSpzFetch } from '@src/schema/schemas/step1/vehicleSpzFetch';
// import { insuranceIntroText } from "@src/schema/schemas/step2/insuranceIntroText";
// import { insuranceRadioOptions } from "@src/schema/schemas/step2/insuranceOptions/radio";
import { insuranceSettings } from '@src/schema/schemas/step2/insuranceSettings';
import { additionalVehicleInfo } from '@src/schema/schemas/step3/additionalVehicleInfo';
import { entityAddress } from '@src/schema/schemas/step3/entityAddress';
import { headingSection } from '@src/schema/schemas/step3/headingSection';
import { insureeInfo } from '@src/schema/schemas/step3/insureeInfo';
import { operator } from '@src/schema/schemas/step3/operator';
import { owner } from '@src/schema/schemas/step3/owner';
import { ownerAndOperatorSection } from '@src/schema/schemas/step3/ownerAndOperatorSection';
import { checkboxSection } from '@src/schema/schemas/step4/checkboxSection';
import { contactEntity } from '@src/schema/schemas/step4/contactEntity';
import { contractEntites } from '@src/schema/schemas/step4/contractEntities';
import { documentsDownload } from '@src/schema/schemas/step4/documentsDownload';
import { frequencyPayment } from '@src/schema/schemas/step4/frequencyPayment';
import { infoSection } from '@src/schema/schemas/step4/infoSection';
import { insuranceRecap } from '@src/schema/schemas/step4/insuranceRecap';
import { insuranceStart } from '@src/schema/schemas/step4/insuranceStart';
import { photoInstructions } from '@src/schema/schemas/step4/photoInstructions';
import { recapHeading } from '@src/schema/schemas/step4/recapHeading';
import { vehicleInspection } from '@src/schema/schemas/step4/vehicleInspection';
import { vehicleRecap } from '@src/schema/schemas/step4/vehicleRecap';
import { instructions } from '@src/schema/schemas/step5/instructions';
import { payment } from '@src/schema/schemas/step5/payment';

const schema: SchemaType = {
  fields: [
    {
      component: 'wizard',
      name: 'customWizard',
      localStorageKey: CAR_INSURANCE_FORM_BODY_LS_KEY,
      formType: 'autosjednavac',
      cart: {
        activeOnSteps: [1, 2],
        cartFields,
        suitabilityRecordModal: {
          id: 'zaznam-z-jednani',
          schema: suitabilityRecordModalSchema,
          ownTemplateSchema,
        },
      },
      stepper: {
        hiddenOnSteps: [4],
        hiddenSteps: [4],
        preventFunctionsOnStep: [4],
        restartFormOnLastStepPrev: true,
      },
      requiredInfo: {
        hiddenOnSteps: [0, 1, 2, 3, 4],
      },
      navigationButtons: {
        activeOnSteps: [0, 1, 2, 3],
        next: {
          labelArr: [...Array(3).fill(null), 'Sjednat'],
        },
      },
      chat: {
        activeOnSteps: [1, 2, 3],
      },
      onBlurConfig: {
        activeOnSteps: [0, 1, 2, 3],
        componentNames: [
          'text-field',
          'range-field',
          'smartform-field',
          'masked-number-field',
          'masked-pattern-field',
        ],
      },
      dataLayer: {
        visitorLoginState: 'zákazník',
        pageType: 'sjednávač',
        pageDepartment: 'Pojištění pro lidi',
        pageMainCategory: 'Autopojištění',
      },
      customComponents: [
        {
          Component: RestCalculation,
          key: 'rest-calculation',
        },
        {
          Component: RestValidation,
          key: 'rest-validation',
        },
        {
          Component: FeatureFlags,
          key: 'ff',
        },
        {
          Component: DiscountSettings,
          key: 'discount',
        },
        {
          Component: TestData,
          key: 'test-data',
        },
      ],
      fields: [
        {
          component: 'step',
          name: 'step-1',
          title: 'Vozidlo a váš bonus',
          dataLayer: {
            virtualPageUrl: '/auto/sjednavac/zakladni-informace',
            virtualPageTitle: 'Vozidlo a váš bonus',
          },
          maxWidth: '40.4375rem',
          fields: [
            vehicleIntroText,
            vehicleSpzFetch,
            vehicleInfoOverview,
            vehicleBrandModelType,
            vehicleEngine,
            bonusCalculationSection,
            occupantInfoSection,
            insuredInfoSection,
            insuranceDate,
          ],
        },
        {
          component: 'step',
          name: 'step-2',
          title: 'Pojištění vozidla',
          dataLayer: {
            virtualPageUrl: '/auto/sjednavac/nabidka',
            virtualPageTitle: 'Pojištění vozidla',
          },
          maxWidth: '58.375rem',
          // TODO Return when Netflix is back
          // hideBottomElementsWhen: {
          //   type: "and",
          //   fields: [
          //     // {
          //     //   fieldName: INSURANCE_RADIO_FIELD_NAME,
          //     //   value: undefined
          //     // },
          //     {
          //       fieldName: "preloaded",
          //       value: undefined
          //     }
          //   ]
          // },
          sendToGTMOnNext: (values) => {
            const someAdditionals =
              values?.additionals?.baggageLimit ||
              values?.additionals?.directClaimManagement ||
              values?.additionals?.glassLimit ||
              values?.additionals?.injuryLimitCheckbox ||
              values?.additionals?.parents ||
              values?.additionals?.premiumWarranty;

            return {
              event: 'sjednavac_auto_nabidka',
              // TODO Return when Netflix is back
              // typ_nabidky: { "option-11": "Základ", "option-12": "Nejvýhodnější", "option-13": "Sestavím si sám" }[
              //   values?.insuranceSelectOptions.value as string
              // ],
              limit_pojisteni: values?.mtpl?.basicLimit,
              assistance: {
                PERSONAL_V1: `Základní (S) ${
                  values?.assistance?.malfunctionAssistance
                    ? '- s pomocí'
                    : '- bez pomoci'
                }`,
                PERSONAL_V2: 'Doporučená (M)',
                PERSONAL_V3: 'Rozšířená (L)',
                TIR_V1: 'TIR_V1',
                TIR_V2: 'TIR_V2',
              }[values?.assistance.variantCode as string],
              nahradni_vozidlo:
                Number(values?.assistance?.carReplacementBoolean) === 1
                  ? 'Ano'
                  : 'Ne',
              havarijni_pojisteni:
                values.casco.packageId === 'id2' ||
                values.casco.packageId === 'id3' ||
                (values.casco.packageId === 'id4' &&
                  values.casco.fakePackage4Price)
                  ? 'Ano'
                  : 'Ne',
              doplnkova_pojisteni: someAdditionals
                ? `${values?.additionals.baggageLimit ? 'Pojištění dětských sedaček a zavazadel, ' : ''}${
                    values?.additionals.directClaimManagement
                      ? 'Pojištění nezaviněné bouračky, '
                      : ''
                  }${values?.additionals.glassLimit ? 'Pojištění skel, ' : ''}${
                    values?.additionals.injuryLimitCheckbox
                      ? 'Úrazové pojištění řidiče a cestujícího, '
                      : ''
                  }${values?.additionals.parents ? 'Pojištění smrti obou rodičů ve vozidle, ' : ''}${
                    values?.additionals.premiumWarranty
                      ? 'Garance ceny pojištění na 3 roky, '
                      : ''
                  }`
                : 'Ne',
              frekvence_placeni: {
                ANNUALY: 'Ročně',
                SEMIANNUALY: 'Pololetně',
                QUARTERLY: 'Čtvrtletně',
                SINGLE: 'Jednorázová platba (bez frekvence)',
              }[values?.[FIELD_NAMES.FREQUENCY_CODE] as string],
            };
          },
          fields: [
            // insuranceIntroText,
            // insuranceRadioOptions,
            insuranceSettings,
            // carousels
          ],
        },
        {
          component: 'step',
          name: 'step-3',
          maxWidth: '40.4375rem',
          title: 'Pojištění vozidla',
          dataLayer: {
            virtualPageUrl: '/auto/sjednavac/doplnujici-informace',
            virtualPageTitle: 'Pojištění vozidla',
          },
          fields: [
            headingSection,
            additionalVehicleInfo,
            insureeInfo,
            entityAddress,
            ownerAndOperatorSection,
            operator,
            owner,
          ],
        },
        {
          component: 'step',
          maxWidth: '40.4375rem',
          name: 'step-4',
          title: 'Rekapitulace',
          dataLayer: {
            virtualPageUrl: '/auto/sjednavac/souhrn',
            virtualPageTitle: 'Rekapitulace',
          },
          preventNextStep: preventLastStepClick,
          fields: [
            recapHeading,
            vehicleRecap,
            insuranceRecap,
            contractEntites,
            frequencyPayment,
            insuranceStart,
            vehicleInspection,
            photoInstructions,
            contactEntity,
            documentsDownload,
            infoSection,
            checkboxSection,
          ],
        },
        {
          component: 'step',
          maxWidth: '54.25rem',
          name: 'step-5',
          title: '',
          dataLayer: {
            virtualPageUrl: '/auto/sjednavac/platba',
            virtualPageTitle: 'Platba',
          },
          fields: [payment, instructions],
        },
      ],
    },
  ],
};

export default schema;
