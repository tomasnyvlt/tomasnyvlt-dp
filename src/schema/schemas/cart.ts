import { VALIDATION_MESSAGE } from '@src/constants/validation';
import { CartFieldsType, LayoutFieldsType, SectionType } from '@src/types';
import { getFetcherReqBody } from '@src/utils/getFetcherReqBody';
import getRandomId from '@src/utils/getRandomId';
import {
  FIELD_NAMES,
  SUITABILITY_RECORD_FIELD_NAME_PREFIX,
} from '@src/schema/schemas/constants/fieldNames';
import config from '@src/config';
import dpApiFetch from '@src/utils/dpApiFetch';

const cartFields: CartFieldsType[] = [
  {
    component: 'checkbox-field',
    name: FIELD_NAMES.ADDITIONALS.PREMIUM_WARRANTY,
    label: JSON.stringify({
      blocks: [
        {
          key: 'bqubj',
          text: 'Garance ceny pojištění na 3 roky',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    }),
    variant: 'cart',
    priceFetcherDataAttr: 'additionals.premiumWarranty.price',
    initialValue: false,
    condition: {
      when: FIELD_NAMES.LENGTH_INSURANCE,
      is: false,
    },
    helper:
      '{"blocks":[{"key":"bqubj","text":"Co myslíme garancí ceny?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":24,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=garance-ceny","targetOption":"_self"}}}}',
    helperCss: {
      color: 'grayscale.gray1',
      border: 0,
      textDecoration: 'underline',
      fontWeight: '400',
    },
  },
];

export const SUITABILITY_RECORD_FIELDS = {
  request: `${SUITABILITY_RECORD_FIELD_NAME_PREFIX}.request`,
  recommendation: `${SUITABILITY_RECORD_FIELD_NAME_PREFIX}.recommendation`,
  difference: `${SUITABILITY_RECORD_FIELD_NAME_PREFIX}.difference`,
};

const SUITABILITY_RECORD_IS_LOADING_CHECKBOX = 'suitabilityRecordIsLoading';
// getFieldState returns undefined on initial modal open and initial resolve props
// before any value is changed, so we need to trigger resolveProps again by checkbox value change
const SUITABILITY_VALIDATION_TRIGGER_CHECKBOX =
  'suitabilityRecordValidationTrigger';
export const SUITABILITY_RECORD_HAS_OWN_TEMPLATE = `${SUITABILITY_RECORD_FIELD_NAME_PREFIX}.ownTemplate`;

const suitabilityRecordModalSchema: SectionType[] = [
  {
    component: 'section',
    name: getRandomId(),
    fields: [
      {
        component: 'checkbox-field',
        css: { display: 'none' },
        name: SUITABILITY_RECORD_IS_LOADING_CHECKBOX,
        label: '',
      },
      {
        component: 'checkbox-field',
        css: { display: 'none' },
        name: SUITABILITY_VALIDATION_TRIGGER_CHECKBOX,
        initialValue: false,
        label: '',
      },
      {
        component: 'box',
        name: getRandomId(),
        css: {
          mb: '1.75rem',
        },
        fields: [
          {
            component: 'text-field',
            name: SUITABILITY_RECORD_FIELDS.request,
            label: 'Požadavky Vašimi slovy',
            isRequired: true,
            textarea: true,
            validate: [
              { type: 'required', message: VALIDATION_MESSAGE.required },
            ],
            resolveProps: (_props, _fieldApi, formOptions) => {
              const { values } = formOptions.getState();

              return {
                isDisabled: values[SUITABILITY_RECORD_IS_LOADING_CHECKBOX],
              };
            },
          },
        ],
      },
      {
        component: 'box',
        name: getRandomId(),
        css: {
          mb: '1.75rem',
        },
        fields: [
          {
            component: 'text-field',
            name: SUITABILITY_RECORD_FIELDS.recommendation,
            label: 'Doporučení',
            isRequired: true,
            textarea: true,
            validate: [
              { type: 'required', message: VALIDATION_MESSAGE.required },
              {
                type: 'min-length',
                threshold: 11,
                message: 'Minimální délka musí být 11 znaků.',
              },
            ],
            resolveProps: (_props, _fieldApi, formOptions) => {
              const { values } = formOptions.getState();

              return {
                isDisabled: values[SUITABILITY_RECORD_IS_LOADING_CHECKBOX],
              };
            },
          },
        ],
      },
      {
        component: 'box',
        name: getRandomId(),
        fields: [
          {
            component: 'text-field',
            name: SUITABILITY_RECORD_FIELDS.difference,
            label: 'Nesrovnalosti mezi požadovaným a nabízeným pojištěním',
            isRequired: true,
            textarea: true,
            validate: [
              { type: 'required', message: VALIDATION_MESSAGE.required },
              {
                type: 'min-length',
                threshold: 6,
                message: 'Minimální délka musí být 6 znaků.',
              },
            ],
            resolveProps: (_props, _fieldApi, formOptions) => {
              const { values } = formOptions.getState();

              return {
                isDisabled: values[SUITABILITY_RECORD_IS_LOADING_CHECKBOX],
              };
            },
          },
        ],
      },
    ],
  },
  {
    component: 'section',
    variant: 'withBorder',
    name: getRandomId(),
    css: {
      pt: '2.5rem',
    },
    fields: [
      {
        component: 'info-box',
        name: getRandomId(),
        variant: 'infoNoBorder',
        content: JSON.stringify({
          blocks: [
            {
              key: 'bqubj',
              text: 'Klient dostane záznam na e-mail.',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        }),
      },
      {
        component: 'box',
        name: getRandomId(),
        css: {
          mt: '1.875rem',
          mx: 'auto',
        },
        fields: [
          {
            component: 'button-field',
            label: 'Vygenerovat náhled v PDF',
            name: getRandomId(),
            variant: 'gradient',
            resolveProps: (_props, _fieldApi, formOptions) => {
              const reqBody = getFetcherReqBody('autosjednavac');
              const { getFieldState, getState, change } = formOptions;
              const { values: formValues } = getState();

              const isFormValid = Object.values(
                SUITABILITY_RECORD_FIELDS
              ).every((field) => {
                const fieldState = getFieldState(field);

                // Field is not registered - trigger resolveProps again in timeout
                if (!fieldState?.name) {
                  window.setTimeout(() => {
                    change(
                      SUITABILITY_VALIDATION_TRIGGER_CHECKBOX,
                      !formValues?.[SUITABILITY_VALIDATION_TRIGGER_CHECKBOX]
                    );
                  }, 100);
                }

                return fieldState?.valid;
              });

              const values = formValues?.[SUITABILITY_RECORD_FIELD_NAME_PREFIX];

              const onClick = async () => {
                const body = {
                  ...reqBody,
                  saveCalculation: true,
                  getPackages: undefined,
                  getApplicableLimitsOnly: undefined,
                  getLimits: undefined,
                  suitabilityRecord: {
                    post: false,
                    insurers: [],
                    ...values,
                  },
                };

                try {
                  change(SUITABILITY_RECORD_IS_LOADING_CHECKBOX, true);

                  const response = await dpApiFetch({
                    method: 'POST',
                    url: `${config.directApiUrl}/api/latest/rest/vehicle/insurance/v5/suitability-record/pdf`,
                    body,
                    headers: {
                      'x-source': 'WEB_VEHICLE_R',
                    },
                    nonJsonResponse: true,
                  });

                  const blob = await response.blob();
                  const blobPdf = new Blob([blob], { type: 'application/pdf' });

                  const objectUrl = window.URL.createObjectURL(blobPdf);
                  const link = document.createElement('a');
                  link.href = objectUrl;
                  link.download = 'zaznam_z_jednani.pdf';
                  link.click();
                } catch (error) {
                  // eslint-disable-next-line no-console
                  console.log(error);
                } finally {
                  change(SUITABILITY_RECORD_IS_LOADING_CHECKBOX, false);
                }
              };

              const isLoading = getFieldState(
                SUITABILITY_RECORD_IS_LOADING_CHECKBOX
              )?.value;

              const isDisabled = isLoading || !isFormValid;

              return {
                onClick,
                isLoading,
                disabled: isDisabled,
              };
            },
          },
        ],
      },
    ],
  },
];

const ownTemplateSchema: LayoutFieldsType[] = [
  {
    component: 'box',
    name: getRandomId(),
    css: {
      display: {
        _: 'none',
        sm: 'flex',
      },
      alignSelf: 'stretch',
      alignItems: 'center',
      borderLeft: '1px solid',
      borderColor: 'primary.white',
      pl: '1rem',
      pr: '2rem',
    },
    fields: [
      {
        component: 'checkbox-field',
        name: SUITABILITY_RECORD_HAS_OWN_TEMPLATE,
        checkboxColor: 'white',
        checkboxBorderColor: 'white',
        label: JSON.stringify({
          blocks: [
            {
              key: 'bqubj',
              text: 'Mám vlastní záznam\nz jednání',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [
                { offset: 0, length: 40, style: 'color-#fff' },
              ],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        }),
        validate: [{ type: 'required', message: VALIDATION_MESSAGE.required }],
      },
    ],
  },
];

export { cartFields, suitabilityRecordModalSchema, ownTemplateSchema };
