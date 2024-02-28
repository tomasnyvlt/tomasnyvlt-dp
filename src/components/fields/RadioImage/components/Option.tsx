import styled, { x } from '@xstyled/emotion';
import { FC, InputHTMLAttributes, useId } from 'react';

import { RadioImgOptionType } from '@src/types';

const INPUT_BORDER_RADIUS = '1.125rem';

interface RadioImgOptionProps
  extends RadioImgOptionType,
    Required<
      Pick<
        InputHTMLAttributes<HTMLInputElement>,
        'onChange' | 'onFocus' | 'onBlur'
      >
    > {
  name: string;
  isChecked: boolean;
}

const Option: FC<RadioImgOptionProps> = ({
  name,
  imgSrc,
  label,
  value,
  isChecked,
  onBlur,
  onChange,
  onFocus,
}) => {
  const id = useId();

  return (
    <x.label
      htmlFor={id}
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px="0.75rem"
      py="0.5rem"
      h="5rem"
      border="1px solid"
      borderColor={{
        _: isChecked ? 'primary.greenDirect' : 'grayscale.gray4',
        hover: 'primary.greenDirect',
      }}
      borderRadius={INPUT_BORDER_RADIUS}
      cursor="pointer"
      transition="border-color 300ms"
    >
      <x.input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        position="absolute"
        cursor="pointer"
        w="100%"
        h="100%"
        appearance="none"
        borderRadius={INPUT_BORDER_RADIUS}
        color="primary.greenDirect"
        boxShadow={{
          '&:focus': 'none',
          '&:focus-visible': '0 0 0 2px',
        }}
        outline="none"
      />

      <StyledImgWrapper>
        <x.img src={imgSrc} alt="" objectFit="contain" />
      </StyledImgWrapper>

      <x.span data-sr-only>{label}</x.span>
    </x.label>
  );
};

const StyledImgWrapper = styled.span`
  position: relative;
  display: block;
  flex: 1 0 auto;
  max-height: 100%;
  /* TODO MS add aspect-ratio as xstyled prop */
  aspect-ratio: 19/16;
`;

export default Option;
