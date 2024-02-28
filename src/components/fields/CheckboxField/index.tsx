import {
  UseFieldApiProps,
  useFieldApi,
} from '@data-driven-forms/react-form-renderer';
import { x } from '@xstyled/emotion';
import { Icon } from 'anolis-ui';
import { FC, useRef, useState } from 'react';

import {
  accentColors,
  borderColors,
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
} from '@src/components/fields/CheckboxField/theme/styles';
import getAsteriskLabel from '@src/components/fields/CheckboxField/utils/getAsteriskLabel';
import Field from '@src/components/fields/Field';
import { useFieldError } from '@src/hooks/useFieldError';
import { CheckboxFieldType } from '@src/types';
import CheckedIcon from '@src/components/other/icons/16/checked.svg?react';
import ArrowDownIcon from '@src/components/other/icons/24/arrow-down.svg?react';
import Richtext from '@src/components/other/Richtext';

const INPUT_SIZE = '1.5rem';
const INPUT_BORDER_RADIUS = '4';

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> &
  Pick<CheckboxFieldType, 'label' | 'isRequired' | 'isDisabled' | 'hideField'>;

const CheckboxField: FC<CheckboxFieldType> = ({
  description,
  helper,
  helperCss,
  checkboxAlignTop,
  checkboxColor = 'green',
  checkboxBorderColor = 'green',
  hiddenLabel,
  css,
  variant = 'md',
  withArrowDownIcon,
  ...props
}) => {
  const {
    input,
    meta,
    label,
    isRequired = false,
    isDisabled,
    hideField,
  } = useFieldApi({
    ...props,
    type: 'checkbox',
  }) as UseFieldApiType;

  const { isError, error } = useFieldError({ name: input.name, meta });
  const [arrowDownward, setArrowDownward] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Field
      isDisabled={isDisabled}
      isError={isError}
      errorText={error}
      isRequired={isRequired}
      helper={helper}
      helperCss={{ ml: '2.5rem', ...helperCss }}
      display={hideField ? 'none' : 'flex'}
      alignItems="center"
      position="relative"
      flexDirection={withArrowDownIcon ? 'column' : 'row'}
      w="fit-content"
      fieldName={input.name}
      {...css}
    >
      <x.input
        disabled={isDisabled}
        type="checkbox"
        position="absolute"
        left="0"
        top={checkboxAlignTop ? '0' : '50%'}
        transform={checkboxAlignTop ? 'translateY(0)' : 'translateY(-50%)'}
        w={INPUT_SIZE}
        h={INPUT_SIZE}
        borderRadius={INPUT_BORDER_RADIUS}
        cursor="pointer"
        required={isRequired}
        appearance="none"
        outline={{
          '&:focus': 'none',
          '&:focus-visible': '2px solid',
        }}
        outlineColor={{ '&:focus-visible': 'primary.greenDirect' }}
        outlineOffset={0}
        ref={inputRef}
        {...input}
      />

      <x.span display="flex" alignItems="center">
        <x.span
          alignSelf={checkboxAlignTop ? 'flex-start' : 'center'}
          display="flex"
          alignItems="center"
          justifyContent="center"
          w={INPUT_SIZE}
          h={INPUT_SIZE}
          border="1px solid"
          borderColor={
            isDisabled ? 'grayscale.gray4' : borderColors[checkboxBorderColor]
          }
          bg={
            isDisabled
              ? 'grayscale.gray4'
              : input.checked
                ? accentColors[checkboxColor].checked
                : accentColors[checkboxColor].default
          }
          borderRadius={INPUT_BORDER_RADIUS}
          mr="1rem"
          flex="0 0 auto"
        >
          <Icon
            svg={<CheckedIcon />}
            fill={input.checked ? 'primary.black' : 'transparent'}
            opacity={input.checked ? 1 : 0}
            transition="opacity 300ms"
          />
        </x.span>
        <x.span display="block">
          <Richtext
            data={getAsteriskLabel(label, isRequired)}
            styles={{
              _p: {
                fontSize: fontSizes[variant],
                lineHeight: lineHeights[variant],
                color: colors[variant],
                fontWeight: fontWeights[variant],
              },
              _a: {
                display: 'inline',
                fontSize: '0.875rem',
                lineHeight: '1.125rem',
                color: 'primary.black',
                textDecoration: 'underline',
                border: 0,
              },
              _strong: {
                color: 'primary.black',
                fontWeight: 400,
              },
            }}
          />

          {description && (
            <x.span
              display="block"
              color="grayscale.gray2"
              fontSize="1.125rem"
              fontWeight={500}
              lineHeight="1.375rem"
              {...(variant === 'cart' && {
                fontSize: '1rem',
                lineHeight: '1.375rem',
              })}
            >
              {description}
            </x.span>
          )}

          {withArrowDownIcon && arrowDownward && (
            <Richtext
              data={hiddenLabel!}
              styles={{
                _p: {
                  fontSize: '0.875rem',
                  lineHeight: '1.125rem',
                  color: 'grayscale.grayWarm',
                  marginTop: '1.875rem',
                },
                _a: {
                  fontSize: '0.875rem',
                  lineHeight: '1.125rem',
                  color: 'primary.black',
                  textDecoration: 'underline',
                  border: 0,
                },
                _strong: {
                  color: 'primary.black',
                  fontWeight: 400,
                },
              }}
            />
          )}
        </x.span>
      </x.span>

      {withArrowDownIcon && (
        <x.button
          type="button"
          outline={{ focus: 'none' }}
          ring={{ focus: 0 }}
          ringColor={{ focus: 'transparent' }}
          border={{ focus: 'transparent' }}
          background="transparent"
          onClick={() => setArrowDownward((prevDownward) => !prevDownward)}
        >
          <Icon
            mt="1.4375rem"
            svg={<ArrowDownIcon />}
            transform={arrowDownward ? 'rotate(180deg)' : 'rotate(0)'}
            transformOrigin="center"
            transition="transform 300ms"
          />
        </x.button>
      )}
    </Field>
  );
};

export default CheckboxField;
