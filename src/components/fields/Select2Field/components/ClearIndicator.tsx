import { Icon } from 'anolis-ui';
import { ClearIndicatorProps, components } from 'react-select';

import { OptionType } from '@src/types';
import CloseIcon from '@src/components/other/icons/24/close.svg?react';

const ClearIndicator = (props: ClearIndicatorProps<OptionType>) => {
  return (
    <components.ClearIndicator {...props}>
      <Icon svg={<CloseIcon />} fill="primary.black" />
    </components.ClearIndicator>
  );
};

export default ClearIndicator;
