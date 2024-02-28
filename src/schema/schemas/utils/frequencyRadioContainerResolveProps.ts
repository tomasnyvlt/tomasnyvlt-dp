import {
  AnyObject,
  FieldApi,
  FormOptions,
} from '@data-driven-forms/react-form-renderer';

import { RadioFrequencyButtonOptionFieldType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import { FIELD_NAMES } from '@src/schema/schemas/constants/fieldNames';
import { AutoSjednavacFetchRequestType } from '@src/schema/types/AutoSjednavacFetchType';
import { coreCcEnumerationsFrequency } from '@src/codetables/generated/core-cc-enumerations-frequency';

type ExtendedResolvePropsFunction = (
  props: AnyObject,
  fieldApi: FieldApi<any>,
  formOptions: FormOptions,
  optionSize?: RadioFrequencyButtonOptionFieldType['size']
) => AnyObject;

export const frequencyRadioContainerResolveProps: ExtendedResolvePropsFunction =
  (_props, _fieldApi, formOptions, optionSize = 'lg') => {
    const { installmentOptions } = getFetcherData('autosjednavac') || {};

    const { change, getState } = formOptions;
    const { values } = getState();

    const isShortTerm = values?.[FIELD_NAMES.LENGTH_INSURANCE];
    const frequencyCodeValue = values?.[FIELD_NAMES.FREQUENCY_CODE];

    // Do not show options with price lower than 500 except annualy
    const MIN_OPTION_VALUE = 500;

    const options: RadioFrequencyButtonOptionFieldType[] = installmentOptions
      ?.filter(
        (option) =>
          option.frequencyCode === 'ANNUALY' ||
          option.installmentValue > MIN_OPTION_VALUE
      )
      ?.map(({ frequencyCode, installmentValue }) => ({
        label:
          coreCcEnumerationsFrequency.find(
            (frequency) => frequency.code === frequencyCode
          )?.langDescription || frequencyCode,
        price: installmentValue,
        value: frequencyCode,
        frequency: { ANNUALY: 1, SEMIANNUALY: 2, QUARTERLY: 4, SINGLE: 1 }[
          frequencyCode
        ],
        size: optionSize,
      }));

    const isValueInOptions = options.some(
      (option) => option.value === frequencyCodeValue
    );

    /**
     * If value is not in options, set last option as value
     * this can happen when discount changes and is so big that selected frequency disappears.
     *
     * Do not set when it is shortTerm. Short term SINGLE / ANNUAL logic is handled in different conditions
     * on step1 (checkbox length insurance).
     */
    if (!isValueInOptions && !!options.length && !isShortTerm) {
      const lastOptionValue = options.at(-1)
        ?.value as AutoSjednavacFetchRequestType['frequencyCode'];

      // Set new value only when new options were set (do not set "SINGLE" when insurance is not short term)
      if (lastOptionValue !== 'SINGLE') {
        change(FIELD_NAMES.FREQUENCY_CODE, lastOptionValue);
      }
    }

    return {
      options,
    };
  };
