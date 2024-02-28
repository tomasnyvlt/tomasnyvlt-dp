import {
  UseFieldApiProps,
  useFieldApi,
} from '@data-driven-forms/react-form-renderer';
import { x } from '@xstyled/emotion';
import { FC } from 'react';

import { useFieldError } from '@src/hooks/useFieldError';
import { ButtonFieldType } from '@src/types';
import DirectButton from '@src/components/other/DirectButton';

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> &
  Pick<ButtonFieldType, 'onClick' | 'isLoading' | 'label'>;

const ButtonField: FC<ButtonFieldType> = ({
  variant = 'outline',
  css,
  ...props
}) => {
  const {
    input,
    meta,
    isLoading,
    onClick,
    disabled,
    label,
    type = 'button',
  } = useFieldApi(props) as UseFieldApiType;

  const { isError, error } = useFieldError({ name: input.name, meta });

  return (
    <>
      <DirectButton
        name={input.name}
        type={type}
        v={variant}
        s="sm"
        onClick={onClick}
        loading={isLoading}
        disabled={disabled}
        {...css}
      >
        {label}
      </DirectButton>

      {isError && (
        <x.p color="tercial.red1" mt="0.25rem" fontSize="0.875rem">
          {error}
        </x.p>
      )}
    </>
  );
};

export default ButtonField;
