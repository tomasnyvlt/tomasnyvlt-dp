import { SystemProps } from '@xstyled/emotion';
import { ButtonTheme } from 'anolis-ui';

import { DirectButtonProps } from '@src/components/other/DirectButton';
import { theme } from '@src/theme';

export interface GetButtonStyleProps {
  variant?: DirectButtonProps['v'];
  size?: keyof ButtonTheme['sizes'];
}

interface Output {
  buttonStyle: SystemProps;
  spinnerStyle: SystemProps;
}

const { baseStyle, defaultProps, sizes, variants } = theme.button;

const getButtonStyle = ({
  variant = defaultProps.v ?? 'solid',
  size = defaultProps.s ?? 'md',
}: GetButtonStyleProps): Output => {
  const { _leftIcon, _rightIcon, _spinner, ...restBaseStyle } = baseStyle;
  const { _spinner: _spinnerSizes, ...restSizes } = sizes[size];

  const buttonStyle: SystemProps = {
    ...restBaseStyle,
    ...restSizes,
    ...variants[variant === 'gradient' ? 'solid' : variant],
  };

  const spinnerStyle: SystemProps = {
    ..._spinner,
    ..._spinnerSizes,
  };

  return {
    buttonStyle,
    spinnerStyle,
  };
};

export default getButtonStyle;
