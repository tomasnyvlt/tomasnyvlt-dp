import { Icon } from 'anolis-ui';
import { DropdownIndicatorProps, components } from 'react-select';

import { OptionType } from '@src/types';
import ArrowDownIcon from '@src/components/other/icons/24/arrow-down.svg?react';

const DropdownIndicator = (props: DropdownIndicatorProps<OptionType>) => {
  const { menuIsOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <Icon
        svg={<ArrowDownIcon />}
        fill="primary.black"
        transform={`${menuIsOpen ? 'rotate(180deg)' : 'rotate(0)'}`}
        transition="transform 300ms"
      />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
