import {
  Field,
  UseFieldApiProps,
  useFieldApi,
  useFormApi,
} from '@data-driven-forms/react-form-renderer';
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import { x } from '@xstyled/emotion';
import { Icon } from 'anolis-ui';
import {
  FC,
  Fragment,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
} from 'react';

import AnimatedContent from '@src/components/contents/AnimatedContent';
import { useFieldError } from '@src/hooks/useFieldError';
import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { CardCheckboxType } from '@src/types';
import { getFormattedPrice } from '@src/utils/getFormattedPrice';
import Richtext from '@src/components/other/Richtext';
import Skeleton from '@src/components/other/Skeleton';
import MultiplyIcon from '@src/components/other/icons/24/multiply.svg?react';
import PlusIcon from '@src/components/other/icons/24/plus.svg?react';
import DirectButton from '@src/components/other/DirectButton';

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> &
  Pick<
    CardCheckboxType,
    | 'label'
    | 'price'
    | 'defaultSalesDiscount'
    | 'editMode'
    | 'isDisabled'
    | 'noPriceText'
    | 'isPriceLoading'
    | 'css'
    | 'hideField'
    | 'priceShortTerm'
  >;

const CardCheckbox: FC<CardCheckboxType> = ({
  fields,
  helper,
  editFields,
  ...props
}) => {
  const {
    label,
    input,
    price,
    defaultSalesDiscount,
    editMode,
    isDisabled,
    meta,
    noPriceText,
    isPriceLoading,
    css,
    hideField,
    priceShortTerm,
  } = useFieldApi({
    ...props,
    type: 'checkbox',
  }) as UseFieldApiType;
  const { renderForm, change, getFieldState } = useFormApi();
  const { isError, error } = useFieldError({ name: input.name, meta });
  const sendDataToGTM = useGTMDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const useStore = useFormStoreContext();
  const { pageMainCategory } = useStore((state) => state.dataLayer) || {};

  const isChecked = input.checked;

  const deactivateEditFields = () => {
    editFields?.map((editField) => change(editField, false));
  };

  const toggleChecked = (): void => {
    if (!inputRef?.current) return;

    inputRef.current.click();
  };

  // Prevent click on whole label if checked - click card only with close button
  const handleLabelClick = (event: MouseEvent<HTMLLabelElement>): void => {
    if (!isChecked) return;

    event.preventDefault();
  };

  useEffect(() => {
    if (!inputRef?.current || !getFieldState(input.name)?.modified) return;

    sendDataToGTM({
      event: `${pageMainCategory ?? ''}_sjednavac_card_checkbox_${input.name}`,
      action: isChecked ? 'Otevření' : 'Zavření',
    });
  }, [isChecked]);

  const handleLabelKeyDown = (event: KeyboardEvent<HTMLLabelElement>): void => {
    const key = event.code;

    if (key !== 'Space' && key !== 'Enter') return;

    event.preventDefault();
    toggleChecked();
  };

  return (
    <x.div
      position="relative"
      display={hideField ? 'none' : 'flex'}
      flexDirection="column"
      {...css}
    >
      {editMode && (
        <DirectButton
          v="link"
          position="absolute"
          top="1.375rem"
          right="1rem"
          h="auto"
          pt={0}
          pb={0}
          pl={0}
          pr={0}
          border={0}
          color="tercial.indigo1"
          fontSize="0.875rem"
          lineHeight="1.125rem"
          onClick={deactivateEditFields}
          zIndex={1}
        >
          Hotovo
        </DirectButton>
      )}
      <x.label
        pb={isChecked ? '1rem' : 0}
        cursor={isDisabled || isChecked ? 'default' : 'pointer'}
        pointerEvents={isDisabled ? 'none' : 'auto'}
        onClick={handleLabelClick}
        {...(!isChecked && {
          tabIndex: 0,
          onKeyDown: handleLabelKeyDown,
          borderRadius: '1rem',
          outlineColor: { '&:focus-visible': 'primary.greenDirect' },
          outlineWidth: {
            '&:focus': 'none',
            '&:focus-visible': '2px',
          },
          outlineOffset: '1px',
          role: 'button',
        })}
      >
        <x.span
          py={isChecked ? '1.5rem' : '1rem'}
          w="100%"
          background={
            isChecked
              ? 'linear-gradient(90deg, #EAF3AA 0%, #F0F6C3 100%)'
              : 'primary.white'
          }
          transition="background-color 300ms"
          h="fit-content"
          border={isChecked ? '0' : '1px solid'}
          borderColor={isError ? 'tercial.red1' : 'grayscale.gray4'}
          borderRadius="1rem"
          display="flex"
          justifyContent={isChecked ? 'space-between' : 'flex-start'}
          alignItems="center"
          position="relative"
          // Prevent height jump when input is disabled (icon is unmounted)
          {...(isChecked && { minHeight: '5.5rem' })}
        >
          <x.span display="none">
            <input
              type="checkbox"
              {...input}
              disabled={isDisabled}
              ref={inputRef}
            />
          </x.span>

          {!editMode && !isDisabled && (
            <x.span
              order={isChecked ? 2 : 1}
              ml={isChecked ? 0 : '1.5rem'}
              mr={isChecked ? '1rem' : 0}
              w="2.5rem"
              h="2.5rem"
              pb={isChecked ? '1rem' : 0}
              borderRadius="3.125rem"
              background={
                isChecked
                  ? 'transparent'
                  : 'linear-gradient(90deg, #EAF3AA 0%, #F0F6C3 100%)'
              }
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as="span"
                svg={isChecked ? <MultiplyIcon /> : <PlusIcon />}
                {...(isChecked && {
                  as: 'button',
                  'aria-label': `Odebrat ${label}`,
                  appearance: 'none',
                  cursor: 'pointer',
                  border: 0,
                  borderRadius: '3.125rem',
                  bg: 'transparent',
                  outline: {
                    '&:focus': 'none',
                    '&:focus-visible': '2px solid',
                  },
                  outlineColor: { '&:focus-visible': 'primary.greenDirect' },
                  type: 'button',
                  onClick: toggleChecked,
                })}
              />
            </x.span>
          )}

          <x.span
            order={isChecked ? 1 : 2}
            pb={isChecked ? '1rem' : 0}
            color="primary.black"
            ml="2rem"
            fontWeight={isChecked ? 600 : 500}
            fontSize="1rem"
            fontFamily="text-sans"
          >
            {label}
          </x.span>
        </x.span>
      </x.label>

      <x.div
        boxShadow="cardCheckbox"
        borderRadius="1.25rem"
        position="relative"
        marginTop={isChecked ? '-2.25rem' : '0'}
        bg="primary.white"
        transition="margin 300ms"
      >
        <AnimatedContent isOpen={isChecked}>
          <div>
            <x.div
              w="100%"
              alignItems="center"
              flexDirection="column"
              justifyContent="space-around"
            >
              <x.div w="100%">
                {fields?.map((field) => (
                  <Fragment key={(field as Field).name}>
                    {renderForm([field as Field])}
                  </Fragment>
                ))}
              </x.div>

              <x.div w="100%" px="1.5rem">
                <x.div
                  py="1.5rem"
                  borderTop="1px solid"
                  borderColor="grayscale.gray4"
                >
                  <x.div
                    display="grid"
                    gridTemplateColumns="1fr 1fr"
                    alignItems="center"
                    gap="0.5rem"
                  >
                    <x.div
                      maxH="1.75rem"
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-start"
                    >
                      <x.p
                        fontSize="0.625rem"
                        lineHeight="0.875rem"
                        color="primary.black"
                        fontWeight="500"
                      >
                        Cena{!priceShortTerm && ' za rok'}:
                      </x.p>
                      {!!defaultSalesDiscount && (
                        <x.p
                          fontSize="0.625rem"
                          lineHeight="0.875rem"
                          color="primary.greenDirectDarker"
                          fontWeight="500"
                        >
                          (Cena včetně slevy{' '}
                          {Math.round(defaultSalesDiscount * 100)}&nbsp;%)
                        </x.p>
                      )}
                    </x.div>
                    {noPriceText ? (
                      <x.div display="flex" justifyContent="flex-end">
                        <x.p
                          fontSize="0.625rem"
                          color="primary.black"
                          lineHeight="0.875rem"
                          fontWeight="500"
                          textAlign="right"
                          maxWidth="10rem"
                        >
                          {noPriceText}
                        </x.p>
                      </x.div>
                    ) : (
                      <x.p
                        fontSize="1.75rem"
                        color="primary.black"
                        lineHeight="1.875rem"
                        fontWeight="500"
                        textAlign="right"
                      >
                        {Number.isNaN(price) || isPriceLoading ? (
                          <Skeleton
                            skeletonProps={{ height: 30, width: 120 }}
                          />
                        ) : (
                          <>{getFormattedPrice({ price })}</>
                        )}
                      </x.p>
                    )}
                  </x.div>
                </x.div>
              </x.div>
            </x.div>
          </div>
        </AnimatedContent>
      </x.div>

      {helper && (
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
                fontFamily: 'text-sans',
                fontWeight: 'inherit',
                borderColor: { _: 'grayscale.grayWarm', hover: 'transparent' },
              },
            }}
          />
        </x.div>
      )}

      {isError && (
        <x.p color="tercial.red1" mt="0.25rem" fontSize="0.875rem">
          {error}
        </x.p>
      )}
    </x.div>
  );
};

export default CardCheckbox;
