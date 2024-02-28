import { x } from '@xstyled/emotion';
import { Icon } from 'anolis-ui';
import { OptionProps, components } from 'react-select';

import { OptionType } from '@src/types';
import CheckedIcon from '@src/components/other/icons/16/checked.svg?react';

const INPUT_SIZE = '1.5rem';

const MultiSelectOption = (props: OptionProps<OptionType>) => {
  const { children, isSelected, isDisabled } = props;

  return (
    <components.Option {...props}>
      <x.span
        display="flex"
        alignItems="center"
        justifyContent="center"
        w={INPUT_SIZE}
        h={INPUT_SIZE}
        border="1px solid"
        borderColor={isDisabled ? 'grayscale.gray2' : 'primary.greenDirect'}
        borderRadius="4"
        flex="0 0 auto"
        transition="background-color 300ms ease"
        data-icon-container
      >
        <Icon
          svg={<CheckedIcon />}
          fill={
            isSelected
              ? isDisabled
                ? 'grayscale.gray2'
                : 'primary.black'
              : 'transparent'
          }
          opacity={isSelected ? 1 : 0}
          transition="opacity 300ms"
        />
      </x.span>

      <x.span display="inline-block" minWidth="0">
        {children}
      </x.span>
    </components.Option>
  );
};

export default MultiSelectOption;
