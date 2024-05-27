import {
  Field,
  UseFieldApiProps,
  useFieldApi,
  useFormApi,
} from '@data-driven-forms/react-form-renderer';
import { x } from '@xstyled/emotion';
import { FC, Fragment } from 'react';

import AnimatedContent from '@src/components/contents/AnimatedContent';
import { RadioWithInfoFieldType } from '@src/types/formFields';
import { getFormattedPrice } from '@src/utils/getFormattedPrice';
import Richtext from '@src/components/other/Richtext';
import Skeleton from '@src/components/other/Skeleton';

const CONTENT_PADDING = '1rem';

interface RadioWithInfoFieldProps extends RadioWithInfoFieldType {
  isChecked: boolean;
  onClick?: () => unknown;
}

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> &
  Pick<
    RadioWithInfoFieldType,
    | 'label'
    | 'price'
    | 'hideField'
    | 'hideNestedFields'
    | 'noPriceText'
    | 'hidePrice'
    | 'priceShortTerm'
  >;

const RadioWithInfoField: FC<RadioWithInfoFieldProps> = ({
  helper,
  fields,
  isChecked,
  showHelperWhenChecked,
  onClick,
  ...props
}) => {
  const { renderForm } = useFormApi();
  const {
    input,
    price,
    label,
    hideField,
    hideNestedFields,
    noPriceText,
    isDisabled,
    hidePrice,
    priceShortTerm,
  } = useFieldApi({
    ...props,
    type: 'checkbox',
  }) as UseFieldApiType;

  return (
    <x.div display={hideField ? 'none' : 'block'}>
      <x.div
        border="1px solid"
        borderColor={isChecked ? 'primary.greenDirect' : 'grayscale.gray4'}
        bg="primary.white"
        borderRadius="0.75rem"
        h="fit-content"
      >
        <x.label
          position="relative"
          cursor="pointer"
          color="primary.black"
          fontSize="0.75rem"
          fontWeight="500"
          fontFamily="text-sans"
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          p={CONTENT_PADDING}
          onClick={isDisabled ? undefined : onClick}
        >
          {isDisabled && (
            <x.div
              position="absolute"
              w="100%"
              h="100%"
              left={0}
              top={0}
              cursor="not-allowed"
              background="rgba(255, 255, 255, 0.3)"
              borderRadius="1.25rem"
            />
          )}

          <x.div display="flex">
            <x.span display="none">
              <input type="checkbox" {...input} />
            </x.span>

            <x.span
              marginTop="0.4375rem"
              alignSelf="flex-start"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="1.5rem"
              h="1.5rem"
              border="1px solid"
              borderColor="primary.greenDirect"
              bg="primary.white"
              borderRadius="50%"
              mr="1rem"
              flex="0 0 auto"
              cursor="pointer"
            >
              <x.span
                w="1rem"
                h="1rem"
                bg={isChecked ? 'primary.greenDirect' : 'primary.white'}
                borderRadius="50%"
                transition="background 300ms"
              />
            </x.span>

            <x.span
              display="flex"
              flexDirection="column"
              justifyContent="center"
              fontSize="0.875rem"
              lineHeight="1.125rem"
              color="primary.black"
              minHeight="2.25rem"
            >
              <x.span maxWidth="15.625rem">{label}</x.span>

              {!hidePrice &&
                (noPriceText ? (
                  <x.p
                    fontSize="0.875rem"
                    color="grayscale.gray2"
                    lineHeight="1.125rem"
                    fontWeight="500"
                    textAlign="left"
                  >
                    {noPriceText}
                  </x.p>
                ) : (
                  <x.span
                    fontWeight="500"
                    display="block"
                    color="grayscale.gray2"
                    lineHeight="1.125rem"
                    fontSize="0.875rem"
                  >
                    {price !== undefined ? (
                      <>
                        {getFormattedPrice({
                          price,
                          withYear: !priceShortTerm,
                        })}
                      </>
                    ) : (
                      <Skeleton skeletonProps={{ height: 18, width: 60 }} />
                    )}
                  </x.span>
                ))}
            </x.span>
          </x.div>
        </x.label>

        <AnimatedContent isOpen={!hideNestedFields}>
          <x.div
            display="flex"
            flexDirection="column"
            p={CONTENT_PADDING}
            pt="0"
            w="100%"
            gap="1.5rem"
          >
            {fields?.map((field) => (
              <Fragment key={field.name}>
                {renderForm([field as Field])}
              </Fragment>
            ))}
          </x.div>
        </AnimatedContent>
      </x.div>

      {showHelperWhenChecked && helper && (
        <x.div mt="0.5rem">
          <Richtext
            data={helper as string}
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
                borderColor: { _: 'grayscale.grayWarm', hover: 'transparent' },
              },
            }}
          />
        </x.div>
      )}
    </x.div>
  );
};

export default RadioWithInfoField;
