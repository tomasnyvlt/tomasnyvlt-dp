import {
  Field,
  UseFieldApiProps,
  useFieldApi,
  useFormApi,
} from '@data-driven-forms/react-form-renderer';
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import { x } from '@xstyled/emotion';
import { Icon } from 'anolis-ui';
import { FC, useEffect, useRef } from 'react';

import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { EditFieldType } from '@src/types/formFields';
import { getFormattedPrice } from '@src/utils/getFormattedPrice';
import Richtext from '@src/components/other/Richtext';
import PenIcon from '@src/components/other/icons/24/pen.svg?react';
import Skeleton from '@src/components/other/Skeleton';

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> &
  Pick<
    EditFieldType,
    | 'label'
    | 'hideField'
    | 'helper'
    | 'price'
    | 'isPriceLoading'
    | 'priceShortTerm'
  >;

const EditField: FC<EditFieldType> = ({ fields, css, ...props }) => {
  const { renderForm, getFieldState } = useFormApi();
  const {
    input,
    label,
    hideField,
    helper,
    price,
    isPriceLoading,
    priceShortTerm,
  } = useFieldApi({
    ...props,
    type: 'checkbox',
  }) as UseFieldApiType;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const useStore = useFormStoreContext();
  const { pageMainCategory } = useStore((state) => state.dataLayer) || {};
  const sendDataToGTM = useGTMDispatch();

  const isChecked = input.checked;

  useEffect(() => {
    if (!inputRef?.current || !getFieldState(input.name)?.modified) return;

    sendDataToGTM({
      event: `${pageMainCategory ?? ''}_sjednavac_edit_field_${input.name}`,
      action: isChecked ? 'Otevření' : 'Zavření',
    });
  }, [isChecked]);

  return (
    <div>
      <x.label
        w="100%"
        px="1.5rem"
        pb="1.5rem"
        cursor="pointer"
        display={hideField ? 'none' : 'block'}
        {...css}
      >
        <x.span position="relative" data-sr-only>
          <x.input
            type="checkbox"
            position="absolute"
            opacity={0}
            {...input}
            ref={inputRef}
          />
        </x.span>

        <x.div pb="1.5rem" display={input.value ? 'block' : 'none'}>
          {fields?.map((field) => (
            <x.div w="100%" p="0" key={field.name}>
              {renderForm([field as Field])}
            </x.div>
          ))}
        </x.div>

        {!input.value && (
          <x.div w="100%" h="fit-content">
            <x.div
              w="100%"
              maxH={{ _: '4.375rem', sm: '3.75rem' }}
              h="100%"
              borderRadius="0.75rem"
              border="1px solid"
              borderColor="grayscale.gray4"
              display="flex"
              alignItems={{ _: 'flex-start', sm: 'center' }}
              flexDirection={{ _: 'column', sm: 'row' }}
              justifyContent={{ _: 'center', sm: 'space-between' }}
              px="1rem"
              py="1rem"
            >
              <x.div maxW={{ _: '10.875rem', sm: '45%' }}>
                <x.p
                  fontSize="0.875rem"
                  lineHeight="1.125rem"
                  color="primary.black"
                  fontWeight="500"
                >
                  {label}
                </x.p>
              </x.div>

              <x.p
                fontSize={{ _: '0.875rem', sm: '1rem' }}
                lineHeight={{ _: '1.125rem', sm: '1.375rem' }}
                marginRight={{ sm: '1.25rem' }}
                fontWeight="500"
                pr="1.1875rem"
                color="grayscale.gray2"
              >
                {Number.isNaN(price) || isPriceLoading ? (
                  <Skeleton skeletonProps={{ height: 30, width: 100 }} />
                ) : (
                  <>{getFormattedPrice({ price, withYear: !priceShortTerm })}</>
                )}
              </x.p>
              <x.span
                position="absolute"
                right="2.5rem"
                border="0"
                background="transparent"
                marginBottom="0.25rem"
              >
                <Icon fill="#230B34" svg={<PenIcon />} />
              </x.span>
            </x.div>
          </x.div>
        )}
      </x.label>

      {helper && (
        <x.div mt="0.5rem">
          <Richtext
            data={helper}
            gtmActionPrefix={`${pageMainCategory ?? ''}_sjednavac_richtext_${input.name}`}
            styles={{
              _p: {
                fontFamily: 'text-sans',
                fontSize: '0.625rem',
                lineHeight: '0.875rem',
                color: 'grayscale.grayWarm',
                fontWeight: 400,
              },
              _a: {
                fontSize: 'inherit',
                color: 'grayscale.grayWarm',
                fontFamily: 'text-sans',
                fontWeight: 'inherit',
                borderColor: { _: 'grayscale.grayWarm', hover: 'transparent' },
              },
            }}
          />
        </x.div>
      )}
    </div>
  );
};

export default EditField;
