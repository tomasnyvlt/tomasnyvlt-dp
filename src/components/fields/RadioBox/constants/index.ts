import { SystemProp, Theme } from '@xstyled/emotion';

import { BREAKPOINTS } from '@src/theme/xstyled';

/* Container */
export const CONTAINER_SHADOW_GAP = '2rem';
export const LG_BREAKPOINT = BREAKPOINTS.lg;
export const CONTAINER_INLINE_MARGIN = '1.625rem';
export const RECOMMENDED_ADDITIONAL_SPACE = '3.25rem';
export const LG_GAP = '1.5rem';

/* Option */
export const OPTION_PADDING = '1rem';
export const OPTION_PADDING_LG = '1.5rem';

export const OPTION_INPUT_Z_INDEX = 1;

export const OPTION_BOX_SHADOW = '0px 0.3125rem 2.0625rem rgba(0, 0, 0, 0.075)';

export const OPTION_BORDER_RADIUS = '1.25rem';
export const OPTION_BORDER_RADIUS_STYLE: SystemProp<{}, Theme> = {
  _: {
    groupFirst: `${OPTION_BORDER_RADIUS} 0 0 ${OPTION_BORDER_RADIUS}`,
    groupLast: `0 ${OPTION_BORDER_RADIUS} ${OPTION_BORDER_RADIUS} 0`,
    groupOnly: OPTION_BORDER_RADIUS,
  },
  lg: {
    _: OPTION_BORDER_RADIUS,
    groupFirst: OPTION_BORDER_RADIUS,
    groupLast: OPTION_BORDER_RADIUS,
  },
};

/* Option Header */
export const NON_HIGHLIGHTED_BTN_CSS = `
  background: 
    linear-gradient(28deg, rgba(90, 83, 225, 1) 0%, rgba(204, 126, 255, 1) 72%, rgba(192, 137, 242, 1) 100%);
  z-index: 0;

  &::after {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    border-radius: 12.5rem;
    background: #fff;
    z-index: -1;
  }
`;

export const NON_HIGHLIGHTED_BTN_TEXT_CSS = `
  background: linear-gradient(77.45deg, #5a53e1 0%, #cc7eff 69.65%, #c098f2 100%);
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-clip: text;
  -moz-background-clip: text;
`;
