import {
  useFieldApi,
  useFormApi,
} from '@data-driven-forms/react-form-renderer';
import { x } from '@xstyled/emotion';
import { SystemProps } from '@xstyled/system';
import { Icon, Input, InputProps } from 'anolis-ui';
import { FC, ReactNode } from 'react';

import Helper from '@src/components/contents/Helper';
import { useFieldError } from '@src/hooks/useFieldError';
import MinusIcon from '@src/components/other/icons/24/minus.svg?react';
import PlusIcon from '@src/components/other/icons/24/plus.svg?react';

export interface NumberFieldProps extends SystemProps {
  name: string;
  labelText?: string | ReactNode;
  _labelText?: SystemProps;
  inputProps?: InputProps;
  required?: boolean;
  helper?: ReactNode;
  disabledAdding?: boolean;
  disabledSubtracting?: boolean;
  changeBy?: number;
  isMonetaryValue?: boolean;
  minimumValue?: number;
}

const NumberField: FC<NumberFieldProps> = ({
  disabledSubtracting,
  disabledAdding,
  labelText,
  isMonetaryValue,
  ...props
}) => {
  const { field, meta, input } = useFieldApi(props);
  const { change } = useFormApi();
  const { isError, error } = useFieldError({ name: input.name, meta });

  const fieldActive = meta.active || input.value >= 0;

  const onChange = (value: number) => {
    if (!isMonetaryValue) {
      change(
        input.name,
        Number(
          input.value + value >= (props.minimumValue || 0)
            ? input.value + value
            : props.minimumValue || 0
        )
      );
    } else if (input.value.length > 1 && input.value.includes('Kč')) {
      // eslint-disable-next-line radix
      const oldNum = parseInt(input.value.split('Kč')[0].replace(/\s/g, ''));
      const newNum =
        oldNum + value >= (props.minimumValue || 0)
          ? oldNum + value
          : props.minimumValue || 0;

      change(
        input.name,
        newNum.toLocaleString('cs-CZ', {
          style: 'currency',
          currency: 'CZK',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      change(
        input.name,
        `${(props.minimumValue ?? props.changeBy ?? 0).toLocaleString('cs-CZ', {
          style: 'currency',
          currency: 'CZK',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}`
      );
    }
  };
  const onBlurValidation = () => {
    input.onBlur();
    if (isMonetaryValue) {
      // eslint-disable-next-line radix
      const inputNum = parseInt(input.value.split('Kč')[0].replace(/\s/g, ''));
      if (
        typeof inputNum === 'number' &&
        inputNum >= (props.minimumValue || 0)
      ) {
        change(
          input.name,
          // eslint-disable-next-line radix
          `${parseInt(
            input.value.split('Kč')[0].replace(/\s/g, '')
          ).toLocaleString('cs-CZ', {
            style: 'currency',
            currency: 'CZK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}`
        );
      } else {
        change(
          input.name,
          `${(props.minimumValue || 0).toLocaleString('cs-CZ', {
            style: 'currency',
            currency: 'CZK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}`
        );
      }
    }
  };
  return (
    <x.div display="block" as="label" position="relative" {...props}>
      <x.div display="flex">
        <x.button
          as="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          type="button"
          w="3.5rem"
          flexShrink={0}
          onClick={
            disabledSubtracting
              ? undefined
              : () => onChange(-props.changeBy! || -1)
          }
          backgroundColor={{ hover: '#F6EFFB', active: '#fff' }}
          border="1px solid"
          borderColor={
            disabledSubtracting
              ? { _: 'grayscale.gray3' }
              : {
                  _: 'grayscale.gray4',
                  hover: 'tercial.indigo1',
                  active: 'primary.greenDirect',
                  focus: 'primary.greenDirect',
                }
          }
          fontWeight="800"
          fontSize={24}
          borderRadius="0.75rem 0rem 0rem 0.75rem"
          transition="border 300ms"
          cursor={disabledSubtracting ? 'not-allowed' : 'pointer'}
          disabled={disabledSubtracting}
          userSelect="none"
          appearance="none"
        >
          <Icon
            svg={<MinusIcon />}
            fill={disabledSubtracting ? 'grayscale.gray3' : 'primary.black'}
          />
        </x.button>

        <x.div position="relative">
          <x.p
            position="absolute"
            fontWeight={fieldActive ? 400 : 500}
            fontSize={
              fieldActive
                ? '0.625rem'
                : { _: '0.9rem', md: '0.9rem', lg: '1rem' }
            }
            lineHeight={fieldActive ? '0.875rem' : '1.25rem'}
            left="1rem"
            top={fieldActive ? '0.6875rem' : '1.125rem'}
            transition="font-weight 300ms, font-size 300ms, line-height 300ms, top 300ms"
            {...props._labelText}
            {...(isError && { color: 'tercial.red1' })}
          >
            {labelText && (
              <>
                {labelText}
                {props.required && <x.span>*</x.span>}
              </>
            )}
          </x.p>

          <Input
            {...props.inputProps}
            flex={1}
            borderRadius={0}
            borderLeft={0}
            borderRight={0}
            value={input.value}
            _input={{
              ...field,
              disabled: !isMonetaryValue,
              opacity: 1,
              type: isMonetaryValue ? 'text' : 'number',
              ...props.inputProps?._input,
              onFocus: () => input.focus(),
              onBlur: () => onBlurValidation(),
            }}
          />
        </x.div>

        <x.button
          as="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          type="button"
          w="3.5rem"
          flexShrink={0}
          onClick={
            disabledAdding ? undefined : () => onChange(props.changeBy ?? 1)
          }
          backgroundColor={{ hover: '#F6EFFB', active: '#fff' }}
          border="1px solid"
          borderColor={
            disabledAdding
              ? { _: 'grayscale.gray3' }
              : {
                  _: 'grayscale.gray4',
                  hover: 'tercial.indigo1',
                  active: 'primary.greenDirect',
                  focus: 'primary.greenDirect',
                }
          }
          fontWeight="800"
          fontSize={24}
          borderRadius="0rem 0.75rem 0.75rem 0rem"
          transition="border 300ms"
          cursor={disabledAdding ? 'not-allowed' : 'pointer'}
          disabled={disabledAdding}
          userSelect="none"
          appearance="none"
        >
          <Icon
            svg={<PlusIcon />}
            fill={disabledAdding ? 'grayscale.gray3' : 'primary.black'}
          />
        </x.button>
      </x.div>

      {isError && (
        <x.p color="tercial.red1" mt="0.25rem" fontSize="0.875rem">
          {error}
        </x.p>
      )}

      {props.helper && <Helper>{props.helper}</Helper>}
    </x.div>
  );
};

export default NumberField;
