import { Icon } from 'anolis-ui';
import { DropdownIndicatorProps, components } from 'react-select';

import { OptionDecorDataType } from '@src/types';
import ArrowDownIcon from '@src/components/other/icons/24/arrow-down.svg?react';

const DropdownIndicator = (
  props: DropdownIndicatorProps<OptionDecorDataType>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon svg={<ArrowDownIcon />} fill="primary.black" />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
