import styled, { x } from '@xstyled/emotion';
import { Icon } from 'anolis-ui';
import { FC, useContext } from 'react';

import { DatePickerContext } from '@src/components/fields/DatePicker/context/DatePickerContext';
import ArrowLeftIcon from '@src/components/other/icons/16/arrow-left.svg?react';

interface NavigationButtonProps {
  isDisabled: boolean;
  onClick: () => void;
  direction: 'left' | 'right';
}

const NavigationButton: FC<NavigationButtonProps> = ({
  direction,
  isDisabled,
  onClick,
}) => {
  const { calendarType } = useContext(DatePickerContext);

  const ariaLabelDateType =
    calendarType === 'day'
      ? 'měsíc'
      : calendarType === 'month'
        ? 'rok'
        : 'roky';

  return (
    <x.button
      aria-label={
        direction === 'left'
          ? `Předchozí ${ariaLabelDateType}`
          : `Následující ${ariaLabelDateType}`
      }
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="transparent"
      outline={{ _: 'none', '&:focus': 'none', '&:focus-visible': '1px auto' }}
      outlineColor={{ _: 'none', '&:focus-visible': 'primary.greenDirect' }}
      color="primary.black"
      borderRadius="50%"
      disabled={isDisabled}
      onClick={onClick}
      p="0.5rem"
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      type="button"
    >
      <StyledIcon
        as="span"
        svg={<ArrowLeftIcon />}
        fill={isDisabled ? 'grayscale.gray1Alpha50' : 'primary.black'}
        display="flex"
        justifyContent="center"
        alignItems="center"
        transform={direction === 'left' ? 'none' : 'rotate(180deg)'}
        w="1rem"
        h="1rem"
      />
    </x.button>
  );
};

const StyledIcon = styled(Icon)`
  & > svg {
    width: inherit;
    height: inherit;
  }
`;

export default NavigationButton;
