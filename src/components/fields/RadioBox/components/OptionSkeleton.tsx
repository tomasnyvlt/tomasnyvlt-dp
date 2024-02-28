import styled, { x } from '@xstyled/emotion';
import { FC } from 'react';

import {
  LG_GAP,
  OPTION_BORDER_RADIUS_STYLE,
} from '@src/components/fields/RadioBox/constants';
import Skeleton from '@src/components/other/Skeleton';

const OptionSkeleton: FC = () => {
  return (
    <StyledContainer
      h={{
        _: '28.5625rem',
        lg: '29.375rem',
      }}
      overflow="hidden"
      // Width = 3 columns with 2 gaps between them + collapse empty columns
      flex={{ _: '0 0 auto', lg: `1 0 calc(33.33% - ((${LG_GAP} * 2) / 3))` }}
      w={{
        _: 'clamp(9.5625rem, 50%, 10.5rem)',
        sm: 'clamp(10.5rem, 33.33%, 12.5rem)',
        lg: `clamp(15.25rem, 33.33%, calc(33.33% - ((${LG_GAP} * 2) / 3)))`,
      }}
      data-group
    >
      <StyledContainer
        borderRadius={OPTION_BORDER_RADIUS_STYLE}
        overflow="hidden"
      >
        <Skeleton skeletonProps={{ height: '100%', width: '100%' }} />
      </StyledContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled(x.div)`
  /* Fix Safari border-radius overflow */
  isolation: isolate;

  & > * {
    height: 100%;
  }
`;

export default OptionSkeleton;
