import {
  Field,
  useFieldApi,
  useFormApi,
} from '@data-driven-forms/react-form-renderer';
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import { x } from '@xstyled/emotion';
import { FC, Fragment, useEffect, useRef } from 'react';

import AnimatedContent from '@src/components/contents/AnimatedContent';
import Tag from '@src/components/contents/Tag';
import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { CardCheckboxAdditionalType } from '@src/types/formFields';
import { getFormattedPrice } from '@src/utils/getFormattedPrice';
import Richtext from '@src/components/other/Richtext';
import Skeleton from '@src/components/other/Skeleton';
import { useOnScreen } from '@src/hooks/useOnScreen';

const CardCheckboxAdditional: FC<CardCheckboxAdditionalType> = ({
  fields,
  tag,
  cardHelper,
  cardHelperLinkCss,
  ...props
}) => {
  const { label, input, price, priceShortTerm, hideField, removeField } =
    useFieldApi({ ...props, type: 'checkbox' });
  const isChecked = input.checked;
  const { renderForm, getFieldState } = useFormApi();
  const useStore = useFormStoreContext();
  const { pageMainCategory } = useStore((state) => state.dataLayer) || {};
  const sendDataToGTM = useGTMDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const componentIsVisible = useOnScreen(componentRef);

  useEffect(() => {
    if (!inputRef?.current || !getFieldState(input.name)?.modified) return;

    // Nějaké komponenty jsou doublované a GTM chceme posílat jen u těch viditelných
    if (!componentIsVisible) {
      return;
    }
    sendDataToGTM({
      event: `${pageMainCategory}_sjednavac_additional_${input.name}`,
      action: isChecked ? 'Přidání' : 'odebrání',
    });
  }, [isChecked]);

  if (removeField) {
    return null;
  }

  return (
    <x.div display={hideField ? 'none' : 'block'} ref={componentRef}>
      <x.div
        position="relative"
        maxW="26.4375rem"
        boxShadow="cardCheckbox"
        backgroundColor="primary.white"
        borderRadius="1.25rem"
      >
        {tag && <Tag>{tag}</Tag>}

        <x.label pb="1rem" cursor="pointer" userSelect="none">
          <x.span
            display="flex"
            alignItems="center"
            border="1px solid"
            borderColor={
              isChecked
                ? 'primary.greenDirect'
                : { _: 'grayscale.gray4', hover: 'primary.greenDirect' }
            }
            borderRadius="1.25rem"
            transition="border-color 300ms"
          >
            <x.span px="1.5rem">
              <x.span
                display="block"
                w="2.8125rem"
                h="1.5rem"
                borderRadius="50"
                background="linear-gradient(90deg, #EAF3AA 0%, #F2F5CC 100%)"
                p="0.25rem"
              >
                <x.span
                  display="block"
                  w="1rem"
                  h="1rem"
                  bg={isChecked ? 'primary.greenDirect' : 'primary.white'}
                  borderRadius="50%"
                  border="1px solid"
                  borderColor="primary.greenDirect"
                  position="relative"
                  left={isChecked ? 'calc(100% - 1rem)' : '0'}
                  transition="left 300ms, background 300ms"
                />
              </x.span>
            </x.span>
            <x.span
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
              borderRadius="1.25rem"
              px="1.5rem"
              py="1rem"
              minHeight="4.875rem"
              w="100%"
              background={
                isChecked
                  ? 'linear-gradient(90deg, #EAF3AA 0%, #F2F5CC 100%)'
                  : 'primary.white'
              }
              boxShadow="formBox"
              transition="background 300ms"
            >
              <x.strong
                fontSize="0.875rem"
                lineHeight="1.125rem"
                fontWeight={500}
              >
                {label}
              </x.strong>
              <AnimatedContent isOpen={!isChecked}>
                {price !== undefined ? (
                  <x.span
                    mt="0.125rem"
                    fontSize="1rem"
                    lineHeight="1.375rem"
                    color="grayscale.gray2"
                  >
                    {getFormattedPrice({ price })}
                  </x.span>
                ) : (
                  <Skeleton skeletonProps={{ height: 30, width: 100 }} />
                )}
              </AnimatedContent>
            </x.span>
          </x.span>
          <x.span display="none">
            <input type="checkbox" ref={inputRef} {...input} />
          </x.span>
        </x.label>
        <AnimatedContent isOpen={isChecked}>
          <x.div
            w="100%"
            position="relative"
            display="flex"
            flexDirection="column"
            px="1.5rem"
          >
            {fields?.length && (
              <x.div
                display="flex"
                borderBottom="1px solid"
                borderColor="grayscale.gray4"
                w="100%"
                flexDirection="column"
              >
                <x.div pt="1.5rem" pb="1.5rem">
                  {fields?.map((field) => (
                    <Fragment key={`${(field as Field).name}`}>
                      {renderForm([field as Field])}
                    </Fragment>
                  ))}
                </x.div>
              </x.div>
            )}
            <x.div
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              w="100%"
              py="1.5rem"
            >
              <x.div
                maxH="1.875rem"
                w="100%"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <x.p
                  alignSelf="flex-start"
                  fontSize="0.625rem"
                  lineHeight="0.875rem"
                  fontWeight="500"
                  color="primary.black"
                >
                  {priceShortTerm ? (
                    <>Cena{!isChecked && ' od'}:</>
                  ) : (
                    <>Cena za rok{!isChecked && ' od'}:</>
                  )}
                </x.p>
                <x.p
                  fontSize="1.75rem"
                  fontWeight="500"
                  color="primary.black"
                  lineHeight="1.875rem"
                  textAlign="right"
                >
                  {price !== undefined ? (
                    <>{getFormattedPrice({ price })}</>
                  ) : (
                    <Skeleton skeletonProps={{ height: 30, width: 100 }} />
                  )}
                </x.p>
              </x.div>
            </x.div>
          </x.div>
        </AnimatedContent>
      </x.div>

      {cardHelper && (
        <x.div mt="0.5rem">
          <Richtext
            data={cardHelper as string}
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
                borderColor: { _: 'grayscale.grayWarm', hover: 'transparent' },
                fontWeight: 'inherit',
                ...cardHelperLinkCss,
              },
            }}
          />
        </x.div>
      )}
    </x.div>
  );
};

export default CardCheckboxAdditional;
